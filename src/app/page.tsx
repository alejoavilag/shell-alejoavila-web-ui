import { getArchitectureModel } from "@/application/use-cases/get-architecture-model";
import { getLandingContent } from "@/application/use-cases/get-landing-content";
import { LayeredStory } from "@/components/layered-story";
import { ScrollSpine } from "@/components/scroll-spine";
import { architectureRepository, landingContentRepository } from "@/infrastructure/container";

export default function Home() {
  const { hero, profile, expertise, layers, caseStudy, contact } = getLandingContent(
    landingContentRepository,
  );
  const model = getArchitectureModel(architectureRepository);

  return (
    <main className="relative">
      <div className="zone-light relative">
        <header className="relative z-10 mx-auto max-w-6xl snap-start px-4 lg:pl-20">
          <div className="hero-dissolve relative flex h-svh flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border-strong px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              <span className="pulse-ring size-1.5 rounded-full bg-accent" />
              {hero.badge}
            </p>
            <h1 className="mt-7 text-5xl font-semibold tracking-tight sm:text-7xl">
              {hero.name}
            </h1>
            <p className="mt-4 font-mono text-lg tracking-tight text-accent sm:text-xl">
              {hero.role}
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-muted">
              {hero.lead}
            </p>
            <ul className="mt-10 flex flex-wrap gap-2">
              {hero.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-xs text-text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href={hero.primary.href}
                className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-contrast shadow-[0_8px_30px_var(--glow)] transition-shadow hover:shadow-[0_12px_44px_var(--glow)]"
              >
                {hero.primary.label}
              </a>
              <a
                href={hero.secondary.href}
                className="rounded-lg border border-border-strong px-5 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
              >
                {hero.secondary.label}
              </a>
            </div>
          </div>
        </header>

        <section
          id="perfil"
          aria-labelledby="perfil-title"
          className="panel-pass relative z-10 mx-auto flex min-h-svh max-w-6xl snap-start flex-col justify-center px-4 py-20 lg:pl-20"
        >
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {profile.eyebrow}
          </p>
          <h2
            id="perfil-title"
            className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {profile.title}
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="max-w-prose space-y-6 text-lg leading-relaxed text-text-muted">
              {profile.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="text-text">{profile.closing}</p>
            </div>
            <dl className="h-fit divide-y divide-border rounded-2xl border border-border bg-surface">
              {profile.facts.map((fact) => (
                <div key={fact.label} className="px-5 py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-text-muted">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="dominio"
          aria-labelledby="dominio-title"
          className="panel-pass relative z-10 mx-auto flex min-h-svh max-w-6xl snap-start flex-col justify-center border-t border-border px-4 py-20 lg:pl-20"
        >
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {expertise.eyebrow}
          </p>
          <h2
            id="dominio-title"
            className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {expertise.title}
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="max-w-prose space-y-6 text-lg leading-relaxed text-text-muted">
              {expertise.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="text-text">{expertise.closing}</p>
            </div>
            <ul className="h-fit space-y-2.5 rounded-2xl border border-border bg-surface p-6">
              <li className="pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                {expertise.flowsLabel}
              </li>
              {expertise.flows.map((flow) => (
                <li key={flow} className="flex gap-3 text-text-muted">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="leading-relaxed">{flow}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section id="stack" className="relative">
        <ScrollSpine />
        <LayeredStory sections={layers} model={model} />
      </section>

      <section
        id="caso"
        aria-labelledby="caso-title"
        className="panel-pass relative z-10 mx-auto flex min-h-svh max-w-6xl snap-start flex-col justify-center px-4 py-20 lg:pl-20"
      >
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          <span aria-hidden className="h-px w-8 bg-accent" />
          {caseStudy.eyebrow}
        </p>
        <h2
          id="caso-title"
          className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {caseStudy.title}
        </h2>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-text-muted">
          {caseStudy.lead}
        </p>

        <dl className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border">
          {caseStudy.records.map((record) => (
            <div
              key={record.label}
              className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent sm:w-52 sm:shrink-0">
                {record.label}
              </dt>
              <dd className="flex-1 leading-relaxed text-text-muted">{record.detail}</dd>
              <dd
                className={`font-mono text-[11px] tracking-[0.1em] ${
                  record.status === "live" ? "text-accent" : "text-text-muted"
                }`}
              >
                {record.status === "live" ? "en línea" : "en construcción"}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 rounded-2xl border border-border border-l-2 border-l-accent bg-surface/50 p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {caseStudy.note.title}
          </p>
          <p className="mt-3 max-w-prose leading-relaxed text-text-muted">
            {caseStudy.note.body}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          {caseStudy.repositories.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              className="rounded-lg border border-border-strong px-5 py-3 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {repo.label}
            </a>
          ))}
        </div>
      </section>

      <footer
        id="contacto"
        aria-labelledby="contacto-title"
        className="relative z-10 mx-auto flex min-h-svh max-w-6xl snap-end flex-col justify-center px-4 py-20 lg:pl-20"
      >
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          <span aria-hidden className="h-px w-8 bg-accent" />
          {contact.eyebrow}
        </p>
        <h2
          id="contacto-title"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {contact.title}
        </h2>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-text-muted">
          {contact.lead}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          {contact.channels.map((channel) => (
            <a
              key={channel.href}
              href={channel.href}
              className="rounded-lg border border-border-strong px-5 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {channel.label}
            </a>
          ))}
        </div>
        <p className="mt-20 flex items-center gap-2.5 font-mono text-xs text-text-muted">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 shrink-0 text-accent"
          >
            <path d="M12 21s-7.5-4.7-9.4-9A5.4 5.4 0 0 1 12 6.2a5.4 5.4 0 0 1 9.4 5.8C19.5 16.3 12 21 12 21Z" />
          </svg>
          {contact.credit}
        </p>
      </footer>
    </main>
  );
}
