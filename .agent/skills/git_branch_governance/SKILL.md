---
name: git_branch_governance
description: Authoritative guide for persistent dev-to-master branch governance, default development workflow, and zero-drift deployment in idan-david-aviv-personal-site.
---

# 🚀 Git Branch Governance & Persistent Dev Lifecycle

This skill defines the authoritative, standardized branch governance for **`idan-david-aviv-personal-site`**.

---

## 1. The Persistent `dev` Branch Mandate

* **Standing Baseline Branch**: The `dev` branch is the **permanent default development baseline**. All development sessions, commits, refactorings, and intermediate pushes take place on `dev`.
* **Zero Branch Lifecycle Friction**: By standardizing on `dev`, the team avoids the overhead of constantly creating, switching, and deleting transient feature branches for routine development.
* **Transient Feature Branches (Spike Exception)**: Dedicated feature branches (e.g. `feature/spike-...`) are optional and reserved exclusively for high-risk, experimental spikes that might be discarded.
* **Zero Branch Deletion for `dev`**: Unlike transient feature branches, the `dev` branch is **strictly permanent and must NEVER be deleted** either locally or remotely.
* **Strict Direct Push Ban on `master`**: Direct pushes to `master` (`git push origin master`) are **strictly prohibited**. All code deployments to production MUST flow through Pull Requests.

---

## 2. Daily Development Loop (On `dev`)

1. **Verify Current Branch**: Ensure you are on `dev`:
   ```bash
   git checkout dev
   ```
2. **Work & Edit**: Apply surgical code changes.
3. **Local Quality Verification**:
   ```bash
   npm run prepush
   ```
4. **Stage & Commit**:
   ```bash
   git add <relative_paths>
   git commit -m "[feat] <summary>" -m "- <detail>"
   ```
5. **Push to Remote `dev`**:
   ```bash
   git push origin dev
   ```

---

## 3. Production Release & Promotion Protocol (`dev` ➔ `master`)

When a milestone or batch of changes on `dev` is ready to go live:

1. **Local Prepush Check**: Ensure `npm run prepush` passes 100% locally.
2. **Push Latest `dev`**: Ensure `git push origin dev` is up to date.
3. **Open Pull Request (via GitHub MCP)**:
   - Tool: `create_pull_request`
   - **Head**: `dev`
   - **Base**: `master`
   - **Title**: `[release] <Milestone summary>`
4. **CI Verification Gate**:
   - Verify that the GitHub Actions CI pipeline passes all checks (install, quality, test-component, test-unit, e2e-tests, build).
5. **Squash Merge (via GitHub MCP)**:
   - Tool: `merge_pull_request`
   - `merge_method`: `"squash"`
   - This triggers the automated deployment to Firebase Hosting via `.github/workflows/ci.yml`.
6. **Local Realignment Ritual**:
   After merging into `master`, realign local refs in three quick commands:
   ```bash
   git checkout master
   git pull origin master
   git checkout dev
   git merge master
   git push origin dev
   ```
   This ensures local `dev`, local `master`, and remote `origin` remain at identical heights with zero drift.
