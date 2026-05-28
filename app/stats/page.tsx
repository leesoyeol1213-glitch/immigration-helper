"use client";

import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";
import { REGION_DATA, NATIONALITY_DATA, VISA_DATA, STATS_META } from "@/lib/stats";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function StatsPage() {
  const lang = useLang() || "ko";

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader backHref="/" backLabel={TEXTS.prev[lang]} />

      <section className="max-w-3xl mx-auto px-6 py-10">
        {/* 헤더 */}
        <div className="mb-8">
          <p className="text-xs font-medium text-blue-700 mb-2">{TEXTS.statsTag[lang]}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {TEXTS.statsTitle[lang]}
          </h1>
          <p className="text-sm text-gray-500">{TEXTS.statsSub[lang]}</p>
        </div>

        {/* 하이라이트 숫자 */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{STATS_META.totalForeigners.toLocaleString()}</p>
            <p className="text-xs text-blue-600 mt-1">{TEXTS.statsTotal[lang]}</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{STATS_META.foreignerRatio}%</p>
            <p className="text-xs text-blue-600 mt-1">{TEXTS.statsRatio[lang]}</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{STATS_META.cityCount}</p>
            <p className="text-xs text-blue-600 mt-1">{TEXTS.statsCities[lang]}</p>
          </div>
        </div>

        {/* 1. 시군별 분포 */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-1">📍 {TEXTS.statsRegionTitle[lang]}</h2>
          <p className="text-xs text-gray-500 mb-4">{TEXTS.statsRegionDesc[lang]}</p>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={REGION_DATA} layout="vertical" margin={{ left: 10, right: 30 }}>
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={60} />
                <Tooltip formatter={(v) => `${Number(v).toLocaleString()}명`} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {REGION_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.isReduction ? "#f59e0b" : entry.isInterest ? "#fb923c" : "#1d4ed8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-700 inline-block rounded"></span>{TEXTS.statsNormal[lang]}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 inline-block rounded"></span>{TEXTS.statsInterest[lang]}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-500 inline-block rounded"></span>{TEXTS.statsReduction[lang]}</span>
            </div>
          </div>
        </div>

        {/* 2. 국적별 분포 */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-1">🌏 {TEXTS.statsNationTitle[lang]}</h2>
          <p className="text-xs text-gray-500 mb-4">{TEXTS.statsNationDesc[lang]}</p>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={NATIONALITY_DATA} layout="vertical" margin={{ left: 10, right: 30 }}>
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={90} />
                <Tooltip formatter={(v) => `${Number(v).toLocaleString()}명`} />
                <Bar dataKey="count" fill="#1d4ed8" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-blue-600 mt-3 bg-blue-50 p-2 rounded">
              💡 {TEXTS.statsNationInsight[lang]}
            </p>
          </div>
        </div>

        {/* 3. 비자별 (전국) */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-1">📋 {TEXTS.statsVisaTitle[lang]}</h2>
          <p className="text-xs text-gray-500 mb-4">{TEXTS.statsVisaDesc[lang]}</p>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={VISA_DATA} margin={{ bottom: 30 }}>
                <XAxis dataKey="code" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => `${Number(v).toLocaleString()}명`} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {VISA_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.ours ? "#1d4ed8" : "#cbd5e1"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-700 inline-block rounded"></span>{TEXTS.statsVisaOurs[lang]}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-300 inline-block rounded"></span>{TEXTS.statsVisaOther[lang]}</span>
            </div>
          </div>
        </div>

        {/* 출처 */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
          <p className="text-xs font-medium text-gray-700 mb-2">📚 {TEXTS.statsSource[lang]}</p>
          <p className="text-xs text-gray-600 leading-relaxed">• {STATS_META.sourceCb}</p>
          <p className="text-xs text-gray-600 leading-relaxed">• {STATS_META.sourceMoj}</p>
        </div>

        <Link href="/start" className="block w-full px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors text-center">
          {TEXTS.statsCTA[lang]}
        </Link>
      </section>
    </main>
  );
}