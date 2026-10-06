import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
      <p className="text-[12px] text-[#787574]">404</p>
      <h1 className="mt-2 text-[28px] leading-[1.2] font-medium tracking-[-0.05em]">Ova stranica nije u pregledu.</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Prototip pokriva naslovnicu, odabrane kategorije i artikle s laser-bih.com.
      </p>
      <Link href="/" className="mt-6 inline-flex h-10 items-center rounded-full border border-[#ebebeb] bg-white px-4 text-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        Natrag na naslovnicu
      </Link>
    </main>
  );
}
