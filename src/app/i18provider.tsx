// src/app/i18n-provider.tsx
"use client";
import "./lib/i18n"; // ✅ load i18n on client only
import { ReactNode } from "react";

export function I18nProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
