"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";

type Tab = "workplace" | "address" | "passport";

export default function ChangeReportPage() {
  const lang = useLang() || "ko";
  const [tab, setTab] = useState<Tab>("workplace");

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "workplace", label: TEXTS.crTabWorkplace[lang], icon: "🏢" },
    { key: "address", label: TEXTS.crTabAddress[lang], icon: "🏠" },
    { key: "passport", label: TEXTS.crTabPassport[lang], icon: "📘" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader backHref="/" backLabel={TEXTS.prev[lang]} />

      <section className="max-w-md md:max-w-2xl mx-auto px-5 pt-6 pb-16">
        {/* 헤더 */}
        <p className="text-[13px] font-bold text-blue-700 mb-2">{TEXTS.crTag[lang]}</p>
        <h1 className="text-[26px] font-extrabold text-gray-900 tracking-tight mb-2">{TEXTS.crTitle[lang]}</h1>
        <p className="text-[14px] text-gray-500 font-medium mb-7">{TEXTS.crSub[lang]}</p>

        {/* 탭 */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-1.5 rounded-2xl">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 px-2 py-3 text-[14px] font-extrabold rounded-xl transition-colors ${
                tab === t.key
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="mr-1">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* 사업장 변경 */}
        {tab === "workplace" && (
          <div className="space-y-3">
            <InfoRow label={TEXTS.crWhere[lang]} value={TEXTS.crWpWhere[lang]} icon="📍" />
            <InfoRow label={TEXTS.crDeadline[lang]} value={TEXTS.crWpDeadline[lang]} icon="⏰" />
            <InfoRow label={TEXTS.crDocs[lang]} value={TEXTS.crWpDocs[lang]} icon="📋" />
            <WarnBox text={TEXTS.crWpWarn[lang]} />
            <p className="text-[13px] text-gray-500 leading-relaxed">{TEXTS.crWpNote[lang]}</p>
          </div>
        )}

        {/* 거주지 변경 */}
        {tab === "address" && (
          <div className="space-y-3">
            <InfoRow label={TEXTS.crWhere[lang]} value={TEXTS.crAdWhere[lang]} icon="📍" />
            <InfoRow label={TEXTS.crDeadline[lang]} value={TEXTS.crAdDeadline[lang]} icon="⏰" />
            <InfoRow label={TEXTS.crDocs[lang]} value={TEXTS.crAdDocs[lang]} icon="📋" />
            <WarnBox text={TEXTS.crAdWarn[lang]} />
            <p className="text-[13px] text-gray-500 leading-relaxed">{TEXTS.crAdLaw[lang]}</p>
          </div>
        )}

        {/* 여권 변경 */}
        {tab === "passport" && (
          <div className="space-y-3">
            <InfoRow label={TEXTS.crWhere[lang]} value={TEXTS.crPpWhere[lang]} icon="📍" />
            <InfoRow label={TEXTS.crDeadline[lang]} value={TEXTS.crPpDeadline[lang]} icon="⏰" />
            <InfoRow label={TEXTS.crDocs[lang]} value={TEXTS.crPpDocs[lang]} icon="📋" />
            <p className="text-[13px] text-gray-500 leading-relaxed">{TEXTS.crPpNote[lang]}</p>
          </div>
        )}

        {/* 공통 안내 */}
        <div className="mt-7 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
          <p className="text-[13px] text-amber-800 leading-relaxed">
            <strong>{TEXTS.crCommonTitle[lang]}</strong> {TEXTS.crCommonDesc[lang]}
          </p>
        </div>

        <Link href="/start" className="block mt-6 w-full text-center py-4 rounded-2xl font-extrabold text-[16px] bg-blue-700 text-white hover:bg-blue-800 transition-colors">
          {TEXTS.crCTA[lang]}
        </Link>
      </section>
    </main>
  );
}

function InfoRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <p className="text-[13px] font-bold text-blue-700 mb-1">{label}</p>
        <p className="text-[15px] text-gray-900 leading-relaxed whitespace-pre-line">{value}</p>
      </div>
    </div>
  );
}

function WarnBox({ text }: { text: string }) {
  return (
    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-2xl">
      <p className="text-[14px] text-red-800 leading-relaxed font-medium">⚠️ {text}</p>
    </div>
  );
}