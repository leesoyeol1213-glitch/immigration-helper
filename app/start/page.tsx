"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";

export default function StartPage() {
  const lang = useLang();
  const [visa, setVisa] = useState<string>("");

  const visaOptions = [
  { value: "E-9", label: TEXTS.visaE9Label[lang], desc: TEXTS.visaE9Desc[lang] },
  { value: "E-7", label: TEXTS.visaE7Label[lang], desc: TEXTS.visaE7Desc[lang] },
  { value: "F-2-R", label: TEXTS.visaF2RLabel[lang], desc: TEXTS.visaF2RDesc[lang] },
  { value: "D-2", label: TEXTS.visaD2Label[lang], desc: TEXTS.visaD2Desc[lang] },
  { value: "reissue", label: TEXTS.reissueLabel[lang], desc: TEXTS.reissueDesc[lang] },
];

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader backHref="/" backLabel={TEXTS.back[lang]} />

      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">{TEXTS.visaTitle[lang]}</h1>
        <p className="text-sm text-gray-500 mb-8">{TEXTS.visaSub[lang]}</p>

        <div className="space-y-3">
          {visaOptions.map((option) => (
            <button key={option.value} onClick={() => {
  setVisa(option.value);
  localStorage.setItem("answer_visa", option.value);
}}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                visa === option.value ? "border-blue-700 bg-blue-50" : "border-gray-200 hover:border-blue-300"
              }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                </div>
                {visa === option.value && <span className="text-blue-700 text-lg">✓</span>}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8">
     {(visa === "E-9" || visa === "E-7" || visa === "F-2-R" || visa === "D-2") ? (
  <Link href="/start/step2" className="w-full inline-block text-center px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors">
    {TEXTS.next[lang]}
  </Link>
) : visa === "reissue" ? (
  <Link href="/start/reissue" className="w-full inline-block text-center px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors">
    {TEXTS.next[lang]}
  </Link>
) : (
  <button disabled className="w-full px-6 py-3 rounded-xl font-medium text-sm bg-gray-100 text-gray-400 cursor-not-allowed">
    {TEXTS.visaOtherWarn[lang]}
  </button>
)}
        </div>

        {visa === "other" && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
            <p className="text-xs text-amber-800">{TEXTS.visaOtherWarn[lang]}</p>
          </div>
        )}
      </section>
    </main>
  );
}