"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";

export default function Step4Page() {
  const lang = useLang();
  const [addressChanged, setAddressChanged] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("answer_address");
    if (saved) setAddressChanged(saved);
  }, []);

  const handleSelect = (value: string) => {
    setAddressChanged(value);
    localStorage.setItem("answer_address", value);
  };

  const options = [
    { value: "same", label: TEXTS.addressSame[lang], desc: TEXTS.addressSameDesc[lang] },
    { value: "changed", label: TEXTS.addressChanged[lang], desc: TEXTS.addressChangedDesc[lang] },
  ];

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader backHref="/start/step3" backLabel={TEXTS.prev[lang]} />

      <div className="max-w-2xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>4 / 5</span><span>·</span><span>{TEXTS.addressStep[lang]}</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "80%" }}></div>
        </div>
      </div>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2 whitespace-pre-line">{TEXTS.addressTitle[lang]}</h1>
        <p className="text-sm text-gray-500 mb-2">{TEXTS.addressSub[lang]}</p>
        <div className="inline-block px-3 py-1 bg-blue-50 rounded-full mb-6">
          <p className="text-xs text-blue-700">{TEXTS.why[lang]} {TEXTS.addressWhy[lang]}</p>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <button key={option.value} onClick={() => handleSelect(option.value)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                addressChanged === option.value ? "border-blue-700 bg-blue-50" : "border-gray-200 hover:border-blue-300"
              }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                </div>
                {addressChanged === option.value && <span className="text-blue-700 text-lg">✓</span>}
              </div>
            </button>
          ))}
        </div>

        {addressChanged === "changed" && (
          <>
            <div className="mt-4 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
              <p className="text-sm font-medium text-amber-900 mb-2">{TEXTS.addressDeadlineTitle[lang]}</p>
              <p className="text-xs text-amber-800 leading-relaxed whitespace-pre-line mb-3">{TEXTS.addressDeadlineDesc[lang]}</p>
              <Link href="/change-report" className="inline-block px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-lg transition-colors">
                {TEXTS.addressDeadlineGuide[lang]}
              </Link>
            </div>
            <div className="mt-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-xs text-blue-700 leading-relaxed whitespace-pre-line">{TEXTS.addressDoc[lang]}</p>
            </div>
          </>
        )}

        <div className="mt-8">
          {addressChanged ? (
            <Link href="/start/step5" className="block w-full px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors text-center">
              {TEXTS.next[lang]}
            </Link>
          ) : (
            <button disabled className="w-full px-6 py-3 rounded-xl font-medium text-sm bg-gray-100 text-gray-400 cursor-not-allowed">
              {TEXTS.next[lang]}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}