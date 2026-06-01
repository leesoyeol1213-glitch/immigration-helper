"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";
import { recognizeAlienCard, recognizePassport } from "@/lib/ocr";

export default function Step5Page() {
  const lang = useLang() || "ko";
  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");
  const [nationality, setNationality] = useState("");
  const [passport, setPassport] = useState("");
  const [passportIssue, setPassportIssue] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("");
  const [alienNo, setAlienNo] = useState("");
  const [phone, setPhone] = useState("");
  const [addressKr, setAddressKr] = useState("");
  const [addressHome, setAddressHome] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  // OCR 상태
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrSuccess, setOcrSuccess] = useState(false);

  // 여권 OCR 상태
  const [ppProcessing, setPpProcessing] = useState(false);
  const [ppProgress, setPpProgress] = useState(0);
  const [ppSuccess, setPpSuccess] = useState(false);
    
  // OCR 실패/부분인식 안내
  const [ocrError, setOcrError] = useState(false);
  const [ppError, setPpError] = useState(false);

  useEffect(() => {
  const saved = sessionStorage.getItem("personal_info");
  if (saved) {
    const data = JSON.parse(saved);
    setSurname(data.surname || "");
    setGivenName(data.givenName || "");
    setNationality(data.nationality || "");
    setPassport(data.passport || "");
    setPassportIssue(data.passportIssue || "");
    setPassportExpiry(data.passportExpiry || "");
    setAlienNo(data.alienNo || "");
    setPhone(data.phone || "");
    setAddressKr(data.addressKr || "");
    setAddressHome(data.addressHome || "");
    setEmail(data.email || "");
    setCompanyName(data.companyName || "");
  }
}, []);

  const isValid = surname && givenName && passport && alienNo && phone && nationality && addressKr;

  const handleNext = () => {
  sessionStorage.setItem("personal_info", JSON.stringify({
    surname, givenName, nationality, 
    passport, passportIssue, passportExpiry, alienNo,
    phone, addressKr, addressHome, email, companyName,
  }));
  window.location.href = "/start/result";
};

  // OCR 핸들러
  const handleOcrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOcrProcessing(true);
    setOcrSuccess(false);
    setOcrError(false);
    setOcrProgress(0);

    try {
      const result = await recognizeAlienCard(file, (p) => setOcrProgress(p));

      let gotSomething = false;
      if (result.name) {
        const parts = result.name.trim().split(/\s+/);
        if (parts.length >= 2 && !surname) {
          setSurname(parts[0]);
          setGivenName(parts.slice(1).join(" "));
        } else if (!givenName) {
          setGivenName(result.name);
        }
        gotSomething = true;
      }
      if (result.alienNo && !alienNo) { setAlienNo(result.alienNo); gotSomething = true; }
      if (result.passport && !passport) { setPassport(result.passport); gotSomething = true; }
      if (result.nationality && !nationality) { setNationality(result.nationality); gotSomething = true; }

      if (gotSomething) {
        setOcrSuccess(true);
      } else {
        setOcrError(true);
      }
    } catch (err) {
      console.error("OCR 오류:", err);
      setOcrError(true);
    } finally {
      setOcrProcessing(false);
    }
  };

  // 여권 OCR 핸들러
  const handlePassportUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPpProcessing(true);
    setPpSuccess(false);
    setPpError(false);
    setPpProgress(0);

    try {
      const result = await recognizePassport(file, (p) => setPpProgress(p));

      let gotSomething = false;
      if (result.surname && !surname) { setSurname(result.surname.toUpperCase()); gotSomething = true; }
      if (result.givenName && !givenName) { setGivenName(result.givenName.toUpperCase()); gotSomething = true; }
      if (result.passport && !passport) { setPassport(result.passport.toUpperCase()); gotSomething = true; }
      if (result.nationality && !nationality) { setNationality(result.nationality); gotSomething = true; }
      if (result.expiryDate && !passportExpiry) { setPassportExpiry(result.expiryDate); gotSomething = true; }
      if (result.issueDate && !passportIssue) { setPassportIssue(result.issueDate); }

      if (gotSomething) {
        setPpSuccess(true);
      } else {
        setPpError(true);
      }
    } catch (err) {
      console.error("여권 OCR 오류:", err);
      setPpError(true);
    } finally {
      setPpProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader backHref="/start/step4" backLabel={TEXTS.prev[lang]} />

      {/* 진행바 */}
      <div className="max-w-md md:max-w-2xl mx-auto px-5 pt-5">
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-2">
          <span className="text-blue-700">5 / 5</span><span>·</span><span>{TEXTS.step5Step[lang]}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "100%" }}></div>
        </div>
      </div>

      <section className="max-w-md md:max-w-2xl mx-auto px-5 pt-7 pb-28">
        <h1 className="text-[24px] font-extrabold text-gray-900 tracking-tight mb-1.5">{TEXTS.step5Title[lang]}</h1>
        <p className="text-[15px] text-gray-500 font-medium mb-6">{TEXTS.step5Sub[lang]}</p>

        {/* 외국인등록증 OCR 박스 */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-5 mb-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📷</span>
            <h2 className="text-[16px] font-extrabold">{TEXTS.ocrTitle[lang]}</h2>
            <span className="ml-auto text-[12px] bg-white text-blue-700 px-2.5 py-0.5 rounded-full font-extrabold">AI</span>
          </div>
          <p className="text-[13px] text-blue-100 mb-3">{TEXTS.ocrDesc[lang]}</p>
          <p className="text-[11px] text-blue-200 mb-3">{TEXTS.ocrSafeNote[lang]}</p>

          <label className="block">
            <input type="file" accept="image/*" onChange={handleOcrUpload} disabled={ocrProcessing} className="hidden" />
            <div className={`w-full py-4 bg-white text-blue-700 rounded-2xl font-extrabold text-[15px] text-center cursor-pointer hover:bg-blue-50 transition-colors ${ocrProcessing ? "opacity-50 cursor-not-allowed" : ""}`}>
              {ocrProcessing ? `${TEXTS.ocrProcessing[lang]} ${ocrProgress}%` : `📁 ${TEXTS.ocrUpload[lang]}`}
            </div>
          </label>

          {ocrProcessing && (
            <div className="mt-3 h-1.5 bg-blue-900 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${ocrProgress}%` }}></div>
            </div>
          )}
          {ocrSuccess && (
            <div className="mt-3 p-3.5 bg-blue-900 rounded-2xl">
              <p className="text-[13px] text-blue-100">{TEXTS.ocrSuccess[lang]}</p>
              <p className="text-[13px] text-amber-200 mt-2">{TEXTS.ocrWarning[lang]}</p>
            </div>
          )}
          {ocrError && (
            <div className="mt-3 p-3.5 bg-white rounded-2xl">
              <p className="text-[13px] text-blue-800 font-extrabold">{TEXTS.ocrFail[lang]}</p>
              <p className="text-[13px] text-blue-600 mt-1">{TEXTS.ocrFailHint[lang]}</p>
            </div>
          )}
          <p className="text-[11px] text-blue-200 mt-3">{TEXTS.ocrPhotoTip[lang]}</p>
        </div>

        {/* 여권 OCR 박스 */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-5 mb-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📷</span>
            <h2 className="text-[16px] font-extrabold">{TEXTS.ppOcrTitle[lang]}</h2>
            <span className="ml-auto text-[12px] bg-white text-purple-700 px-2.5 py-0.5 rounded-full font-extrabold">AI</span>
          </div>
          <p className="text-[13px] text-purple-100 mb-3">{TEXTS.ppOcrDesc[lang]}</p>
          <p className="text-[11px] text-purple-200 mb-3">{TEXTS.ocrSafeNote[lang]}</p>

          <label className="block">
            <input type="file" accept="image/*" onChange={handlePassportUpload} disabled={ppProcessing} className="hidden" />
            <div className={`w-full py-4 bg-white text-purple-700 rounded-2xl font-extrabold text-[15px] text-center cursor-pointer hover:bg-purple-50 transition-colors ${ppProcessing ? "opacity-50 cursor-not-allowed" : ""}`}>
              {ppProcessing ? `${TEXTS.ocrProcessing[lang]} ${ppProgress}%` : `📁 ${TEXTS.ppOcrUpload[lang]}`}
            </div>
          </label>

          {ppProcessing && (
            <div className="mt-3 h-1.5 bg-purple-900 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${ppProgress}%` }}></div>
            </div>
          )}
          {ppSuccess && (
            <div className="mt-3 p-3.5 bg-purple-900 rounded-2xl">
              <p className="text-[13px] text-purple-100">{TEXTS.ppOcrSuccess[lang]}</p>
              <p className="text-[13px] text-amber-200 mt-2">{TEXTS.ocrWarning[lang]}</p>
            </div>
          )}
          {ppError && (
            <div className="mt-3 p-3.5 bg-white rounded-2xl">
              <p className="text-[13px] text-purple-800 font-extrabold">{TEXTS.ocrFail[lang]}</p>
              <p className="text-[13px] text-purple-600 mt-1">{TEXTS.ppOcrFailHint[lang]}</p>
            </div>
          )}
          <p className="text-[11px] text-purple-200 mt-3">{TEXTS.ocrPhotoTip[lang]}</p>
        </div>

        {/* 개인정보 보호 */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-7 flex items-start gap-2.5">
          <span className="text-lg">🔒</span>
          <div>
            <p className="text-[14px] font-extrabold text-green-900 mb-1">{TEXTS.privacyTitle[lang]}</p>
            <p className="text-[13px] text-green-700 leading-relaxed">{TEXTS.privacyDesc[lang]}</p>
            <Link href="/privacy" className="text-[13px] text-green-800 underline mt-2 inline-block hover:text-green-900 font-bold">
              {TEXTS.privacyMore[lang]}
            </Link>
          </div>
        </div>

        {/* 기본 정보 */}
        <h3 className="text-[16px] font-extrabold text-gray-900 mb-3">{TEXTS.basicInfo[lang]}</h3>
        <div className="space-y-4">
          <Field label={TEXTS.fSurname[lang]} value={surname} onChange={(v) => setSurname(v.toUpperCase())} placeholder="Hong" />
          <Field label={TEXTS.fGivenName[lang]} value={givenName} onChange={(v) => setGivenName(v.toUpperCase())} placeholder="Gildong" />
          <Field label={TEXTS.fNationality[lang]} value={nationality} onChange={setNationality} placeholder="대한민국 / South Korea" />
        </div>

        {/* 신분 정보 */}
        <h3 className="text-[16px] font-extrabold text-gray-900 mb-3 mt-6">{TEXTS.idInfo[lang]}</h3>
        <div className="space-y-4">
          <Field label={TEXTS.fPassport[lang]} value={passport} onChange={(v) => setPassport(v.toUpperCase())} placeholder="M12345678" />
          <Field label={TEXTS.fPassportIssue[lang]} value={passportIssue} onChange={setPassportIssue} placeholder="yyyy.mm.dd" />
          <Field label={TEXTS.fPassportExpiry[lang]} value={passportExpiry} onChange={setPassportExpiry} placeholder="yyyy.mm.dd" />
          <Field label={TEXTS.fAlienNo[lang]} value={alienNo} onChange={setAlienNo} placeholder="000000-0000000" />
        </div>

        {/* 연락처 */}
        <h3 className="text-[16px] font-extrabold text-gray-900 mb-3 mt-6">{TEXTS.contactInfo[lang]}</h3>
        <div className="space-y-4">
          <Field label={TEXTS.fPhone[lang]} value={phone} onChange={setPhone} placeholder="010-0000-0000" type="tel" />
          <Field label={TEXTS.fEmail[lang]} value={email} onChange={setEmail} placeholder="example@email.com" type="email" />
        </div>

        {/* 주소 */}
        <h3 className="text-[16px] font-extrabold text-gray-900 mb-3 mt-6">{TEXTS.addressInfo[lang]}</h3>
        <div className="space-y-4">
          <Field label={TEXTS.fAddressKr[lang]} value={addressKr} onChange={setAddressKr} placeholder="충청북도 청주시 ..." />
          <Field label={TEXTS.fAddressHome[lang]} value={addressHome} onChange={setAddressHome} placeholder="Home country address" />
        </div>

        {/* 근무처 */}
        <h3 className="text-[16px] font-extrabold text-gray-900 mb-3 mt-6">{TEXTS.workplaceInfo[lang]}</h3>
        <Field label={TEXTS.fCompany[lang]} value={companyName} onChange={setCompanyName} placeholder="㈜○○○○○" />
      </section>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4">
        <div className="max-w-md md:max-w-2xl mx-auto">
          {isValid ? (
            <button onClick={handleNext} className="w-full py-4 rounded-2xl font-extrabold text-[17px] bg-blue-700 text-white hover:bg-blue-800 transition-colors">
              {TEXTS.result[lang]}
            </button>
          ) : (
            <button disabled className="w-full py-4 rounded-2xl font-extrabold text-[17px] bg-gray-100 text-gray-400 cursor-not-allowed">
              {TEXTS.required[lang]}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

// 입력 필드 컴포넌트 (반복 줄이기)
function Field({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-[14px] font-bold text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 text-[16px] border-2 border-gray-200 rounded-2xl focus:border-blue-700 focus:outline-none"
      />
    </div>
  );
}