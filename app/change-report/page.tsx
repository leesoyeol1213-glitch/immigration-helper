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

      <section className="max-w-2xl mx-auto px-6 py-10">
        {/* 헤더 */}
        <p className="text-xs font-medium text-blue-700 mb-2">{TEXTS.crTag[lang]}</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{TEXTS.crTitle[lang]}</h1>
        <p className="text-sm text-gray-500 mb-8">{TEXTS.crSub[lang]}</p>

        {/* 탭 */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? "border-blue-700 text-blue-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="mr-1">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* 사업장 변경 */}
        {tab === "workplace" && (
          <div className="space-y-4">
            <InfoRow label={TEXTS.crWhere[lang]} value={TEXTS.crWpWhere[lang]} icon="📍" />
            <InfoRow label={TEXTS.crDeadline[lang]} value={TEXTS.crWpDeadline[lang]} icon="⏰" />
            <InfoRow label={TEXTS.crDocs[lang]} value={TEXTS.crWpDocs[lang]} icon="📋" />
            <WarnBox text={TEXTS.crWpWarn[lang]} />
            <p className="text-xs text-gray-500 leading-relaxed">{TEXTS.crWpNote[lang]}</p>
          </div>
        )}

        {/* 거주지 변경 */}
        {tab === "address" && (
          <div className="space-y-4">
            <InfoRow label={TEXTS.crWhere[lang]} value={TEXTS.crAdWhere[lang]} icon="📍" />
            <InfoRow label={TEXTS.crDeadline[lang]} value={TEXTS.crAdDeadline[lang]} icon="⏰" />
            <InfoRow label={TEXTS.crDocs[lang]} value={TEXTS.crAdDocs[lang]} icon="📋" />
            <WarnBox text={TEXTS.crAdWarn[lang]} />
            <p className="text-xs text-gray-500 leading-relaxed">{TEXTS.crAdLaw[lang]}</p>
          </div>
        )}

        {/* 여권 변경 */}
        {tab === "passport" && (
          <div className="space-y-4">
            <InfoRow label={TEXTS.crWhere[lang]} value={TEXTS.crPpWhere[lang]} icon="📍" />
            <InfoRow label={TEXTS.crDeadline[lang]} value={TEXTS.crPpDeadline[lang]} icon="⏰" />
            <InfoRow label={TEXTS.crDocs[lang]} value={TEXTS.crPpDocs[lang]} icon="📋" />
            <p className="text-xs text-gray-500 leading-relaxed">{TEXTS.crPpNote[lang]}</p>
          </div>
        )}

        {/* 공통 안내 */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>{TEXTS.crCommonTitle[lang]}</strong> {TEXTS.crCommonDesc[lang]}
          </p>
        </div>

        <Link href="/start" className="block mt-6 w-full px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors text-center">
          {TEXTS.crCTA[lang]}
        </Link>
      </section>
    </main>
  );
}

function InfoRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <p className="text-xs font-medium text-blue-700 mb-1">{label}</p>
        <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">{value}</p>
      </div>
    </div>
  );
}

function WarnBox({ text }: { text: string }) {
  return (
    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
      <p className="text-sm text-red-800 leading-relaxed">⚠️ {text}</p>
    </div>
  );
}