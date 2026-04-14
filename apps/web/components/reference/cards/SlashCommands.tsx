export function SlashCommandsCard() {
  return (
    <div className="ref-card-body">

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">Session Commands</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Command</span>
            <span>What it does</span>
          </div>
          <div className="ref-row">
            <code>/help</code>
            <span>Show all available slash commands and keyboard shortcuts</span>
          </div>
          <div className="ref-row">
            <code>/clear</code>
            <span>Clear the conversation history and start a fresh context window</span>
          </div>
          <div className="ref-row">
            <code>/exit</code>
            <span>Exit the Claude Code session (also: Ctrl+C, Ctrl+D)</span>
          </div>
          <div className="ref-row">
            <code>/compact</code>
            <span>Summarize and compress the current conversation to reclaim context space</span>
          </div>
          <div className="ref-row">
            <code>/status</code>
            <span>Show current model, context usage, cost estimate, and session info</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">Model & Config</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Command</span>
            <span>What it does</span>
          </div>
          <div className="ref-row">
            <code>/model</code>
            <span>Show the current model. Use <code>/model opus</code> to switch to Claude Opus</span>
          </div>
          <div className="ref-row">
            <code>/model sonnet</code>
            <span>Switch to Claude Sonnet (faster, lower cost)</span>
          </div>
          <div className="ref-row">
            <code>/model haiku</code>
            <span>Switch to Claude Haiku (fastest, lowest cost)</span>
          </div>
          <div className="ref-row">
            <code>/fast</code>
            <span>Toggle fast mode (same model, faster streaming output)</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-amber">Memory & Context</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Command</span>
            <span>What it does</span>
          </div>
          <div className="ref-row">
            <code>/memory</code>
            <span>Open the memory management UI to view, add, or remove remembered facts</span>
          </div>
          <div className="ref-row">
            <code>/init</code>
            <span>Generate a <code>CLAUDE.md</code> for the current project by scanning the codebase</span>
          </div>
          <div className="ref-row">
            <code>/resume</code>
            <span>Resume the last conversation in the current directory</span>
          </div>
          <div className="ref-row">
            <code>/review</code>
            <span>Ask Claude to review recent changes and give a quality summary</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">MCP & Integrations</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Command</span>
            <span>What it does</span>
          </div>
          <div className="ref-row">
            <code>/mcp</code>
            <span>List all connected MCP servers, their status, and available tools</span>
          </div>
          <div className="ref-row">
            <code>/mcp add &lt;name&gt; &lt;cmd&gt;</code>
            <span>Add an MCP server by name and command string</span>
          </div>
          <div className="ref-row">
            <code>/mcp remove &lt;name&gt;</code>
            <span>Remove an MCP server from the current session</span>
          </div>
          <div className="ref-row">
            <code>/permissions</code>
            <span>View and modify tool permission settings (auto / prompt / deny)</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">Keyboard Shortcuts</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Key</span>
            <span>Action</span>
          </div>
          <div className="ref-row">
            <code>Shift + Tab (×2)</code>
            <span>Toggle plan mode — Claude plans before acting</span>
          </div>
          <div className="ref-row">
            <code>Escape</code>
            <span>Cancel the current in-progress tool call or response</span>
          </div>
          <div className="ref-row">
            <code>↑ / ↓</code>
            <span>Navigate conversation history</span>
          </div>
          <div className="ref-row">
            <code>Ctrl + C</code>
            <span>Interrupt and exit (or cancel current action)</span>
          </div>
          <div className="ref-row">
            <code>Ctrl + R</code>
            <span>Reverse search through prompt history</span>
          </div>
          <div className="ref-row">
            <code>!</code> (prefix)
            <span>Run a raw shell command: <code>! git status</code></span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-amber">Custom Commands (CLAUDE.md)</h2>
        <div className="ref-steps">
          <div className="ref-step">
            <span className="ref-step-num">→</span>
            <div>
              <p className="ref-step-title">Define custom slash commands</p>
              <p className="ref-step-note">Add to <code>.claude/commands/my-command.md</code>. Contents become the prompt when you type <code>/my-command</code>.</p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">→</span>
            <div>
              <p className="ref-step-title">Scope: project vs global</p>
              <p className="ref-step-note">Project commands live in <code>.claude/commands/</code>. Global commands live in <code>~/.claude/commands/</code> and work in every project.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
