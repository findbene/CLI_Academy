import Link from "next/link";
import { FlagshipCourseCard } from "@/components/academy/FlagshipCourseCard";
import { AssetVaultCard } from "@/components/assets/AssetVaultCard";
import { getAllLocalAssets } from "@/lib/assets";
import { FAST_PATH_WEEKS, SETUP_ACADEMY_FLAGSHIP_COURSES } from "@/lib/academy";

export default function SetupAcademyPage() {
  const setupAssets = getAllLocalAssets().filter((asset) =>
    [
      "week-1-local-starter-assistant-checklist",
      "setup-academy-install-troubleshooting-playbook",
      "runtime-lab-decision-matrix",
    ].includes(asset.slug),
  );
  const weekOne = FAST_PATH_WEEKS[0];

  return (
    <main className="page-shell py-12">
      <section className="panel p-6">
        <div className="eyebrow">Setup Academy</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Install, authenticate, troubleshoot, test, and evaluate before you chase autonomy</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--color-fg-muted)]">
          This is the product moat. Learners do not just watch setup videos. They bring up the tools on real machines,
          recover from real failures, and leave with working builder assets they can keep using.
        </p>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <article className="panel p-6">
          <div className="eyebrow">Week 1 focus</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">{weekOne.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">{weekOne.focus}</p>
          <div className="mt-4 grid gap-2 text-sm">
            <div>
              <span className="font-semibold text-[var(--color-fg-default)]">Artifact:</span> {weekOne.artifact}
            </div>
            <div>
              <span className="font-semibold text-[var(--color-fg-default)]">Unlock:</span> {weekOne.unlock}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={weekOne.liveHref} className="button-primary">
              Start Week 1
            </Link>
            <Link href="/asset-vault" className="button-secondary">
              Get the field manuals
            </Link>
          </div>
        </article>

        <article id="runtime-lab" className="panel p-6">
          <div className="eyebrow">Runtime Lab seed</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Choose a runtime honestly</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
            The setup surface now carries the comparison layer too: local-only, Docker sandbox, remote host,
            OpenClaw, and variant/runtime decisions are framed around beginner fit, support maturity, and rollback clarity.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-fg-muted)]">
            <li>• Best-for guidance instead of hype</li>
            <li>• Honest maturity and support tiers</li>
            <li>• Security and sandbox posture called out early</li>
            <li>• A clear rule for when to stay local versus go remote</li>
          </ul>
        </article>
      </section>

      <section className="mt-8">
        <div>
          <div className="eyebrow">Flagship setup tracks</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">The academy shell now organizes the setup-first courses around real outcomes</h2>
        </div>
        <div className="mt-8 grid gap-4 xl:grid-cols-2">
          {SETUP_ACADEMY_FLAGSHIP_COURSES.map((course) => (
            <FlagshipCourseCard key={course.title} course={course} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div>
          <div className="eyebrow">Downloads that support setup</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Printable assets for when the browser should not be your only lifeline</h2>
        </div>
        <div className="mt-8 grid gap-4 xl:grid-cols-2">
          {setupAssets.map((asset) => (
            <AssetVaultCard key={asset.slug} asset={asset} />
          ))}
        </div>
      </section>
    </main>
  );
}
