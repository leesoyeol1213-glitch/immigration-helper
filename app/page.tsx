"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const TEXTS = {
  ko: {
    flag: "🇰🇷", name: "한국어",
    badge: "한국 행정서류 작성 도우미",
    heroLine1: "한국 서류 작성,", heroLine2: "3분이면 충분합니다",
    subLine1: "E-9 체류기간 연장부터 필요한 서류 안내까지",
    subLine2: "복잡한 출입국 민원을 쉽게 준비하세요",
    cta: "지금 바로 시작하기 →",
    stat1Value: "3분", stat1Label: "소요 시간",
    stat2Value: "9개", stat2Label: "지원 언어",
    stat3Value: "무료", stat3Label: "평생 무료",
    disclaimerTitle: "⚠️ 안내:",
    disclaimerText: "본 서비스는 서류 작성을 돕는 정보 제공 도구입니다. 최종 제출 전 반드시 관계 기관의 안내를 확인하시기 바라며, 서류 제출 및 승인 책임은 본인에게 있습니다.",
  },
  en: {
    flag: "🇺🇸", name: "English",
    badge: "Korean Admin Form Helper",
    heroLine1: "Korean paperwork,", heroLine2: "done in 3 minutes",
    subLine1: "From E-9 visa extension to required document guides",
    subLine2: "Simplify complex immigration paperwork",
    cta: "Get Started →",
    stat1Value: "3 min", stat1Label: "Average time",
    stat2Value: "9", stat2Label: "Languages",
    stat3Value: "Free", stat3Label: "Forever free",
    disclaimerTitle: "⚠️ Notice:",
    disclaimerText: "This service is an information tool to help with form preparation. Please verify with official authorities before submission.",
  },
  vi: {
    flag: "🇻🇳", name: "Tiếng Việt",
    badge: "Hỗ trợ giấy tờ hành chính Hàn Quốc",
    heroLine1: "Giấy tờ Hàn Quốc,", heroLine2: "hoàn thành trong 3 phút",
    subLine1: "Từ gia hạn visa E-9 đến hướng dẫn giấy tờ cần thiết",
    subLine2: "Đơn giản hóa thủ tục xuất nhập cảnh phức tạp",
    cta: "Bắt đầu ngay →",
    stat1Value: "3 phút", stat1Label: "Thời gian",
    stat2Value: "9", stat2Label: "Ngôn ngữ",
    stat3Value: "Miễn phí", stat3Label: "Miễn phí mãi mãi",
    disclaimerTitle: "⚠️ Lưu ý:",
    disclaimerText: "Dịch vụ này là công cụ thông tin hỗ trợ chuẩn bị giấy tờ.",
  },
};

type Lang = "ko" | "en" | "vi";

export default function Home() {
  const [lang, setLang] = useState<Lang>("ko");
  const [menuOpen, setMenuOpen] = useState(false);

  // 페이지 로드 시 localStorage에서 언어 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "ko" || saved === "en" || saved === "vi") {
      setLang(saved);
    }
  }, []);

  // 언어 변경 핸들러 — localStorage에 저장!
  const handleSelectLang = (code: Lang) => {
    setLang(code);
    localStorage.setItem("lang", code);
    setMenuOpen(false);
    window.dispatchEvent(new Event("languageChange"));
  };

  const t = TEXTS[lang];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <h2 className="text-lg font-medium">
          <span className="text-blue-700">서류</span>도우미
        </h2>

        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors flex items-center gap-1.5">
            <span>{t.flag}</span>
            <span>{t.name}</span>
            <span className="text-blue-400">▾</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
              {(Object.keys(TEXTS) as Lang[]).map((code) => (
                <button key={code} onClick={() => handleSelectLang(code)}
                  className={`w-full px-4 py-2.5 text-left text-xs hover:bg-blue-50 flex items-center gap-2 ${
                    lang === code ? "bg-blue-50 text-blue-700" : "text-gray-700"
                  }`}>
                  <span>{TEXTS[code].flag}</span>
                  <span>{TEXTS[code].name}</span>
                  {lang === code && <span className="ml-auto text-blue-500">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="inline-block px-3 py-1 bg-blue-100 rounded-full mb-6">
          <p className="text-xs font-medium text-blue-800">{t.badge}</p>
        </div>

        <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight mb-4">
          {t.heroLine1}<br />{t.heroLine2}
        </h1>

        <p className="text-base text-gray-600 leading-relaxed mb-8">
          {t.subLine1}<br />{t.subLine2}
        </p>

        <Link href="/start"
          className="inline-block px-6 py-3 bg-blue-700 text-white rounded-xl font-medium text-sm hover:bg-blue-800 transition-colors shadow-sm">
          {t.cta}
        </Link>

        <div className="grid grid-cols-3 gap-3 mt-12">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-lg font-medium text-gray-900">{t.stat1Value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{t.stat1Label}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-lg font-medium text-gray-900">{t.stat2Value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{t.stat2Label}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-lg font-medium text-gray-900">{t.stat3Value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{t.stat3Label}</p>
          </div>
        </div>

        <div className="mt-12 p-4 bg-amber-50 border border-amber-100 rounded-xl text-left">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>{t.disclaimerTitle}</strong> {t.disclaimerText}
          </p>
        </div>
      </section>
    </main>
  );
}