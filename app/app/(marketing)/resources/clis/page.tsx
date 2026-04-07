import { CLIS } from "@/lib/data/resources";
import { ResourceGrid, CategoryTabs } from "@/components/resources/ResourceComponents";

export const metadata = { title: "CLI Tools | Resource Hub — CLI Academy" };

export default function ClisPage() {
  return (
    <div className="page-shell">
      <CategoryTabs activeCategory="clis" />
      <ResourceGrid
        items={CLIS}
        category="clis"
        title="CLI Tools & Utilities"
        description="Command-line tools that every Claude Code developer needs. From AI-powered terminals to deployment utilities — master the tools that power modern development."
      />
    </div>
  );
}
