"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";

export default function StartPage() {
  const lang = useLang();
  const [visa, setVisa] = useState<string>("");

  const visaOptions = [
    { value: "E-9", label: TEXTS.visaE9Label[lang], desc: TEXTS.visaE9Desc[lang], icon: "🏭", bg: "bg-pink-50", ring: "ring-pink-300" },
    { value: "E-7-4", label: TEXTS.visaE7Label[lang], desc: TEXTS.visaE7Desc[lang], icon: "🔧", bg: "bg-amber-50", ring: "ring-amber-300" },
    { value: "F-2-R", label: TEXTS.visaF2RLabel[lang], desc: TEXTS.visaF2RDesc[lang], icon: "🏡", bg: "bg-teal-50", ring: "ring-teal-300" },
    { value: "reissue", label: TEXTS.reissueLabel[lang], desc: TEXTS.reissueDesc[lang], icon: "🪪", bg: "bg-blue-50", ring: "ring-blue-300" },
    { value: "passport", label: TEXTS.passportLabel[lang], desc: TEXTS.passportDesc[lang], icon: "📘", bg: "bg-purple-50", ring: "ring-purple-300" },
  ];

  const getNextHref = () => {
    if (visa === "E-9" || visa === "E-7-4" || visa === "F-2-R") return "/start/step2";
    if (visa === "reissue") return "/start/reissue";
    if (visa === "passport") return "/start/passport";
    return null;
  };
  const nextHref = getNextHref();

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader backHref="/" backLabel={TEXTS.back[lang]} />

      <section className="max-w-md md:max-w-3xl mx-auto px-5 pt-6 pb-28">
        <h1 className="text-[24px] font-extrabold text-gray-900 tracking-tight mb-1.5">{TEXTS.visaTitle[lang]}</h1>
        <p className="text-[15px] text-gray-500 font-medium mb-7">{TEXTS.visaSub[lang]}</p>

        <div className="space-y-3">
          {visaOptions.map((option) => {
            const selected = visa === option.value;
            return (
              <button
                key={option.value}
                onClick={() => {
                  setVisa(option.value);
                  localStorage.setItem("answer_visa", option.value);
                }}
                className={`w-full ${option.bg} rounded-[20px] p-5 text-left transition-all flex items-center gap-4 ${
                  selected ? `ring-2 ${option.ring} scale-[1.01]` : "hover:scale-[1.01]"
                }`}
              >
                <span className="text-[34px] flex-shrink-0">{option.icon}</span>
                <div className="flex-1">
                  <p className="text-[18px] font-extrabold text-gray-900 tracking-tight">{option.label}</p>
                  <p className="text-[13px] text-gray-500 font-medium mt-0.5">{option.desc}</p>
                </div>
                {selected && (
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center text-base font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 하단 고정 다음 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4">
        <div className="max-w-md md:max-w-2xl mx-auto">
          {nextHref ? (
            <Link
              href={nextHref}
              className="block w-full text-center py-4 rounded-2xl text-[17px] font-extrabold bg-blue-700 text-white hover:bg-blue-800 transition-colors"
            >
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