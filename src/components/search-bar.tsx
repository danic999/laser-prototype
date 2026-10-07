import { ArrowRight } from "lucide-react";

export function SearchBar({ className = "" }: { className?: string }) {
  return (
    <form action="/pretraga" className={className}>
      <label className="relative block">
        <span className="sr-only">Pretraga asortimana</span>
        <input
          name="q"
          placeholder="Šta tražite danas?"
          className="h-14 w-full rounded-full border border-black/10 bg-white pr-16 pl-5 text-[16px] leading-[1.33] tracking-[-0.031em] text-black outline-none placeholder:text-[#787574]"
        />
        <button
          type="submit"
          aria-label="Traži"
          className="absolute top-1 right-1 flex size-12 items-center justify-center rounded-full bg-laser text-white shadow-[0_4px_24px_rgba(226,35,26,0.34)]"
        >
          <ArrowRight className="size-5" strokeWidth={1.75} />
        </button>
      </label>
    </form>
  );
}
