"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";

const TEXTS = {
  ko: {
    flag: "🇰🇷", name: "한국어",
    backHome: "처음으로",
    badge: "📋 About",
    title: "서류도우미가 무엇인가요?",
    subtitle: "외국인 근로자를 위한 AI 기반 행정서류 작성 도우미입니다",
    
    problemTitle: "🎯 해결하려는 문제",
    problems: [
      "외국인 근로자는 한국어 행정 용어가 어렵습니다",
      "잘못된 사무소 방문, 서류 누락으로 시간 손실이 큽니다",
      "체류기간 만료를 놓쳐 과태료가 발생하는 경우가 많습니다",
      "기존 서비스는 대부분 한국어 전용이거나 유료입니다",
    ],
    
    solutionTitle: "💡 우리의 해결책",
    solutions: [
      { icon: "📷", title: "AI OCR 자동 입력", desc: "외국인등록증 사진 한 장으로 30초 만에 입력 완료" },
      { icon: "📍", title: "공공데이터 활용", desc: "법무부 공공데이터로 관할 사무소 자동 추천" },
      { icon: "🌍", title: "다국어 지원", desc: "한국어 / English / Tiếng Việt 풀 지원" },
      { icon: "📄", title: "공식 양식 자동 채우기", desc: "출입국 통합신청서 PDF 즉시 생성" },
      { icon: "🔒", title: "개인정보 무저장", desc: "민감정보는 브라우저에만 저장, 서버 무전송" },
      { icon: "💰", title: "완전 무료", desc: "광고 없음, 평생 무료, 가입 불필요" },
    ],
    
    techTitle: "⚙️ 기술 스택",
    techs: [
      { label: "AI / OCR", value: "Tesseract.js (오픈소스, 한글+영문)" },
      { label: "공공데이터", value: "법무부 출입국·외국인정책본부" },
      { label: "프론트엔드", value: "Next.js 16 + TypeScript + Tailwind CSS" },
      { label: "PDF 생성", value: "pdf-lib + Noto Sans KR" },
      { label: "배포", value: "Vercel (자동 배포)" },
    ],
    
    flowTitle: "🚀 사용 흐름",
    flowSteps: [
      "비자 종류 선택 (E-9)",
      "체류기간 만료일 입력 → 자동 경고",
      "회사/주소 변경 여부 답변",
      "📷 등록증 사진 업로드 → AI 자동 입력",
      "결과: 맞춤 체크리스트 + 공식 양식 PDF",
    ],
    
    targetTitle: "👥 타겟 사용자",
    targetItems: [
      { title: "외국인 근로자 (B2C)", desc: "E-9 비자 보유, 본인이 직접 사용" },
      { title: "기업 인사담당자 (B2B)", desc: "외국인 직원 관리 효율화" },
      { title: "충북 제조업 (1차 타겟)", desc: "외국인 근로자 다수, 행정 부담 큼" },
    ],
    
    betaTitle: "🧪 베타 테스트",
    betaDesc: "현재 충북 진천 제조업 현장에서 베타 테스트 진행 중",
    betaStats: [
      { label: "테스트 참여 외국인 근로자", value: "준비 중" },
      { label: "지원 언어", value: "3개 (한/영/베)" },
      { label: "공식 양식 자동 채움", value: "통합신청서" },
    ],
    
    impactTitle: "🎯 기대 효과",
    impacts: [
      "E-9 외국인 근로자 약 30만 명 잠재 사용자",
      "서류 작성 시간 5분 → 30초로 단축",
      "잘못된 사무소 방문/서류 누락으로 인한 시간 손실 방지",
      "출입국 사무소 민원 처리 부담 경감",
    ],
    
    ctaTitle: "지금 바로 사용해보세요",
    ctaBtn: "시작하기 →",
    
    disclaimer: "본 서비스는 서류 작성을 돕는 정보 제공 도구입니다. 최종 제출 및 승인 책임은 본인에게 있습니다.",
  },
  en: {
    flag: "🇺🇸", name: "English",
    backHome: "Home",
    badge: "📋 About",
    title: "What is 서류도우미?",
    subtitle: "AI-powered form helper for foreign workers in Korea",
    
    problemTitle: "🎯 The Problem",
    problems: [
      "Korean administrative terms are difficult for foreign workers",
      "Wrong office visits and missing documents cause time loss",
      "Missed visa expiry leads to penalties",
      "Existing services are mostly Korean-only or paid",
    ],
    
    solutionTitle: "💡 Our Solution",
    solutions: [
      { icon: "📷", title: "AI OCR Auto-fill", desc: "30 seconds with just a photo of your alien card" },
      { icon: "📍", title: "Public Data", desc: "Auto-recommend your immigration office" },
      { icon: "🌍", title: "Multilingual", desc: "Full Korean / English / Vietnamese support" },
      { icon: "📄", title: "Official Form Auto-fill", desc: "Generate Immigration Application PDF instantly" },
      { icon: "🔒", title: "No Data Storage", desc: "Sensitive data stays in browser, never sent to server" },
      { icon: "💰", title: "Completely Free", desc: "No ads, forever free, no signup" },
    ],
    
    techTitle: "⚙️ Tech Stack",
    techs: [
      { label: "AI / OCR", value: "Tesseract.js (Open source, Korean+English)" },
      { label: "Public Data", value: "Korea Immigration Service" },
      { label: "Frontend", value: "Next.js 16 + TypeScript + Tailwind CSS" },
      { label: "PDF Generation", value: "pdf-lib + Noto Sans KR" },
      { label: "Deployment", value: "Vercel (Auto-deploy)" },
    ],
    
    flowTitle: "🚀 User Flow",
    flowSteps: [
      "Select visa type (E-9)",
      "Enter expiry date → Auto-warning",
      "Answer about company/address changes",
      "📷 Upload card photo → AI auto-fill",
      "Result: Custom checklist + Official PDF",
    ],
    
    targetTitle: "👥 Target Users",
    targetItems: [
      { title: "Foreign Workers (B2C)", desc: "E-9 visa holders, direct users" },
      { title: "HR Managers (B2B)", desc: "Streamline foreign employee management" },
      { title: "Chungbuk Manufacturers (Primary)", desc: "Many foreign workers, heavy admin burden" },
    ],
    
    betaTitle: "🧪 Beta Test",
    betaDesc: "Currently in beta test at Chungbuk Jincheon manufacturing site",
    betaStats: [
      { label: "Foreign worker testers", value: "In progress" },
      { label: "Languages supported", value: "3 (KO/EN/VI)" },
      { label: "Official form auto-fill", value: "Application Form" },
    ],
    
    impactTitle: "🎯 Expected Impact",
    impacts: [
      "~300,000 potential E-9 foreign worker users",
      "Form filling: 5 min → 30 seconds",
      "Prevent time loss from wrong offices and missing docs",
      "Reduce immigration office workload",
    ],
    
    ctaTitle: "Try it now",
    ctaBtn: "Get Started →",
    
    disclaimer: "This service helps with form preparation. Final submission and approval responsibility is with the user.",
  },
  vi: {
    flag: "🇻🇳", name: "Tiếng Việt",
    backHome: "Trang chủ",
    badge: "📋 Giới thiệu",
    title: "서류도우미 là gì?",
    subtitle: "Trợ lý AI điền giấy tờ hành chính cho người lao động nước ngoài tại Hàn Quốc",
    
    problemTitle: "🎯 Vấn đề",
    problems: [
      "Thuật ngữ hành chính tiếng Hàn khó với người nước ngoài",
      "Đi sai văn phòng, thiếu giấy tờ làm mất thời gian",
      "Quên hạn visa dẫn đến bị phạt",
      "Dịch vụ hiện có chủ yếu chỉ tiếng Hàn hoặc trả phí",
    ],
    
    solutionTitle: "💡 Giải pháp",
    solutions: [
      { icon: "📷", title: "AI OCR tự động", desc: "30 giây với ảnh thẻ ngoại kiều" },
      { icon: "📍", title: "Dữ liệu công", desc: "Tự gợi ý văn phòng XNC" },
      { icon: "🌍", title: "Đa ngôn ngữ", desc: "Hỗ trợ đầy đủ Hàn / Anh / Việt" },
      { icon: "📄", title: "Tự điền mẫu", desc: "Tạo PDF đơn XNC ngay" },
      { icon: "🔒", title: "Không lưu", desc: "Dữ liệu chỉ trong trình duyệt" },
      { icon: "💰", title: "Miễn phí", desc: "Không quảng cáo, không đăng ký" },
    ],
    
    techTitle: "⚙️ Công nghệ",
    techs: [
      { label: "AI / OCR", value: "Tesseract.js (mã nguồn mở)" },
      { label: "Dữ liệu công", value: "Cục XNC Hàn Quốc" },
      { label: "Frontend", value: "Next.js 16 + TypeScript + Tailwind" },
      { label: "PDF", value: "pdf-lib + Noto Sans KR" },
      { label: "Deploy", value: "Vercel" },
    ],
    
    flowTitle: "🚀 Cách dùng",
    flowSteps: [
      "Chọn loại visa (E-9)",
      "Nhập ngày hết hạn → Cảnh báo tự động",
      "Trả lời về thay đổi công ty/địa chỉ",
      "📷 Tải ảnh thẻ → AI tự điền",
      "Kết quả: Danh sách + PDF chính thức",
    ],
    
    targetTitle: "👥 Đối tượng",
    targetItems: [
      { title: "Người lao động (B2C)", desc: "Người có visa E-9, dùng trực tiếp" },
      { title: "Nhân sự (B2B)", desc: "Quản lý nhân viên nước ngoài" },
      { title: "Nhà máy Chungbuk", desc: "Nhiều lao động nước ngoài" },
    ],
    
    betaTitle: "🧪 Thử nghiệm",
    betaDesc: "Đang thử nghiệm tại nhà máy Chungbuk Jincheon",
    betaStats: [
      { label: "Người tham gia", value: "Đang tiến hành" },
      { label: "Ngôn ngữ", value: "3 (Hàn/Anh/Việt)" },
      { label: "Mẫu tự điền", value: "Đơn XNC" },
    ],
    
    impactTitle: "🎯 Tác động",
    impacts: [
      "~300.000 người dùng tiềm năng",
      "Điền giấy tờ: 5 phút → 30 giây",
      "Tránh mất thời gian do sai văn phòng",
      "Giảm tải cho cơ quan XNC",
    ],
    
    ctaTitle: "Thử ngay",
    ctaBtn: "Bắt đầu →",
    
    disclaimer: "Dịch vụ hỗ trợ chuẩn bị giấy tờ. Trách nhiệm cuối cùng thuộc về người dùng.",
  },
};

type Lang = "ko" | "en" | "vi";

export default function AboutPage() {
  const lang = useLang() as Lang;
  const t = TEXTS[lang];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <LanguageHeader backHref="/" backLabel={t.backHome} />

      <section className="max-w-3xl mx-auto px-6 py-10">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-blue-100 rounded-full mb-4">
            <p className="text-xs font-medium text-blue-800">{t.badge}</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-3">
            {t.title}
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 문제 */}
        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.problemTitle}</h2>
          <div className="space-y-2">
            {t.problems.map((p, i) => (
              <div key={i} className="bg-red-50 border-l-4 border-red-300 p-3 rounded-r-lg">
                <p className="text-sm text-red-900">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 해결책 */}
        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.solutionTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.solutions.map((s, i) => (
              <div key={i} className="bg-white border border-blue-100 rounded-xl p-4 hover:border-blue-300 transition-all">
                <div className="text-2xl mb-2">{s.icon}</div>
                <p className="text-sm font-medium text-gray-900 mb-1">{s.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 사용 흐름 */}
        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.flowTitle}</h2>
          <div className="space-y-2">
            {t.flowSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-lg p-3">
                <div className="flex-shrink-0 w-7 h-7 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.techTitle}</h2>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-3">
            {t.techs.map((tech, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                <p className="text-xs font-medium text-blue-700 md:w-32">{tech.label}</p>
                <p className="text-xs text-gray-700 flex-1">{tech.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 타겟 */}
        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.targetTitle}</h2>
          <div className="space-y-3">
            {t.targetItems.map((item, i) => (
              <div key={i} className="bg-white border border-purple-100 rounded-xl p-4">
                <p className="text-sm font-medium text-purple-900 mb-1">{item.title}</p>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 베타 테스트 (지금은 비어있음, 나중에 채움) */}
        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.betaTitle}</h2>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-3">
            <p className="text-sm text-amber-900">{t.betaDesc}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {t.betaStats.map((stat, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                <p className="text-sm font-medium text-blue-700">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 기대 효과 */}
        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.impactTitle}</h2>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-5">
            <ul className="space-y-2">
              {t.impacts.map((impact, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-700 mt-0.5">✓</span>
                  <span className="text-sm text-gray-800">{impact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-700 rounded-xl p-8 mb-8">
          <h2 className="text-xl text-white font-medium mb-4">{t.ctaTitle}</h2>
          <Link href="/start"
            className="inline-block px-6 py-3 bg-white text-blue-700 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all shadow-md">
            {t.ctaBtn}
          </Link>
          
        </div>

        {/* 면책 */}
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
          <p className="text-xs text-amber-800 leading-relaxed">
            ⚠️ {t.disclaimer}
          </p>
        </div>
      </section>
    </main>
  );
}