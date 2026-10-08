export const PROTOTYPE_VERSIONS = [
  { value: "v1", label: "Prototype v1" },
  { value: "v2", label: "Prototype v2" },
] as const;

export type PrototypeVersion = (typeof PROTOTYPE_VERSIONS)[number]["value"];

export const DEFAULT_PROTOTYPE_VERSION: PrototypeVersion = "v1";
export const PROTOTYPE_STORAGE_KEY = "laser-prototype-version";

export function isPrototypeVersion(value: unknown): value is PrototypeVersion {
  return PROTOTYPE_VERSIONS.some((version) => version.value === value);
}

// Runs in <head> before first paint so the chosen version shows without a flash.
export const prototypeVersionScript = `try{var v=localStorage.getItem("${PROTOTYPE_STORAGE_KEY}");if(v==="v1"||v==="v2")document.documentElement.dataset.prototype=v}catch(e){}`;
