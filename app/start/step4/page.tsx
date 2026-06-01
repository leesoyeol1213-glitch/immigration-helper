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

      {/* 진행바 */}
      <div className="max-w-md md:max-w-2xl mx-auto px-5 pt-5">
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-2">
          <span className="text-blue-700">4 / 5</span><span>·</span><span>{TEXTS.addressStep[lang]}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "80%" }}></div>
        </div>
      </div>

      <section className="max-w-md md:max-w-2xl mx-auto px-5 pt-7 pb-28">
        <h1 className="text-[24px] font-extrabold text-gray-900 tracking-tight mb-1.5 whitespace-pre-line">{TEXTS.addressTitle[lang]}</h1>
        <p className="text-[15px] text-gray-500 font-medium mb-3">{TEXTS.addressSub[lang]}</p>
        <div className="inline-block px-3.5 py-1.5 bg-blue-50 rounded-full mb-7">
          <p className="text-[12px] font-bold text-blue-700">{TEXTS.why[lang]} {TEXTS.addressWhy[lang]}</p>
        </div>

        <div className="space-y-3">
          {options.map((option) => {
            const selected = addressChanged === option.value;
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

        {addressChanged === "changed" && (
          <>
            <div className="mt-5 p-5 bg-amber-50 border-2 border-amber-200 rounded-3xl">
              <p className="text-[15px] font-extrabold text-amber-900 mb-2">{TEXTS.addressDeadlineTitle[lang]}</p>
              <p className="text-[13px] text-amber-800 leading-relaxed whitespace-pre-line mb-4">{TEXTS.addressDeadlineDesc[lang]}</p>
              <Link href="/change-report" className="inline-block px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white text-[14px] font-extrabold rounded-2xl transition-colors">
                {TEXTS.addressDeadlineGuide[lang]}
              </Link>
            </div>
            <div className="mt-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
              <p className="text-[13px] text-blue-700 leading-relaxed whitespace-pre-line">{TEXTS.addressDoc[lang]}</p>
            </div>
          </>
        )}
      </section>

      {/* 하단 고정 다음 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4">
        <div className="max-w-md md:max-w-2xl mx-auto">
          {addressChanged ? (
            <Link href="/start/step5" className="block w-full text-center py-4 rounded-2xl text-[17px] font-extrabold bg-blue-700 text-white hover:bg-blue-800 transition-colors">
              {TEXTS.next[lang]}
            </Link>
          ) : (
            <button disabled className="w-full py-4 rounded-2xl text-[17px] font-extrabold bg-gray-100 text-gray-400 cursor-not-allowed">
              {TEXTS.next[lang]}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}