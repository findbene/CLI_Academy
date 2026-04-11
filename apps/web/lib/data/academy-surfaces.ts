export interface AcademySurface {
  href: string;
  label: string;
  shortLabel?: string;
  description: string;
  signedInOnly?: boolean;
  marketing?: boolean;
  app?: boolean;
}

export const ACADEMY_SURFACES: AcademySurface[] = [
  {
    href: "/learn",
    label: "Learn",
    description: "Structured academy tracks, deep dives, setup tracks, and capstones.",
    marketing: true,
    app: true,
  },
  {
    href: "/setup-academy",
    label: "Setup Academy",
    description: "Install, configure, troubleshoot, and validate your builder stack safely.",
    marketing: true,
    app: true,
  },
  {
    href: "/prompt-context-studio",
    label: "Prompt & Context Studio",
    shortLabel: "Prompt Studio",
    description: "Prompting, context engineering, harnesses, and reusable prompt systems.",
    marketing: true,
    app: true,
  },
  {
    href: "/projects",
    label: "Projects",
    description: "Guided end-to-end builds, side quests, and portfolio-ready project work.",
    marketing: true,
    app: true,
  },
  {
    href: "/runtime-lab",
    label: "Runtime Lab",
    description: "Compare OpenClaw, Hermes, and Claw-verse runtimes with honest support notes.",
    marketing: true,
    app: true,
  },
  {
    href: "/workflow-studio",
    label: "Workflow Studio",
    description: "Design and inspect agent workflows with reusable node-based patterns.",
    marketing: true,
    app: true,
  },
  {
    href: "/live-labs",
    label: "Live Labs",
    description: "Resettable labs, terminal practice, and guided runtime exercises.",
    marketing: true,
    app: true,
  },
  {
    href: "/asset-vault",
    label: "Asset Vault",
    description: "Download skills, hooks, templates, starter repos, and operational field kits.",
    marketing: true,
    app: true,
  },
  {
    href: "/capstone-studio",
    label: "Capstone Studio",
    description: "Mini-capstones and portfolio-grade showcase builds.",
    marketing: true,
    app: true,
  },
  {
    href: "/docs",
    label: "Docs",
    description: "Field manuals, setup guides, and print-friendly operational references.",
    marketing: true,
    app: true,
  },
];

export const MARKETING_SURFACES = ACADEMY_SURFACES.filter((surface) => surface.marketing);
export const APP_SURFACES = ACADEMY_SURFACES.filter((surface) => surface.app);
