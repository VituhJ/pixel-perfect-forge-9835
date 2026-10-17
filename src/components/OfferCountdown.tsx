import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { exclusiveOffer } from "@/content";

const DURATION_MS = 30 * 60 * 1000;
const STORAGE_KEY = "influenciador-ia:exclusive-offer-deadline:v1";

export function OfferCountdown() {
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    let deadline = Date.now() + DURATION_MS;

    try {
      const savedDeadline = Number(window.localStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(savedDeadline) && savedDeadline > 0 && savedDeadline <= deadline) {
        deadline = savedDeadline;
      } else {
        window.localStorage.setItem(STORAGE_KEY, String(deadline));
      }
    } catch {
      // The countdown still works for this visit if browser storage is blocked.
    }

    let interval: number | undefined;
    const update = () => {
      // Use elapsed wall time so background tabs cannot pause the deadline.
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemainingSeconds(seconds);
      if (seconds === 0 && interval !== undefined) window.clearInterval(interval);
      return seconds;
    };

    if (update() > 0) interval = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      if (interval !== undefined) window.clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const expired = remainingSeconds === 0;
  const minutes = remainingSeconds === null ? "--" : String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = remainingSeconds === null ? "--" : String(remainingSeconds % 60).padStart(2, "0");

  return (
    <div className="w-full border-b border-primary/20 bg-secondary text-night">
      <div className="mx-auto flex max-w-[1040px] items-center justify-center gap-3 px-4 py-3 sm:gap-4 md:px-5">
        <Clock className="size-5 shrink-0 text-primary" aria-hidden="true" />
        <div className="min-w-0 text-left">
          <p className="text-xs font-extrabold uppercase tracking-wide text-primary">{exclusiveOffer.label}</p>
          <p className="mt-0.5 text-xs font-medium sm:text-sm" role="status">
            {expired ? exclusiveOffer.expired : exclusiveOffer.countdownLabel}
          </p>
        </div>
        <span
          role="timer"
          aria-live="off"
          aria-label={remainingSeconds === null ? exclusiveOffer.loadingLabel : `${minutes} minutos e ${seconds} segundos restantes`}
          className="shrink-0 whitespace-nowrap rounded-xl bg-primary px-3 py-2 font-display text-2xl font-extrabold leading-none text-primary-foreground tabular-nums"
        >
          {minutes}:{seconds}
        </span>
      </div>
    </div>
  );
}
