export function OpenClawSetupCard() {
  return (
    <div className="ref-card-body">

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">What OpenClaw Is</h2>
        <div className="ref-definition-grid">
          <div className="ref-definition">
            <span className="ref-def-term">OpenClaw</span>
            <span className="ref-def-desc">A self-hosted operational layer that sits in front of the Anthropic API. Handles auth, session management, rate limiting, skill execution, and security enforcement inside your network boundary.</span>
          </div>
          <div className="ref-definition">
            <span className="ref-def-term">Gateway</span>
            <span className="ref-def-desc">The local HTTP server OpenClaw runs. Claude Code (and other Claw clients) send requests to the gateway instead of directly to api.anthropic.com.</span>
          </div>
          <div className="ref-definition">
            <span className="ref-def-term">Skill</span>
            <span className="ref-def-desc">A reusable automation defined in a <code>SKILL.md</code> file. The gateway routes trigger-matched requests to the skill and executes it with scoped tool permissions.</span>
          </div>
          <div className="ref-definition">
            <span className="ref-def-term">Logic Spine</span>
            <span className="ref-def-desc">The pre-permission validation layer. Validates every tool call against declared schemas before the YES gate fires. Blocks path traversal, env reads, and injection patterns.</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">macOS Install</h2>
        <div className="ref-steps">
          <div className="ref-step">
            <span className="ref-step-num">1</span>
            <div>
              <p className="ref-step-title">Install prerequisites</p>
              <code className="ref-code">brew install node git</code>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">2</span>
            <div>
              <p className="ref-step-title">Install OpenClaw</p>
              <code className="ref-code">npm install -g @openclaw/gateway</code>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">3</span>
            <div>
              <p className="ref-step-title">Initialize the gateway</p>
              <code className="ref-code">openclaw init</code>
              <p className="ref-step-note">Creates <code>~/.openclaw/config.yaml</code> and the skills directory. Follow the prompts to enter your Anthropic API key.</p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">4</span>
            <div>
              <p className="ref-step-title">Start the gateway</p>
              <code className="ref-code">openclaw start</code>
              <p className="ref-step-note">Gateway starts on <code>http://localhost:8080</code> by default.</p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">5</span>
            <div>
              <p className="ref-step-title">Point Claude Code at the gateway</p>
              <code className="ref-code">export ANTHROPIC_BASE_URL=http://localhost:8080</code>
              <p className="ref-step-note">Add to your shell profile (<code>~/.zshrc</code> or <code>~/.bashrc</code>) to persist.</p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">6</span>
            <div>
              <p className="ref-step-title">Verify</p>
              <code className="ref-code">openclaw status</code>
              <code className="ref-code">claude &ldquo;What model am I talking to?&rdquo;</code>
            </div>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-amber">Windows / WSL2 Install</h2>
        <div className="ref-steps">
          <div className="ref-step">
            <span className="ref-step-num">1</span>
            <div>
              <p className="ref-step-title">Inside WSL2 — install Node + OpenClaw</p>
              <code className="ref-code">npm install -g @openclaw/gateway</code>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">2</span>
            <div>
              <p className="ref-step-title">Initialize and start</p>
              <code className="ref-code">openclaw init && openclaw start</code>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">3</span>
            <div>
              <p className="ref-step-title">Expose to Windows processes (optional)</p>
              <p className="ref-step-note">In Windows, use <code>localhost</code> — WSL2 proxies ports automatically in Windows 11. In older WSL2, use the WSL IP: <code>$(ip route show | grep default | awk &apos;{"{"}print $3{"}"}&apos;)</code></p>
            </div>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">VPS / Always-On Install</h2>
        <div className="ref-steps">
          <div className="ref-step">
            <span className="ref-step-num">1</span>
            <div>
              <p className="ref-step-title">Install on the VPS</p>
              <code className="ref-code">npm install -g @openclaw/gateway && openclaw init</code>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">2</span>
            <div>
              <p className="ref-step-title">Run as a systemd service</p>
              <code className="ref-code">openclaw service install && systemctl enable --now openclaw</code>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">3</span>
            <div>
              <p className="ref-step-title">Connect remotely</p>
              <code className="ref-code">export ANTHROPIC_BASE_URL=http://your-vps:8080</code>
              <p className="ref-step-note">Secure with a reverse proxy (nginx + TLS) before exposing to the internet.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">Key Config Locations</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Path</span>
            <span>Purpose</span>
          </div>
          <div className="ref-row">
            <code>~/.openclaw/config.yaml</code>
            <span>Main config — model routing, auth, port, log level</span>
          </div>
          <div className="ref-row">
            <code>~/.openclaw/skills/</code>
            <span>SKILL.md files for your automations</span>
          </div>
          <div className="ref-row">
            <code>~/.openclaw/.learnings/</code>
            <span>Persistent memory files (corrections.md, preferences.md, context.md)</span>
          </div>
          <div className="ref-row">
            <code>~/.openclaw/logs/</code>
            <span>Gateway access logs and tool call audit trail</span>
          </div>
        </div>
      </section>

    </div>
  );
}
