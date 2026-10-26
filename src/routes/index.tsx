import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  FileText,
  Sparkles,
  ShieldCheck,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Plus,
  ChevronLeft,
  ChevronRight,
  Star,
  BookOpen,
  FolderOpen,
  X,
  Camera,
  Lightbulb,
  Clock,
  Rocket,
} from "lucide-react";
import { MetaTracking } from "@/lib/meta-tracking";
import { OfferCountdown } from "@/components/OfferCountdown";
import { SalesPageEffects } from "@/components/SalesPageEffects";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as c from "@/content";
import kitCover from "@/assets/kit-influenciador-ia.png";
import bonusCover from "@/assets/mockup-bonus-influenciador-ia.png";
import heroArtwork from "@/assets/influenciador-topo.png";
import "@/school-layout.css";

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

const MEDIA = "/media/characters-reference";
// Keep the original testimonial images available in local previews too.
const testimonialImage = (url: string) =>
  url.startsWith("/__l5e/assets-v1/") ? `/images/${url.split("/").pop()}` : url;
const characters = [
  ["CS004", "Jean Phil"],
  ["CS006", "Jeen Rockfelly"],
  ["CS027", "Edmond Lebon"],
  ["CS011", "Bill Smith"],
  ["CS007", "Ched Chin"],
  ["CS008", "Don Nuger"],
  ["CS001", "Luther Longford"],
  ["CS014", "Terrence Jackson"],
  ["CS016", "Abu Yalla"],
  ["CS015", "Milton Bumford"],
  ["CS023", "Silky"],
  ["CS020", "Ludmila Glitterova"],
  ["CS010", "Sebastián Perfil"],
  ["CS025", "Kwon Blaze Kim"],
  ["CS018", "Arthur Teddington"],
  ["CS002", "Severin Moskovsky"],
  ["CS003", "Mr. Twirlo"],
  ["CS026", "Derek Mercer"],
  ["CS012", "Mildred Ashkettle"],
  ["CS017", "Abu Shalab"],
  ["CS029", "Magnus Brick"],
  ["CS005", "Eggman"],
  ["CS013", "Marcel Phil"],
  ["CS024", "Lord"],
  ["CS019", "Tony Ravioliano"],
  ["CS021", "Huncle-berry Cliff"],
  ["CS028", "Percival Fawnsworth"],
  ["CS022", "Nikola Mykonos"],
  ["CS009", "Barnaby Nugget"],
];
const reels = [
  { file: "b", creator: "@abu.shalab", url: "https://www.instagram.com/reel/DdxCLS5NMRz/" },
  { file: "a", creator: "@jean_philanthrope", url: "https://www.instagram.com/reel/Ddb0QUyqnhG/" },
  { file: "c", creator: "@lord.farquaad.sol", url: "https://www.instagram.com/reel/DdwhswgBSFq/" },
];

function Buy({ children = c.hero.cta, pale = false }: { children?: ReactNode; pale?: boolean }) {
  return (
    <a
      className={`school-buy ${pale ? "school-buy--pale" : ""}`}
      href={c.CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowRight size={20} aria-hidden="true" />
    </a>
  );
}
function Heading({
  label,
  children,
  intro,
}: {
  label: string;
  children: ReactNode;
  intro?: string;
}) {
  return (
    <header className="school-heading">
      <span className="school-eyebrow">
        <Sparkles size={14} aria-hidden="true" />
        {label}
      </span>
      <h2>{children}</h2>
      {intro && <p>{intro}</p>}
    </header>
  );
}
function CharacterRow({ items, row }: { items: string[][]; row: number }) {
  const track = useRef<HTMLDivElement>(null);
  const move = (dir: number) =>
    track.current?.scrollBy({
      left: dir * 440,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  return (
    <div className="school-cast-row">
      <div className="school-row-controls">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label={`Personagens anteriores, fila ${row}`}
        >
          <ChevronLeft />
        </button>
        <span>Arraste para explorar</span>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label={`Próximos personagens, fila ${row}`}
        >
          <ChevronRight />
        </button>
      </div>
      <div
        className="school-cast-track"
        ref={track}
        tabIndex={0}
        role="region"
        aria-label={`Galeria de personagens, fila ${row}`}
      >
        <a href="#entregaveis" className="school-character school-character--open">
          <Plus size={42} />
          <strong>O próximo pode ser seu.</strong>
          <span>Crie seu personagem</span>
          <ArrowRight />
        </a>
        {items.map(([code, name]) => (
          <figure className="school-character" key={code}>
            <img
              src={`${MEDIA}/${code}.webp`}
              width="480"
              height="640"
              alt={`Personagem de referência: ${name}`}
              loading="lazy"
              draggable="false"
            />
            <figcaption>
              {name}
              <span>Personagem de IA · referência</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
function Reel({ reel }: { reel: (typeof reels)[number] }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          video.pause();
          return;
        }
        if (!video.getAttribute("src")) {
          video.src = `${MEDIA}/reel-${reel.file}.mp4`;
          video.load();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reel.file]);
  const togglePlay = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setFailed(true));
    } else video.pause();
  };
  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    const nextMuted = !video.muted;
    if (!nextMuted)
      document.querySelectorAll<HTMLVideoElement>(".school-reel video").forEach((other) => {
        if (other !== video) other.muted = true;
      });
    video.muted = nextMuted;
  };
  return (
    <figure className="school-reel">
      <div className="school-reel-tag">
        <Sparkles size={14} />
        Personagem em movimento
      </div>
      <div className="school-phone">
        <video
          ref={ref}
          poster={`${MEDIA}/reel-${reel.file}-poster.jpg`}
          muted
          playsInline
          loop
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onVolumeChange={() => setMuted(ref.current?.muted ?? true)}
          onError={() => setFailed(true)}
          aria-label={`Vídeo de referência de ${reel.creator}`}
        />
        <span className="school-phone-notch" aria-hidden="true" />
        {!playing && !failed && (
          <button
            className="school-play"
            type="button"
            onClick={togglePlay}
            aria-label={`Reproduzir vídeo de ${reel.creator}`}
          >
            <Play fill="currentColor" />
          </button>
        )}
        {failed && (
          <div className="school-video-error">
            Vídeo indisponível neste navegador.
            <a href={reel.url} target="_blank" rel="noopener noreferrer">
              Ver o vídeo original ↗
            </a>
          </div>
        )}
        <div className="school-video-controls">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <span>{reel.creator}</span>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Ativar som" : "Silenciar"}
            aria-pressed={!muted}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>
      <figcaption>
        <a href={reel.url} target="_blank" rel="noopener noreferrer">
          Vídeo original de {reel.creator} ↗
        </a>
      </figcaption>
    </figure>
  );
}
function Testimonials() {
  return (
    <section className="school-section school-desk">
      <div className="school-wrap">
        <Heading label="Relatos compartilhados">{c.testimonialsTitle}</Heading>
        <div className="school-windows">
          {c.testimonials.map((item, i) => (
            <figure className="school-window" key={item.name}>
              <div className="school-window-bar">
                <span>
                  <span className="school-status-dot" />
                  relato_{i + 1}.txt
                </span>
                <span aria-hidden="true">— □ ×</span>
              </div>
              <div className="school-window-body">
                <div className="school-stars" aria-label="5 estrelas">
                  {Array.from({ length: 5 }, (_, k) => (
                    <Star key={k} size={14} fill="currentColor" />
                  ))}
                </div>
                <h3>{item.name}</h3>
                <p>{item.action}</p>
                <blockquote>{item.result}</blockquote>
                {item.image && (
                  <a
                    href={testimonialImage(item.image)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ampliar relato de ${item.name}`}
                  >
                    <img
                      src={testimonialImage(item.image)}
                      alt={`Conversa compartilhada por ${item.name}`}
                      loading="lazy"
                      width="240"
                      height="430"
                    />
                  </a>
                )}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
function Index() {
  const icons = [Camera, Lightbulb, Clock, Sparkles];
  return (
    <div className="sales-page school-page">
      <MetaTracking />
      <SalesPageEffects />
      <div className="school-announcement">
        <OfferCountdown />
      </div>
      <main>
        <section className="school-hero" id="inicio">
          <nav className="school-nav">
            <a href="#inicio" className="school-brand">
              <img src="/favicon.svg" alt="" width="30" height="30" />
              INFLUENCIADOR<span>DE IA</span>
            </a>
            <a href="#entregaveis">
              Conheça o kit <ArrowDown size={15} />
            </a>
          </nav>
          <div className="school-hero-art">
            <img
              className="school-hero-artwork"
              src={heroArtwork}
              alt="Influenciador de IA — três personagens digitais"
              fetchPriority="high"
            />
          </div>
          <div className="school-hero-copy">
            <span className="school-pill">
              <span className="school-status-dot" />
              SEU PERSONAGEM. SUAS IDEIAS.
            </span>
            <h1>
              Seu primeiro vídeo com influenciador de IA em 1 dia,<em>só copiando e colando.</em>
            </h1>
            <p className="school-product-name">{c.PRODUCT}</p>
            <p className="school-hero-description">{c.hero.subtitle}</p>
            <div className="school-actions">
              <Buy />
              <a className="school-text-link" href="#demonstracao">
                Veja os personagens em ação <ArrowDown size={17} />
              </a>
            </div>
            <div className="school-trust">
              <span>
                <FileText size={16} />
                Kit digital em PDF
              </span>
              {c.hero.badges.map((badge, i) => (
                <span key={badge}>
                  {i === 0 ? <Rocket size={16} /> : <ShieldCheck size={16} />}
                  {badge}
                </span>
              ))}
            </div>
            <p className="school-hero-price">
              Kit completo + 4 bônus por <strong>{c.price.value}</strong> à vista
            </p>
          </div>
          <div className="school-cloud-edge" aria-hidden="true" />
        </section>
        <section className="school-section school-cast" id="aprender">
          <Heading label="Uma ideia pode virar um personagem" intro={c.learn.subtitle}>
            {c.learn.title}
          </Heading>
          <div className="school-learn school-wrap">
            {c.learn.items.map((item, i) => (
              <div key={item.title}>
                <span>0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <CharacterRow items={characters.slice(0, 15)} row={1} />
          <CharacterRow items={characters.slice(15)} row={2} />
          <div className="school-center">
            <Buy pale />
          </div>
        </section>
        <section className="school-section school-reels" id="demonstracao">
          <div className="school-wrap">
            <Heading
              label="Dê play nas referências"
              intro="Explore diferentes estilos de personagens de IA, voz e movimento."
            >
              Personagens fictícios.<em>Vídeos que chamam atenção.</em>
            </Heading>
            <div className="school-phones">
              {reels.map((reel) => (
                <Reel key={reel.file} reel={reel} />
              ))}
            </div>
            <p className="school-source">
              Vídeos de terceiros, com os autores creditados. São referências criativas, não
              demonstrações do kit nem resultados de compradores.
            </p>
            <div className="school-facts">
              {[
                ["20", "prompts prontos"],
                ["10", "roteiros de 30 segundos"],
                ["4", "bônus incluídos"],
                ["7 dias", "de garantia"],
              ].map(([number, label]) => (
                <div key={label}>
                  <strong>{number}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {c.testimonials.length > 0 && <Testimonials />}
        <section className="school-section school-secret">
          <div className="school-wrap school-secret-grid">
            <div>
              <span className="school-eyebrow">
                <FolderOpen size={16} />
                ABRA A SUA PASTA CRIATIVA
              </span>
              <h2>{c.agitation.title}</h2>
              {c.agitation.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="school-highlight">{c.agitation.highlight}</p>
              <Buy />
            </div>
            <div className="school-folder">
              <div className="school-folder-tab">SEU KIT / ACESSO IMEDIATO</div>
              <div className="school-paper">
                <BookOpen size={32} />
                <h3>{c.summary.title}</h3>
                <ul>
                  {c.summary.items.map((item) => (
                    <li key={item}>
                      <Check size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="school-section school-method" id="metodo">
          <div className="school-wrap">
            <Heading label="Da primeira ideia ao primeiro vídeo">{c.steps.title}</Heading>
            <ol className="school-steps">
              {c.steps.items.map(([title, description], i) => (
                <li key={title}>
                  <span className="school-step-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
            <div className="school-perfect">
              {c.perfectFor.map((text) => (
                <p key={text}>
                  <Sparkles size={23} />
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>
        <section className="school-section school-deliverables" id="entregaveis">
          <div className="school-wrap">
            <Heading label="Um kit completo. Quatro bônus.">{c.deliverables.title}</Heading>
            <div className="school-main-kit">
              <div className="school-main-cover">
                <img
                  src={kitCover}
                  alt="Capa do kit Influenciador de IA Pronto em 1 Dia"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="school-pill">{c.deliverables.items[0]?.label}</span>
                <h3>{c.deliverables.items[0]?.title}</h3>
                <p>{c.deliverables.items[0]?.text}</p>
                <div className="school-format">
                  <FileText size={20} />
                  Material digital em PDF
                </div>
                <Buy>{c.deliverables.cta}</Buy>
              </div>
            </div>
            <div className="school-bonus-grid">
              {c.deliverables.items.slice(1).map((item) => (
                <article className="school-bonus" key={item.label}>
                  <span className="school-bonus-number">{item.label}</span>
                  {item.favorite && (
                    <span className="school-favorite">{c.deliverables.favoriteTag}</span>
                  )}
                  <img
                    src={bonusCover}
                    alt={`Mockup de ${item.title}`}
                    loading="lazy"
                    width="220"
                    height="240"
                  />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="school-section school-who">
          <div className="school-wrap">
            <Heading label="Comece do ponto em que você está">{c.forWho.title}</Heading>
            <div className="school-who-grid">
              {c.forWho.items.map((text, i) => {
                const Icon = icons[i] ?? Sparkles;
                return (
                  <article key={text}>
                    <Icon size={28} />
                    <p>{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="school-section school-offer" id="oferta">
          <div className="school-wrap">
            <Heading label="Seu acesso começa aqui">
              Tudo em um só kit.<em>Pronto para você começar.</em>
            </Heading>
            <div className="school-offer-grid">
              <div className="school-checklist">
                <span className="school-paper-tag">LISTA DE MATERIAIS</span>
                <h3>{c.recap.title}</h3>
                <ul>
                  {c.recap.items.map((item) => (
                    <li key={item.name}>
                      <Check size={18} />
                      <span>{item.name}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
                <div className="school-total">
                  <span>{c.recap.totalLabel}</span>
                  <strong>{c.recap.total}</strong>
                </div>
                {c.price.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
              <div className="school-price-ticket">
                <div className="school-ticket-top">
                  <BookOpen />
                  <span>KIT DIGITAL + 4 BÔNUS</span>
                  <span>01</span>
                </div>
                <img src={kitCover} alt="Kit completo" loading="lazy" width="180" height="180" />
                <h3>{c.PRODUCT}</h3>
                <p className="school-old-price">{c.price.from}</p>
                <span className="school-price-label">{c.price.forLabel}</span>
                <strong className="school-price-value">{c.price.value}</strong>
                <span className="school-price-label">{c.price.suffix}</span>
                <Buy>{c.price.cta}</Buy>
                <p>
                  <ShieldCheck size={16} />
                  {c.guarantee.title}
                </p>
                <span className="school-barcode" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>
        <section className="school-section school-access">
          <div className="school-wrap">
            <Heading label="Simples do início ao acesso">{c.access.title}</Heading>
            <ol>
              {c.access.items.map(([title, description], i) => (
                <li key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="school-section school-guarantee">
          <div className="school-wrap">
            <div className="school-seal">
              <ShieldCheck size={42} />
              <strong>{c.guarantee.seal}</strong>
              <span>DE GARANTIA</span>
            </div>
            <div>
              <h2>{c.guarantee.title}</h2>
              {c.guarantee.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <Buy pale>{c.guarantee.cta}</Buy>
            </div>
          </div>
        </section>
        <section className="school-section school-choice">
          <div className="school-wrap">
            <Heading label="Qual vai ser o seu próximo passo?">{c.choice.title}</Heading>
            <div className="school-choice-grid">
              {c.choice.options.map(([title, description], i) => (
                <article key={title}>
                  {i === 0 ? <X size={26} /> : <Check size={26} />}
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            {c.choice.paragraphs.map((text) => (
              <p className="school-choice-copy" key={text}>
                {text}
              </p>
            ))}
          </div>
        </section>
        <section className="school-section school-faq" id="duvidas">
          <div className="school-wrap">
            <Heading label="Antes de começar">{c.faq.title}</Heading>
            <Accordion type="single" collapsible>
              {c.faq.items.map(([question, answer], i) => (
                <AccordionItem key={question} value={`q${i}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>
                    {answer?.split(c.SUPPORT_EMAIL).map((part, index) => (
                      <span key={index}>
                        {index > 0 && (
                          <a className="school-support-link" href={`mailto:${c.SUPPORT_EMAIL}`}>
                            {c.SUPPORT_EMAIL}
                          </a>
                        )}
                        {part}
                      </span>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        <section className="school-final">
          <span className="school-eyebrow">A PRÓXIMA IDEIA É SUA</span>
          <h2>
            Seu personagem.<em>Sua próxima criação.</em>
          </h2>
          <p>{c.PRODUCT} · Kit completo e 4 bônus</p>
          <Buy>{c.choice.cta}</Buy>
          <span className="school-final-price">
            {c.stickyBar.price} · {c.guarantee.title}
          </span>
        </section>
      </main>
      <footer className="school-footer">
        <a href="#inicio" className="school-brand">
          <img src="/favicon.svg" width="30" height="30" alt="" />
          INFLUENCIADOR DE IA
        </a>
        {c.footer.lines.map((text) => (
          <p key={text}>{text}</p>
        ))}
        <p>{c.footer.copyright}</p>
      </footer>
      <aside className="school-floating-offer" aria-label="Comprar o kit">
        <div>
          <strong>{c.stickyBar.price}</strong>
          <span>Kit completo + 4 bônus</span>
        </div>
        <Buy />
      </aside>
    </div>
  );
}
