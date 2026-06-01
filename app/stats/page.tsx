"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";
import { REGION_DATA, STATS_META, INDUSTRY_DATA, INDUSTRY_META } from "@/lib/stats";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ApiData {
  updatedAt: string;
  sourceDate: string;
  visa: Record<string, number>;
  topNations: { name: string; count: number }[];
}

const VISA_LABELS: Record<string, { code: string; ours: boolean; desc: string }> = {
  "E9(비전문취업)": { code: "E-9", ours: true, desc: "제조업·농축산업" },
  "D2(유학)": { code: "D-2", ours: false, desc: "대학·대학원생" },
  "E7(특정활동)": { code: "E-7", ours: true, desc: "전문/숙련 (E-7-4 포함)" },
  "F2(거주)": { code: "F-2", ours: true, desc: "장기 거주 (F-2-R 포함)" },
  "H2(방문취업)": { code: "H-2", ours: false, desc: "동포 방문" },
  "F6(결혼이민)": { code: "F-6", ours: false, desc: "결혼" },
};

export default function StatsPage() {
  const lang = useLang() || "ko";
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(true);
        else setApiData(d);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visaChartData = apiData
    ? Object.entries(apiData.visa).map(([k, count]) => ({
        name: k,
        count,
        ...VISA_LABELS[k],
      }))
    : [];

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader backHref="/" backLabel={TEXTS.prev[lang]} />

      <section className="max-w-md md:max-w-3xl mx-auto px-5 pt-6 pb-16">
        {/* 헤더 */}
        <div className="mb-7">
          <p className="text-[13px] font-bold text-blue-700 mb-2">{TEXTS.statsTag[lang]}</p>
          <h1 className="text-[26px] font-extrabold text-gray-900 tracking-tight mb-2">{TEXTS.statsTitle[lang]}</h1>
          <p className="text-[14px] text-gray-500 font-medium">{TEXTS.statsSub[lang]}</p>
          {apiData && (
            <p className="text-[12px] font-bold text-green-600 mt-2">🟢 {TEXTS.statsLive[lang]} · {apiData.sourceDate}</p>
          )}
        </div>

        {/* 하이라이트 숫자 */}
        <div className="grid grid-cols-3 gap-3 mb-9">
          <div className="bg-blue-50 rounded-2xl p-4 text-center">
            <p className="text-[24px] font-extrabold text-blue-700">{STATS_META.totalForeigners.toLocaleString()}</p>
            <p className="text-[12px] font-medium text-blue-600 mt-1">{TEXTS.statsTotal[lang]}</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 text-center">
            <p className="text-[24px] font-extrabold text-blue-700">{STATS_META.foreignerRatio}%</p>
            <p className="text-[12px] font-medium text-blue-600 mt-1">{TEXTS.statsRatio[lang]}</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 text-center">
            <p className="text-[24px] font-extrabold text-blue-700">{STATS_META.cityCount}</p>
            <p className="text-[12px] font-medium text-blue-600 mt-1">{TEXTS.statsCities[lang]}</p>
          </div>
        </div>

        {/* 1. 시군별 분포 */}
        <div className="mb-9">
          <h2 className="text-[18px] font-extrabold text-gray-900 mb-1">📍 {TEXTS.statsRegionTitle[lang]}</h2>
          <p className="text-[13px] text-gray-500 font-medium mb-4">{TEXTS.statsRegionDesc[lang]}</p>
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-4">
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
            <div className="flex gap-4 mt-2 text-[12px] font-medium">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-700 inline-block rounded"></span>{TEXTS.statsNormal[lang]}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 inline-block rounded"></span>{TEXTS.statsInterest[lang]}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-500 inline-block rounded"></span>{TEXTS.statsReduction[lang]}</span>
            </div>
          </div>
        </div>

        {/* 2. 국적별 분포 */}
        <div className="mb-9">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[18px] font-extrabold text-gray-900">🌏 {TEXTS.statsNationTitle[lang]}</h2>
            {apiData && <span className="text-[12px] font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">API</span>}
          </div>
          <p className="text-[13px] text-gray-500 font-medium mb-4">{TEXTS.statsNationDescApi[lang]}</p>
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-4">
            {loading && <p className="text-[13px] text-gray-500 text-center py-12">불러오는 중...</p>}
            {error && <p className="text-[13px] text-red-500 text-center py-12">데이터를 불러올 수 없어요</p>}
            {apiData && (
              <>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={apiData.topNations} layout="vertical" margin={{ left: 10, right: 30 }}>
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={100} />
                    <Tooltip formatter={(v) => `${Number(v).toLocaleString()}명`} />
                    <Bar dataKey="count" fill="#1d4ed8" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-[13px] text-blue-600 mt-3 bg-blue-50 p-3 rounded-2xl font-medium">
                  💡 {TEXTS.statsNationInsight[lang]}
                </p>
              </>
            )}
          </div>
        </div>

        {/* 3. 비자별 */}
        <div className="mb-9">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[18px] font-extrabold text-gray-900">📋 {TEXTS.statsVisaTitle[lang]}</h2>
            {apiData && <span className="text-[12px] font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">API</span>}
          </div>
          <p className="text-[13px] text-gray-500 font-medium mb-4">{TEXTS.statsVisaDesc[lang]}</p>
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-4">
            {loading && <p className="text-[13px] text-gray-500 text-center py-12">불러오는 중...</p>}
            {error && <p className="text-[13px] text-red-500 text-center py-12">데이터를 불러올 수 없어요</p>}
            {apiData && (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={visaChartData} margin={{ bottom: 30 }}>
                    <XAxis dataKey="code" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => `${Number(v).toLocaleString()}명`} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {visaChartData.map((entry, i) => (
                        <Cell key={i} fill={entry.ours ? "#1d4ed8" : "#cbd5e1"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-2 text-[12px] font-medium">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-700 inline-block rounded"></span>{TEXTS.statsVisaOurs[lang]}</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-300 inline-block rounded"></span>{TEXTS.statsVisaOther[lang]}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 4. 업종별 (충북, 한국고용정보원) */}
        <div className="mb-9">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[18px] font-extrabold text-gray-900">🏭 {TEXTS.statsIndTitle[lang]}</h2>
          </div>
          <p className="text-[13px] text-gray-500 font-medium mb-4">{TEXTS.statsIndDesc[lang]}</p>
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={INDUSTRY_DATA} layout="vertical" margin={{ left: 10, right: 40 }}>
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={70} />
                <Tooltip formatter={(v) => `${Number(v).toLocaleString()}명`} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {INDUSTRY_DATA.map((entry, i) => (
                    <Cell key={i} fill={i === 0 ? "#1d4ed8" : "#93c5fd"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-[13px] text-blue-600 mt-3 bg-blue-50 p-3 rounded-2xl font-medium">
              💡 {TEXTS.statsIndInsight[lang]}
            </p>
          </div>
        </div>

        {/* 출처 */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6">
          <p className="text-[13px] font-bold text-gray-700 mb-2">📚 {TEXTS.statsSource[lang]}</p>
          <p className="text-[12px] text-gray-600 leading-relaxed">• {STATS_META.sourceCb}</p>
          <p className="text-[12px] text-gray-600 leading-relaxed">• {STATS_META.sourceMoj} · 공공데이터 API 자동 갱신</p>
          <p className="text-[12px] text-gray-600 leading-relaxed">• {INDUSTRY_META.source}</p>
        </div>

        <Link href="/start" className="block w-full text-center py-4 rounded-2xl font-extrabold text-[16px] bg-blue-700 text-white hover:bg-blue-800 transition-colors">
          {TEXTS.statsCTA[lang]}
        </Link>
      </section>
    </main>
  );
}