"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";

export default function ReissuePage() {
  const lang = useLang();
  const [reason, setReason] = useState<string>("");

  const reasonOptions = [
    { value: "lost", icon: "🚨", label: TEXTS.reasonLost[lang], desc: TEXTS.reasonLostDesc[lang] },
    { value: "damaged", icon: "💔", label: TEXTS.reasonDamaged[lang], desc: TEXTS.reasonDamagedDesc[lang] },
    { value: "info", icon: "✏️", label: TEXTS.reasonInfo[lang], desc: TEXTS.reasonInfoDesc[lang] },
  ];

  const handleNext = () => {
    if (!reason) return;
    localStorage.setItem("answer_reissue_reason", reason);
    window.location.href = "/start/step5";
  };

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader backHref="/start" backLabel={TEXTS.prev[lang]} />

      <div className="max-w-2xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>1 / 2</span><span>·</span><span>{TEXTS.reissueStep[lang]}</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "50%" }}></div>
        </div>
      </div>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">{TEXTS.reissueTitle[lang]}</h1>
        <p className="text-sm text-gray-500 mb-6">{TEXTS.reissueSub[lang]}</p>

        <div className="space-y-3 mb-6">
          {reasonOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setReason(option.value)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                reason === option.value
                  ? "border-blue-700 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{option.icon}</span>
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-900">{option.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                </div>
                {reason === option.value && (
                  <span className="text-blue-700">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* 분실 시 경고 */}
        {reason === "lost" && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
            <p className="text-sm font-medium text-red-900 mb-1">{TEXTS.lostWarnTitle[lang]}</p>
            <p className="text-xs text-red-700 leading-relaxed">{TEXTS.lostWarnDesc[lang]}</p>
          </div>
        )}

        {reason ? (
          <button onClick={handleNext} className="w-full px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors">
            {TEXTS.next[lang]}
          </button>
        ) : (
          <button disabled className="w-full px-6 py-3 rounded-xl font-medium text-sm bg-gray-100 text-gray-400 cursor-not-allowed">
            {TEXTS.selectReason[lang]}
          </button>
        )}
      </section>
    </main>
  );
}