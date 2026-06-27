import { ROUTE_LABELS } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Extracts the EU size from a name like "Air Max (EU 42)" → { baseName: "Air Max", size: "EU 42" } */
export function parseNameAndSize(title: string): { baseName: string; size: string | null } {
  const match = title.match(/^(.+?)\s*\(EU\s*(\d+)\)$/);
  if (match) {
    return { baseName: match[1].trim(), size: `EU ${match[2]}` };
  }
  return { baseName: title, size: null };
}

// ── Page number builder with ellipsis ─────────────────
export function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i);
  const pages: (number | '...')[] = [0];
  if (current > 2) pages.push('...');
  const start = Math.max(1, current - 1);
  const end = Math.min(total - 2, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 3) pages.push('...');
  pages.push(total - 1);
  return pages;
}

// ── Status badge styles ────────────────────────────────
export const STATUS_STYLES: Record<string, string> = {
  Shipped: 'bg-green-50 text-green-700 border border-green-200/50',
  Processing: 'bg-blue-50 text-blue-700 border border-blue-200/50',
  Pending: 'bg-orange-50/70 text-orange-700 border border-orange-200/50',
};

export function getPageTitle(pathname: string): string {
  if (ROUTE_LABELS[pathname]) return ROUTE_LABELS[pathname];

  const dynamicMatch = Object.entries(ROUTE_LABELS)
    .filter(([key]) => key.includes('['))
    .sort(([a], [b]) => b.length - a.length)
    .find(([key]) => new RegExp(`^${key.replace(/\[.*?\]/g, '[^/]+')}$`).test(pathname));

  if (dynamicMatch) return dynamicMatch[1];

  const segment = pathname.split('/').filter(Boolean).pop() ?? '';
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
