export function ClaudeCodeSetupCard() {
  return (
    <div className="ref-card-body">

      {/* macOS */}
      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">macOS Setup</h2>
        <div className="ref-steps">
          <div className="ref-step">
            <span className="ref-step-num">1</span>
            <div>
              <p className="ref-step-title">Install Node.js 18+</p>
              <code className="ref-code">brew install node</code>
              <p className="ref-step-note">Or download from nodejs.org. Verify: <code>node --version</code></p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">2</span>
            <div>
              <p className="ref-step-title">Install Claude Code globally</p>
              <code className="ref-code">npm install -g @anthropic-ai/claude-code</code>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">3</span>
            <div>
              <p className="ref-step-title">Authenticate</p>
              <code className="ref-code">claude</code>
              <p className="ref-step-note">First run opens a browser OAuth flow. Sign in with your Anthropic account.</p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">4</span>
            <div>
              <p className="ref-step-title">Verify install</p>
              <code className="ref-code">claude --version</code>
              <code className="ref-code">claude &ldquo;Say hello in one sentence&rdquo;</code>
            </div>
          </div>
        </div>
      </section>

      {/* Windows / WSL2 */}
      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">Windows / WSL2 Setup</h2>
        <div className="ref-steps">
          <div className="ref-step">
            <span className="ref-step-num">1</span>
            <div>
              <p className="ref-step-title">Enable WSL2</p>
              <code className="ref-code">wsl --install</code>
              <p className="ref-step-note">Run in PowerShell (admin). Restart when prompted. Set default: <code>wsl --set-default Ubuntu</code></p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">2</span>
            <div>
              <p className="ref-step-title">Install Node.js inside WSL</p>
              <code className="ref-code">curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -</code>
              <code className="ref-code">sudo apt-get install -y nodejs</code>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">3</span>
            <div>
              <p className="ref-step-title">Install Claude Code</p>
              <code className="ref-code">npm install -g @anthropic-ai/claude-code</code>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">4</span>
            <div>
              <p className="ref-step-title">Authenticate (inside WSL terminal)</p>
              <code className="ref-code">claude</code>
              <p className="ref-step-note">If browser does not open, copy the URL printed to terminal and paste it manually.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Linux (VPS) */}
      <section className="ref-section">
        <h2 className="ref-section-heading ref-amber">Linux / VPS Setup</h2>
        <div className="ref-steps">
          <div className="ref-step">
            <span className="ref-step-num">1</span>
            <div>
              <p className="ref-step-title">Install Node.js</p>
              <code className="ref-code">curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -</code>
              <code className="ref-code">sudo apt-get install -y nodejs</code>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">2</span>
            <div>
              <p className="ref-step-title">Install Claude Code</p>
              <code className="ref-code">npm install -g @anthropic-ai/claude-code</code>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">3</span>
            <div>
              <p className="ref-step-title">Auth via API key (headless)</p>
              <code className="ref-code">export ANTHROPIC_API_KEY=sk-ant-...</code>
              <code className="ref-code">claude --print &ldquo;Hello&rdquo;</code>
              <p className="ref-step-note">For headless servers, use <code>ANTHROPIC_API_KEY</code> instead of browser OAuth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">Common Fixes</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Problem</span>
            <span>Fix</span>
          </div>
          <div className="ref-row">
            <span><code>command not found: claude</code></span>
            <span>Run <code>npm install -g @anthropic-ai/claude-code</code> again; check <code>npm bin -g</code> is in PATH</span>
          </div>
          <div className="ref-row">
            <span><code>401 Unauthorized</code></span>
            <span>Run <code>claude</code> to re-authenticate, or set <code>ANTHROPIC_API_KEY</code> in your shell</span>
          </div>
          <div className="ref-row">
            <span>Browser does not open on WSL</span>
            <span>Copy the URL printed in terminal; paste into Windows browser manually</span>
          </div>
          <div className="ref-row">
            <span><code>EACCES permission denied</code></span>
            <span>Fix npm permissions: <code>npm config set prefix ~/.npm-global</code> then add to PATH</span>
          </div>
          <div className="ref-row">
            <span>Slow first response</span>
            <span>Normal — model connection warm-up. Subsequent requests are faster.</span>
          </div>
        </div>
      </section>

      {/* First project */}
      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">First Project Checklist</h2>
        <div className="ref-checklist">
          <label><input type="checkbox" readOnly /> Create a project folder: <code>mkdir my-project && cd my-project</code></label>
          <label><input type="checkbox" readOnly /> Initialize git: <code>git init</code></label>
          <label><input type="checkbox" readOnly /> Create <code>CLAUDE.md</code> in the project root (see Quick Reference card)</label>
          <label><input type="checkbox" readOnly /> Open Claude Code: <code>claude</code></label>
          <label><input type="checkbox" readOnly /> Ask Claude to describe the project structure: <code>/help</code> to see commands</label>
          <label><input type="checkbox" readOnly /> Try plan mode for larger changes: type <code>shift+tab</code> twice</label>
        </div>
      </section>

    </div>
  );
}
