const TIERS = [
  {
    id: "core",
    label: "CORE",
    description: "The baseline. Everything else builds on top of these.",
    colorClass:
      "border-[var(--color-accent-primary)]/40 bg-[var(--color-accent-subtle)]",
    labelClass: "text-[var(--color-accent-primary)]",
    tools: [
      "Claude Code CLI",
      "CLAUDE.md",
      "Tool Permissions",
      "Local Context",
    ],
  },
  {
    id: "elective",
    label: "ELECTIVE",
    description: "High-leverage add-ons. Choose based on your workflow.",
    colorClass:
      "border-blue-500/30 bg-blue-950/30",
    labelClass: "text-blue-400",
    tools: [
      "Cowork Sessions",
      "MCP Servers",
      "Cross-Surface",
      "Research Agent",
    ],
  },
  {
    id: "advanced",
    label: "ADVANCED",
    description:
      "For developers who want to build, deploy, and scale agent systems.",
    colorClass:
      "border-[var(--color-accent-warning)]/30 bg-[rgba(201,134,18,0.08)]",
    labelClass: "text-[var(--color-accent-warning)]",
    tools: [
      "Custom Runtimes",
      "Multi-Agent",
      "Production Deploy",
      "Safety + Observability",
    ],
  },
  {
    id: "career",
    label: "CAREER",
    description:
      "Turn your learning into provable professional credentials.",
    colorClass:
      "border-[var(--color-accent-primary)]/20 bg-[rgba(22,176,168,0.06)]",
    labelClass: "text-[var(--color-accent-primary-hover)]",
    tools: [
      "Portfolio Capstone",
      "Job Brief",
      "Alumni Missions",
    ],
  },
] as const;

export function ClawEcosystemTierMap() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-display font-semibold tracking-tight text-[#F0F4F8] md:text-4xl">
          The Claw Ecosystem
        </h2>
        <p className="mt-3 text-lg text-gray-400">
          Every skill you build in the academy maps to one of four tiers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`rounded-2xl border p-6 ${tier.colorClass}`}
          >
            <div
              className={`mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${tier.labelClass}`}
            >
              {tier.label}
            </div>
            <p className="mb-5 text-sm leading-6 text-gray-400">
              {tier.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {tier.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#F0F4F8]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
