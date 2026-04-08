import { MCPS } from "@/lib/data/resources";
import { ResourceGrid, CategoryTabs } from "@/components/resources/ResourceComponents";

export const metadata = { title: "MCP Servers | Resource Hub — CLI Academy" };

export default function McpsPage() {
  return (
    <div className="page-shell">
      <CategoryTabs activeCategory="mcps" />
      <ResourceGrid
        items={MCPS}
        category="mcps"
        title="MCP Server Directory"
        description="Model Context Protocol servers that give Claude real-world superpowers. Connect to databases, APIs, browsers, and services — extending what your AI agent can actually do."
      />
    </div>
  );
}
