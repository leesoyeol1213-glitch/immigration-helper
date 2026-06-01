"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";

export default function Step2Page() {
  const lang = useLang();
  const [expiryDate, setExpiryDate] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("answer_expiry");
    if (saved) setExpiryDate(saved);
  }, []);

  useEffect(() => {
    if (expiryDate) localStorage.setItem("answer_expiry", expiryDate);
  }, [expiryDate]);

  const today = new Date();
  const expiry = expiryDate ? new Date(expiryDate) : null;
  const daysLeft = expiry
    ? Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const getWarning = () => {
    if (daysLeft === null) return null;
    if (daysLeft < 0) return { type: "danger", title: TEXTS.expired[lang], message: TEXTS.expiredDesc[lang] };
    if (daysLeft < 30) return { type: "warning", title: TEXTS.daysLeft[lang](daysLeft), message: TEXTS.urgent[lang] };
    if (daysLeft < 60) return { type: "info", title: TEXTS.daysLeft[lang](daysLeft), message: TEXTS.soon[lang] };
    return { type: "info", title: TEXTS.daysLeft[lang](daysLeft), message: TEXTS.enough[lang] };
  };
  const warning = getWarning();

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader backHref="/start" backLabel={TEXTS.prev[lang]} />

      {/* 진행바 */}
      <div className="max-w-md md:max-w-2xl mx-auto px-5 pt-5">
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-2">
          <span className="text-blue-700">2 / 5</span><span>·</span><span>{TEXTS.expiryStep[lang]}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "40%" }}></div>
        </div>
      </div>

      <section className="max-w-md md:max-w-2xl mx-auto px-5 pt-7 pb-28">
        <h1 className="text-[24px] font-extrabold text-gray-900 tracking-tight mb-1.5">{TEXTS.expiryTitle[lang]}</h1>
        <p className="text-[15px] text-gray-500 font-medium mb-3">{TEXTS.expirySub[lang]}</p>
        <div className="inline-block px-3.5 py-1.5 bg-blue-50 rounded-full mb-7">
          <p className="text-[12px] font-bold text-blue-700">{TEXTS.why[lang]} {TEXTS.expiryWhy[lang]}</p>
        </div>

        <div className="mb-6">
          <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full p-4 text-[17px] font-medium border-2 border-gray-200 rounded-2xl focus:border-blue-700 focus:outline-none" />
        </div>

        {warning && (
          <div className={`p-4 rounded-2xl border-l-4 mb-6 ${
            warning.type === "danger" ? "bg-red-50 border-red-500"
            : warning.type === "warning" ? "bg-amber-50 border-amber-500"
            : "bg-blue-50 border-blue-500"
          }`}>
            <p className={`text-[16px] font-extrabold mb-1 ${
              warning.type === "danger" ? "text-red-900"
              : warning.type === "warning" ? "text-amber-900"
              : "text-blue-900"
            }`}>{warning.title}</p>
            <p className={`text-[13px] leading-relaxed ${
              warning.type === "danger" ? "text-red-700"
              : warning.type === "warning" ? "text-amber-700"
              : "text-blue-700"
            }`}>{warning.message}</p>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-2.5">
          <span className="text-lg">🔒</span>
          <p className="text-[12px] text-gray-600">{TEXTS.noSave[lang]}</p>
        </div>
      </section>

      {/* 하단 고정 다음 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4">
        <div className="max-w-md md:max-w-2xl mx-auto">
          {expiryDate ? (
            <Link href="/start/step3" className="block w-full text-center py-4 rounded-2xl text-[17px] font-extrabold bg-blue-700 text-white hover:bg-blue-800 transition-colors">
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