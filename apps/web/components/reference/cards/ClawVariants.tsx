export function ClawVariantsCard() {
  return (
    <div className="ref-card-body">

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">The Claw Ecosystem — At a Glance</h2>
        <div className="ref-variant-grid">
          <div className="ref-variant ref-teal-border">
            <span className="ref-variant-name">OpenClaw</span>
            <span className="ref-variant-tag ref-teal-bg-sm">Full</span>
            <p className="ref-variant-desc">Full self-hosted gateway. SSO, skill engine, YES gate, Logic Spine, memory system, heartbeat. For teams and production use cases.</p>
            <code className="ref-code-sm">npm i -g @openclaw/gateway</code>
          </div>
          <div className="ref-variant ref-purple-border">
            <span className="ref-variant-name">ZeroClaw</span>
            <span className="ref-variant-tag ref-purple-bg-sm">Fast</span>
            <p className="ref-variant-desc">Lightweight gateway. No SSO, no skill engine, global rate limit only. For solo developers who want OpenClaw&apos;s routing without the overhead.</p>
            <code className="ref-code-sm">npm i -g @openclaw/zero</code>
          </div>
          <div className="ref-variant ref-amber-border">
            <span className="ref-variant-name">NanoClaw</span>
            <span className="ref-variant-tag ref-amber-bg-sm">Edge</span>
            <p className="ref-variant-desc">ARM-optimized build for Raspberry Pi and low-power edge hardware. Minimal memory footprint, offline-first. No cloud dependency.</p>
            <code className="ref-code-sm">npm i -g @openclaw/nano</code>
          </div>
          <div className="ref-variant ref-blue-border">
            <span className="ref-variant-name">AutoClaw</span>
            <span className="ref-variant-tag ref-blue-bg-sm">CI/CD</span>
            <p className="ref-variant-desc">Headless, config-driven. No interactive prompts. Built for GitHub Actions, Jenkins, and automated pipelines. API-key auth only.</p>
            <code className="ref-code-sm">npm i -g @openclaw/auto</code>
          </div>
          <div className="ref-variant ref-red-border">
            <span className="ref-variant-name">NemoClaw</span>
            <span className="ref-variant-tag ref-red-bg-sm">GPU</span>
            <p className="ref-variant-desc">Routes to NVIDIA NIM (local GPU inference). For organizations running models on-premises. Requires NVIDIA hardware and NIM deployment.</p>
            <code className="ref-code-sm">npm i -g @openclaw/nemo</code>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">Decision Tree</h2>
        <div className="ref-decision-tree">
          <div className="ref-decision-node ref-root">
            <span>Who is using this?</span>
          </div>
          <div className="ref-decision-branches">
            <div className="ref-decision-branch">
              <div className="ref-decision-label">Solo developer</div>
              <div className="ref-decision-sub">
                <div className="ref-decision-node ref-sub">Fast dev loop?</div>
                <div className="ref-decision-leaf ref-purple">Yes → <strong>ZeroClaw</strong></div>
                <div className="ref-decision-leaf ref-teal">Need skills/memory? → <strong>OpenClaw</strong></div>
              </div>
            </div>
            <div className="ref-decision-branch">
              <div className="ref-decision-label">Team / org</div>
              <div className="ref-decision-sub">
                <div className="ref-decision-leaf ref-teal">Always → <strong>OpenClaw</strong></div>
              </div>
            </div>
            <div className="ref-decision-branch">
              <div className="ref-decision-label">CI pipeline</div>
              <div className="ref-decision-sub">
                <div className="ref-decision-leaf ref-blue">Always → <strong>AutoClaw</strong></div>
              </div>
            </div>
            <div className="ref-decision-branch">
              <div className="ref-decision-label">Edge / Pi</div>
              <div className="ref-decision-sub">
                <div className="ref-decision-leaf ref-amber">Always → <strong>NanoClaw</strong></div>
              </div>
            </div>
            <div className="ref-decision-branch">
              <div className="ref-decision-label">GPU on-prem</div>
              <div className="ref-decision-sub">
                <div className="ref-decision-leaf ref-red">Always → <strong>NemoClaw</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-amber">Feature Comparison</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Feature</span>
            <span>OpenClaw</span>
            <span>ZeroClaw</span>
            <span>NanoClaw</span>
            <span>AutoClaw</span>
          </div>
          <div className="ref-row">
            <span>Model routing</span>
            <span>✓</span><span>✓</span><span>✗</span><span>✓</span>
          </div>
          <div className="ref-row">
            <span>Skill engine</span>
            <span>✓</span><span>✗</span><span>✗</span><span>✓</span>
          </div>
          <div className="ref-row">
            <span>YES gate</span>
            <span>✓</span><span>✗</span><span>✗</span><span>✗</span>
          </div>
          <div className="ref-row">
            <span>Logic Spine</span>
            <span>✓</span><span>Partial</span><span>✗</span><span>✓</span>
          </div>
          <div className="ref-row">
            <span>.learnings/ memory</span>
            <span>✓</span><span>✗</span><span>✗</span><span>✗</span>
          </div>
          <div className="ref-row">
            <span>Heartbeat / CRON</span>
            <span>✓</span><span>✗</span><span>✗</span><span>✓</span>
          </div>
          <div className="ref-row">
            <span>SSO / multi-user</span>
            <span>✓</span><span>✗</span><span>✗</span><span>✗</span>
          </div>
          <div className="ref-row">
            <span>ARM / offline</span>
            <span>✗</span><span>✗</span><span>✓</span><span>✗</span>
          </div>
          <div className="ref-row">
            <span>GPU (NIM)</span>
            <span>✗</span><span>✗</span><span>✗</span><span>NemoClaw only</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">Migration Signals</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>You are on…</span>
            <span>Migrate to…</span>
            <span>Signal</span>
          </div>
          <div className="ref-row">
            <span>ZeroClaw</span>
            <span>OpenClaw</span>
            <span>You need skills, memory, YES gate, or multi-user auth</span>
          </div>
          <div className="ref-row">
            <span>OpenClaw</span>
            <span>NemoClaw</span>
            <span>You have NVIDIA hardware and want local inference</span>
          </div>
          <div className="ref-row">
            <span>OpenClaw</span>
            <span>AutoClaw (add)</span>
            <span>You need headless CI pipelines alongside interactive use</span>
          </div>
          <div className="ref-row">
            <span>NanoClaw</span>
            <span>OpenClaw</span>
            <span>You need skills, memory, or more than 2 concurrent sessions</span>
          </div>
        </div>
      </section>

    </div>
  );
}
