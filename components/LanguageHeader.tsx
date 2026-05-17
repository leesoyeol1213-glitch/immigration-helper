"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  backHref?: string;
  backLabel?: string;
}

export default function LanguageHeader({ backHref, backLabel = "이전" }: Props) {
  const [lang, setLang] = useState<"ko" | "en" | "vi">("ko");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "ko" || saved === "en" || saved === "vi") setLang(saved);
  }, []);

  const handleSelect = (code: "ko" | "en" | "vi") => {
    setLang(code);
    localStorage.setItem("lang", code);
    setMenuOpen(false);
    window.dispatchEvent(new Event("languageChange"));
  };

  const flags = { ko: "🇰🇷", en: "🇺🇸", vi: "🇻🇳" };
  const names = { ko: "한국어", en: "English", vi: "Tiếng Việt" };

  return (
    <header className="px-6 py-4 border-b border-gray-100 max-w-2xl mx-auto flex items-center justify-between">
      {backHref ? (
        <Link href={backHref} className="text-sm text-gray-500 hover:text-blue-700">
          ← {backLabel}
        </Link>
      ) : (
        <span></span>
      )}

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors flex items-center gap-1.5"
        >
          <span>{flags[lang]}</span>
          <span>{names[lang]}</span>
          <span className="text-blue-400">▾</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
            {(["ko", "en", "vi"] as const).map((code) => (
              <button
                key={code}
                onClick={() => handleSelect(code)}
                className={`w-full px-4 py-2.5 text-left text-xs hover:bg-blue-50 flex items-center gap-2 ${
                  lang === code ? "bg-blue-50 text-blue-700" : "text-gray-700"
                }`}
              >
                <span>{flags[code]}</span>
                <span>{names[code]}</span>
                {lang === code && <span className="ml-auto text-blue-500">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export function useLang() {
  const [lang, setLang] = useState<"ko" | "en" | "vi">("ko");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "ko" || saved === "en" || saved === "vi") setLang(saved);

    const handler = () => {
      const newLang = localStorage.getItem("lang");
      if (newLang === "ko" || newLang === "en" || newLang === "vi") setLang(newLang);
    };

    window.addEventListener("languageChange", handler);
    return () => window.removeEventListener("languageChange", handler);
  }, []);

  return lang;
}