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
    <div className="relative min-h-screen bg-[#0F1117] selection:bg-[#00D4FF]/30 selection:text-white">
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#00D4FF]/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-[#FFB300]/5 blur-[150px]" />

      <div className="relative z-10 w-full">
        <AgentLounge items={items} />
      </div>
    </div>
  );
}