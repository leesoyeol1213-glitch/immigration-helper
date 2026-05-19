"use client";

import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import Link from "next/link";
import { Lang } from "@/lib/i18n";

const TEXTS: Record<Lang, any> = {
  ko: {
    backHome: "처음으로",
    badge: "📋 About",
    title: "서류도우미가 무엇인가요?",
    subtitle: "외국인 근로자를 위한 AI 기반 행정서류 작성 도우미입니다",
    chungbukTitle: "📊 충북 외국인 현황 (출처: 충북도청 2025년)",
    chungbukStats: [
      { value: "80,416명", label: "충북 체류 외국인", subLabel: "전체 인구의 4.81%" },
      { value: "전국 3위", label: "외국인 비중", subLabel: "충남, 경기 다음" },
      { value: "음성군 16.68%", label: "외국인 비율 최고", subLabel: "도내 11개 시군 중" },
      { value: "청주 28,555명", label: "외국인 최다 도시", subLabel: "도내 1위" },
      { value: "58%", label: "20~30대 청년층", subLabel: "근로 연령대" },
      { value: "+59%", label: "유학생 증가율", subLabel: "전국 1위" },
    ],
    chungbukInsight: "💡 충북 외국인 8만명 = 보은+옥천 인구 = 우리의 핵심 타겟 시장",
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
      { icon: "🌍", title: "다국어 지원", desc: "9개 언어 풀 지원" },
      { icon: "📄", title: "공식 양식 자동 채우기", desc: "출입국 통합신청서 PDF 즉시 생성" },
      { icon: "🔒", title: "개인정보 무저장", desc: "민감정보는 브라우저에만, 서버 무전송" },
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
      { label: "지원 언어", value: "9개" },
      { label: "공식 양식 자동 채움", value: "통합신청서" },
    ],
    impactTitle: "🎯 기대 효과",
    impacts: [
      "E-9 외국인 근로자 약 30만 명 잠재 사용자",
      "서류 작성 시간 5분 → 30초로 단축",
      "잘못된 사무소 방문/서류 누락 시간 손실 방지",
      "출입국 사무소 민원 처리 부담 경감",
    ],
    ctaTitle: "지금 바로 사용해보세요",
    ctaBtn: "시작하기 →",
    businessTitle: "💰 비즈니스 모델",
    businessSub: "개인은 무료, 기업은 유료 — 사회적 가치 + 지속 가능성",
    businessTiers: [
      {
        tier: "Free",
        target: "외국인 근로자 (개인)",
        price: "₩0 / 평생 무료",
        features: ["기본 PDF 자동 생성", "AI OCR 자동 입력", "9개 언어 지원", "관할 사무소 안내"],
        highlight: false,
      },
      {
        tier: "Business",
        target: "회사 / 기업 (B2B)",
        price: "₩50,000~ / 월",
        features: ["전 직원 통합 관리", "만료일 자동 알림 (전 직원)", "PDF 일괄 발급", "이력 관리 대시보드", "전담 지원"],
        highlight: true,
      },
      {
        tier: "Enterprise",
        target: "정부/지자체 (B2G)",
        price: "협의",
        features: ["맞춤형 시스템", "API 통합", "온프레미스 배포 가능", "전용 서버"],
        highlight: false,
      },
    ],
    disclaimer: "본 서비스는 서류 작성을 돕는 정보 제공 도구입니다. 최종 제출 및 승인 책임은 본인에게 있습니다.",
  },
  en: {
    backHome: "Home",
    badge: "📋 About",
    title: "What is 서류도우미?",
    subtitle: "AI-powered form helper for foreign workers in Korea",
    chungbukTitle: "📊 Chungbuk Foreigners (Source: Chungbuk Province 2025)",
    chungbukStats: [
      { value: "80,416", label: "Foreigners in Chungbuk", subLabel: "4.81% of population" },
      { value: "#3 in Korea", label: "Foreigner ratio", subLabel: "After Chungnam, Gyeonggi" },
      { value: "Eumseong 16.68%", label: "Highest ratio", subLabel: "Among 11 cities" },
      { value: "Cheongju 28,555", label: "Most foreigners", subLabel: "#1 in province" },
      { value: "58%", label: "Aged 20-30s", subLabel: "Working age" },
      { value: "+59%", label: "Int'l student growth", subLabel: "#1 in Korea" },
    ],
    chungbukInsight: "💡 80,000+ foreigners in Chungbuk = Our core target market",
    problemTitle: "🎯 The Problem",
    problems: [
      "Korean administrative terms are difficult for foreign workers",
      "Wrong office visits and missing documents cause time loss",
      "Missed visa expiry leads to penalties",
      "Existing services are mostly Korean-only or paid",
    ],
    solutionTitle: "💡 Our Solution",
    solutions: [
      { icon: "📷", title: "AI OCR Auto-fill", desc: "30 seconds with just a photo" },
      { icon: "📍", title: "Public Data", desc: "Auto-recommend your immigration office" },
      { icon: "🌍", title: "Multilingual", desc: "9 languages supported" },
      { icon: "📄", title: "Official Form Auto-fill", desc: "Generate official PDF instantly" },
      { icon: "🔒", title: "No Data Storage", desc: "Sensitive data stays in browser" },
      { icon: "💰", title: "Completely Free", desc: "No ads, forever free, no signup" },
    ],
    techTitle: "⚙️ Tech Stack",
    techs: [
      { label: "AI / OCR", value: "Tesseract.js (Open source)" },
      { label: "Public Data", value: "Korea Immigration Service" },
      { label: "Frontend", value: "Next.js 16 + TypeScript + Tailwind" },
      { label: "PDF", value: "pdf-lib + Noto Sans KR" },
      { label: "Deployment", value: "Vercel" },
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
      { title: "Chungbuk Manufacturers", desc: "Many foreign workers, heavy admin burden" },
    ],
    betaTitle: "🧪 Beta Test",
    betaDesc: "Currently in beta at Chungbuk Jincheon manufacturing site",
    betaStats: [
      { label: "Foreign worker testers", value: "In progress" },
      { label: "Languages supported", value: "9" },
      { label: "Official form auto-fill", value: "Application Form" },
    ],
    impactTitle: "🎯 Expected Impact",
    impacts: [
      "~300,000 potential E-9 foreign worker users",
      "Form filling: 5 min → 30 seconds",
      "Prevent time loss from wrong offices",
      "Reduce immigration office workload",
    ],
    ctaTitle: "Try it now",
    ctaBtn: "Get Started →",
    businessTitle: "💰 Business Model",
    businessSub: "Free for individuals, paid for businesses — social value + sustainability",
    businessTiers: [
      {
        tier: "Free",
        target: "Foreign Workers",
        price: "Forever Free",
        features: ["Auto PDF generation", "AI OCR auto-fill", "9 languages", "Office finder"],
        highlight: false,
      },
      {
        tier: "Business",
        target: "Companies (B2B)",
        price: "From ₩50,000 / mo",
        features: ["Manage all employees", "Auto expiry alerts", "Bulk PDF issuance", "Dashboard", "Dedicated support"],
        highlight: true,
      },
      {
        tier: "Enterprise",
        target: "Government (B2G)",
        price: "Contact us",
        features: ["Custom system", "API integration", "On-premise deployment", "Dedicated server"],
        highlight: false,
      },
    ],
    disclaimer: "This service helps with form preparation. Final responsibility is with the user.",
  },
  vi: {
    backHome: "Trang chủ",
    badge: "📋 Giới thiệu",
    title: "서류도우미 là gì?",
    subtitle: "Trợ lý AI điền giấy tờ cho người lao động nước ngoài tại Hàn Quốc",
    chungbukTitle: "📊 Người nước ngoài tại Chungbuk (2025)",
    chungbukStats: [
      { value: "80,416", label: "Người nước ngoài Chungbuk", subLabel: "4.81% dân số" },
      { value: "Hạng 3", label: "Tỷ lệ người nước ngoài", subLabel: "Toàn quốc" },
      { value: "Eumseong 16.68%", label: "Tỷ lệ cao nhất", subLabel: "Trong 11 thành phố" },
      { value: "Cheongju 28,555", label: "Nhiều nhất", subLabel: "Hạng 1 tỉnh" },
      { value: "58%", label: "Tuổi 20-30", subLabel: "Tuổi lao động" },
      { value: "+59%", label: "Tăng du học sinh", subLabel: "Hạng 1 toàn quốc" },
    ],
    chungbukInsight: "💡 80.000+ người nước ngoài Chungbuk = Thị trường mục tiêu",
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
      { icon: "🌍", title: "Đa ngôn ngữ", desc: "Hỗ trợ 9 ngôn ngữ" },
      { icon: "📄", title: "Tự điền mẫu", desc: "Tạo PDF chính thức ngay" },
      { icon: "🔒", title: "Không lưu", desc: "Dữ liệu chỉ trong trình duyệt" },
      { icon: "💰", title: "Miễn phí", desc: "Không quảng cáo, miễn phí mãi" },
    ],
    techTitle: "⚙️ Công nghệ",
    techs: [
      { label: "AI / OCR", value: "Tesseract.js (mã nguồn mở)" },
      { label: "Dữ liệu công", value: "Cục XNC Hàn Quốc" },
      { label: "Frontend", value: "Next.js 16 + TypeScript" },
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
      { title: "Người lao động (B2C)", desc: "Người có visa E-9" },
      { title: "Nhân sự (B2B)", desc: "Quản lý nhân viên nước ngoài" },
      { title: "Nhà máy Chungbuk", desc: "Nhiều lao động nước ngoài" },
    ],
    betaTitle: "🧪 Thử nghiệm",
    betaDesc: "Đang thử nghiệm tại nhà máy Chungbuk Jincheon",
    betaStats: [
      { label: "Người tham gia", value: "Đang tiến hành" },
      { label: "Ngôn ngữ", value: "9" },
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
    businessTitle: "💰 Mô hình kinh doanh",
    businessSub: "Miễn phí cho cá nhân, có phí cho doanh nghiệp",
    businessTiers: [
      {
        tier: "Miễn phí",
        target: "Người lao động",
        price: "Miễn phí mãi",
        features: ["Tạo PDF tự động", "AI OCR", "9 ngôn ngữ", "Tìm văn phòng"],
        highlight: false,
      },
      {
        tier: "Doanh nghiệp",
        target: "Công ty (B2B)",
        price: "Từ ₩50,000/tháng",
        features: ["Quản lý tất cả nhân viên", "Cảnh báo tự động", "PDF hàng loạt", "Bảng điều khiển", "Hỗ trợ chuyên dụng"],
        highlight: true,
      },
      {
        tier: "Doanh nghiệp lớn",
        target: "Chính phủ (B2G)",
        price: "Liên hệ",
        features: ["Hệ thống tùy chỉnh", "Tích hợp API", "Triển khai tại chỗ", "Máy chủ riêng"],
        highlight: false,
      },
    ],
    disclaimer: "Dịch vụ hỗ trợ chuẩn bị giấy tờ. Trách nhiệm cuối cùng thuộc về người dùng.",
  },
  th: {
    backHome: "หน้าหลัก",
    badge: "📋 เกี่ยวกับ",
    title: "서류도우미 คืออะไร?",
    subtitle: "ผู้ช่วยกรอกเอกสาร AI สำหรับแรงงานต่างชาติในเกาหลี",
    problemTitle: "🎯 ปัญหา",
    problems: [
      "ภาษาราชการเกาหลีเข้าใจยากสำหรับชาวต่างชาติ",
      "ไปสำนักงานผิด เอกสารขาด เสียเวลา",
      "ลืมต่อวีซ่าทำให้ถูกปรับ",
      "บริการที่มีส่วนใหญ่เป็นภาษาเกาหลีหรือเสียเงิน",
    ],
    solutionTitle: "💡 ทางแก้",
    solutions: [
      { icon: "📷", title: "AI OCR อัตโนมัติ", desc: "30 วินาทีด้วยรูปบัตร" },
      { icon: "📍", title: "ข้อมูลสาธารณะ", desc: "แนะนำสำนักงาน ตม. อัตโนมัติ" },
      { icon: "🌍", title: "หลายภาษา", desc: "รองรับ 9 ภาษา" },
      { icon: "📄", title: "กรอกแบบฟอร์มทางการ", desc: "สร้าง PDF ทันที" },
      { icon: "🔒", title: "ไม่เก็บข้อมูล", desc: "ข้อมูลอยู่ในเบราว์เซอร์เท่านั้น" },
      { icon: "💰", title: "ฟรี", desc: "ไม่มีโฆษณา ฟรีตลอด" },
    ],
    techTitle: "⚙️ เทคโนโลยี",
    techs: [
      { label: "AI / OCR", value: "Tesseract.js" },
      { label: "ข้อมูลสาธารณะ", value: "สำนักงาน ตม. เกาหลี" },
      { label: "Frontend", value: "Next.js 16 + TypeScript" },
      { label: "PDF", value: "pdf-lib" },
      { label: "Deploy", value: "Vercel" },
    ],
    flowTitle: "🚀 วิธีใช้",
    flowSteps: [
      "เลือกประเภทวีซ่า (E-9)",
      "ใส่วันหมดอายุ → เตือนอัตโนมัติ",
      "ตอบเรื่องบริษัท/ที่อยู่",
      "📷 อัปโหลดรูปบัตร → AI กรอก",
      "ผล: รายการตรวจสอบ + PDF",
    ],
    targetTitle: "👥 ผู้ใช้",
    targetItems: [
      { title: "แรงงานต่างชาติ (B2C)", desc: "ผู้ถือวีซ่า E-9" },
      { title: "ฝ่ายบุคคล (B2B)", desc: "จัดการพนักงานต่างชาติ" },
      { title: "โรงงาน Chungbuk", desc: "แรงงานต่างชาติจำนวนมาก" },
    ],
    betaTitle: "🧪 ทดสอบ",
    betaDesc: "ทดสอบที่โรงงาน Chungbuk Jincheon",
    betaStats: [
      { label: "ผู้ทดสอบ", value: "กำลังดำเนินการ" },
      { label: "ภาษา", value: "9" },
      { label: "แบบฟอร์ม", value: "ใบสมัคร" },
    ],
    impactTitle: "🎯 ผลกระทบ",
    impacts: [
      "ผู้ใช้ E-9 ประมาณ 300,000 คน",
      "กรอกฟอร์ม: 5 นาที → 30 วินาที",
      "ป้องกันการเสียเวลา",
      "ลดภาระสำนักงาน ตม.",
    ],
    ctaTitle: "ลองเลย",
    ctaBtn: "เริ่ม →",
    disclaimer: "บริการช่วยเตรียมเอกสาร ความรับผิดชอบสุดท้ายเป็นของผู้ใช้",
  },
  km: {
    backHome: "ទំព័រដើម",
    badge: "📋 អំពី",
    title: "서류도우미 ជាអ្វី?",
    subtitle: "ជំនួយការ AI សម្រាប់កម្មករបរទេសនៅកូរ៉េ",
    problemTitle: "🎯 បញ្ហា",
    problems: [
      "ពាក្យរដ្ឋបាលកូរ៉េពិបាកសម្រាប់ជនបរទេស",
      "ទៅការិយាល័យខុស ខ្វះឯកសារ ខាតពេលច្រើន",
      "ភ្លេចបន្តទិដ្ឋាការ បានរងពិន័យ",
      "សេវាកម្មភាគច្រើនជាភាសាកូរ៉េឬបង់ប្រាក់",
    ],
    solutionTitle: "💡 ដំណោះស្រាយ",
    solutions: [
      { icon: "📷", title: "AI OCR ស្វ័យប្រវត្តិ", desc: "30 វិនាទីពីរូបថត" },
      { icon: "📍", title: "ទិន្នន័យសាធារណៈ", desc: "ស្វែងរកការិយាល័យ" },
      { icon: "🌍", title: "ច្រើនភាសា", desc: "គាំទ្រ 9 ភាសា" },
      { icon: "📄", title: "បំពេញឯកសារ", desc: "បង្កើត PDF ភ្លាមៗ" },
      { icon: "🔒", title: "មិនរក្សាទុក", desc: "ទិន្នន័យក្នុងកម្មវិធីរុករកប៉ុណ្ណោះ" },
      { icon: "💰", title: "ឥតគិតថ្លៃ", desc: "គ្មានការផ្សាយពាណិជ្ជកម្ម" },
    ],
    techTitle: "⚙️ បច្ចេកវិទ្យា",
    techs: [
      { label: "AI / OCR", value: "Tesseract.js" },
      { label: "ទិន្នន័យ", value: "ការិយាល័យអន្តោប្រវេសន៍កូរ៉េ" },
      { label: "Frontend", value: "Next.js 16" },
      { label: "PDF", value: "pdf-lib" },
      { label: "Deploy", value: "Vercel" },
    ],
    flowTitle: "🚀 របៀបប្រើ",
    flowSteps: [
      "ជ្រើសរើសប្រភេទទិដ្ឋាការ (E-9)",
      "បញ្ចូលថ្ងៃផុតកំណត់",
      "ឆ្លើយអំពីការផ្លាស់ប្តូរ",
      "📷 បង្ហោះរូបថត",
      "លទ្ធផល: បញ្ជី + PDF",
    ],
    targetTitle: "👥 អ្នកប្រើ",
    targetItems: [
      { title: "កម្មករបរទេស (B2C)", desc: "អ្នកមានទិដ្ឋាការ E-9" },
      { title: "ធនធានមនុស្ស (B2B)", desc: "គ្រប់គ្រងបុគ្គលិក" },
      { title: "រោងចក្រ Chungbuk", desc: "កម្មករបរទេសច្រើន" },
    ],
    betaTitle: "🧪 សាកល្បង",
    betaDesc: "សាកល្បងនៅរោងចក្រ Chungbuk Jincheon",
    betaStats: [
      { label: "អ្នកសាកល្បង", value: "កំពុងដំណើរការ" },
      { label: "ភាសា", value: "9" },
      { label: "ឯកសារ", value: "ពាក្យសុំ" },
    ],
    impactTitle: "🎯 ផលប៉ះពាល់",
    impacts: [
      "អ្នកប្រើ E-9 ប្រហែល 300,000 នាក់",
      "បំពេញ: 5 នាទី → 30 វិនាទី",
      "ការពារការខាតបង់ពេលវេលា",
      "កាត់បន្ថយបន្ទុករដ្ឋាភិបាល",
    ],
    ctaTitle: "សាកល្បងឥឡូវនេះ",
    ctaBtn: "ចាប់ផ្តើម →",
    disclaimer: "សេវាកម្មនេះជួយរៀបចំឯកសារ ការទទួលខុសត្រូវចុងក្រោយជារបស់អ្នកប្រើ",
  },
  ne: {
    backHome: "गृहपृष्ठ",
    badge: "📋 बारेमा",
    title: "서류도우미 के हो?",
    subtitle: "कोरियामा विदेशी कामदारका लागि AI सहायक",
    problemTitle: "🎯 समस्या",
    problems: [
      "कोरियाली प्रशासनिक शब्दहरू विदेशीहरूका लागि कठिन",
      "गलत कार्यालय जाँदा र कागजात छुट्दा समय खर्च",
      "भिसा म्याद नवीकरण नगर्दा जरिवाना",
      "उपलब्ध सेवाहरू अधिकांश कोरियाली वा शुल्क",
    ],
    solutionTitle: "💡 समाधान",
    solutions: [
      { icon: "📷", title: "AI OCR स्वत:", desc: "30 सेकेन्डमा फोटोबाट" },
      { icon: "📍", title: "सार्वजनिक डेटा", desc: "आप्रवासन कार्यालय खोज्नुहोस्" },
      { icon: "🌍", title: "बहुभाषी", desc: "9 भाषा समर्थन" },
      { icon: "📄", title: "स्वत: फारम भर्ने", desc: "PDF तुरुन्तै" },
      { icon: "🔒", title: "डेटा भण्डारण छैन", desc: "ब्राउजरमा मात्र" },
      { icon: "💰", title: "नि:शुल्क", desc: "विज्ञापन छैन, सधैं नि:शुल्क" },
    ],
    techTitle: "⚙️ प्रविधि",
    techs: [
      { label: "AI / OCR", value: "Tesseract.js" },
      { label: "डेटा", value: "कोरिया आप्रवासन" },
      { label: "Frontend", value: "Next.js 16" },
      { label: "PDF", value: "pdf-lib" },
      { label: "Deploy", value: "Vercel" },
    ],
    flowTitle: "🚀 प्रयोग",
    flowSteps: [
      "भिसा प्रकार छनोट (E-9)",
      "म्याद सकिने मिति",
      "कम्पनी/ठेगाना उत्तर",
      "📷 कार्ड फोटो अपलोड",
      "नतिजा: सूची + PDF",
    ],
    targetTitle: "👥 प्रयोगकर्ता",
    targetItems: [
      { title: "विदेशी कामदार (B2C)", desc: "E-9 भिसाधारी" },
      { title: "मानव संसाधन (B2B)", desc: "कर्मचारी व्यवस्थापन" },
      { title: "Chungbuk उद्योग", desc: "धेरै विदेशी कामदार" },
    ],
    betaTitle: "🧪 परीक्षण",
    betaDesc: "Chungbuk Jincheon उद्योगमा परीक्षण",
    betaStats: [
      { label: "परीक्षणकर्ता", value: "जारी" },
      { label: "भाषा", value: "9" },
      { label: "फारम", value: "आवेदन" },
    ],
    impactTitle: "🎯 प्रभाव",
    impacts: [
      "करिब 3 लाख E-9 प्रयोगकर्ता",
      "फारम भर्ने: 5 मिनेट → 30 सेकेन्ड",
      "समयको बचत",
      "आप्रवासन कार्यालयको बोझ कम",
    ],
    ctaTitle: "अहिले प्रयोग गर्नुहोस्",
    ctaBtn: "सुरु →",
    disclaimer: "यो सेवा कागजात तयार पार्न मद्दत गर्छ। अन्तिम जिम्मेवारी प्रयोगकर्तासँग।",
  },
  si: {
    backHome: "මුල් පිටුව",
    badge: "📋 පිළිබඳ",
    title: "서류도우미 යනු කුමක්ද?",
    subtitle: "කොරියාවේ විදේශීය සේවකයින්ට AI සහායක",
    problemTitle: "🎯 ගැටලුව",
    problems: [
      "කොරියානු පරිපාලන වචන විදේශීයන්ට අසීරුයි",
      "වැරදි කාර්යාල ගමන් කාලය නාස්ති වේ",
      "වීසා කල් ඉකුත් වීම නිසා දඩ",
      "පවතින සේවා බොහෝමයක් කොරියානු හෝ ගෙවිය යුතුයි",
    ],
    solutionTitle: "💡 විසඳුම",
    solutions: [
      { icon: "📷", title: "AI OCR ස්වයංක්‍රීය", desc: "තත්පර 30 යි" },
      { icon: "📍", title: "පොදු දත්ත", desc: "විගමන කාර්යාල සොයන්න" },
      { icon: "🌍", title: "බහු භාෂා", desc: "භාෂා 9 ක්" },
      { icon: "📄", title: "ස්වයංක්‍රීය පුරවීම", desc: "PDF ක්ෂණිකව" },
      { icon: "🔒", title: "දත්ත නැත", desc: "බ්‍රවුසරයේ පමණි" },
      { icon: "💰", title: "නොමිලේ", desc: "දැන්වීම් නැත" },
    ],
    techTitle: "⚙️ තාක්ෂණය",
    techs: [
      { label: "AI / OCR", value: "Tesseract.js" },
      { label: "දත්ත", value: "කොරියාවේ විගමන" },
      { label: "Frontend", value: "Next.js 16" },
      { label: "PDF", value: "pdf-lib" },
      { label: "Deploy", value: "Vercel" },
    ],
    flowTitle: "🚀 භාවිතය",
    flowSteps: [
      "වීසා වර්ගය (E-9)",
      "කල් ඉකුත් දිනය",
      "සමාගම/ලිපිනය",
      "📷 කාඩ්පත් ඡායාරූපය",
      "ප්‍රතිඵලය: ලැයිස්තුව + PDF",
    ],
    targetTitle: "👥 පරිශීලකයින්",
    targetItems: [
      { title: "විදේශීය සේවකයින් (B2C)", desc: "E-9 වීසා" },
      { title: "මානව සම්පත් (B2B)", desc: "කළමනාකරණය" },
      { title: "Chungbuk කර්මාන්ත", desc: "විදේශීය සේවකයින් බොහෝය" },
    ],
    betaTitle: "🧪 පරීක්ෂණය",
    betaDesc: "Chungbuk Jincheon හි පරීක්ෂණය",
    betaStats: [
      { label: "පරීක්ෂකයින්", value: "ක්‍රියාත්මක" },
      { label: "භාෂා", value: "9" },
      { label: "පෝරමය", value: "අයදුම්" },
    ],
    impactTitle: "🎯 බලපෑම",
    impacts: [
      "E-9 පරිශීලකයින් 300,000",
      "පෝරම: මිනිත්තු 5 → තත්පර 30",
      "කාල සංරක්ෂණය",
      "කාර්යාල බර අඩු",
    ],
    ctaTitle: "දැන් අත්හදා බලන්න",
    ctaBtn: "ආරම්භ →",
    disclaimer: "මෙය ලේඛන සකස් කිරීමට උපකාරී වේ. අවසන් වගකීම පරිශීලකයාට.",
  },
  my: {
    backHome: "ပင်မစာမျက်နှာ",
    badge: "📋 အကြောင်း",
    title: "서류도우미 ဆိုတာ ဘာလဲ?",
    subtitle: "ကိုရီးယားရှိ နိုင်ငံခြားအလုပ်သမားများအတွက် AI အကူ",
    problemTitle: "🎯 ပြဿနာ",
    problems: [
      "ကိုရီးယားအသုံးအနှုန်းများ ခက်ခဲသည်",
      "မှားသောရုံးသွားခြင်း၊ စာရွက်စာတမ်းမစုံ၍ အချိန်ဆုံးရှုံး",
      "ဗီဇာသက်တမ်းကုန်၍ ဒဏ်ငွေ",
      "ရှိသောဝန်ဆောင်မှုများ ကိုရီးယားသာ သို့ ပိုက်ဆံပေး",
    ],
    solutionTitle: "💡 ဖြေရှင်းချက်",
    solutions: [
      { icon: "📷", title: "AI OCR အလိုအလျောက်", desc: "ဓာတ်ပုံ ၁ ပုံ၊ 30 စက္ကန့်" },
      { icon: "📍", title: "အများသုံးဒေတာ", desc: "လူဝင်မှုကြီးကြပ်ရေးရုံး" },
      { icon: "🌍", title: "ဘာသာများ", desc: "9 ဘာသာ ပံ့ပိုး" },
      { icon: "📄", title: "ပုံစံ ဖြည့်ပါ", desc: "PDF ချက်ချင်း" },
      { icon: "🔒", title: "မသိမ်းပါ", desc: "browser တွင်သာ" },
      { icon: "💰", title: "အခမဲ့", desc: "ကြော်ငြာမရှိ" },
    ],
    techTitle: "⚙️ နည်းပညာ",
    techs: [
      { label: "AI / OCR", value: "Tesseract.js" },
      { label: "ဒေတာ", value: "ကိုရီးယားလူဝင်မှု" },
      { label: "Frontend", value: "Next.js 16" },
      { label: "PDF", value: "pdf-lib" },
      { label: "Deploy", value: "Vercel" },
    ],
    flowTitle: "🚀 အသုံးပြုနည်း",
    flowSteps: [
      "ဗီဇာရွေးပါ (E-9)",
      "ကုန်ဆုံးရက်",
      "ကုမ္ပဏီ/လိပ်စာ",
      "📷 ကတ်ဓာတ်ပုံ",
      "ရလဒ်: စာရင်း + PDF",
    ],
    targetTitle: "👥 အသုံးပြုသူ",
    targetItems: [
      { title: "နိုင်ငံခြားအလုပ်သမား (B2C)", desc: "E-9 ဗီဇာ" },
      { title: "HR (B2B)", desc: "ဝန်ထမ်းစီမံ" },
      { title: "Chungbuk စက်ရုံ", desc: "နိုင်ငံခြားအလုပ်သမားများ" },
    ],
    betaTitle: "🧪 စမ်းသပ်",
    betaDesc: "Chungbuk Jincheon စက်ရုံတွင် စမ်းသပ်",
    betaStats: [
      { label: "စမ်းသပ်သူ", value: "ဆောင်ရွက်ဆဲ" },
      { label: "ဘာသာ", value: "9" },
      { label: "ပုံစံ", value: "လျှောက်လွှာ" },
    ],
    impactTitle: "🎯 အကျိုးသက်ရောက်မှု",
    impacts: [
      "E-9 အသုံးပြုသူ 300,000",
      "ပုံစံဖြည့်: 5 မိနစ် → 30 စက္ကန့်",
      "အချိန်စားသုံးခြင်း ကာကွယ်",
      "ရုံးဝန်ထမ်းအား လျှော့ချ",
    ],
    ctaTitle: "ယခုစမ်းကြည့်ပါ",
    ctaBtn: "စတင်ပါ →",
    disclaimer: "ဤဝန်ဆောင်မှုသည် စာရွက်စာတမ်းပြင်ဆင်ရန် ကူညီသည်။ နောက်ဆုံးတာဝန်သည် အသုံးပြုသူ၏။",
  },
  zh: {
    backHome: "首页",
    badge: "📋 关于",
    title: "什么是 서류도우미?",
    subtitle: "为韩国外籍劳动者打造的AI行政文件助手",
    problemTitle: "🎯 解决的问题",
    problems: [
      "韩文行政术语对外国人来说很难",
      "去错办公室、文件遗漏导致时间损失",
      "错过签证到期日导致罚款",
      "现有服务大多只支持韩语或收费",
    ],
    solutionTitle: "💡 我们的解决方案",
    solutions: [
      { icon: "📷", title: "AI OCR 自动填写", desc: "拍一张照片30秒完成" },
      { icon: "📍", title: "公共数据", desc: "自动推荐管辖出入境办公室" },
      { icon: "🌍", title: "多语言", desc: "支持9种语言" },
      { icon: "📄", title: "官方表格自动填写", desc: "立即生成官方PDF" },
      { icon: "🔒", title: "不存储数据", desc: "敏感数据仅在浏览器" },
      { icon: "💰", title: "完全免费", desc: "无广告,永久免费" },
    ],
    techTitle: "⚙️ 技术栈",
    techs: [
      { label: "AI / OCR", value: "Tesseract.js (开源)" },
      { label: "公共数据", value: "韩国出入境管理局" },
      { label: "Frontend", value: "Next.js 16 + TypeScript" },
      { label: "PDF", value: "pdf-lib + Noto Sans KR" },
      { label: "Deploy", value: "Vercel" },
    ],
    flowTitle: "🚀 使用流程",
    flowSteps: [
      "选择签证类型 (E-9)",
      "输入到期日 → 自动警告",
      "回答公司/地址变更",
      "📷 上传证件照 → AI自动填写",
      "结果: 定制清单 + 官方PDF",
    ],
    targetTitle: "👥 目标用户",
    targetItems: [
      { title: "外籍劳动者 (B2C)", desc: "E-9签证持有者" },
      { title: "人事经理 (B2B)", desc: "外籍员工管理" },
      { title: "忠北制造业", desc: "外籍员工众多" },
    ],
    betaTitle: "🧪 Beta测试",
    betaDesc: "目前在忠北镇川制造业现场进行Beta测试",
    betaStats: [
      { label: "测试参与者", value: "进行中" },
      { label: "支持语言", value: "9" },
      { label: "官方表格", value: "申请书" },
    ],
    impactTitle: "🎯 预期效果",
    impacts: [
      "约30万E-9外籍劳动者潜在用户",
      "填表时间: 5分钟 → 30秒",
      "防止时间损失",
      "减轻出入境办公室负担",
    ],
    ctaTitle: "立即试用",
    ctaBtn: "开始 →",
    disclaimer: "本服务协助文件准备,最终责任由用户承担。",
  },
};

export default function AboutPage() {
  const lang = useLang();
  const t = TEXTS[lang];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <LanguageHeader backHref="/" backLabel={t.backHome} />

      <section className="max-w-3xl mx-auto px-6 py-10">
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

        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.problemTitle}</h2>
          <div className="space-y-2">
            {t.problems.map((p: string, i: number) => (
              <div key={i} className="bg-red-50 border-l-4 border-red-300 p-3 rounded-r-lg">
                <p className="text-sm text-red-900">{p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.solutionTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.solutions.map((s: any, i: number) => (
              <div key={i} className="bg-white border border-blue-100 rounded-xl p-4 hover:border-blue-300 transition-all">
                <div className="text-2xl mb-2">{s.icon}</div>
                <p className="text-sm font-medium text-gray-900 mb-1">{s.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.flowTitle}</h2>
          <div className="space-y-2">
            {t.flowSteps.map((step: string, i: number) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-lg p-3">
                <div className="flex-shrink-0 w-7 h-7 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.techTitle}</h2>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-3">
            {t.techs.map((tech: any, i: number) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                <p className="text-xs font-medium text-blue-700 md:w-32">{tech.label}</p>
                <p className="text-xs text-gray-700 flex-1">{tech.value}</p>
              </div>
            ))}
          </div>
        </div>

{/* 충북 통계 (충북 특화!) */}
        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.chungbukTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
            {t.chungbukStats?.map((stat: any, i: number) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-4">
                <p className="text-lg font-bold text-blue-700 mb-1">{stat.value}</p>
                <p className="text-xs font-medium text-gray-800 mb-0.5">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.subLabel}</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <p className="text-sm text-amber-900 font-medium">{t.chungbukInsight}</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.targetTitle}</h2>
          <div className="space-y-3">
            {t.targetItems.map((item: any, i: number) => (
              <div key={i} className="bg-white border border-purple-100 rounded-xl p-4">
                <p className="text-sm font-medium text-purple-900 mb-1">{item.title}</p>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.betaTitle}</h2>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-3">
            <p className="text-sm text-amber-900">{t.betaDesc}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {t.betaStats.map((stat: any, i: number) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                <p className="text-sm font-medium text-blue-700">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

{/* 비즈니스 모델 */}
        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-2">{t.businessTitle}</h2>
          <p className="text-sm text-gray-500 mb-4">{t.businessSub}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {t.businessTiers?.map((tier: any, i: number) => (
              <div key={i} className={`rounded-xl p-5 border-2 ${
                tier.highlight 
                  ? "bg-gradient-to-br from-blue-700 to-blue-800 text-white border-blue-700" 
                  : "bg-white border-gray-200"
              }`}>
                <p className={`text-xs font-semibold mb-1 ${tier.highlight ? "text-blue-200" : "text-gray-400"}`}>
                  {tier.tier}
                </p>
                <p className={`text-sm font-medium mb-1 ${tier.highlight ? "text-white" : "text-gray-900"}`}>
                  {tier.target}
                </p>
                <p className={`text-lg font-bold mb-4 ${tier.highlight ? "text-white" : "text-blue-700"}`}>
                  {tier.price}
                </p>
                <ul className="space-y-1.5">
                  {tier.features.map((f: string, j: number) => (
                    <li key={j} className={`text-xs flex items-start gap-1.5 ${tier.highlight ? "text-blue-100" : "text-gray-600"}`}>
                      <span className={tier.highlight ? "text-blue-300" : "text-blue-500"}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.impactTitle}</h2>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-5">
            <ul className="space-y-2">
              {t.impacts.map((impact: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-700 mt-0.5">✓</span>
                  <span className="text-sm text-gray-800">{impact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center bg-blue-700 rounded-xl p-8 mb-8">
          <h2 className="text-xl text-white font-medium mb-4">{t.ctaTitle}</h2>
          <Link href="/start"
            className="inline-block px-6 py-3 bg-white text-blue-700 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all shadow-md">
            {t.ctaBtn}
          </Link>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
          <p className="text-xs text-amber-800 leading-relaxed">
            ⚠️ {t.disclaimer}
          </p>
        </div>
      </section>
    </main>
  );
}