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

## When to Run This Skill

- After **adding a new KI** to the knowledge base.
- After **modifying links** in a KI's `SKILL.md`.
- After **updating `GEMINI.md`** references.
- When the **visualization feels stale** or mismatched vs the actual KI graph.

## Post-Sync Checklist
- [ ] Verify diff only touches the `kiData` block.
- [ ] New KIs appear as Ghost nodes (Group 0) in the visualization.
- [ ] `GEMINI.md` renders as the large root hub (Group 999).
- [ ] No group assignments for existing KIs were accidentally reset to `0`.
