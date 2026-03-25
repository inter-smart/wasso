/**
 * Font configuration and utilities
 * Centralized font management for the application
 */

import { Poppins, Cairo } from "next/font/google";

// Poppins font for English routes
export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

// Cairo font for Arabic routes - commonly used free Arabic font
export const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: true,
});

/**
 * Get the appropriate font variable based on locale
 * @param {string} locale - The locale code ('en' or 'ar')
 * @returns {string} Font variable class name
 */
export function getFontVariable(locale) {
  return `${cairo.variable} ${poppins.variable}`;
}

/**
 * Get the appropriate font class name based on locale
 * @param {string} locale - The locale code ('en' or 'ar')
 * @returns {string} Font class name
 */
export function getFontClassName(locale) {
  return locale === "ar" ? "font-cairo" : "font-poppins";
}
