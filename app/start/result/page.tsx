"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";
import { generatePdf, fillOfficialForm } from "@/lib/pdf";
import { findNearestOffice } from "@/lib/offices";

interface Doc {
  name: string;
  desc: string;
  isExtra?: boolean;
  group: "self" | "company";
}

interface PersonalInfo {
  name?: string;          // ← 옵셔널로 (구버전 호환)
  surname?: string;       // ← 추가
  givenName?: string;     // ← 추가
  nameKr: string;
  nationality?: string;
  passport: string;
  passportIssue?: string;    // ← 추가
  passportExpiry?: string;   // ← 추가
  alienNo: string;
  phone: string;
  addressKr?: string;
  addressHome?: string;
  email?: string;
  companyName?: string;
  expiry: string;
  company: string;
  address: string;
}

export default function ResultPage() {
  const lang = useLang();
  const [expiry, setExpiry] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [visa, setVisa] = useState("E-9");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [isGenerating, setIsGenerating] = useState<string>("");
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggleCheck = (i: number) => {
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  useEffect(() => {
    setExpiry(localStorage.getItem("answer_expiry") || "");
    setCompany(localStorage.getItem("answer_company") || "");
    setAddress(localStorage.getItem("answer_address") || "");
    setVisa(localStorage.getItem("answer_visa") || "E-9");
    const info = sessionStorage.getItem("personal_info");
    if (info) setPersonalInfo(JSON.parse(info));
  }, []);

  // 다국어 서류 이름 (E-9 / E-7-4 실제 서류, 본인 발급처 설명 반영)
  const docTexts: Record<string, Record<string, string>> = {
    // 공통/기존
    integratedForm: { ko: "통합신청서", en: "Application Form", vi: "Đơn đăng ký" },
    integratedFormDesc: { ko: "아래에서 PDF 다운로드 가능 ✨", en: "Download PDF below ✨", vi: "Tải PDF bên dưới ✨" },
    passportCopy: { ko: "여권 사본", en: "Passport copy", vi: "Bản sao hộ chiếu" },
    passportCopyDesc: { ko: "본인 여권을 복사하세요", en: "Copy your passport", vi: "Sao chép hộ chiếu" },
    alienCardCopy: { ko: "외국인등록증 사본", en: "Alien card copy", vi: "Bản sao thẻ ngoại kiều" },
    alienCardCopyDesc: { ko: "본인 등록증을 복사하세요", en: "Copy your card", vi: "Sao chép thẻ" },
    businessReg: { ko: "사업자등록증 사본", en: "Business reg. copy", vi: "Bản sao đăng ký kinh doanh" },
    businessRegDesc: { ko: "회사에서 받으세요", en: "From your company", vi: "Từ công ty" },

    // 사업장/거주지 변경
    lease: { ko: "임대차계약서 사본", en: "Lease contract copy", vi: "Bản sao hợp đồng thuê" },
    leaseDesc: { ko: "지금 사는 곳의 계약서", en: "Current residence contract", vi: "Hợp đồng nơi ở hiện tại" },
    workplaceChange: { ko: "사업장 변경 허가서", en: "Workplace change permit", vi: "Giấy phép đổi nơi làm việc" },
    workplaceChangeDesc: { ko: "고용센터에서 먼저 발급받으세요", en: "Get from Employment Center first", vi: "Lấy từ Trung tâm Việc làm trước" },

    // 소득/숙소 (E-9, E-7-4 공통)
    incomeReport: { ko: "외국인 직업 및 연간 소득금액 신고서", en: "Foreigner Job & Annual Income Report", vi: "Khai báo nghề nghiệp & thu nhập" },
    incomeReportDesc: { ko: "본인이 작성", en: "Filled by applicant", vi: "Người nộp đơn điền" },
    housing: { ko: "거주숙소제공 확인서", en: "Housing Provision Confirmation", vi: "Xác nhận cung cấp chỗ ở" },
    housingDesc: { ko: "회사에서 발급", en: "Issued by company", vi: "Do công ty cấp" },

    // E-9 전용 (고용24)
    employPermit: { ko: "고용허가서", en: "Employment Permit", vi: "Giấy phép tuyển dụng" },
    employPermitDesc: { ko: "고용24 승인 필요 (회사)", en: "Via Work24 approval (company)", vi: "Qua Work24 (công ty)" },
    laborContract24: { ko: "근로계약서", en: "Employment Contract", vi: "Hợp đồng lao động" },
    laborContract24Desc: { ko: "고용24 승인 필요 (회사)", en: "Via Work24 approval (company)", vi: "Qua Work24 (công ty)" },
    workExtend: { ko: "취업활동기간연장 확인서", en: "Work Period Extension Confirmation", vi: "Xác nhận gia hạn thời gian làm việc" },
    workExtendDesc: { ko: "고용24 승인 필요 (회사)", en: "Via Work24 approval (company)", vi: "Qua Work24 (công ty)" },

    // 수입인지
    revenueStamp: { ko: "수입 인지", en: "Revenue Stamp", vi: "Tem thu phí" },
    revenueStampDesc: { ko: "출입국 수수료 기준에 따라 구매", en: "Purchase per immigration fee", vi: "Mua theo phí xuất nhập cảnh" },

    // E-7-4 전용
    laborContract: { ko: "근로계약서", en: "Employment Contract", vi: "Hợp đồng lao động" },
    laborContractDesc: { ko: "회사에서 발급", en: "Issued by company", vi: "Do công ty cấp" },
    employCert: { ko: "재직증명서", en: "Certificate of Employment", vi: "Giấy chứng nhận đang làm việc" },
    employCertDesc: { ko: "회사에서 발급", en: "Issued by company", vi: "Do công ty cấp" },
    incomeProof: { ko: "소득금액증명원 (본인)", en: "Income Certificate (applicant)", vi: "Giấy chứng nhận thu nhập" },
    incomeProofDesc: { ko: "홈택스·정부24 온라인 또는 행정복지센터", en: "Hometax/Gov24 online or community center", vi: "Hometax/Gov24 hoặc trung tâm hành chính" },
    insurance4: { ko: "4대 사회보험 가입자명부", en: "4 Social Insurances List", vi: "Danh sách 4 bảo hiểm xã hội" },
    insurance4Desc: { ko: "4대 사회보험 정보연계센터 온라인", en: "From 4 Insurances Center online", vi: "Trung tâm bảo hiểm trực tuyến" },
    nationalTax: { ko: "국세완납증명서 (회사)", en: "National Tax Payment Certificate", vi: "Giấy nộp thuế quốc gia (công ty)" },
    nationalTaxDesc: { ko: "홈택스 온라인 발급 (회사)", en: "Hometax online (company)", vi: "Hometax (công ty)" },
    localTax: { ko: "지방세완납증명서 (회사)", en: "Local Tax Payment Certificate", vi: "Giấy nộp thuế địa phương (công ty)" },
    localTaxDesc: { ko: "위택스 온라인 발급 (회사)", en: "Wetax online (company)", vi: "Wetax (công ty)" },
    guarantee: { ko: "신원보증서", en: "Letter of Guarantee", vi: "Giấy bảo lãnh" },
    guaranteeDesc: { ko: "회사에서 작성", en: "Prepared by company", vi: "Công ty chuẩn bị" },
    profile: { ko: "외국인 신상 기술서", en: "Personal Statement", vi: "Bản khai thông tin cá nhân" },
    profileDesc: { ko: "본인이 작성", en: "Filled by applicant", vi: "Người nộp đơn điền" },
    scoreSheet: { ko: "점수제 자체 심사표", en: "Point System Self-Assessment", vi: "Bảng tự đánh giá điểm" },
    scoreSheetDesc: { ko: "본인이 작성", en: "Filled by applicant", vi: "Người nộp đơn điền" },
    korean: { ko: "점수제 유지 입증 서류 (한국어능력)", en: "Korean Proficiency Proof", vi: "Chứng minh năng lực tiếng Hàn" },
    koreanDesc: { ko: "TOPIK 또는 사회통합프로그램", en: "TOPIK or KIIP", vi: "TOPIK hoặc KIIP" },
    recommend: { ko: "고용기업 추천서 + 추천자 신분증", en: "Employer Recommendation + ID", vi: "Thư giới thiệu + CMND người giới thiệu" },
    recommendDesc: { ko: "추천자는 법인 대표 (회사)", en: "Recommender = company rep.", vi: "Người giới thiệu = đại diện công ty" },
  };

    // 가까운 출입국 사무소 찾기
  const nearestOffice = personalInfo?.addressKr 
    ? findNearestOffice(personalInfo.addressKr) 
    : null;
  const docs: Doc[] = [];

  if (visa === "E-7-4") {
    // === E-7-4 숙련기능인력 (점수제) ===
    // 본인 준비
    docs.push({ name: docTexts.integratedForm[lang], desc: docTexts.integratedFormDesc[lang], group: "self" });
    docs.push({ name: docTexts.incomeReport[lang], desc: docTexts.incomeReportDesc[lang], group: "self" });
    docs.push({ name: docTexts.passportCopy[lang], desc: docTexts.passportCopyDesc[lang], group: "self" });
    docs.push({ name: docTexts.alienCardCopy[lang], desc: docTexts.alienCardCopyDesc[lang], group: "self" });
    docs.push({ name: docTexts.incomeProof[lang], desc: docTexts.incomeProofDesc[lang], group: "self" });
    docs.push({ name: docTexts.profile[lang], desc: docTexts.profileDesc[lang], group: "self" });
    docs.push({ name: docTexts.scoreSheet[lang], desc: docTexts.scoreSheetDesc[lang], group: "self" });
    docs.push({ name: docTexts.korean[lang], desc: docTexts.koreanDesc[lang], group: "self" });
    docs.push({ name: docTexts.revenueStamp[lang], desc: docTexts.revenueStampDesc[lang], group: "self" });
    // 회사 준비
    docs.push({ name: docTexts.housing[lang], desc: docTexts.housingDesc[lang], group: "company" });
    docs.push({ name: docTexts.laborContract[lang], desc: docTexts.laborContractDesc[lang], group: "company" });
    docs.push({ name: docTexts.employCert[lang], desc: docTexts.employCertDesc[lang], group: "company" });
    docs.push({ name: docTexts.businessReg[lang], desc: docTexts.businessRegDesc[lang], group: "company" });
    docs.push({ name: docTexts.insurance4[lang], desc: docTexts.insurance4Desc[lang], group: "company" });
    docs.push({ name: docTexts.nationalTax[lang], desc: docTexts.nationalTaxDesc[lang], group: "company" });
    docs.push({ name: docTexts.localTax[lang], desc: docTexts.localTaxDesc[lang], group: "company" });
    docs.push({ name: docTexts.guarantee[lang], desc: docTexts.guaranteeDesc[lang], group: "company" });
    docs.push({ name: docTexts.recommend[lang], desc: docTexts.recommendDesc[lang], group: "company" });
  } else {
    // === E-9 (기본) ===
    // 본인 준비
    docs.push({ name: docTexts.integratedForm[lang], desc: docTexts.integratedFormDesc[lang], group: "self" });
    docs.push({ name: docTexts.incomeReport[lang], desc: docTexts.incomeReportDesc[lang], group: "self" });
    docs.push({ name: docTexts.alienCardCopy[lang], desc: docTexts.alienCardCopyDesc[lang], group: "self" });
    docs.push({ name: docTexts.passportCopy[lang], desc: docTexts.passportCopyDesc[lang], group: "self" });
    docs.push({ name: docTexts.revenueStamp[lang], desc: docTexts.revenueStampDesc[lang], group: "self" });
    // 회사 준비
    docs.push({ name: docTexts.housing[lang], desc: docTexts.housingDesc[lang], group: "company" });
    docs.push({ name: docTexts.businessReg[lang], desc: docTexts.businessRegDesc[lang], group: "company" });
    docs.push({ name: docTexts.employPermit[lang], desc: docTexts.employPermitDesc[lang], group: "company" });
    docs.push({ name: docTexts.laborContract24[lang], desc: docTexts.laborContract24Desc[lang], group: "company" });
    docs.push({ name: docTexts.workExtend[lang], desc: docTexts.workExtendDesc[lang], group: "company" });
  }

  // 거주지 변경 시 추가
  if (address === "changed") {
    docs.push({ name: docTexts.lease[lang], desc: docTexts.leaseDesc[lang], isExtra: true, group: "self" });
  }

  const today = new Date();
  const expiryDate = expiry ? new Date(expiry) : null;
  const daysLeft = expiryDate
    ? Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const handleDownload = async (type: "official" | "summary") => {
  if (!personalInfo) {
    alert("step5부터 다시 시작해주세요.");
    return;
  }
  setIsGenerating(type);
  try {
    const data = { ...personalInfo, expiry, company, address };
    const pdfBytes = type === "official"
      ? await fillOfficialForm(data)
      : await generatePdf(data);

    const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const fileName = personalInfo.surname && personalInfo.givenName
      ? `${personalInfo.surname}_${personalInfo.givenName}`
      : personalInfo.name || "신청서";

    a.download = type === "official"
      ? `통합신청서_${fileName}.pdf`
      : `요약지_${fileName}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    alert("PDF 생성 중 오류 발생");
    console.error(err);
  } finally {
    setIsGenerating("");
  }
};

  const handleReset = () => {
    localStorage.removeItem("answer_expiry");
    localStorage.removeItem("answer_company");
    localStorage.removeItem("answer_address");
    sessionStorage.removeItem("personal_info");
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <LanguageHeader backHref="/start/step5" backLabel={TEXTS.prev[lang]} />

      <section className="max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">{TEXTS.resultTitle[lang]}</h1>
          <p className="text-sm text-gray-500">{TEXTS.resultSub[lang]}</p>
        </div>

        {daysLeft !== null && daysLeft < 30 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl mb-6">
            <p className="text-sm font-medium text-red-900 mb-1">
              {daysLeft < 0 ? TEXTS.expired[lang] : TEXTS.daysLeft[lang](daysLeft)}
            </p>
            <p className="text-xs text-red-700">{TEXTS.urgent[lang]}</p>
          </div>
        )}

        {personalInfo && (
          <div className="space-y-3 mb-6">
            <div className="bg-blue-700 text-white rounded-xl p-6">
              <h2 className="text-sm font-medium mb-1">{TEXTS.pdfOfficial[lang]}</h2>
              <p className="text-xs text-blue-100 mb-3">{TEXTS.pdfOfficialDesc[lang]}</p>
              <button onClick={() => handleDownload("official")} disabled={isGenerating !== ""}
                className="w-full px-4 py-3 bg-white text-blue-700 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors disabled:opacity-50">
                {isGenerating === "official" ? TEXTS.pdfGenerating[lang] : TEXTS.pdfDownload[lang]}
              </button>
            </div>
          </div>
        )}

{nearestOffice && (
  <div className="bg-white border-2 border-blue-200 rounded-xl p-5 mb-6">
    <h2 className="text-sm font-medium text-blue-900 mb-3">
      {TEXTS.officeTitle[lang]}
    </h2>
    <p className="text-xs text-gray-500 mb-4">
      {TEXTS.officeDesc[lang]}
    </p>

    <div className="bg-blue-50 rounded-lg p-4 space-y-2">
      <p className="text-base font-medium text-gray-900">
        {nearestOffice.name[lang]}
      </p>
      <div className="text-xs text-gray-700">
        <span className="font-medium">📍 {TEXTS.officeAddress[lang]}:</span> {nearestOffice.address}
      </div>
      <div className="text-xs text-gray-700">
        <span className="font-medium">📞 {TEXTS.officePhone[lang]}:</span>{" "}
        <a href={`tel:${nearestOffice.phone}`} className="text-blue-700 hover:underline">
          {nearestOffice.phone}
        </a>
      </div>
    </div>

    {/* 🗺️ 구글 맵 */}
    <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
      <iframe
        src={`https://www.google.com/maps?q=${encodeURIComponent(nearestOffice.address)}&output=embed`}
        width="100%"
        height="200"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>

    {/* 길찾기 버튼 */}
    <a
  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(nearestOffice.address)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 
             hover:from-blue-700 hover:to-indigo-700
             text-white font-semibold py-4 px-6 rounded-2xl 
             flex items-center justify-center gap-3 
             transition-all duration-200 shadow-lg hover:shadow-xl 
             active:scale-[0.97]"
>
  <span className="text-2xl">🗺️</span>
  <span className="text-base">{TEXTS.officeDirections[lang]}</span>
</a>

    <p className="text-xs text-gray-400 mt-3">
      ℹ️ {TEXTS.officeDataSource[lang]}
    </p>
  </div>
)}
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-900">{TEXTS.docsTitle[lang]} ({docs.length})</h2>
            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              {Object.values(checked).filter(Boolean).length} / {docs.length} {TEXTS.docDone[lang]}
            </span>
          </div>
          <ul className="space-y-3">
            {(["self", "company"] as const).map((g) => {
            const groupDocs = docs.map((d, idx) => ({ ...d, idx })).filter((d) => d.group === g);
            if (groupDocs.length === 0) return null;
            return (
              <div key={g} className="mb-4">
                <p className="text-xs font-medium text-gray-400 mb-2">
                  {g === "self" ? `📋 ${TEXTS.docGroupSelf[lang]}` : `🏢 ${TEXTS.docGroupCompany[lang]}`}
                </p>
                <ul className="space-y-2">
                  {groupDocs.map((item) => {
                    const isChecked = !!checked[item.idx];
                    return (
                      <li
                        key={item.idx}
                        onClick={() => toggleCheck(item.idx)}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors select-none ${
                          isChecked ? "bg-green-50" : item.isExtra ? "bg-blue-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 border-2 transition-colors ${
                            isChecked ? "bg-green-600 border-green-600 text-white" : "bg-white border-gray-300 text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                        <div className="flex-1">
                          <p className={`text-sm font-medium transition-colors ${isChecked ? "text-gray-400 line-through" : "text-gray-900"}`}>
                            {item.name}
                            {item.isExtra && <span className="ml-2 text-xs text-blue-600 no-underline">{TEXTS.docExtra[lang]}</span>}
                          </p>
                          <p className={`text-xs mt-0.5 ${isChecked ? "text-gray-300" : "text-gray-500"}`}>{item.desc}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          </ul>
          {docs.length > 0 && Object.values(checked).filter(Boolean).length === docs.length && (
            <p className="text-xs text-green-700 font-medium mt-4 text-center">{TEXTS.docAllDone[lang]} 🎉</p>
          )}
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
          <p className="text-xs text-amber-700 leading-relaxed">
            <strong>{TEXTS.warnTitle[lang]}</strong> {TEXTS.warnDesc[lang]}
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={handleReset} className="flex-1 px-6 py-3 rounded-xl font-medium text-sm border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
            {TEXTS.reset[lang]}
          </button>
          <Link href="/" className="flex-1 px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors text-center">
            {TEXTS.homeBtn[lang]}
          </Link>
        </div>
      </section>
    </main>
  );
}