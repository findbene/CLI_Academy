interface DiffBlockProps {
  before: string;
  after: string;
  language?: string;
  caption?: string;
}

export function DiffBlock({ before, after, language: _language = "bash", caption }: DiffBlockProps) {
  const beforeLines = before.split("\n");
  const afterLines = after.split("\n");

  return (
    <figure className="my-8 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] overflow-hidden">
      {caption ? (
        <div className="px-4 py-2 bg-[var(--color-bg-panel-subtle)] border-b border-[var(--color-border-subtle)] text-xs text-[var(--color-fg-muted)]">
          {caption}
        </div>
      ) : null}
      <div className="grid lg:grid-cols-2">
        <div className="bg-[#1e1e1e] border-r border-[#333]">
          <div className="px-3 py-2 bg-[#2d2d2d] border-b border-[#333] text-xs font-mono text-[#a3a3a3]">
            Before
          </div>
          <pre className="p-4 overflow-x-auto text-sm">
            {beforeLines.map((line, i) => (
              <div key={i} className="text-[#f87171] font-mono">
                {line ? `- ${line}` : ""}
              </div>
            ))}
          </pre>
        </div>
        <div className="bg-[#1e1e1e]">
          <div className="px-3 py-2 bg-[#2d2d2d] border-b border-[#333] text-xs font-mono text-[#a3a3a3]">
            After
          </div>
          <pre className="p-4 overflow-x-auto text-sm">
            {afterLines.map((line, i) => (
              <div key={i} className="text-[#4ade80] font-mono">
                {line ? `+ ${line}` : ""}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </figure>
  );
}
