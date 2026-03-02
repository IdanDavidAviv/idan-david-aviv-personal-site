---
name: dna_sync
description: Protocol for synchronizing the DNA Knowledge Item network graph with the live site visualization (ki-network.ts). Enforces the Connectivity → Dry-Run → Approval → Wet Fill pipeline.
---

# DNA Sync Skill

## Context
`dna-connectivity.ts` is the **ground-truth injector** for the KI network visualization in `src/visualizations/ki-network.ts`. It scans the Knowledge Base (`~/.gemini/antigravity/knowledge/`) and `GEMINI.md` to produce a synchronized `kiData` block.

This skill governs the **mandatory 3-phase protocol** for running any synchronization — it must never be shortcut.

## Node Group Convention (Source of Truth)

| Group | Role | Visual |
|---|---|---|
| `999` | Root Hub (`GEMINI.md`) | Large, solid dark blue |
| `0` | Ghosts (Untriaged/New KIs) | Small, grey, translucent |
| `1` | Antigravity DNA (Core Protocols) | Purple |
| `2` | Personal Site (Visualization Sync) | Cyan |
| `3` | Spirit Research Lab (Infra) | Amber |

> [!IMPORTANT]
> Group assignments for non-`GEMINI.md` nodes are **manually maintained** in `ki-network.ts` and **preserved** by the sync script. New KIs default to Group `0` (Ghost) until manually triaged.

## The 3-Phase Pipeline

### Phase 1 — Audit (Read-Only)
```bash
npm run dna:connectivity
```
- Scans all KIs and reports their link counts.
- **No files modified.** Safe to run at any time.
- Use output to verify the ground truth before proceeding.

### Phase 2 — Dry Run (Preview)
```bash
npm run dna:fillsite:dry
```
- Generates `src/visualizations/ki-network.ts.tmp` with the proposed changes.
- Prints a full **git diff** of `ki-network.ts` vs `.tmp`.
- Confirms `GEMINI.md` promotion to Group 999.
- **MANDATORY GATE**: Review the diff output before proceeding to Phase 3.

> [!CAUTION]
> **The Authorization Gate**: You are FORBIDDEN from running Phase 3 without an explicit "GO" from the USER after reviewing the dry-run diff.

### Phase 3 — Wet Fill (Commit)
```bash
npm run dna:fillsite
```
- Surgically replaces the `kiData` block in `ki-network.ts`.
- **Preserves all manual group assignments** (reads existing groups from the file).
- **Forces** `GEMINI.md` to Group 999 regardless of existing value.
- Deletes `ki-network.ts.tmp` automatically on success.

## Archaeological Protocol (Flag Economy)

`dna-archaeology.ts` maintains the temporal ledger. Use flags to control provenance:

- **`--fresh`**: Full reconstruction. Wipes data and crawls from Genesis. Use for major logic shifts.
- **`--sync`**: Incremental update. Extracts hash from existing ledger (v8+) and fetches only missing epochs.
- **`--partial <n>`**: Windowed crawl. Only processes the most recent `<n>` commits.

### Root Node Governance
`GEMINI.md` is the absolute root (Group 999). It is included in the **default scope** of all archaeological and connectivity scans. Any change to `GEMINI.md` links automatically triggers an archaeology epoch.

## Post-Sync Checklist
- [ ] Verify `GEMINI.md` is present in the latest archaeology epoch.
- [ ] Ensure hashes are correctly pinned in ledger labels.
- [ ] Check for duplicate nodes in `--sync` mode.
