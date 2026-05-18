"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lang, LANG_INFO } from "@/lib/i18n";

interface Props {
  backHref?: string;
  backLabel?: string;
}

export default function LanguageHeader({ backHref, backLabel = "이전" }: Props) {
  const [lang, setLang] = useState<Lang>("ko");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && saved in LANG_INFO) setLang(saved);
  }, []);

  const handleSelect = (code: Lang) => {
    setLang(code);
    localStorage.setItem("lang", code);
    setMenuOpen(false);
    window.dispatchEvent(new Event("languageChange"));
  };

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
          <span>{LANG_INFO[lang].flag}</span>
          <span>{LANG_INFO[lang].name}</span>
          <span className="text-blue-400">▾</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
            {(Object.keys(LANG_INFO) as Lang[]).map((code) => (
              <button
                key={code}
                onClick={() => handleSelect(code)}
                className={`w-full px-4 py-2.5 text-left text-xs hover:bg-blue-50 flex items-center gap-2 ${
                  lang === code ? "bg-blue-50 text-blue-700" : "text-gray-700"
                }`}
              >
                <span>{LANG_INFO[code].flag}</span>
                <span>{LANG_INFO[code].name}</span>
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
  const [lang, setLang] = useState<Lang>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && saved in LANG_INFO) setLang(saved);

    const handler = () => {
      const newLang = localStorage.getItem("lang") as Lang | null;
      if (newLang && newLang in LANG_INFO) setLang(newLang);
    };

    window.addEventListener("languageChange", handler);
    return () => window.removeEventListener("languageChange", handler);
  }, []);

  return lang;
}