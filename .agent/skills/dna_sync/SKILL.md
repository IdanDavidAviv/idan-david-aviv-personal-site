---
name: dna_sync
description: Protocol for synchronizing the Virgo DNA temporal ledger. Enforces the Audit → Sync → Verify pipeline using the Archaeology Engine.
---

# DNA Sync Skill (Virgo DNA Edition)

## Context
The Virgo DNA visualization is powered by a **Temporal Ledger** (`src/visualizations/dna-history-backfill-v*.json`). This ledger records every "epoch" (commit) that modifies the Knowledge Base or `GEMINI.md`.

This skill governs the **mandatory 3-phase protocol** for maintaining the graph's integrity.

## Node Group Convention (Source of Truth)

| Group | Role | Visual |
|---|---|---|
| `999` | Root Hub (`GEMINI.md`) | Large, solid dark blue |
| `0` | Ghosts (Untriaged/New KIs) | Small, grey, translucent |
| `1` | Virgo DNA (Core Protocols) | Purple |
| `2` | Personal Site (Visualization Sync) | Cyan |
| `3` | Spirit Research Lab (Infra) | Amber |

> [!IMPORTANT]
> Group assignments are maintained in `src/visualizations/ki-groups.json`. New KIs default to Group `0` (Ghost) until manually triaged in that file.

## The 3-Phase Pipeline

### Phase 1 — Audit
```bash
npm run dna:audit
```
- Compares the latest JSON ledger against the physical files in the Knowledge Base.
- Detects **Zombies** (deleted files still in ledger) and **Ghosts** (new files missing from ledger).
- **MANDATORY**: Fix all "Unregistered" errors in `ki-groups.json` before proceeding.

### Phase 2 — Archaeology Sync
```bash
npm run dna:sync
```
- Incremental update. Extracts the last hash from the ledger and fetches only new commits.
- Generates a new versioned JSON file in `src/visualizations/`.
- **MANDATORY GATE**: Ensure the "Virgo Archaeology" log reports successful epoch extraction.

### Phase 3 — Visual Verification
- Open the **Virgo DNA Showcase** page (`/virgo-dna`).
- Verify that the latest changes are reflected in the "Neural Trace" (the playback graph).
- Confirm that Group 1 nodes are correctly labeled as **Virgo DNA**.

## Archaeological Protocol (Flag Economy)

`dna-archaeology.ts` is the engine. It supports the following flags:

- **`--sync`**: (Default) Resume from the last known commit.
- **`--fresh`**: Full reconstruction from Genesis. Use only if history logic changes.
- **`--partial <n>`**: Process only the most recent `<n>` commits.
- **`--scope <paths>`**: Comma-separated paths to track (Default: Knowledge Base + `GEMINI.md`).

## Post-Sync Checklist
- [ ] Run `dna:audit` to confirm zero inconsistencies.
- [ ] Verify the new `.json` file is present in `src/visualizations/`.
- [ ] Check that `PromptArchitectureSpace.tsx` correctly generates GitHub links for new epochs.
