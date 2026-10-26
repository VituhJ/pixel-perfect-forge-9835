import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";

/** Progressive enhancement: content remains visible if animation is unavailable. */
export function SalesPageEffects() {
  const progress = useRef<HTMLDivElement>(null);
  const backToTop = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".school-page");
    if (!page) return;
    let scrollFrame = 0;
    const updateProgress = () => {
      scrollFrame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${ratio})`;
      if (backToTop.current) backToTop.current.hidden = window.scrollY < 900;
    };
    const scheduleProgress = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
    };
    window.addEventListener("scroll", scheduleProgress, { passive: true });
    window.addEventListener("resize", scheduleProgress);
    const resize = new ResizeObserver(scheduleProgress);
    resize.observe(page);
    updateProgress();

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let cleanMotion = () => {};
    const configureMotion = () => {
      cleanMotion();
      if (motion.matches) return;
      const animations = new Set<Animation>();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer.unobserve(entry.target);
            // Elements already above the viewport should not animate when scrolling back.
            if (entry.boundingClientRect.top < 0) continue;
            const animation = entry.target.animate(
              [
                { opacity: 0.25, transform: "translateY(22px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 600, easing: "cubic-bezier(.2,.7,.2,1)" },
            );
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          }
        },
        { threshold: 0.08 },
      );
      page
        .querySelectorAll(
          ".school-heading, .school-main-kit, .school-bonus, .school-window, .school-steps li, .school-price-ticket, .school-guarantee .school-wrap",
        )
        .forEach((element) => observer.observe(element));

      const hero = page.querySelector<HTMLElement>(".school-hero");
      let pointerFrame = 0;
      let x = 0;
      let y = 0;
      const resetTilt = () => {
        cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        hero?.style.removeProperty("--tilt-x");
        hero?.style.removeProperty("--tilt-y");
      };
      const tilt = (event: PointerEvent) => {
        if (!hero || !pointer.matches || event.pointerType !== "mouse") return;
        const box = hero.getBoundingClientRect();
        x = (event.clientX - box.left) / box.width - 0.5;
        y = (event.clientY - box.top) / box.height - 0.5;
        if (!pointerFrame)
          pointerFrame = requestAnimationFrame(() => {
            pointerFrame = 0;
            hero.style.setProperty("--tilt-x", `${-y * 5}deg`);
            hero.style.setProperty("--tilt-y", `${x * 7}deg`);
          });
      };
      hero?.addEventListener("pointermove", tilt, { passive: true });
      hero?.addEventListener("pointerleave", resetTilt);
      cleanMotion = () => {
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
        hero?.removeEventListener("pointermove", tilt);
        hero?.removeEventListener("pointerleave", resetTilt);
        resetTilt();
      };
    };
    configureMotion();
    motion.addEventListener("change", configureMotion);
    return () => {
      window.removeEventListener("scroll", scheduleProgress);
      window.removeEventListener("resize", scheduleProgress);
      cancelAnimationFrame(scrollFrame);
      resize.disconnect();
      motion.removeEventListener("change", configureMotion);
      cleanMotion();
    };
  }, []);

  return (
    <>
      <div className="school-reading-progress" ref={progress} aria-hidden="true" />
      <a
        className="school-back-top"
        href="#inicio"
        ref={backToTop}
        hidden
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={20} />
      </a>
    </>
  );
}
