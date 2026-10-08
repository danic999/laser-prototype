"use client";

import { useSyncExternalStore } from "react";
import { ChevronDown } from "lucide-react";
import {
  DEFAULT_PROTOTYPE_VERSION,
  isPrototypeVersion,
  PROTOTYPE_STORAGE_KEY,
  PROTOTYPE_VERSIONS,
  type PrototypeVersion,
} from "@/lib/prototype-version";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readVersion(): PrototypeVersion {
  const value = document.documentElement.dataset.prototype;
  return isPrototypeVersion(value) ? value : DEFAULT_PROTOTYPE_VERSION;
}

function writeVersion(version: PrototypeVersion) {
  document.documentElement.dataset.prototype = version;
  try {
    localStorage.setItem(PROTOTYPE_STORAGE_KEY, version);
  } catch {
    // Storage can be blocked (private mode); the switch still works for this visit.
  }
  listeners.forEach((listener) => listener());
}

export function PrototypeSwitcher() {
  const version = useSyncExternalStore(subscribe, readVersion, () => DEFAULT_PROTOTYPE_VERSION);

  return (
    <label className="fixed top-3 right-3 z-[60] inline-flex h-10 items-center rounded-full border border-[#ebebeb] bg-white/90 pr-3 pl-3.5 sm:pl-4 text-[14px] tracking-[-0.014em] text-black shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur focus-within:ring-2 focus-within:ring-black/20">
      <span className="sr-only">Verzija prototipa</span>
      <span aria-hidden className="pr-6 sm:hidden">
        {version}
      </span>
      <select
        value={version}
        onChange={(event) => {
          if (isPrototypeVersion(event.target.value)) writeVersion(event.target.value);
        }}
        className="absolute inset-0 cursor-pointer appearance-none bg-transparent opacity-0 outline-none sm:static sm:pr-6 sm:opacity-100"
      >
        {PROTOTYPE_VERSIONS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none relative -ml-5 size-4 text-[#787574]" strokeWidth={1.75} />
    </label>
  );
}
