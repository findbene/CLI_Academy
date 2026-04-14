export function CoworkSetupCard() {
  return (
    <div className="ref-card-body">

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">What Claude Cowork Is</h2>
        <div className="ref-definition-grid">
          <div className="ref-definition">
            <span className="ref-def-term">Claude Cowork</span>
            <span className="ref-def-desc">Claude&apos;s document and task collaboration mode. Instead of a terminal, you work in a shared workspace — documents, spreadsheets, emails, and tasks — with Claude as a persistent co-author.</span>
          </div>
          <div className="ref-definition">
            <span className="ref-def-term">Session brief</span>
            <span className="ref-def-desc">A short prompt you write at the start of each Cowork session to tell Claude what you need, what good looks like, and what to avoid. Replaces lengthy re-orientation every turn.</span>
          </div>
          <div className="ref-definition">
            <span className="ref-def-term">Artifact</span>
            <span className="ref-def-desc">A document, table, or structured output Claude produces in the shared workspace. You can edit it directly; Claude sees your edits and continues from them.</span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">Session Brief Template</h2>
        <div className="ref-code-block">
          <pre>{`## What I need
Write a 500-word blog post about [topic].
Tone: direct, no fluff, technical audience.

## What good looks like
- A concrete opening hook (no "In today's fast-paced world")
- 3 sections with H2 headings
- One code example if relevant
- A closing call to action

## What to avoid
- Bullet-point everything
- Passive voice
- Marketing filler phrases
- Starting with "Great question!"

## Constraints
Word count: 450–550. Deadline context: this is for tomorrow's newsletter.`}</pre>
        </div>
        <p className="ref-note mt-2">Copy this template. Fill in the blanks. Paste at the start of every Cowork session.</p>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-amber">Setup Steps</h2>
        <div className="ref-steps">
          <div className="ref-step">
            <span className="ref-step-num">1</span>
            <div>
              <p className="ref-step-title">Open claude.ai and sign in</p>
              <p className="ref-step-note">Cowork is part of Claude.ai — no separate install. Use a Pro or Team plan for access to all tools.</p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">2</span>
            <div>
              <p className="ref-step-title">Start a new Project or open an existing one</p>
              <p className="ref-step-note">Projects give Claude persistent context about your work. Add project instructions to set Claude&apos;s default behavior for that project.</p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">3</span>
            <div>
              <p className="ref-step-title">Write your session brief</p>
              <p className="ref-step-note">Paste the brief at the top of your first message. Be specific about format, length, tone, and what to avoid.</p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">4</span>
            <div>
              <p className="ref-step-title">Upload relevant documents if needed</p>
              <p className="ref-step-note">Drag files directly into the chat. Claude can read PDFs, Word docs, spreadsheets, and plain text.</p>
            </div>
          </div>
          <div className="ref-step">
            <span className="ref-step-num">5</span>
            <div>
              <p className="ref-step-title">Iterate with direct edits</p>
              <p className="ref-step-note">Claude produces an artifact in the side panel. Edit it directly. Claude sees your changes and can continue from them in the next turn.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-teal">High-Value Use Cases</h2>
        <div className="ref-table">
          <div className="ref-row ref-row-header">
            <span>Task type</span>
            <span>How to phrase it</span>
          </div>
          <div className="ref-row">
            <span>Long-form writing</span>
            <span><em>&ldquo;Draft a proposal doc. Structure: problem, proposed solution, success metrics, timeline. 800 words.&rdquo;</em></span>
          </div>
          <div className="ref-row">
            <span>Email drafting</span>
            <span><em>&ldquo;Draft a follow-up email after a missed deadline. Tone: firm but not passive-aggressive. Under 150 words.&rdquo;</em></span>
          </div>
          <div className="ref-row">
            <span>Spreadsheet formula</span>
            <span><em>&ldquo;Write an Excel formula that finds the max value in column B where column A contains &apos;Q1&apos;.&rdquo;</em></span>
          </div>
          <div className="ref-row">
            <span>Document cleanup</span>
            <span><em>&ldquo;Here&apos;s a raw transcript. Turn it into clean meeting notes: attendees, decisions, next steps with owners.&rdquo;</em></span>
          </div>
          <div className="ref-row">
            <span>Research summary</span>
            <span><em>&ldquo;I&apos;ve attached three PDFs. Summarize the key arguments from each and identify where they agree and disagree.&rdquo;</em></span>
          </div>
        </div>
      </section>

      <section className="ref-section">
        <h2 className="ref-section-heading ref-purple">Prompting Tips</h2>
        <div className="ref-checklist">
          <label><input type="checkbox" readOnly /> Always write a session brief before the first substantive message</label>
          <label><input type="checkbox" readOnly /> Specify output format explicitly (bullet list vs prose vs table)</label>
          <label><input type="checkbox" readOnly /> Give word/character counts for length-sensitive work</label>
          <label><input type="checkbox" readOnly /> Say what NOT to do — Claude follows negative constraints well</label>
          <label><input type="checkbox" readOnly /> Use &ldquo;Continue from where I left off&rdquo; after editing an artifact</label>
          <label><input type="checkbox" readOnly /> Ask Claude to explain its choices if the output is surprising</label>
          <label><input type="checkbox" readOnly /> Use Project instructions to persist your style guide across sessions</label>
        </div>
      </section>

    </div>
  );
}
