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

      <div className="max-w-2xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>2 / 5</span><span>·</span><span>{TEXTS.expiryStep[lang]}</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "40%" }}></div>
        </div>
      </div>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">{TEXTS.expiryTitle[lang]}</h1>
        <p className="text-sm text-gray-500 mb-2">{TEXTS.expirySub[lang]}</p>
        <div className="inline-block px-3 py-1 bg-blue-50 rounded-full mb-6">
          <p className="text-xs text-blue-700">{TEXTS.why[lang]} {TEXTS.expiryWhy[lang]}</p>
        </div>

        <div className="mb-6">
          <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full p-4 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
        </div>

        {warning && (
          <div className={`p-4 rounded-xl border-l-4 mb-6 ${
            warning.type === "danger" ? "bg-red-50 border-red-500"
            : warning.type === "warning" ? "bg-amber-50 border-amber-500"
            : "bg-blue-50 border-blue-500"
          }`}>
            <p className={`text-sm font-medium mb-1 ${
              warning.type === "danger" ? "text-red-900"
              : warning.type === "warning" ? "text-amber-900"
              : "text-blue-900"
            }`}>{warning.title}</p>
            <p className={`text-xs leading-relaxed ${
              warning.type === "danger" ? "text-red-700"
              : warning.type === "warning" ? "text-amber-700"
              : "text-blue-700"
            }`}>{warning.message}</p>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-6 flex items-center gap-2">
          <span className="text-base">🔒</span>
          <p className="text-xs text-gray-600">{TEXTS.noSave[lang]}</p>
        </div>

        {expiryDate ? (
          <Link href="/start/step3" className="block w-full px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors text-center">
            {TEXTS.next[lang]}
          </Link>
        ) : (
          <button disabled className="w-full px-6 py-3 rounded-xl font-medium text-sm bg-gray-100 text-gray-400 cursor-not-allowed">
            {TEXTS.next[lang]}
          </button>
        )}
      </section>
    </main>
  );
}