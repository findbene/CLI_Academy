export function ClaudeCodeQuickRefCard() {
  return (
    <div className="ref-card-body">

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">The Agentic Workflow Loop</h2>
        <div className="ref-flow">
          <div className="ref-flow-step ref-teal-bg">
            <span className="ref-flow-num">1</span>
            <span className="ref-flow-label">Ask</span>
            <span className="ref-flow-desc">Describe what you want in plain English</span>
          </div>
          <div className="ref-flow-arrow">→</div>
          <div className="ref-flow-step ref-purple-bg">
            <span className="ref-flow-num">2</span>
            <span className="ref-flow-label">Plan</span>
            <span className="ref-flow-desc">Claude outlines steps (use plan mode for risky changes)</span>
          </div>
          <div className="ref-flow-arrow">→</div>
          <div className="ref-flow-step ref-amber-bg">
            <span className="ref-flow-num">3</span>
            <span className="ref-flow-label">Edit</span>
            <span className="ref-flow-desc">Claude writes code, reads files, runs commands</span>
          </div>
          <div className="ref-flow-arrow">→</div>
          <div className="ref-flow-step ref-blue-bg">
            <span className="ref-flow-num">4</span>
            <span className="ref-flow-label">Run</span>
            <span className="ref-flow-desc">Claude executes tests, lint, build automatically</span>
          </div>
          <div className="ref-flow-arrow">→</div>
          <div className="ref-flow-step ref-teal-bg">
            <span className="ref-flow-num">5</span>
            <span className="ref-flow-label">Commit</span>
            <span className="ref-flow-desc">Atomic git commit when the task is complete</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">CLAUDE.md — 4-Section Structure</h2>
        <div className="ref-code-block">
          <pre>{`# Project name

## Project overview
What the project does and who uses it. 1-2 sentences.
Claude reads this every session to orient itself.

## Architecture & key files
- src/api/          — FastAPI routes
- src/lib/          — shared utilities
- tests/            — pytest suite

## Conventions
- Python 3.11+ with type hints
- Run: make test && make lint before committing
- Never commit .env files

## Off-limits
- Do not touch legacy/v1/ — migration in progress
- Do not modify the Supabase schema without approval`}</pre>
        </div>
        <p className="ref-note mt-2">Place <code>CLAUDE.md</code> at the project root. Claude reads it automatically at session start.</p>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-amber">Prompting Patterns That Work</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Pattern</span>
            <span>Example prompt</span>
          </div>
          <div className="ref-row">
            <span><strong>Goal + constraint</strong></span>
            <span><em>&ldquo;Add a search bar to the dashboard. Use the existing Panel component. Don&apos;t touch the API layer.&rdquo;</em></span>
          </div>
          <div className="ref-row">
            <span><strong>Describe the bug</strong></span>
            <span><em>&ldquo;When I click Save, the form clears but nothing is posted. Here&apos;s the error from the console: &hellip;&rdquo;</em></span>
          </div>
          <div className="ref-row">
            <span><strong>Ask for a plan first</strong></span>
            <span><em>&ldquo;Before changing anything, tell me the 3 files you will need to edit and why.&rdquo;</em></span>
          </div>
          <div className="ref-row">
            <span><strong>Scope it tightly</strong></span>
            <span><em>&ldquo;Only change UserCard.tsx. Do not touch any other file.&rdquo;</em></span>
          </div>
          <div className="ref-row">
            <span><strong>Reference docs inline</strong></span>
            <span><em>&ldquo;Use the pattern in docs/api-conventions.md for this new endpoint.&rdquo;</em></span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">Useful Flags</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Flag</span>
            <span>Purpose</span>
          </div>
          <div className="ref-row">
            <code>--print &ldquo;prompt&rdquo;</code>
            <span>Non-interactive: run prompt and exit. Good for CI scripts.</span>
          </div>
          <div className="ref-row">
            <code>--no-edit</code>
            <span>Claude can read files but not write them. Safe exploration mode.</span>
          </div>
          <div className="ref-row">
            <code>--allowed-tools</code>
            <span>Restrict which tools Claude can use: <code>--allowed-tools &ldquo;read,write&rdquo;</code></span>
          </div>
          <div className="ref-row">
            <code>--model</code>
            <span>Select model at launch: <code>--model claude-opus-4-6</code></span>
          </div>
          <div className="ref-row">
            <code>--dangerously-skip-permissions</code>
            <span>Skip all permission prompts. Use only in trusted CI pipelines, never interactively.</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">Permission Levels</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Level</span>
            <span>Behaviour</span>
          </div>
          <div className="ref-row">
            <code>auto</code>
            <span>Claude executes without asking. Safe for read operations and low-risk writes.</span>
          </div>
          <div className="ref-row">
            <code>prompt</code>
            <span>Claude asks before each action. Good for file writes and shell commands.</span>
          </div>
          <div className="ref-row">
            <code>deny</code>
            <span>Tool is completely blocked. Claude will work around it or report inability.</span>
          </div>
        </div>
        <p className="ref-note mt-2">Set per tool in <code>~/.claude/settings.json</code> under <code>&ldquo;permissions&rdquo;</code>.</p>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-amber">Plan Mode (Safe Edits)</h2>
        <div className="ref-steps">
          <div className="ref-step">
            <span className="ref-step-num">→</span>
            <div>
              <p className="ref-step-title">Activate plan mode</p>
              <p className="ref-step-note">Press <strong>Shift + Tab twice</strong> before sending your prompt. Claude will propose a step-by-step plan and wait for your approval before touching any files.</p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">→</span>
            <div>
              <p className="ref-step-title">When to use it</p>
              <p className="ref-step-note">Refactors touching many files, schema migrations, anything that changes API contracts, or any time you want to review the approach before committing.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
