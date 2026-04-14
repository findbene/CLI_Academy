export function MCPsReferenceCard() {
  return (
    <div className="ref-card-body">

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">What MCP Is</h2>
        <div className="ref-definition-grid">
          <div className="ref-definition">
            <span className="ref-def-term">Model Context Protocol</span>
            <span className="ref-def-desc">An open standard for connecting AI models to external tools, data sources, and services. Replaces ad-hoc tool integrations with a structured, transport-agnostic protocol.</span>
          </div>
          <div className="ref-definition">
            <span className="ref-def-term">MCP Server</span>
            <span className="ref-def-desc">A process that exposes tools via the MCP protocol. Claude Code connects to it and can call the tools it advertises. Servers can be local processes or remote HTTP services.</span>
          </div>
          <div className="ref-definition">
            <span className="ref-def-term">Transport</span>
            <span className="ref-def-desc"><strong>stdio</strong> — server runs as a child process, communicates via stdin/stdout. <strong>SSE</strong> — server is a remote HTTP endpoint using Server-Sent Events.</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">Config Format (~/.claude/settings.json)</h2>
        <div className="ref-code-block">
          <pre>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem",
               "/Users/you/projects"],
      "type": "stdio"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "type": "stdio",
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    },
    "remote-db": {
      "url": "https://mcp.example.com/sse",
      "type": "sse",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}`}</pre>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-amber">Official MCP Servers (Anthropic)</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Server</span>
            <span>Install command</span>
            <span>Key tools</span>
          </div>
          <div className="ref-row">
            <code>filesystem</code>
            <code>npx @modelcontextprotocol/server-filesystem &lt;path&gt;</code>
            <span>read_file, write_file, list_directory, create_directory, move_file, search_files</span>
          </div>
          <div className="ref-row">
            <code>github</code>
            <code>npx @modelcontextprotocol/server-github</code>
            <span>create_issue, create_pull_request, get_file_contents, search_code, list_commits</span>
          </div>
          <div className="ref-row">
            <code>memory</code>
            <code>npx @modelcontextprotocol/server-memory</code>
            <span>create_entities, create_relations, search_nodes, open_nodes (knowledge graph)</span>
          </div>
          <div className="ref-row">
            <code>brave-search</code>
            <code>npx @modelcontextprotocol/server-brave-search</code>
            <span>brave_web_search, brave_local_search (requires Brave Search API key)</span>
          </div>
          <div className="ref-row">
            <code>puppeteer</code>
            <code>npx @modelcontextprotocol/server-puppeteer</code>
            <span>puppeteer_navigate, puppeteer_screenshot, puppeteer_click, puppeteer_fill</span>
          </div>
          <div className="ref-row">
            <code>postgres</code>
            <code>npx @modelcontextprotocol/server-postgres &lt;conn-string&gt;</code>
            <span>query (read-only SQL), list_tables, describe_table</span>
          </div>
          <div className="ref-row">
            <code>sqlite</code>
            <code>npx @modelcontextprotocol/server-sqlite &lt;db-file&gt;</code>
            <span>read_query, write_query, create_table, list_tables, describe_table</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">Session Commands</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Command</span>
            <span>Action</span>
          </div>
          <div className="ref-row">
            <code>/mcp</code>
            <span>List all connected servers, their status (connected / error), and available tools</span>
          </div>
          <div className="ref-row">
            <code>/mcp add name command</code>
            <span>Add a server for the current session without editing settings.json</span>
          </div>
          <div className="ref-row">
            <code>/mcp remove name</code>
            <span>Disconnect a server for the current session</span>
          </div>
          <div className="ref-row">
            <code>/permissions</code>
            <span>View and change tool permission settings per server</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">Troubleshooting</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Symptom</span>
            <span>Fix</span>
          </div>
          <div className="ref-row">
            <span>Server shows &ldquo;error&rdquo; in /mcp</span>
            <span>Check the command runs standalone: <code>npx @modelcontextprotocol/server-filesystem /path</code></span>
          </div>
          <div className="ref-row">
            <span>Tools not appearing</span>
            <span>Restart Claude Code — MCP servers init at session start, not dynamically</span>
          </div>
          <div className="ref-row">
            <span>ENOENT / path error</span>
            <span>The path in the <code>args</code> array must exist. Use absolute paths.</span>
          </div>
          <div className="ref-row">
            <span>Auth errors (GitHub, Brave)</span>
            <span>Check <code>env</code> block in settings.json — token must be valid and unexpired</span>
          </div>
        </div>
      </section>

    </div>
  );
}
