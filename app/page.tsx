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
    qStart: "서류 시작", qChange: "변경 신고", qStats: "통계 보기", qAbout: "서비스 소개",
    heroTag: "사진 한 장이면 끝",
    heroBig: "등록증 찍으면\n서류가 완성돼요",
    heroDesc: "외국인등록증·여권을 촬영하면 AI가 자동으로 입력하고 공식 서류를 만들어드려요.",
    visaQ: "어떤 비자를 연장하세요?",
    visaE9: "비전문취업", visaE74: "숙련기능인력", visaF2R: "지역특화 우수인재",
    visaPassport: "여권 갱신", visaPassportSub: "재발급·정보변경",
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
    qStart: "Start", qChange: "Report", qStats: "Statistics", qAbout: "About",
    heroTag: "Just one photo",
    heroBig: "Snap your ID,\nget your documents",
    heroDesc: "Take a photo of your ID or passport — AI auto-fills and creates official forms.",
    visaQ: "Which visa to extend?",
    visaE9: "Non-professional", visaE74: "Skilled worker", visaF2R: "Regional talent",
    visaPassport: "Passport", visaPassportSub: "Renewal · Update",
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
    qStart: "Bắt đầu", qChange: "Báo cáo", qStats: "Thống kê", qAbout: "Giới thiệu",
    heroTag: "Chỉ một bức ảnh",
    heroBig: "Chụp thẻ,\nhoàn thành giấy tờ",
    heroDesc: "Chụp ảnh thẻ hoặc hộ chiếu — AI tự điền và tạo mẫu chính thức.",
    visaQ: "Gia hạn visa nào?",
    visaE9: "Lao động phổ thông", visaE74: "Lao động lành nghề", visaF2R: "Nhân tài khu vực",
    visaPassport: "Hộ chiếu", visaPassportSub: "Cấp lại · Cập nhật",
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
    qStart: "Start", qChange: "Report", qStats: "Statistics", qAbout: "About",
    heroTag: "Just one photo",
    heroBig: "Snap your ID,\nget your documents",
    heroDesc: "Take a photo of your ID or passport — AI auto-fills and creates official forms.",
    visaQ: "Which visa to extend?",
    visaE9: "Non-professional", visaE74: "Skilled worker", visaF2R: "Regional talent",
    visaPassport: "Passport", visaPassportSub: "Renewal · Update",
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
    qStart: "Start", qChange: "Report", qStats: "Statistics", qAbout: "About",
    heroTag: "Just one photo",
    heroBig: "Snap your ID,\nget your documents",
    heroDesc: "Take a photo of your ID or passport — AI auto-fills and creates official forms.",
    visaQ: "Which visa to extend?",
    visaE9: "Non-professional", visaE74: "Skilled worker", visaF2R: "Regional talent",
    visaPassport: "Passport", visaPassportSub: "Renewal · Update",
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
    qStart: "Start", qChange: "Report", qStats: "Statistics", qAbout: "About",
    heroTag: "Just one photo",
    heroBig: "Snap your ID,\nget your documents",
    heroDesc: "Take a photo of your ID or passport — AI auto-fills and creates official forms.",
    visaQ: "Which visa to extend?",
    visaE9: "Non-professional", visaE74: "Skilled worker", visaF2R: "Regional talent",
    visaPassport: "Passport", visaPassportSub: "Renewal · Update",
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
    qStart: "Start", qChange: "Report", qStats: "Statistics", qAbout: "About",
    heroTag: "Just one photo",
    heroBig: "Snap your ID,\nget your documents",
    heroDesc: "Take a photo of your ID or passport — AI auto-fills and creates official forms.",
    visaQ: "Which visa to extend?",
    visaE9: "Non-professional", visaE74: "Skilled worker", visaF2R: "Regional talent",
    visaPassport: "Passport", visaPassportSub: "Renewal · Update",
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
    qStart: "Start", qChange: "Report", qStats: "Statistics", qAbout: "About",
    heroTag: "Just one photo",
    heroBig: "Snap your ID,\nget your documents",
    heroDesc: "Take a photo of your ID or passport — AI auto-fills and creates official forms.",
    visaQ: "Which visa to extend?",
    visaE9: "Non-professional", visaE74: "Skilled worker", visaF2R: "Regional talent",
    visaPassport: "Passport", visaPassportSub: "Renewal · Update",
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
    qStart: "Start", qChange: "Report", qStats: "Statistics", qAbout: "About",
    heroTag: "Just one photo",
    heroBig: "Snap your ID,\nget your documents",
    heroDesc: "Take a photo of your ID or passport — AI auto-fills and creates official forms.",
    visaQ: "Which visa to extend?",
    visaE9: "Non-professional", visaE74: "Skilled worker", visaF2R: "Regional talent",
    visaPassport: "Passport", visaPassportSub: "Renewal · Update",
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

      <section className="max-w-md md:max-w-3xl mx-auto px-5 pt-6 pb-16">
        {/* 큰 인사 헤드라인 */}
        <div className="mb-6">
          <h1 className="text-[26px] font-extrabold text-gray-900 leading-snug tracking-tight mb-1.5">
            {t.heroLine1}<br />
            <span className="text-blue-700">{t.heroLine2}</span>
          </h1>
          <p className="text-[15px] text-gray-500 font-medium">{t.subLine1} · {t.subLine2}</p>
        </div>

        {/* 퀵 아이콘 4개 */}
        <div className="grid grid-cols-4 gap-2 mb-7">
          <Link href="/start" className="text-center group">
            <div className="w-[60px] h-[60px] mx-auto mb-2 rounded-[18px] bg-orange-50 flex items-center justify-center text-[26px] group-hover:scale-105 transition-transform">📷</div>
            <p className="text-[12px] font-bold text-gray-700">{t.qStart}</p>
          </Link>
          <Link href="/change-report" className="text-center group">
            <div className="w-[60px] h-[60px] mx-auto mb-2 rounded-[18px] bg-green-50 flex items-center justify-center text-[26px] group-hover:scale-105 transition-transform">📋</div>
            <p className="text-[12px] font-bold text-gray-700">{t.qChange}</p>
          </Link>
          <Link href="/stats" className="text-center group">
            <div className="w-[60px] h-[60px] mx-auto mb-2 rounded-[18px] bg-pink-50 flex items-center justify-center text-[26px] group-hover:scale-105 transition-transform">📊</div>
            <p className="text-[12px] font-bold text-gray-700">{t.qStats}</p>
          </Link>
          <Link href="/about" className="text-center group">
            <div className="w-[60px] h-[60px] mx-auto mb-2 rounded-[18px] bg-purple-50 flex items-center justify-center text-[26px] group-hover:scale-105 transition-transform">💬</div>
            <p className="text-[12px] font-bold text-gray-700">{t.qAbout}</p>
          </Link>
        </div>

        {/* 큰 히어로 배너 */}
        <Link href="/start" className="block mb-7">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-7 text-white text-left shadow-lg hover:shadow-xl transition-all">
            <span className="inline-block bg-white/20 text-[13px] font-bold px-3.5 py-1.5 rounded-full mb-3.5">📷 {t.heroTag}</span>
            <p className="text-[25px] font-extrabold leading-snug tracking-tight mb-2.5 whitespace-pre-line">{t.heroBig}</p>
            <p className="text-[14px] text-blue-100 leading-relaxed mb-5">{t.heroDesc}</p>
            <div className="bg-white text-blue-700 text-center py-4 rounded-2xl text-[16px] font-extrabold">{t.cta}</div>
          </div>
        </Link>

        {/* 비자 큰 카드 2열 */}
        <p className="text-[17px] font-extrabold text-gray-900 mb-3.5 tracking-tight">{t.visaQ}</p>
        <div className="grid grid-cols-2 gap-3 mb-7">
          <Link href="/start" className="bg-pink-50 rounded-[18px] p-5 min-h-[118px] flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="text-[28px]">🏭</div>
            <div><p className="text-[18px] font-extrabold text-gray-900 tracking-tight">E-9</p><p className="text-[13px] text-gray-500 font-medium">{t.visaE9}</p></div>
          </Link>
          <Link href="/start" className="bg-amber-50 rounded-[18px] p-5 min-h-[118px] flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="text-[28px]">🔧</div>
            <div><p className="text-[18px] font-extrabold text-gray-900 tracking-tight">E-7-4</p><p className="text-[13px] text-gray-500 font-medium">{t.visaE74}</p></div>
          </Link>
          <Link href="/start" className="bg-teal-50 rounded-[18px] p-5 min-h-[118px] flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="text-[28px]">🏡</div>
            <div><p className="text-[18px] font-extrabold text-gray-900 tracking-tight">F-2-R</p><p className="text-[13px] text-gray-500 font-medium">{t.visaF2R}</p></div>
          </Link>
          <Link href="/start" className="bg-purple-50 rounded-[18px] p-5 min-h-[118px] flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="text-[28px]">📘</div>
            <div><p className="text-[18px] font-extrabold text-gray-900 tracking-tight">{t.visaPassport}</p><p className="text-[13px] text-gray-500 font-medium">{t.visaPassportSub}</p></div>
          </Link>
        </div>

        {/* 통계 배너 */}
        <Link href="/stats" className="block mb-7">
          <div className="bg-blue-50 border-2 border-blue-100 rounded-3xl p-6 text-left hover:border-blue-300 transition-all">
            <p className="text-[13px] font-bold text-blue-700 mb-2">📊 {t.statsBannerTag}</p>
            <p className="text-[23px] font-extrabold text-gray-900 mb-1.5 tracking-tight">{t.statsBannerTitle}</p>
            <p className="text-[13px] text-gray-500 font-medium mb-3.5">{t.statsBannerSub}</p>
            <p className="text-[15px] font-extrabold text-blue-700">{t.statsBannerCTA} →</p>
          </div>
        </Link>

        {/* 신뢰 요소 (작게) */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-left mb-4">
          <p className="text-[13px] font-bold text-gray-700 mb-2.5">⚙️ {t.techTitle}</p>
          <div className="space-y-1.5">
            <p className="text-[12px] text-gray-600">{t.techData}</p>
            <p className="text-[12px] text-gray-600">{t.techAi}</p>
            <p className="text-[12px] text-gray-600">{t.techSec}</p>
          </div>
        </div>

        {/* 안내 */}
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-left">
          <p className="text-[12px] text-amber-800 leading-relaxed">
            <strong>{t.disclaimerTitle}</strong> {t.disclaimerText}
          </p>
        </div>
      </section>
    </main>
  );
}