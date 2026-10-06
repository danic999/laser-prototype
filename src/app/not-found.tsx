import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 py-24 sm:px-6">
      <p className="text-[12px] tracking-[0.08em] text-charcoal uppercase">404</p>
      <h1 className="mt-3 font-heading text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.88] font-extrabold tracking-[0.02em]">Ova stranica nije u pregledu.</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Prototip pokriva naslovnicu, odabrane kategorije i artikle s laser-bih.com.
      </p>
      <Link href="/" className="mt-8 inline-flex h-12 items-center rounded-[2px] border border-bass bg-bass px-6 text-[16px] font-medium tracking-[0.05em] text-white uppercase">
        Natrag na naslovnicu
      </Link>
    </main>
  );
}
