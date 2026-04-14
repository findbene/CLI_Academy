export function SkillsReferenceCard() {
  return (
    <div className="ref-card-body">

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">SKILL.md — Full Frontmatter Schema</h2>
        <div className="ref-code-block">
          <pre>{`---
# Required
trigger: "When I say 'check orders', run this skill"
model: claude-sonnet-4-6          # model for this skill
description: "Pulls open Shopify orders and formats a summary"

# Tool permissions (auto | prompt | deny)
tools:
  read_file:   auto               # always allowed, no prompt
  write_file:  prompt             # must approve each write
  run_command: deny               # blocked entirely
  web_fetch:
    permission: auto
    allowed_domains:
      - "api.shopify.com"
  send_message: prompt

# Cost controls
cost_controls:
  max_tokens_per_run: 4000
  max_cost_usd: 0.50
  max_tool_calls: 20

# Validation (Logic Spine custom constraints)
validation:
  web_fetch:
    allowed_endpoints:
      - "/admin/api/*/orders.json"
    allowed_methods: [GET]
    denied_methods:  [POST, PUT, DELETE]

# Memory
memory:
  read: [preferences.md, context.md]
  write: corrections.md
---

# Skill instructions (plain English to Claude)

You are the Shopify order assistant. When triggered, fetch
open orders from the Shopify API and return a Markdown
table: Order ID | Customer | Total | Status | Date.

Never read or write any file outside of the designated
output path. Never access customer PII fields.`}</pre>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">Tool Permission Levels</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Level</span>
            <span>Behaviour</span>
            <span>Use when</span>
          </div>
          <div className="ref-row">
            <code>auto</code>
            <span>Executes without any prompt. Fast.</span>
            <span>Read operations, low-risk writes to known paths</span>
          </div>
          <div className="ref-row">
            <code>prompt</code>
            <span>YES gate fires — you approve each call.</span>
            <span>State-changing operations: writes, deletes, POSTs</span>
          </div>
          <div className="ref-row">
            <code>deny</code>
            <span>Tool is completely blocked. No override possible.</span>
            <span>Tools the skill should never use under any circumstances</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-amber">Logic Spine — Built-In Hard Blocks</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Pattern blocked</span>
            <span>Why</span>
          </div>
          <div className="ref-row">
            <code>../../etc/passwd</code> style paths
            <span>Path traversal — always blocked, cannot be overridden</span>
          </div>
          <div className="ref-row">
            <code>**/.env</code>, <code>**/.ssh/**</code>, <code>**/*.pem</code>
            <span>Credential file access — hard block</span>
          </div>
          <div className="ref-row">
            <code>POST to unrecognised URL</code>
            <span>Data exfiltration guard — triggers owner alert</span>
          </div>
          <div className="ref-row">
            <code>cmd | curl external.com</code>
            <span>Shell injection — <code>block_pipe_to_curl: true</code></span>
          </div>
          <div className="ref-row">
            <code>cat .env</code>, <code>env</code>, <code>printenv</code>
            <span>Env var read — <code>block_env_reads: true</code></span>
          </div>
          <div className="ref-row">
            <code>nmap</code>, <code>masscan</code>, <code>netcat</code>
            <span>Network tools — <code>block_net_tools: true</code></span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">YES Gate — Approval Messages</h2>
        <div className="ref-steps">
          <div className="ref-step">
            <span className="ref-step-num">→</span>
            <div>
              <p className="ref-step-title">Standard approval prompt</p>
              <div className="ref-code-block">
                <pre>{`Tool Call — Your Approval Needed

Skill: shopify-order-triage
Tool:  write_file
Path:  ~/Desktop/orders-summary.md
Size:  2.1 KB

Reply YES to allow. Reply ALWAYS to allow this path permanently.
Reply NO to block this call.`}</pre>
              </div>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">→</span>
            <div>
              <p className="ref-step-title">Soft block (Logic Spine)</p>
              <p className="ref-step-note">Triggered when a call is slightly outside declared scope but not clearly dangerous. Presents same approval prompt with a scope warning.</p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">→</span>
            <div>
              <p className="ref-step-title">Hard block (no prompt)</p>
              <p className="ref-step-note">Path traversal, env reads, and shell injection patterns are silently blocked. The skill receives a <code>TOOL_BLOCKED</code> response and must handle it gracefully.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">Heartbeat Triggers</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Trigger type</span>
            <span>Example</span>
          </div>
          <div className="ref-row">
            <span>Natural language</span>
            <code>trigger: &ldquo;When I say &apos;check orders&apos;&rdquo;</code>
          </div>
          <div className="ref-row">
            <span>CRON schedule</span>
            <code>trigger: cron: &ldquo;0 9 * * 1-5&rdquo;</code>
          </div>
          <div className="ref-row">
            <span>Webhook</span>
            <code>trigger: webhook: &ldquo;/hooks/shopify-order&rdquo;</code>
          </div>
          <div className="ref-row">
            <span>File change</span>
            <code>trigger: watch: &ldquo;~/inbox/*.md&rdquo;</code>
          </div>
          <div className="ref-row">
            <span>Message channel</span>
            <code>trigger: slack_mention: &ldquo;#orders-bot&rdquo;</code>
          </div>
        </div>
      </section>

    </div>
  );
}
