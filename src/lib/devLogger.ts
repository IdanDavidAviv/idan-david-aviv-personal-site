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

    const orig = {
        log: console.log.bind(console),
        info: console.info.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console),
        debug: console.debug.bind(console),
    };

    console.log = (...args: unknown[]) => {
        orig.log(...args);
        forward('INFO', args);
    };

    console.info = (...args: unknown[]) => {
        orig.info(...args);
        forward('INFO', args);
    };

    console.warn = (...args: unknown[]) => {
        orig.warn(...args);
        forward('WARN', args);
    };

    console.error = (...args: unknown[]) => {
        orig.error(...args);
        forward('ERROR', args);
    };

    console.debug = (...args: unknown[]) => {
        orig.debug(...args);
        forward('DEBUG', args);
    };

    orig.log('%c[DevLogger] Console → Terminal bridge active ⚡', 'color: #a855f7; font-weight: bold;');
}
