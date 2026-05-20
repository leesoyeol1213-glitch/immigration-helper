"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";
import { EMBASSIES, findEmbassy } from "@/lib/embassies";

export default function PassportPage() {
  const lang = useLang();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  
  const embassy = selectedCountry ? findEmbassy(selectedCountry) : null;
  const langKey: "ko" | "en" = lang === "ko" ? "ko" : "en";

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader backHref="/start" backLabel={TEXTS.prev[lang]} />

      <div className="max-w-2xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>{TEXTS.passportStep[lang]}</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "100%" }}></div>
        </div>
      </div>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          {TEXTS.passportTitle[lang]}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {TEXTS.passportSub[lang]}
        </p>

        {/* 안내 박스 */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6">
          <p className="text-sm text-amber-900 font-medium mb-1">
            {TEXTS.passportNoticeTitle[lang]}
          </p>
          <p className="text-xs text-amber-800 leading-relaxed">
            {TEXTS.passportNoticeDesc[lang]}
          </p>
        </div>

        <h2 className="text-sm font-medium text-gray-900 mb-3">
          {TEXTS.passportSelectCountry[lang]}
        </h2>

        {/* 국가 선택 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
          {EMBASSIES.map((emb) => (
            <button
              key={emb.id}
              onClick={() => setSelectedCountry(emb.id)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                selectedCountry === emb.id
                  ? "border-blue-700 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="text-2xl mb-1">{emb.flag}</div>
              <p className="text-xs font-medium text-gray-900">
                {emb.country[langKey]}
              </p>
            </button>
          ))}
        </div>

        {/* 선택된 대사관 정보 */}
        {embassy && (
          <div className="bg-white border-2 border-blue-200 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{embassy.flag}</span>
              <h3 className="text-base font-medium text-gray-900">
                {embassy.name}
              </h3>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 space-y-2 mb-4">
              <div className="text-xs text-gray-700">
                <span className="font-medium">📍 {TEXTS.officeAddress[lang]}:</span> {embassy.address}
              </div>
              <div className="text-xs text-gray-700">
                <span className="font-medium">📞 {TEXTS.officePhone[lang]}:</span>{" "}
                <a href={`tel:${embassy.phone}`} className="text-blue-700 hover:underline">
                  {embassy.phone}
                </a>
              </div>
              <div className="text-xs text-gray-700">
                <span className="font-medium">🕐 {TEXTS.embassyHours[lang]}:</span> {embassy.hours}
              </div>
              {embassy.website && (
                <div className="text-xs text-gray-700">
                  <span className="font-medium">🌐 {TEXTS.embassyWebsite[lang]}:</span>{" "}
                  <a 
                    href={embassy.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    {embassy.website}
                  </a>
                </div>
              )}
            </div>

            {/* 구글 맵 */}
            <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(embassy.address)}&output=embed`}
                width="100%"
                height="180"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* 길찾기 */}
            
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(embassy.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 hover:text-blue-800 mb-4"
            >
              🗺️ {TEXTS.officeDirections[lang]} →
            </a>

            {/* 필요 서류 */}
            <h4 className="text-sm font-medium text-gray-900 mb-2 mt-4">
              📋 {TEXTS.requiredDocs[lang]}
            </h4>
            <ul className="space-y-2">
              {embassy.requiredDocs.map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>{doc[langKey]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 하이코리아 안내 */}
        {embassy && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              {TEXTS.hikoreaTitle[lang]}
            </h3>
            <p className="text-xs text-blue-800 leading-relaxed mb-3">
              {TEXTS.hikoreaDesc[lang]}
            </p>
            <a
              href="https://www.hikorea.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-700 text-white rounded-lg text-xs font-medium hover:bg-blue-800"
            >
              {TEXTS.hikoreaVisit[lang]} →
            </a>
          </div>
        )}

        {/* 출처 */}
        <p className="text-xs text-gray-400 mt-3">
          ℹ️ {TEXTS.embassyDataSource[lang]}
        </p>
      </section>
    </main>
  );
}