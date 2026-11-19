# Agent instructions

Shared rules for every AI agent working on this repository: Cursor, Claude Code, Codex, and Antigravity.

The product name in the UI is VYRA Studio. The npm package name is `ai-web-studio`.

## Before starting work

Read these files and follow the current code if they disagree:

1. `AI-WORKSPACE/MEMORY.md` — purpose, audience, stack, design, decisions, constraints.
2. `AI-WORKSPACE/PROJECT_MAP.md` — real file and component map.
3. `AI-WORKSPACE/HANDOFF.md` — current status, known problems, next task.
4. `AI-WORKSPACE/TASK_LOG.md` — what was already done and how it was checked.

`MEMORY.md` in the repository root is an earlier changelog. It is not the canonical memory. Do not delete it. New decisions go into `AI-WORKSPACE/`.

Inspect the current source before editing. Do not assume a planned section or a note in an older file is already implemented.

## While working

- Do not change the architecture unless the task requires it.
- Do not install, remove, or upgrade dependencies without explicit permission.
- Do not overwrite another agent's or the user's changes without reading the current file first.
- Do not delete files or existing behavior without approval.
- Do not expose API keys or secrets.
- Keep website copy in Ukrainian.
- Keep code, component names, and technical documentation in English.
- Use TypeScript properly. Do not use `any`.
- Keep components modular.
- Prefer the existing CSS tokens in `src/styles/tokens.css` over new one-off values.
- Do not claim that a check was run if it was not.

## After each task

Update the shared memory before finishing:

- `AI-WORKSPACE/TASK_LOG.md` — what was done, which files changed, and the result of each check.
- `AI-WORKSPACE/HANDOFF.md` — current status, what works, what does not, and the next task.
- `AI-WORKSPACE/MEMORY.md` — only when an architectural decision, constraint, stack choice, or design-system fact changes.
- `AI-WORKSPACE/PROJECT_MAP.md` — when files or component responsibilities change.

Explain important changes and remaining risks in the handoff. If something was not verified in a browser, in the build, or with the linter, say so.
