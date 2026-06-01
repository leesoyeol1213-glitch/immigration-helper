"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lang, LANG_INFO } from "@/lib/i18n";

interface Props {
  backHref?: string;
  backLabel?: string;
  onBack?: () => void;
}

export default function LanguageHeader({ backHref, backLabel = "이전", onBack }: Props) {
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
    <header className="px-5 py-4 border-b border-gray-100 max-w-md md:max-w-2xl mx-auto flex items-center justify-between">
      {onBack ? (
        <button onClick={onBack} className="text-[14px] font-bold text-gray-600 hover:text-blue-700 transition-colors flex items-center gap-1">
          <span className="text-lg">←</span> {backLabel}
        </button>
      ) : backHref ? (
        <Link href={backHref} className="text-[14px] font-bold text-gray-600 hover:text-blue-700 transition-colors flex items-center gap-1">
          <span className="text-lg">←</span> {backLabel}
        </Link>
      ) : (
        <Link href="/" className="text-[18px] font-extrabold tracking-tight">
          <span className="text-blue-700">서류</span>도우미
        </Link>
      )}

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[13px] font-bold px-3.5 py-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1.5"
        >
          <span>{LANG_INFO[lang].flag}</span>
          <span>{LANG_INFO[lang].name}</span>
          <span className="text-blue-400">▾</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
            {(Object.keys(LANG_INFO) as Lang[]).map((code) => (
              <button
                key={code}
                onClick={() => handleSelect(code)}
                className={`w-full px-4 py-3 text-left text-[13px] font-medium hover:bg-blue-50 flex items-center gap-2 ${
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