"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lang, LANG_INFO } from "@/lib/i18n";

const TEXTS: Record<Lang, any> = {
  ko: {
    badge: "🏆 AI + 공공데이터 활용 서비스",
    heroLine1: "외국인 근로자를 위한",
    heroLine2: "AI 기반 행정서류 도우미",
    subLine1: "등록증 사진 찍으면 자동 입력",
    subLine2: "공식 양식 PDF 즉시 생성",
    cta: "지금 바로 시작하기 →",
    learnMore: "서비스 더 알아보기",
    feature1Title: "AI 자동 인식",
    feature1Desc: "외국인등록증 사진 한 장으로 자동 입력",
    feature2Title: "공공데이터 활용",
    feature2Desc: "주소 기반 관할 출입국 사무소 자동 안내",
    feature3Title: "다국어 지원",
    feature3Desc: "9개 언어 지원",
    stat1Value: "30초", stat1Label: "AI 자동 입력",
    stat2Value: "9개", stat2Label: "지원 언어",
    stat3Value: "무료", stat3Label: "평생 무료",
    techTitle: "기술 스택",
    techData: "📊 법무부 출입국·외국인정책본부 공공데이터",
    techAi: "🤖 Tesseract.js 기반 한글 OCR AI",
    techSec: "🔒 개인정보 무저장 (브라우저 메모리 전용)",
    disclaimerTitle: "⚠️ 안내:",
    disclaimerText: "본 서비스는 서류 작성을 돕는 정보 제공 도구입니다. 최종 제출 및 승인 책임은 본인에게 있습니다.",
    crBannerTitle: "사업장·거주지·여권 변경 신고 안내",
    crBannerSub: "정해진 기간 안에 신고해야 불이익이 없어요",
    statsBannerTag: "공공데이터로 보는",
    statsBannerTitle: "충북 외국인 56,301명",
    statsBannerSub: "법무부·충청북도 데이터로 본 11개 시군 · TOP10 국적 현황",
    statsBannerCTA: "현황 자세히 보기",
  },
  en: {
    badge: "🏆 AI + Public Data Service",
    heroLine1: "AI-Powered Form Helper",
    heroLine2: "for Foreign Workers in Korea",
    subLine1: "Take a photo of your ID card to auto-fill",
    subLine2: "Generate official PDF instantly",
    cta: "Get Started →",
    learnMore: "Learn More →",
    feature1Title: "AI Auto-Recognition",
    feature1Desc: "Auto-fill from your alien card photo",
    feature2Title: "Public Data",
    feature2Desc: "Find your immigration office automatically",
    feature3Title: "Multilingual",
    feature3Desc: "9 languages supported",
    stat1Value: "30 sec", stat1Label: "AI Auto-fill",
    stat2Value: "9", stat2Label: "Languages",
    stat3Value: "Free", stat3Label: "Forever",
    techTitle: "Tech Stack",
    techData: "📊 Korea Immigration Service Public Data",
    techAi: "🤖 Tesseract.js Korean OCR AI",
    techSec: "🔒 No data storage (browser only)",
    disclaimerTitle: "⚠️ Notice:",
    disclaimerText: "This service helps form preparation. Final responsibility is with the user.",
    crBannerTitle: "Change Report Guide",
    crBannerSub: "Report workplace, address, passport changes on time",
    statsBannerTag: "Public Data Insights",
    statsBannerTitle: "56,301 Foreigners in Chungbuk",
    statsBannerSub: "11 cities/counties · Top 10 nationalities, from MOJ & Chungbuk data",
    statsBannerCTA: "View Statistics",
  },
  vi: {
    badge: "🏆 Dịch vụ AI + Dữ liệu công",
    heroLine1: "Trợ lý hành chính AI",
    heroLine2: "cho người lao động nước ngoài",
    subLine1: "Chụp ảnh thẻ ngoại kiều để tự điền",
    subLine2: "Tạo PDF mẫu chính thức ngay",
    cta: "Bắt đầu ngay →",
    learnMore: "Tìm hiểu thêm →",
    feature1Title: "Nhận diện AI",
    feature1Desc: "Tự điền từ ảnh thẻ ngoại kiều",
    feature2Title: "Dữ liệu công",
    feature2Desc: "Tự tìm văn phòng XNC quản lý",
    feature3Title: "Đa ngôn ngữ",
    feature3Desc: "Hỗ trợ 9 ngôn ngữ",
    stat1Value: "30 giây", stat1Label: "AI tự điền",
    stat2Value: "9", stat2Label: "Ngôn ngữ",
    stat3Value: "Miễn phí", stat3Label: "Mãi mãi",
    techTitle: "Công nghệ",
    techData: "📊 Dữ liệu công Cục XNC Hàn Quốc",
    techAi: "🤖 AI Tesseract.js OCR tiếng Hàn",
    techSec: "🔒 Không lưu thông tin",
    disclaimerTitle: "⚠️ Lưu ý:",
    disclaimerText: "Dịch vụ hỗ trợ chuẩn bị giấy tờ. Trách nhiệm cuối cùng thuộc về người dùng.",
    crBannerTitle: "Hướng dẫn báo cáo thay đổi",
    crBannerSub: "Báo cáo đúng hạn để tránh bất lợi",
    statsBannerTag: "Dữ liệu công khai",
    statsBannerTitle: "56.301 người nước ngoài tại Chungbuk",
    statsBannerSub: "11 thành phố · TOP 10 quốc tịch (Dữ liệu Bộ Tư pháp & Chungbuk)",
    statsBannerCTA: "Xem thống kê",
  },
  th: {
    badge: "🏆 บริการ AI + ข้อมูลสาธารณะ",
    heroLine1: "ผู้ช่วยกรอกเอกสาร AI",
    heroLine2: "สำหรับแรงงานต่างชาติในเกาหลี",
    subLine1: "ถ่ายรูปบัตรคนต่างด้าวเพื่อกรอกอัตโนมัติ",
    subLine2: "สร้าง PDF เอกสารทางการทันที",
    cta: "เริ่มเลย →",
    learnMore: "เรียนรู้เพิ่มเติม →",
    feature1Title: "AI รู้จำอัตโนมัติ",
    feature1Desc: "กรอกอัตโนมัติจากรูปบัตร",
    feature2Title: "ข้อมูลสาธารณะ",
    feature2Desc: "ค้นหาสำนักงานตรวจคนเข้าเมือง",
    feature3Title: "หลายภาษา",
    feature3Desc: "รองรับ 9 ภาษา",
    stat1Value: "30 วินาที", stat1Label: "AI กรอกอัตโนมัติ",
    stat2Value: "9", stat2Label: "ภาษา",
    stat3Value: "ฟรี", stat3Label: "ตลอดไป",
    techTitle: "เทคโนโลยี",
    techData: "📊 ข้อมูลสำนักงานตรวจคนเข้าเมือง",
    techAi: "🤖 AI OCR ภาษาเกาหลี Tesseract.js",
    techSec: "🔒 ไม่เก็บข้อมูลส่วนตัว",
    disclaimerTitle: "⚠️ หมายเหตุ:",
    disclaimerText: "บริการช่วยเตรียมเอกสาร ความรับผิดชอบสุดท้ายเป็นของผู้ใช้",
    crBannerTitle: "Change Report Guide",
    crBannerSub: "Report workplace, address, passport changes on time",
    statsBannerTag: "ข้อมูลสาธารณะ",
    statsBannerTitle: "56,301 คนต่างชาติในเฉิงบุค",
    statsBannerSub: "11 เมือง/เขต · 10 สัญชาติที่มีมากที่สุด, จากข้อมูลของกระทรวงกฎหมายและจังหวัดเฉิงบุค",
    statsBannerCTA: "ดูสถิติ",
  },
  km: {
    badge: "🏆 សេវាកម្ម AI + ទិន្នន័យសាធារណៈ",
    heroLine1: "ជំនួយការ AI",
    heroLine2: "សម្រាប់កម្មករបរទេសនៅកូរ៉េ",
    subLine1: "ថតរូបអត្តសញ្ញាណប័ណ្ណដើម្បីបំពេញស្វ័យប្រវត្តិ",
    subLine2: "បង្កើត PDF ផ្លូវការភ្លាមៗ",
    cta: "ចាប់ផ្តើម →",
    learnMore: "ស្វែងយល់បន្ថែម →",
    feature1Title: "AI ស្គាល់ស្វ័យប្រវត្តិ",
    feature1Desc: "បំពេញពីរូបថតប័ណ្ណបរទេស",
    feature2Title: "ទិន្នន័យសាធារណៈ",
    feature2Desc: "ស្វែងរកការិយាល័យអន្តោប្រវេសន៍",
    feature3Title: "ច្រើនភាសា",
    feature3Desc: "គាំទ្រ 9 ភាសា",
    stat1Value: "30 វិនាទី", stat1Label: "AI បំពេញ",
    stat2Value: "9", stat2Label: "ភាសា",
    stat3Value: "ឥតគិតថ្លៃ", stat3Label: "ជារៀងរហូត",
    techTitle: "បច្ចេកវិទ្យា",
    techData: "📊 ទិន្នន័យអន្តោប្រវេសន៍កូរ៉េ",
    techAi: "🤖 AI Tesseract.js OCR កូរ៉េ",
    techSec: "🔒 មិនរក្សាទុកទិន្នន័យ",
    disclaimerTitle: "⚠️ ចំណាំ:",
    disclaimerText: "សេវាកម្មនេះជួយរៀបចំឯកសារ ការទទួលខុសត្រូវចុងក្រោយជារបស់អ្នកប្រើ",
    crBannerTitle: "Change Report Guide",
    crBannerSub: "Report workplace, address, passport changes on time",
    statsBannerTag: "Public Data Insights",
    statsBannerTitle: "56,301 Foreigners in Chungbuk",
    statsBannerSub: "11 cities/counties · Top 10 nationalities, from MOJ & Chungbuk data",
    statsBannerCTA: "View Statistics",
  },
  ne: {
    badge: "🏆 AI + सार्वजनिक डेटा सेवा",
    heroLine1: "AI सहायक",
    heroLine2: "कोरियामा विदेशी कामदारहरूका लागि",
    subLine1: "परिचय पत्रको फोटो खिच्नुहोस्",
    subLine2: "तुरुन्तै आधिकारिक PDF बनाउनुहोस्",
    cta: "अहिले सुरु गर्नुहोस् →",
    learnMore: "थप जान्नुहोस् →",
    feature1Title: "AI स्वत: पहिचान",
    feature1Desc: "विदेशी कार्डबाट स्वत: भर्नुहोस्",
    feature2Title: "सार्वजनिक डेटा",
    feature2Desc: "आप्रवासन कार्यालय खोज्नुहोस्",
    feature3Title: "बहुभाषी",
    feature3Desc: "9 भाषा समर्थन",
    stat1Value: "30 सेकेन्ड", stat1Label: "AI स्वत: भर्ने",
    stat2Value: "9", stat2Label: "भाषा",
    stat3Value: "निःशुल्क", stat3Label: "सधैं",
    techTitle: "प्रविधि",
    techData: "📊 कोरिया आप्रवासन डेटा",
    techAi: "🤖 AI Tesseract.js कोरियाली OCR",
    techSec: "🔒 डेटा भण्डारण छैन",
    disclaimerTitle: "⚠️ सूचना:",
    disclaimerText: "यो सेवा कागजात तयार पार्न मद्दत गर्छ। अन्तिम जिम्मेवारी प्रयोगकर्तासँग छ।",
    crBannerTitle: "Change Report Guide",
    crBannerSub: "Report workplace, address, passport changes on time",
    statsBannerTag: "Public Data Insights",
    statsBannerTitle: "56,301 Foreigners in Chungbuk",
    statsBannerSub: "11 cities/counties · Top 10 nationalities, from MOJ & Chungbuk data",
    statsBannerCTA: "View Statistics",
  },
  si: {
    badge: "🏆 AI + පොදු දත්ත සේවාව",
    heroLine1: "AI සහායක",
    heroLine2: "කොරියාවේ විදේශීය සේවකයින්ට",
    subLine1: "ඔබේ හැඳුනුම්පත ඡායාරූපගත කරන්න",
    subLine2: "PDF ක්ෂණිකව සාදන්න",
    cta: "දැන්ම පටන් ගන්න →",
    learnMore: "තවත් දැනගන්න →",
    feature1Title: "AI ස්වයංක්‍රීය හඳුනාගැනීම",
    feature1Desc: "කාඩ්පත් ඡායාරූපයෙන් ස්වයංක්‍රීයව පුරවන්න",
    feature2Title: "පොදු දත්ත",
    feature2Desc: "විගමන කාර්යාලය සොයන්න",
    feature3Title: "බහු භාෂා",
    feature3Desc: "භාෂා 9 ක් සහාය දක්වයි",
    stat1Value: "තත්පර 30", stat1Label: "AI ස්වයංක්‍රීය",
    stat2Value: "9", stat2Label: "භාෂා",
    stat3Value: "නොමිලේ", stat3Label: "සදාකාලිකව",
    techTitle: "තාක්ෂණය",
    techData: "📊 කොරියාවේ විගමන දත්ත",
    techAi: "🤖 AI Tesseract.js කොරියානු OCR",
    techSec: "🔒 දත්ත ගබඩාවක් නැත",
    disclaimerTitle: "⚠️ දැනුම්දීම:",
    disclaimerText: "මෙය ලේඛන සකස් කිරීමට උපකාරී වේ. අවසන් වගකීම පරිශීලකයාට ඇත.",
    crBannerTitle: "Change Report Guide",
    crBannerSub: "Report workplace, address, passport changes on time",
    statsBannerTag: "Public Data Insights",
    statsBannerTitle: "56,301 Foreigners in Chungbuk",
    statsBannerSub: "11 cities/counties · Top 10 nationalities, from MOJ & Chungbuk data",
    statsBannerCTA: "View Statistics",
  },
  my: {
    badge: "🏆 AI + အများသုံးဒေတာ ဝန်ဆောင်မှု",
    heroLine1: "AI အကူအညီ",
    heroLine2: "ကိုရီးယားရှိ နိုင်ငံခြားအလုပ်သမားများအတွက်",
    subLine1: "သင်၏ နိုင်ငံခြားသား မှတ်ပုံတင်ကို ဓာတ်ပုံရိုက်ပါ",
    subLine2: "တရားဝင် PDF ကို ချက်ချင်းဖန်တီးပါ",
    cta: "ယခုစတင်ပါ →",
    learnMore: "ပိုမိုလေ့လာရန် →",
    feature1Title: "AI အလိုအလျောက် မှတ်မိခြင်း",
    feature1Desc: "ကတ်ဓာတ်ပုံမှ အလိုအလျောက်ဖြည့်ပါ",
    feature2Title: "အများသုံးဒေတာ",
    feature2Desc: "လူဝင်မှုကြီးကြပ်ရေးရုံး ရှာဖွေပါ",
    feature3Title: "ဘာသာစကားများစွာ",
    feature3Desc: "ဘာသာစကား 9 ခု ပံ့ပိုးသည်",
    stat1Value: "30 စက္ကန့်", stat1Label: "AI ဖြည့်ပါ",
    stat2Value: "9", stat2Label: "ဘာသာ",
    stat3Value: "အခမဲ့", stat3Label: "အမြဲတမ်း",
    techTitle: "နည်းပညာ",
    techData: "📊 ကိုရီးယားလူဝင်မှု ဒေတာ",
    techAi: "🤖 AI Tesseract.js ကိုရီးယား OCR",
    techSec: "🔒 ဒေတာသိမ်းမှု မရှိ",
    disclaimerTitle: "⚠️ သတိပြုရန်:",
    disclaimerText: "ဤဝန်ဆောင်မှုသည် စာရွက်စာတမ်းပြင်ဆင်ရန် ကူညီသည်။ နောက်ဆုံးတာဝန်သည် အသုံးပြုသူ၏ဖြစ်သည်။",
    crBannerTitle: "Change Report Guide",
    crBannerSub: "Report workplace, address, passport changes on time",
    statsBannerTag: "Public Data Insights",
    statsBannerTitle: "56,301 Foreigners in Chungbuk",
    statsBannerSub: "11 cities/counties · Top 10 nationalities, from MOJ & Chungbuk data",
    statsBannerCTA: "View Statistics",
  },
  zh: {
    badge: "🏆 AI + 公共数据服务",
    heroLine1: "AI助手",
    heroLine2: "服务韩国外籍劳动者",
    subLine1: "拍摄外国人登记证自动填写",
    subLine2: "即时生成官方PDF表格",
    cta: "立即开始 →",
    learnMore: "了解更多 →",
    feature1Title: "AI自动识别",
    feature1Desc: "通过外国人登记证照片自动填写",
    feature2Title: "公共数据",
    feature2Desc: "自动推荐管辖出入境办公室",
    feature3Title: "多语言",
    feature3Desc: "支持9种语言",
    stat1Value: "30秒", stat1Label: "AI自动填写",
    stat2Value: "9", stat2Label: "语言",
    stat3Value: "免费", stat3Label: "永久免费",
    techTitle: "技术栈",
    techData: "📊 韩国出入境管理公共数据",
    techAi: "🤖 Tesseract.js 韩文OCR AI",
    techSec: "🔒 不保存数据(仅浏览器)",
    disclaimerTitle: "⚠️ 提示:",
    disclaimerText: "本服务协助文件准备，最终责任由用户承担。",
    crBannerTitle: "Change Report Guide",
    crBannerSub: "Report workplace, address, passport changes on time",
    statsBannerTag: "Public Data Insights",
    statsBannerTitle: "56,301 Foreigners in Chungbuk",
    statsBannerSub: "11 cities/counties · Top 10 nationalities, from MOJ & Chungbuk data",
    statsBannerCTA: "View Statistics",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("ko");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && saved in LANG_INFO) setLang(saved);
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
            <span>{LANG_INFO[lang].flag}</span>
            <span>{LANG_INFO[lang].name}</span>
            <span className="text-blue-400">▾</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
              {(Object.keys(LANG_INFO) as Lang[]).map((code) => (
                <button key={code} onClick={() => handleSelectLang(code)}
                  className={`w-full px-4 py-2.5 text-left text-xs hover:bg-blue-50 flex items-center gap-2 ${
                    lang === code ? "bg-blue-50 text-blue-700" : "text-gray-700"
                  }`}>
                  <span>{LANG_INFO[code].flag}</span>
                  <span>{LANG_INFO[code].name}</span>
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

        <div className="mt-4">
          <Link href="/about" className="text-sm text-gray-500 hover:text-blue-700 underline">
            {t.learnMore}
          </Link>
        </div>

        {/* 변경 신고 안내 카드 */}
        <Link href="/change-report" className="block mt-6 group">
          <div className="bg-white border-2 border-amber-200 hover:border-amber-400 rounded-xl p-4 text-left transition-all">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📖</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 mb-0.5">{t.crBannerTitle}</p>
                <p className="text-xs text-gray-500">{t.crBannerSub}</p>
              </div>
              <span className="text-amber-600 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>

        {/* 충북 통계 배너 (공공데이터) */}
        <Link href="/stats" className="block mt-10 group">
          <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-6 text-white text-left shadow-lg hover:shadow-xl transition-all hover:scale-[1.01]">
            <p className="text-xs font-medium text-blue-200 mb-2">📊 {t.statsBannerTag}</p>
            <p className="text-2xl md:text-3xl font-bold mb-2">
              {t.statsBannerTitle}
            </p>
            <p className="text-sm text-blue-100 mb-4">{t.statsBannerSub}</p>
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <span>{t.statsBannerCTA}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>

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

        <div className="mt-10 p-5 bg-gray-50 border border-gray-100 rounded-xl text-left">
          <p className="text-xs font-semibold text-gray-700 mb-3">⚙️ {t.techTitle}</p>
          <div className="space-y-2">
            <p className="text-xs text-gray-600">{t.techData}</p>
            <p className="text-xs text-gray-600">{t.techAi}</p>
            <p className="text-xs text-gray-600">{t.techSec}</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl text-left">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>{t.disclaimerTitle}</strong> {t.disclaimerText}
          </p>
        </div>
      </section>
    </main>
  );
}