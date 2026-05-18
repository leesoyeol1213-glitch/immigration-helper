"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const TEXTS = {
  ko: {
    flag: "🇰🇷", name: "한국어",
    badge: "🏆 AI + 공공데이터 활용 서비스",
    heroLine1: "외국인 근로자를 위한",
    heroLine2: "AI 기반 행정서류 도우미",
    subLine1: "등록증 사진 찍으면 자동 입력",
    subLine2: "공식 양식 PDF 즉시 생성",
    cta: "지금 바로 시작하기 →",
    feature1Title: "AI 자동 인식",
    feature1Desc: "외국인등록증 사진 한 장으로 자동 입력",
    feature2Title: "공공데이터 활용",
    feature2Desc: "주소 기반 관할 출입국 사무소 자동 안내",
    feature3Title: "다국어 지원",
    feature3Desc: "한국어 / English / Tiếng Việt",
    stat1Value: "30초", stat1Label: "AI 자동 입력",
    stat2Value: "3개", stat2Label: "지원 언어",
    stat3Value: "무료", stat3Label: "평생 무료",
    techTitle: "기술 스택",
    techData: "📊 법무부 출입국·외국인정책본부 공공데이터",
    techAi: "🤖 Tesseract.js 기반 한글 OCR AI",
    techSec: "🔒 개인정보 무저장 (브라우저 메모리 전용)",
    disclaimerTitle: "⚠️ 안내:",
    disclaimerText: "본 서비스는 서류 작성을 돕는 정보 제공 도구입니다. 최종 제출 전 반드시 관계 기관의 안내를 확인하시기 바라며, 서류 제출 및 승인 책임은 본인에게 있습니다.",
  },
  en: {
    flag: "🇺🇸", name: "English",
    badge: "🏆 AI + Public Data Service",
    heroLine1: "AI-Powered Form Helper",
    heroLine2: "for Foreign Workers in Korea",
    subLine1: "Take a photo of your ID card to auto-fill",
    subLine2: "Generate official application PDF instantly",
    cta: "Get Started →",
    feature1Title: "AI Auto-Recognition",
    feature1Desc: "Auto-fill from your alien card photo",
    feature2Title: "Public Data",
    feature2Desc: "Find your immigration office automatically",
    feature3Title: "Multilingual",
    feature3Desc: "Korean / English / Vietnamese",
    stat1Value: "30 sec", stat1Label: "AI Auto-fill",
    stat2Value: "3", stat2Label: "Languages",
    stat3Value: "Free", stat3Label: "Forever free",
    techTitle: "Tech Stack",
    techData: "📊 Korea Immigration Service Public Data",
    techAi: "🤖 Tesseract.js Korean OCR AI",
    techSec: "🔒 No data storage (browser memory only)",
    disclaimerTitle: "⚠️ Notice:",
    disclaimerText: "This service helps you prepare forms. Please verify with official authorities before submission.",
  },
  vi: {
    flag: "🇻🇳", name: "Tiếng Việt",
    badge: "🏆 Dịch vụ AI + Dữ liệu công",
    heroLine1: "Trợ lý hành chính AI",
    heroLine2: "cho người lao động nước ngoài",
    subLine1: "Chụp ảnh thẻ ngoại kiều để tự động điền",
    subLine2: "Tạo PDF mẫu chính thức ngay lập tức",
    cta: "Bắt đầu ngay →",
    feature1Title: "Nhận diện AI",
    feature1Desc: "Tự động điền từ ảnh thẻ ngoại kiều",
    feature2Title: "Dữ liệu công",
    feature2Desc: "Tự động tìm văn phòng XNC quản lý",
    feature3Title: "Đa ngôn ngữ",
    feature3Desc: "Tiếng Hàn / Anh / Việt",
    stat1Value: "30 giây", stat1Label: "AI tự điền",
    stat2Value: "3", stat2Label: "Ngôn ngữ",
    stat3Value: "Miễn phí", stat3Label: "Miễn phí mãi",
    techTitle: "Công nghệ",
    techData: "📊 Dữ liệu công Cục XNC Hàn Quốc",
    techAi: "🤖 AI Tesseract.js OCR tiếng Hàn",
    techSec: "🔒 Không lưu thông tin (chỉ bộ nhớ trình duyệt)",
    disclaimerTitle: "⚠️ Lưu ý:",
    disclaimerText: "Dịch vụ này hỗ trợ chuẩn bị giấy tờ. Hãy xác minh với cơ quan chức năng trước khi nộp.",
  },
};

type Lang = "ko" | "en" | "vi";

export default function Home() {
  const [lang, setLang] = useState<Lang>("ko");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "ko" || saved === "en" || saved === "vi") {
      setLang(saved);
    }
  }, []);

  const handleSelectLang = (code: Lang) => {
    setLang(code);
    localStorage.setItem("lang", code);
    setMenuOpen(false);
    window.dispatchEvent(new Event("languageChange"));
  };

  const t = TEXTS[lang];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
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

      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6 border border-blue-200">
          <p className="text-xs font-semibold text-blue-900">{t.badge}</p>
        </div>

        <h1 className="text-3xl md:text-5xl font-medium text-gray-900 leading-tight mb-4">
          {t.heroLine1}<br />
          <span className="text-blue-700">{t.heroLine2}</span>
        </h1>

        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 mt-6">
          {t.subLine1}<br />{t.subLine2}
        </p>

        <Link href="/start"
          className="inline-block px-8 py-4 bg-blue-700 text-white rounded-xl font-medium text-base hover:bg-blue-800 transition-all shadow-md hover:shadow-lg hover:scale-105">
          {t.cta}
        </Link>

{/* ↓ 여기 추가 ↓ */}
<div className="mt-4">
  <Link href="/about" className="text-sm text-gray-500 hover:text-blue-700 underline">
    {lang === "ko" ? "서비스 더 알아보기" : lang === "en" ? "Learn more →" : "Tìm hiểu thêm →"}
  </Link>
</div>

        {/* 핵심 기능 3개 박스 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-left">
          <div className="bg-white border-2 border-blue-100 rounded-xl p-5 hover:border-blue-300 transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl">📷</span>
            </div>
            <p className="text-xs font-semibold text-blue-700 mb-1">AI</p>
            <p className="text-sm font-medium text-gray-900 mb-1">{t.feature1Title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{t.feature1Desc}</p>
          </div>

          <div className="bg-white border-2 border-blue-100 rounded-xl p-5 hover:border-blue-300 transition-all">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl">📍</span>
            </div>
            <p className="text-xs font-semibold text-green-700 mb-1">PUBLIC DATA</p>
            <p className="text-sm font-medium text-gray-900 mb-1">{t.feature2Title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{t.feature2Desc}</p>
          </div>

          <div className="bg-white border-2 border-blue-100 rounded-xl p-5 hover:border-blue-300 transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl">🌍</span>
            </div>
            <p className="text-xs font-semibold text-purple-700 mb-1">MULTILINGUAL</p>
            <p className="text-sm font-medium text-gray-900 mb-1">{t.feature3Title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{t.feature3Desc}</p>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-xl font-semibold text-blue-700">{t.stat1Value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{t.stat1Label}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-xl font-semibold text-blue-700">{t.stat2Value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{t.stat2Label}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-xl font-semibold text-blue-700">{t.stat3Value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{t.stat3Label}</p>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="mt-10 p-5 bg-gray-50 border border-gray-100 rounded-xl text-left">
          <p className="text-xs font-semibold text-gray-700 mb-3">⚙️ {t.techTitle}</p>
          <div className="space-y-2">
            <p className="text-xs text-gray-600">{t.techData}</p>
            <p className="text-xs text-gray-600">{t.techAi}</p>
            <p className="text-xs text-gray-600">{t.techSec}</p>
          </div>
        </div>

        {/* 면책 */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl text-left">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>{t.disclaimerTitle}</strong> {t.disclaimerText}
          </p>
        </div>
      </section>
    </main>
  );
}