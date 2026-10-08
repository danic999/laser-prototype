"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductMark } from "@/components/product-mark";
import { useAccount } from "@/components/account-provider";
import { useCart } from "@/components/cart-provider";
import { formatKm, formatQty, getProduct, unitForQty } from "@/lib/catalog";

export function CartView() {
  const { items, setQty, removeItem, clear } = useCart();
  const { user } = useAccount();
  const [orderNo, setOrderNo] = useState<string | null>(null);

  const rows = items.map((item) => {
    const product = getProduct(item.slug);
    const unit = product ? unitForQty(product, item.qty) : 0;
    return { item, product, unit, total: unit * item.qty };
  });
  const total = rows.reduce((sum, row) => sum + row.total, 0);

  if (orderNo) {
    return (
      <div className="mx-auto max-w-xl rounded-[28px] bg-white px-6 py-16 text-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
        <p className="text-[12px] text-[#787574]">Narudžba {orderNo}</p>
        <h1 className="mt-2 text-[28px] leading-[1.2] font-medium tracking-[-0.05em]">Narudžba je zaprimljena</h1>
        <p className="mt-3 text-[16px] leading-[1.4] text-[#787574]">
          Veleprodaja priprema potvrdu količine, tiska i roka.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-[16px] text-white"
        >
          Nastavi kupovinu
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div>
        <p className="text-[12px] text-[#787574]">Narudžba</p>
        <h1 className="mt-2 text-[34px] leading-none font-medium tracking-[-0.05em] sm:text-[40px]">Košarica</h1>
        <div className="mt-8 rounded-[28px] bg-white px-6 py-16 text-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
        <p className="text-[28px] leading-[1.2] font-medium tracking-[-0.05em]">Košarica je prazna</p>
        <p className="mt-3 text-[16px] text-[#787574]">Odaberi artikal, stavi logo i naruči.</p>
        <Link
          href="/"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-[16px] text-white"
        >
          Na naslovnicu
        </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[12px] text-[#787574]">Narudžba</p>
      <h1 className="mt-2 text-[34px] leading-none font-medium tracking-[-0.05em] sm:text-[40px]">Košarica</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <ul className="flex flex-col gap-3">
        {rows.map(({ item, product, unit, total: line }) => (
          <li key={item.id} className="grid grid-cols-[7rem_1fr] gap-4 rounded-[28px] bg-white p-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] sm:grid-cols-[9rem_1fr]">
            <ProductMark src={item.image} alt={item.name} sizes="160px" />
            <div className="flex min-w-0 flex-col py-2 pr-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link href={`/proizvod/${item.slug}`} className="text-[16px] font-medium tracking-[-0.031em]">
                    {item.name}
                  </Link>
                  <p className="text-[12px] text-[#787574]">{item.sku}</p>
                </div>
                <p className="text-[16px] font-medium tracking-[-0.031em]">{formatKm(line)}</p>
              </div>
              <p className="mt-2 text-[14px] text-[#787574]">
                {item.colorName} · {item.print} · {item.location}
                {item.logo ? " · s vašim logom" : ""}
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <label className="text-[14px] text-[#787574]">
                  Kom
                  <input
                    type="number"
                    min={product?.minQty ?? 1}
                    value={item.qty}
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      const min = product?.minQty ?? 1;
                      if (Number.isNaN(next)) return;
                      setQty(item.id, Math.max(min, next));
                    }}
                    className="ml-2 h-10 w-24 rounded-full border border-[#ebebeb] bg-white px-3 text-black"
                  />
                </label>
                <p className="text-[14px] text-[#787574]">{formatKm(unit)} / kom</p>
                <button type="button" onClick={() => removeItem(item.id)} className="text-[14px] underline">
                  Ukloni
                </button>
              </div>
              {product ? (
                <p className="mt-1 text-[12px] text-[#787574]">Minimum {formatQty(product.minQty)} kom</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      <aside className="h-fit rounded-[28px] bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
        <p className="text-[12px] text-[#787574]">Ukupno bez PDV-a</p>
        <p className="mt-1 text-[28px] leading-[1.2] font-medium tracking-[-0.05em]">{formatKm(total)}</p>
        {user ? (
          <>
            <p className="mt-5 text-[14px] font-medium">{user.company}</p>
            <p className="text-[14px] text-[#787574]">
              {user.name}
              <br />
              {user.email}
              <br />
              {user.phone}
            </p>
            <button
              type="button"
              onClick={() => {
                clear();
                setOrderNo(`L-${Date.now().toString().slice(-6)}`);
              }}
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-black text-[16px] text-white"
            >
              Naruči
            </button>
          </>
        ) : (
          <>
            <p className="mt-5 text-[16px] leading-[1.4]">Narudžba ide samo s registriranim računom.</p>
            <Link
              href="/registracija?next=/kosarica"
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-black text-[16px] text-white"
            >
              Registracija
            </Link>
            <Link
              href="/prijava?next=/kosarica"
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[16px]"
            >
              Prijava
            </Link>
          </>
        )}
      </aside>
      </div>
    </div>
  );
}
