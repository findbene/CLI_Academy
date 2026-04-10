import AgentLounge from "@/components/lounge/AgentLounge";
import { getPublishedLoungeArticles } from "@/lib/lounge";

export const metadata = {
  title: "Agent Lounge | Relax and Learn",
  description:
    "A cozy digital coffee shop for AI learners. Take a breath, grab a coffee, and explore the future of agents at your own pace.",
};

export default async function LoungePage() {
  const articles = await getPublishedLoungeArticles();

  const items = articles.map((article) => {
    let fallbackImage = "/assets/placeholders/lounge-article.svg";
    const category = article.tags?.[0] || "Agentic Articles";

    if (category === "Visual Explainers" || article.type === "video") {
      fallbackImage = "/assets/placeholders/lounge-video.svg";
    } else if (category === "Tool Spotlights") {
      fallbackImage = "/assets/placeholders/lounge-tool.svg";
    }

    return {
      id: article.slug,
      title: article.title,
      teaser: article.summary || article.description || "Click to read more...",
      readTime: `${Math.max(1, Math.ceil(article.body.length / 1000))} min read`,
      category,
      heroImage: article.image || fallbackImage,
      author: article.author || "CLI Academy",
      href: `/lounge/${article.slug}`,
    };
  });

  return (
    <div
      className="relative min-h-screen overflow-x-clip selection:bg-[var(--color-accent-subtle-strong)] selection:text-[var(--color-fg-default)]"
      style={{
        background:
          "linear-gradient(180deg, var(--color-bg-page) 0%, var(--color-bg-lesson) 38%, var(--color-bg-page) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(14, 165, 165, 0.15), transparent 32%), radial-gradient(circle at 84% 18%, rgba(250, 204, 21, 0.10), transparent 18%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20, 32, 58, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 32, 58, 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(180deg, white 0%, white 42%, transparent 78%)",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-[rgba(22,176,168,0.12)] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-12 h-64 w-64 rounded-full bg-[rgba(201,134,18,0.1)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-bg-page)] to-transparent" />

      <div className="relative z-10 w-full">
        <AgentLounge items={items} />
      </div>
    </div>
  );
}
