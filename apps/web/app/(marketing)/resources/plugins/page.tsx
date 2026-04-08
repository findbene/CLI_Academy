import { PLUGINS } from "@/lib/data/resources";
import { ResourceGrid, CategoryTabs } from "@/components/resources/ResourceComponents";

export const metadata = { title: "Plugins & Extensions | Resource Hub — CLI Academy" };

export default function PluginsPage() {
  return (
    <div className="page-shell">
      <CategoryTabs activeCategory="plugins" />
      <ResourceGrid
        items={PLUGINS}
        category="plugins"
        title="Plugins & Extensions"
        description="VS Code extensions, editor plugins, and configuration packs that streamline your AI-assisted development workflow. One-click installs for instant productivity."
      />
    </div>
  );
}
