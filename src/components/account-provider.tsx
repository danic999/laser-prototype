"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

export type SessionUser = {
  email: string;
  company: string;
  name: string;
  phone: string;
};

type Account = SessionUser & { passwordHash: string };

type AccountResult = { ok: true } | { ok: false; error: string };

type AccountContextValue = {
  user: SessionUser | null;
  register: (input: { company: string; name: string; email: string; phone: string; password: string }) => Promise<AccountResult>;
  login: (email: string, password: string) => Promise<AccountResult>;
  logout: () => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);
const accountsKey = "laser-accounts";
const sessionKey = "laser-session";
const listeners = new Set<() => void>();

let accounts: Account[] = [];
let session: SessionUser | null = null;
let hydrated = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  listeners.forEach((listener) => listener());
}

function readAccounts() {
  try {
    const raw = localStorage.getItem(accountsKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Account[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  accounts = readAccounts();
  const email = localStorage.getItem(sessionKey);
  const found = accounts.find((account) => account.email === email);
  session = found
    ? { email: found.email, company: found.company, name: found.name, phone: found.phone }
    : null;
}

function getSnapshot() {
  hydrate();
  return session;
}

async function hashPassword(password: string) {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function toSession(account: Account): SessionUser {
  return { email: account.email, company: account.company, name: account.name, phone: account.phone };
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const value = useMemo<AccountContextValue>(
    () => ({
      user,
      async register(input) {
        hydrate();
        const email = input.email.trim().toLowerCase();
        const company = input.company.trim();
        const name = input.name.trim();
        const phone = input.phone.trim();
        if (!company || !name || !email || !phone || !input.password) {
          return { ok: false, error: "Popuni sva polja." };
        }
        if (!email.includes("@")) return { ok: false, error: "Upiši ispravan e-mail." };
        if (input.password.length < 6) return { ok: false, error: "Lozinka treba imati najmanje 6 znakova." };
        if (accounts.some((account) => account.email === email)) {
          return { ok: false, error: "Račun s tim e-mailom već postoji. Prijavi se." };
        }
        const passwordHash = await hashPassword(input.password);
        const account = { email, passwordHash, company, name, phone };
        accounts = [...accounts, account];
        localStorage.setItem(accountsKey, JSON.stringify(accounts));
        session = toSession(account);
        localStorage.setItem(sessionKey, email);
        emit();
        return { ok: true };
      },
      async login(emailRaw, password) {
        hydrate();
        const email = emailRaw.trim().toLowerCase();
        const account = accounts.find((item) => item.email === email);
        const passwordHash = await hashPassword(password);
        if (!account || account.passwordHash !== passwordHash) {
          return { ok: false, error: "E-mail ili lozinka nisu točni." };
        }
        session = toSession(account);
        localStorage.setItem(sessionKey, email);
        emit();
        return { ok: true };
      },
      logout() {
        session = null;
        localStorage.removeItem(sessionKey);
        emit();
      },
    }),
    [user],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const value = useContext(AccountContext);
  if (!value) throw new Error("Račun nije dostupan.");
  return value;
}

export function safeNext(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/kosarica";
  return value;
}
