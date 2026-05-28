"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";

export default function Step3Page() {
  const lang = useLang();
  const [companyChanged, setCompanyChanged] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("answer_company");
    if (saved) setCompanyChanged(saved);
  }, []);

  const handleSelect = (value: string) => {
    setCompanyChanged(value);
    localStorage.setItem("answer_company", value);
  };

  const options = [
    { value: "same", label: TEXTS.companySame[lang], desc: TEXTS.companySameDesc[lang] },
    { value: "changed", label: TEXTS.companyChanged[lang], desc: TEXTS.companyChangedDesc[lang] },
  ];

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader backHref="/start/step2" backLabel={TEXTS.prev[lang]} />

      <div className="max-w-2xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>3 / 5</span><span>·</span><span>{TEXTS.companyStep[lang]}</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "60%" }}></div>
        </div>
      </div>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2 whitespace-pre-line">{TEXTS.companyTitle[lang]}</h1>
        <p className="text-sm text-gray-500 mb-2">{TEXTS.companySub[lang]}</p>
        <div className="inline-block px-3 py-1 bg-blue-50 rounded-full mb-6">
          <p className="text-xs text-blue-700">{TEXTS.why[lang]} {TEXTS.companyWhy[lang]}</p>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <button key={option.value} onClick={() => handleSelect(option.value)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                companyChanged === option.value ? "border-blue-700 bg-blue-50" : "border-gray-200 hover:border-blue-300"
              }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                </div>
                {companyChanged === option.value && <span className="text-blue-700 text-lg">✓</span>}
              </div>
            </button>
          ))}
        </div>

        {companyChanged === "changed" && (
          <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <p className="text-sm font-medium text-red-900 mb-2">{TEXTS.companyBlockedTitle[lang]}</p>
            <p className="text-xs text-red-700 leading-relaxed whitespace-pre-line mb-3">{TEXTS.companyBlockedDesc[lang]}</p>
            <Link href="/change-report" className="inline-block px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors">
              {TEXTS.companyBlockedGuide[lang]}
            </Link>
          </div>
        )}

        <div className="mt-8">
          {companyChanged === "same" ? (
            <Link href="/start/step4" className="block w-full px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors text-center">
              {TEXTS.next[lang]}
            </Link>
          ) : (
            <button disabled className="w-full px-6 py-3 rounded-xl font-medium text-sm bg-gray-100 text-gray-400 cursor-not-allowed">
              {companyChanged === "changed" ? TEXTS.companyBlocked[lang] : TEXTS.next[lang]}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}