import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function flattenSlug(slug: string[]): string {
  return '/docs/' + slug.join('/');
}

export function formatTitle(name: string) {
  const withSpaces = name.replace(/-/g, ' ');
  return withSpaces.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
