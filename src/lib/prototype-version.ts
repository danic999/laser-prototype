export const PROTOTYPE_VERSIONS = [
  { value: "v1", label: "Prototype v1" },
  { value: "v2", label: "Prototype v2" },
  { value: "v3", label: "Prototype v3" },
] as const;

export type PrototypeVersion = (typeof PROTOTYPE_VERSIONS)[number]["value"];

export const DEFAULT_PROTOTYPE_VERSION: PrototypeVersion = "v1";
export const PROTOTYPE_STORAGE_KEY = "laser-prototype-version";

export function isPrototypeVersion(value: unknown): value is PrototypeVersion {
  return PROTOTYPE_VERSIONS.some((version) => version.value === value);
}

// Runs in <head> before first paint so the chosen version shows without a flash.
const versionValues = JSON.stringify(PROTOTYPE_VERSIONS.map((version) => version.value));
export const prototypeVersionScript = `try{var v=localStorage.getItem("${PROTOTYPE_STORAGE_KEY}");if(${versionValues}.indexOf(v)>-1)document.documentElement.dataset.prototype=v}catch(e){}`;
