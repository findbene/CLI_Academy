import { AGENTS } from "@/lib/data/resources";
import { ResourceGrid, CategoryTabs } from "@/components/resources/ResourceComponents";

export const metadata = { title: "Agents | Resource Hub — CLI Academy" };

export default function AgentsPage() {
  return (
    <div className="page-shell">
      <CategoryTabs activeCategory="agents" />
      <ResourceGrid
        items={AGENTS}
        category="agents"
        title="Agent Marketplace"
        description="Pre-built AI agent definitions ready to deploy. From code reviewers to security auditors to full-stack developers — assemble your dream team of specialized agents."
      />
    </div>
  );
}
