import { Clock } from "lucide-react";

export function OfferCountdown() {
  return (
    <div className="w-full border-b border-primary/30 bg-primary text-primary-foreground shadow-sm">
      <div className="mx-auto flex max-w-[1040px] items-center justify-center gap-3 px-4 py-3 md:px-5">
        <Clock className="size-5 shrink-0" aria-hidden="true" />
        <p className="text-center text-sm font-extrabold uppercase tracking-wide sm:text-base">
          OFERTA VALIDA APENAS HOJE!!
        </p>
      </div>
    </div>
  );
}
