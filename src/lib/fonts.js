/**
 * Font configuration and utilities
 * Centralized font management for the application
 * Only preloads the font for the active locale to reduce render-blocking.
 */

import { Poppins, Cairo } from "next/font/google";

export const poppins = Poppins({
  display: "swap",
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

export const cairo = Cairo({
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: true,
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

/**
 * Get font variables (both needed for CSS variable definitions)
 */
export function getFontVariable(locale) {
  return `${cairo.variable} ${poppins.variable}`;
}

/**
 * Get the locale-specific font class name
 */
export function getFontClassName(locale) {
  return locale === "ar" ? "font-cairo" : "font-poppins";
}

/**
 * Get only the locale-appropriate font for preloading
 */
export function getActiveFont(locale) {
  return locale === "ar" ? cairo : poppins;
}
