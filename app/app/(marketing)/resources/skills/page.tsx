import { SKILLS } from "@/lib/data/resources";
import { ResourceGrid, CategoryTabs } from "@/components/resources/ResourceComponents";

export const metadata = { title: "Skills | Resource Hub — CLI Academy" };

export default function SkillsPage() {
  return (
    <div className="page-shell">
      <CategoryTabs activeCategory="skills" />
      <ResourceGrid
        items={SKILLS}
        category="skills"
        title="Claude Skills Library"
        description="Downloadable skill definitions that supercharge Claude Code. Install any skill to unlock specialized workflows — from code review to prompt engineering to database optimization."
      />
    </div>
  );
}
