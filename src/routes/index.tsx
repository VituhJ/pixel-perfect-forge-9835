import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Check, FileText, Zap, ShieldCheck, Camera, Sparkles, Clock, Lightbulb,
  ShoppingCart, FolderOpen, Rocket, User, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import * as c from "@/content";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: c.seo.title },
      { name: "description", content: c.seo.description },
      { property: "og:title", content: c.seo.title },
      { property: "og:description", content: c.seo.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

/* ---------- helpers ---------- */
function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Section({ children, alt, id, narrow }: { children: ReactNode; alt?: boolean; id?: string; narrow?: boolean }) {
  return (
    <section id={id} className={`px-5 py-16 md:py-24 ${alt ? "bg-secondary" : "bg-background"}`}>
      <Reveal className={`mx-auto ${narrow ? "max-w-[720px]" : "max-w-[1040px]"}`}>{children}</Reveal>
    </section>
  );
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="mx-auto mb-10 max-w-[720px] text-center text-2xl font-extrabold leading-tight md:text-4xl">{children}</h2>;
}

function BuyButton({ label }: { label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("animate-soft-pulse"); io.disconnect(); }
    }, { threshold: 0.8 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="mt-10 flex justify-center">
      <Button asChild variant="cta" size="xl">
        <a ref={ref} href={c.CHECKOUT_URL} target="_blank" rel="noopener noreferrer">{label}</a>
      </Button>
    </div>
  );
}

function Cover({ i, size = "md" }: { i: number; size?: "sm" | "md" }) {
  const dims = size === "sm" ? "w-14 h-[74px] p-1.5 text-[7px]" : "w-28 h-[148px] p-3 text-[11px]";
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-lg bg-night shadow-soft ${dims}`} aria-hidden="true">
      <div className="absolute -right-4 -top-4 size-12 rounded-full bg-primary md:size-14" />
      <div className="absolute bottom-0 left-0 h-1 w-full bg-coral" />
      <p className="relative mt-[40%] font-display font-bold leading-tight text-night-foreground">{c.covers[i]}</p>
    </div>
  );
}

function Logo() {
  return (
    <div className="inline-flex items-center rounded-xl border-2 border-dashed border-border px-4 py-2 text-sm font-semibold text-muted-foreground">
      {c.logoPlaceholder}
    </div>
  );
}

function Phone() {
  return (
    <div className="mx-auto w-[268px] rounded-[2.75rem] bg-night p-3 shadow-hero ring-1 ring-night/25 md:w-[320px]" aria-hidden="true">
      <div className="bg-screen relative aspect-[9/16] overflow-hidden rounded-[2.25rem] ring-1 ring-black/20">
        <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-night" />
        {/* personagem abstrato */}
        <svg viewBox="0 0 200 300" className="absolute inset-x-0 bottom-0 w-full">
          <circle cx="100" cy="110" r="44" fill="currentColor" className="text-night-foreground" opacity="0.92" />
          <path d="M60 95 Q100 40 140 95 Q130 70 100 66 Q70 70 60 95Z" fill="currentColor" className="text-night" />
          <path d="M30 300 Q30 180 100 175 Q170 180 170 300Z" fill="currentColor" className="text-coral" />
          <rect x="85" y="150" width="30" height="30" fill="currentColor" className="text-night-foreground" opacity="0.92" />
        </svg>
        <div className="absolute inset-x-3 bottom-16 rounded-lg bg-night/70 px-3 py-2 text-center text-xs font-semibold text-night-foreground">
          {c.hero.phoneCaption}
        </div>
        <div className="absolute inset-x-0 bottom-4 flex justify-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold text-night">
            <Sparkles className="size-3 text-primary" /> {c.hero.phoneTag}
          </span>
        </div>
      </div>
    </div>
  );
}

function TestimonialCards({ items }: { items: c.Testimonial[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((t, i) => (
        <figure key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <p className="font-display font-bold text-night">{t.name}</p>
          <p className="mt-2 text-muted-foreground">{t.action}</p>
          <p className="mt-2 font-medium">{t.result}</p>
        </figure>
      ))}
    </div>
  );
}

function PriceBlock({ id }: { id: string }) {
  return (
    <Section id={id} narrow>
      <div className="space-y-5 text-center text-lg text-muted-foreground">
        {c.price.paragraphs.map((p) => <p key={p}>{p}</p>)}
      </div>
      <div className="mt-10 flex justify-center"><Logo /></div>
      <div className="mx-auto mt-8 max-w-md rounded-3xl border-2 border-primary bg-card p-8 text-center shadow-soft">
        <p className="text-lg font-semibold text-muted-foreground line-through">{c.price.from}</p>
        <p className="mt-3 text-sm font-bold tracking-widest text-primary">{c.price.forLabel}</p>
        <p className="font-display text-6xl font-extrabold text-night md:text-7xl">{c.price.value}</p>
        <p className="mt-1 text-sm font-bold tracking-widest text-night">{c.price.suffix}</p>
      </div>
      <BuyButton label={c.price.cta} />
    </Section>
  );
}

/* ---------- page ---------- */
function Index() {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const d = document.getElementById("entregaveis");
      const hide = ["preco-1", "preco-2"].map((id) => document.getElementById(id));
      if (!d) return;
      const passed = d.getBoundingClientRect().bottom < 0;
      const vh = window.innerHeight;
      const inPrice = hide.some((el) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < vh && r.bottom > 0;
      });
      setShowBar(passed && !inPrice);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dor = c.testimonials.filter((t) => t.context === "dor");
  const bonus = c.testimonials.filter((t) => t.context === "bonus");
  const forIcons = [Camera, Lightbulb, Clock, Sparkles];
  const accessIcons = [ShoppingCart, FolderOpen, Rocket];
  const badgeIcons = [FileText, Zap, ShieldCheck];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <header className="px-5 py-4">
        <div className="mx-auto flex max-w-[1040px] items-center"><Logo /></div>
      </header>

      <main>
        {/* 1 Hero */}
        <section className="px-5 pb-16 pt-6 md:pb-24 md:pt-12">
          <Reveal className="mx-auto grid max-w-[1040px] items-center gap-12 md:grid-cols-[1.25fr_1fr]">
            <div>
              <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-tight sm:text-[52px] md:text-[64px] lg:text-[72px]">{c.hero.h1}</h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{c.hero.subtitle}</p>
              <ul className="mt-8 flex flex-wrap gap-3">
                {c.hero.badges.map((b, i) => {
                  const I = badgeIcons[i] ?? Sparkles;
                  return (
                    <li key={b} className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-night">
                      <I className="size-4 text-primary" /> {b}
                    </li>
                  );
                })}
              </ul>
            </div>
            <Phone />
          </Reveal>
        </section>

        {/* 2 Passos */}
        <Section alt>
          <H2>{c.steps.title}</H2>
          <ol className="relative grid gap-5 md:grid-cols-5">
            {c.steps.items.map(([t, d], i) => (
              <li key={t} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft md:flex-col">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">{i + 1}</span>
                <div>
                  <h3 className="font-bold">{t}</h3>
                  <p className="mt-1 text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* 3 Resumo */}
        <Section>
          <H2>{c.summary.title}</H2>
          <div className="grid min-w-0 items-center gap-12 md:grid-cols-2">
            <ul className="min-w-0 space-y-4">
              {c.summary.items.map((it) => (
                <li key={it} className="flex gap-3 text-[17px]">
                  <Check className="mt-1 size-5 shrink-0 text-primary" strokeWidth={3} /> <span>{it}</span>
                </li>
              ))}
            </ul>
            <div className="flex min-w-0 justify-center overflow-hidden">
              <div className="flex origin-center scale-[0.78] sm:scale-90 md:scale-100">
                {c.covers.map((_, i) => (
                  <div key={i} className="-ml-10 first:ml-0" style={{ transform: `rotate(${(i - 2) * 6}deg) translateY(${Math.abs(i - 2) * 8}px)` }}>
                    <Cover i={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 4 Perfeito para */}
        <Section alt>
          <div className="grid gap-5 md:grid-cols-2">
            {c.perfectFor.map((p) => (
              <div key={p} className="rounded-3xl bg-card p-8 shadow-soft">
                <Star className="mb-4 size-7 text-primary" />
                <p className="font-display text-xl font-bold leading-snug text-night">{p}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 5 Depoimentos */}
        {c.testimonials.length > 0 && (
          <Section>
            <H2>{c.testimonialsTitle}</H2>
            <TestimonialCards items={c.testimonials.filter((t) => !t.context)} />
          </Section>
        )}

        {/* 6 Agitação */}
        <Section narrow>
          <h2 className="text-center text-2xl font-extrabold leading-tight md:text-4xl">{c.agitation.title}</h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed">
            {c.agitation.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <p className="mt-10 rounded-2xl bg-primary p-6 text-center font-display text-xl font-bold text-primary-foreground">{c.agitation.highlight}</p>
        </Section>

        {/* 7 Depoimento dor */}
        {dor.length > 0 && <Section alt><TestimonialCards items={dor} /></Section>}

        {/* 8 Entregáveis */}
        <Section alt id="entregaveis">
          <H2>{c.deliverables.title}</H2>
          <div className="grid gap-5 md:grid-cols-2">
            {c.deliverables.items.map((d) => (
              <article key={d.label} className={`relative flex gap-5 rounded-2xl border bg-card p-5 shadow-soft ${d.favorite ? "border-2 border-coral" : "border-border"}`}>
                {d.favorite && (
                  <span className="absolute -top-3 right-5 rounded-full bg-cta px-3 py-1 text-xs font-bold text-cta-foreground">{c.deliverables.favoriteTag}</span>
                )}
                <Cover i={d.cover} size="sm" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">{d.label}</p>
                  <h3 className="mt-1 font-bold leading-snug">{d.title}</h3>
                  <p className="mt-2 text-muted-foreground">{d.text}</p>
                </div>
              </article>
            ))}
          </div>
          <BuyButton label={c.deliverables.cta} />
        </Section>

        {/* 9 Depoimento bônus */}
        {bonus.length > 0 && <Section><TestimonialCards items={bonus} /></Section>}

        {/* 10 Para quem é */}
        <Section>
          <H2>{c.forWho.title}</H2>
          <ul className="grid gap-5 md:grid-cols-2">
            {c.forWho.items.map((t, i) => {
              const I = forIcons[i] ?? Sparkles;
              return (
                <li key={t} className="flex gap-4 rounded-2xl border border-border p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary"><I className="size-5 text-primary" /></span>
                  <p className="text-[17px]">{t}</p>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* 11 Recap */}
        <Section alt narrow>
          <H2>{c.recap.title}</H2>
          <ul className="divide-y divide-border rounded-2xl bg-card shadow-soft">
            {c.recap.items.map((r) => (
              <li key={r.name} className="flex items-center gap-4 p-4">
                <Cover i={r.cover} size="sm" />
                <span className="flex-1 font-medium">{r.name}</span>
                <span className="font-display font-bold text-night">{r.value}</span>
              </li>
            ))}
            <li className="flex items-center justify-between gap-4 rounded-b-2xl bg-night p-5 text-night-foreground">
              <span className="font-semibold">{c.recap.totalLabel}</span>
              <span className="font-display text-2xl font-extrabold">{c.recap.total}</span>
            </li>
          </ul>
        </Section>

        {/* 12 Preço */}
        <PriceBlock id="preco-1" />

        {/* 13 Acesso */}
        <Section alt>
          <H2>{c.access.title}</H2>
          <ol className="grid gap-5 md:grid-cols-3">
            {c.access.items.map(([t, d], i) => {
              const I = accessIcons[i] ?? Sparkles;
              return (
                <li key={t} className="rounded-2xl bg-card p-6 text-center shadow-soft">
                  <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary"><I className="size-6 text-primary-foreground" /></span>
                  <h3 className="mt-4 font-extrabold tracking-wide">{t}</h3>
                  <p className="mt-2 text-muted-foreground">{d}</p>
                </li>
              );
            })}
          </ol>
        </Section>

        {/* 14 Garantia */}
        <Section narrow>
          <div className="text-center">
            <svg viewBox="0 0 160 160" className="mx-auto size-40" role="img" aria-label={c.guarantee.seal}>
              <circle cx="80" cy="80" r="76" fill="currentColor" className="text-primary" />
              <circle cx="80" cy="80" r="64" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-primary-foreground" />
              <text x="80" y="92" textAnchor="middle" fontSize="38" fontWeight="800" fill="currentColor" className="font-display text-primary-foreground">{c.guarantee.seal}</text>
            </svg>
            <h2 className="mt-6 text-2xl font-extrabold md:text-4xl">{c.guarantee.title}</h2>
          </div>
          <div className="mt-8 space-y-5 text-center text-lg leading-relaxed">
            {c.guarantee.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <BuyButton label={c.guarantee.cta} />
        </Section>

        {/* 15 Mentor */}
        <Section alt narrow>
          <H2>{c.mentor.title}</H2>
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex size-32 items-center justify-center rounded-full bg-border"><User className="size-12 text-muted-foreground" /></div>
            <h3 className="text-xl font-bold">{c.mentor.name}</h3>
            <p className="text-lg text-muted-foreground">{c.mentor.text}</p>
          </div>
        </Section>

        {/* 16 Duas opções */}
        <Section>
          <H2>{c.choice.title}</H2>
          <div className="grid gap-5 md:grid-cols-2">
            {c.choice.options.map(([t, d], i) => (
              <div key={t} className={`rounded-3xl p-8 ${i === 1 ? "border-2 border-primary bg-secondary shadow-soft" : "border border-border"}`}>
                <h3 className={`text-lg font-extrabold ${i === 1 ? "text-primary" : ""}`}>{t}</h3>
                <p className="mt-3 text-[17px]">{d}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-[720px] space-y-3 text-center text-lg">
            {c.choice.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <BuyButton label={c.choice.cta} />
        </Section>

        {/* 17 Preço */}
        <PriceBlock id="preco-2" />

        {/* 18 FAQ */}
        <Section alt narrow>
          <H2>{c.faq.title}</H2>
          <Accordion type="single" collapsible className="rounded-2xl bg-card px-5 shadow-soft">
            {c.faq.items.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`}>
                <AccordionTrigger className="py-5 text-left text-base font-semibold">{q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      </main>

      <footer className="bg-night px-5 py-12 text-sm text-night-foreground/80">
        <div className="mx-auto max-w-[720px] space-y-3 text-center">
          {c.footer.lines.map((l) => <p key={l}>{l}</p>)}
          <p className="flex justify-center gap-6 pt-2">
            {c.footer.links.map((l) => <a key={l.label} href={l.href} className="underline">{l.label}</a>)}
          </p>
          <p className="pt-2">{c.footer.copyright}</p>
        </div>
      </footer>

      {/* Barra fixa mobile */}
      <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur transition-transform md:hidden ${showBar ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-extrabold text-night">{c.stickyBar.price}</span>
          <Button asChild variant="cta" className="min-h-12 flex-1">
            <a href={c.CHECKOUT_URL} target="_blank" rel="noopener noreferrer" tabIndex={showBar ? 0 : -1}>{c.stickyBar.cta}</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
