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

      {/* 진행바 */}
      <div className="max-w-md md:max-w-2xl mx-auto px-5 pt-5">
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-2">
          <span className="text-blue-700">3 / 5</span><span>·</span><span>{TEXTS.companyStep[lang]}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "60%" }}></div>
        </div>
      </div>

      <section className="max-w-md md:max-w-2xl mx-auto px-5 pt-7 pb-28">
        <h1 className="text-[24px] font-extrabold text-gray-900 tracking-tight mb-1.5 whitespace-pre-line">{TEXTS.companyTitle[lang]}</h1>
        <p className="text-[15px] text-gray-500 font-medium mb-3">{TEXTS.companySub[lang]}</p>
        <div className="inline-block px-3.5 py-1.5 bg-blue-50 rounded-full mb-7">
          <p className="text-[12px] font-bold text-blue-700">{TEXTS.why[lang]} {TEXTS.companyWhy[lang]}</p>
        </div>

        <div className="space-y-3">
          {options.map((option) => {
            const selected = companyChanged === option.value;
            return (
              <button key={option.value} onClick={() => handleSelect(option.value)}
                className={`w-full rounded-[20px] p-5 text-left transition-all flex items-center gap-3 ${
                  selected ? "bg-blue-50 ring-2 ring-blue-300 scale-[1.01]" : "bg-gray-50 hover:bg-gray-100"
                }`}>
                <div className="flex-1">
                  <p className="text-[17px] font-extrabold text-gray-900 tracking-tight">{option.label}</p>
                  <p className="text-[13px] text-gray-500 font-medium mt-0.5">{option.desc}</p>
                </div>
                {selected && (
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center text-base font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {companyChanged === "changed" && (
          <div className="mt-5 p-5 bg-red-50 border-2 border-red-200 rounded-3xl">
            <p className="text-[15px] font-extrabold text-red-900 mb-2">{TEXTS.companyBlockedTitle[lang]}</p>
            <p className="text-[13px] text-red-700 leading-relaxed whitespace-pre-line mb-4">{TEXTS.companyBlockedDesc[lang]}</p>
            <Link href="/change-report" className="inline-block px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-[14px] font-extrabold rounded-2xl transition-colors">
              {TEXTS.companyBlockedGuide[lang]}
            </Link>
          </div>
        )}
      </section>

      {/* 하단 고정 다음 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4">
        <div className="max-w-md md:max-w-2xl mx-auto">
          {companyChanged === "same" ? (
            <Link href="/start/step4" className="block w-full text-center py-4 rounded-2xl text-[17px] font-extrabold bg-blue-700 text-white hover:bg-blue-800 transition-colors">
              {TEXTS.next[lang]}
            </Link>
          ) : (
            <button disabled className="w-full py-4 rounded-2xl text-[17px] font-extrabold bg-gray-100 text-gray-400 cursor-not-allowed">
              {companyChanged === "changed" ? TEXTS.companyBlocked[lang] : TEXTS.next[lang]}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}