import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



/** Extracts the EU size from a name like "Air Max (EU 42)" → { baseName: "Air Max", size: "EU 42" } */
export function parseNameAndSize(title: string): { baseName: string; size: string | null } {
  const match = title.match(/^(.+?)\s*\(EU\s*(\d+)\)$/);
  if (match) {
    return { baseName: match[1].trim(), size: `EU ${match[2]}` };
  }
  return { baseName: title, size: null };
}