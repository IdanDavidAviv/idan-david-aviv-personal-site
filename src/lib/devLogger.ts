/* eslint-disable no-console */
/// <reference types="vite/client" />
/**
 * devLogger.ts
 * Development-only console bridge → Vite terminal.
 *
 * Intercepts console.log/info/warn/error and forwards each call to the
 * Vite dev server's `/__log` middleware endpoint so logs are visible
 * directly in the terminal alongside server output.
 *
 * This module is a strict NO-OP in production (import.meta.env.DEV guard).
 */

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

const ENDPOINT = '/__log';

function serialize(args: unknown[]): string {
    return args
        .map((a) => {
            try {
                return typeof a === 'object' ? JSON.stringify(a) : String(a);
            } catch {
                return '[unserializable]';
            }
        })
        .join(' ');
}

function forward(level: LogLevel, args: unknown[]): void {
    const message = serialize(args);
    // Fire-and-forget — we deliberately don't await/catch to keep console fast.
    fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, message, args: [] }),
    }).catch(() => {
        // Silently swallow — server might be restarting.
    });
}

/**
 * Call once at app entry-point (main.tsx).
 * Patches the global `console` object so every log call is mirrored to
 * the Vite terminal. Original methods are preserved and always called.
 */
export function initDevLogger(): void {
    if (!import.meta.env.DEV) return;
    
    // Prevent double-initialization (common during Vite HMR)
    if ((window as unknown as Record<string, boolean>).__DEV_LOGGER_INITIALIZED__) return;
    (window as unknown as Record<string, boolean>).__DEV_LOGGER_INITIALIZED__ = true;

    const orig = {
        log: console.log.bind(console),
        info: console.info.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console),
        debug: console.debug.bind(console),
    };

    // Generic high-perf interceptor
    const intercept = (level: LogLevel, original: (...args: unknown[]) => void) => {
        return (...args: unknown[]) => {
            const msg = serialize(args);
            
            // 1. Silent specific noise (THREE.Clock deprecations)
            if (msg.includes('THREE.Clock') && msg.includes('deprecated')) return;

            // 2. Browser side log
            original(...args);

            // 3. Conditional terminal forwarding
            // We only forward [DNA-] logic, [UNCAUGHT-] crashes, or explicit WARN/ERROR
            // Special: Downgrade DNA tags from WARN to INFO in terminal as requested
            let effectiveLevel = level;
            const isDnaSystem = msg.includes('[DNA-');
            if (isDnaSystem && level === 'WARN') {
                effectiveLevel = 'INFO';
            }

            const isSignificant = (isDnaSystem && (level === 'WARN' || level === 'ERROR')) || 
                                msg.includes('[UNCAUGHT-') || 
                                level === 'ERROR';

            if (isSignificant) {
                forward(effectiveLevel, args);
            }
        };
    };

    console.log = intercept('INFO', orig.log);
    console.info = intercept('INFO', orig.info);
    console.warn = intercept('WARN', orig.warn);
    console.error = intercept('ERROR', orig.error);
    console.debug = intercept('DEBUG', orig.debug);

    // --- Error & Warning Interception ---

    window.addEventListener('error', (event) => {
        const errorMsg = `[UNCAUGHT-CRASH] 🔴 ${event.message}\n   at ${event.filename}:${event.lineno}:${event.colno}`;
        forward('ERROR', [errorMsg]);
    });

    window.addEventListener('unhandledrejection', (event) => {
        const reason = event.reason instanceof Error ? event.reason.message : String(event.reason);
        const errorMsg = `[UNCAUGHT-PROMISE] 🟠 ${reason}`;
        forward('ERROR', [errorMsg]);
    });

    orig.log('%c[DevLogger] Console → Terminal bridge active ⚡', 'color: #a855f7; font-weight: bold;');
    orig.log('%c[DevLogger] 🛡️ Integrity Interceptors Enabled (Deduplicated)', 'color: #10b981;');
}
