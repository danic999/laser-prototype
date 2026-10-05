import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">404</p>
      <h1 className="mt-2 font-heading text-4xl font-medium">Ova stranica nije u pregledu.</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Prototip pokriva naslovnicu, odabrane kategorije i artikle s laser-bih.com.
      </p>
      <Link href="/" className="mt-6 inline-flex h-11 items-center rounded-lg bg-ink px-5 text-sm text-paper">
        Natrag na naslovnicu
      </Link>
    </main>
  );
}
