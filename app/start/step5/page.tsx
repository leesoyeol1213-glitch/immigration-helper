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

      <div className="max-w-2xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>5 / 5</span><span>·</span><span>{TEXTS.step5Step[lang]}</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "100%" }}></div>
        </div>
      </div>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">{TEXTS.step5Title[lang]}</h1>
        <p className="text-sm text-gray-500 mb-6">{TEXTS.step5Sub[lang]}</p>

        {/* OCR 박스 (강조!) */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl p-5 mb-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📷</span>
            <h2 className="text-base font-medium">{TEXTS.ocrTitle[lang]}</h2>
            <span className="ml-auto text-xs bg-white text-blue-700 px-2 py-0.5 rounded-full font-medium">AI</span>
          </div>
          <p className="text-xs text-blue-100 mb-4">{TEXTS.ocrDesc[lang]}</p>
          <p className="text-[11px] text-blue-200 mb-3 flex items-center gap-1">{TEXTS.ocrSafeNote[lang]}</p>

          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleOcrUpload}
              disabled={ocrProcessing}
              className="hidden"
            />
            <div className={`w-full px-4 py-3 bg-white text-blue-700 rounded-lg font-medium text-sm text-center cursor-pointer hover:bg-blue-50 transition-colors ${ocrProcessing ? "opacity-50 cursor-not-allowed" : ""}`}>
              {ocrProcessing 
                ? `${TEXTS.ocrProcessing[lang]} ${ocrProgress}%` 
                : `📁 ${TEXTS.ocrUpload[lang]}`
              }
            </div>
          </label>

          {ocrProcessing && (
            <div className="mt-3 h-1 bg-blue-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all" 
                style={{ width: `${ocrProgress}%` }}
              ></div>
            </div>
          )}

          {ocrSuccess && (
            <div className="mt-3 p-3 bg-blue-900 rounded-lg">
              <p className="text-xs text-blue-100">{TEXTS.ocrSuccess[lang]}</p>
              <p className="text-xs text-amber-200 mt-2">{TEXTS.ocrWarning[lang]}</p>
            </div>
          )}

          {ocrError && (
            <div className="mt-3 p-3 bg-white rounded-lg">
              <p className="text-xs text-blue-800 font-medium">{TEXTS.ocrFail[lang]}</p>
              <p className="text-xs text-blue-600 mt-1">{TEXTS.ocrFailHint[lang]}</p>
            </div>
          )}

          <p className="text-[11px] text-blue-200 mt-3">{TEXTS.ocrPhotoTip[lang]}</p>
        </div>

        {/* 여권 OCR 박스 */}
        <div className="bg-gradient-to-br from-purple-700 to-purple-800 rounded-xl p-5 mb-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📷</span>
            <h2 className="text-base font-medium">{TEXTS.ppOcrTitle[lang]}</h2>
            <span className="ml-auto text-xs bg-white text-purple-700 px-2 py-0.5 rounded-full font-medium">AI</span>
          </div>
          <p className="text-xs text-purple-100 mb-4">{TEXTS.ppOcrDesc[lang]}</p>
          <p className="text-[11px] text-purple-200 mb-3 flex items-center gap-1">{TEXTS.ocrSafeNote[lang]}</p>

          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handlePassportUpload}
              disabled={ppProcessing}
              className="hidden"
            />
            <div className={`w-full px-4 py-3 bg-white text-purple-700 rounded-lg font-medium text-sm text-center cursor-pointer hover:bg-purple-50 transition-colors ${ppProcessing ? "opacity-50 cursor-not-allowed" : ""}`}>
              {ppProcessing 
                ? `${TEXTS.ocrProcessing[lang]} ${ppProgress}%` 
                : `📁 ${TEXTS.ppOcrUpload[lang]}`
              }
            </div>
          </label>

          {ppProcessing && (
            <div className="mt-3 h-1 bg-purple-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all" 
                style={{ width: `${ppProgress}%` }}
              ></div>
            </div>
          )}

          {ppSuccess && (
            <div className="mt-3 p-3 bg-purple-900 rounded-lg">
              <p className="text-xs text-purple-100">{TEXTS.ppOcrSuccess[lang]}</p>
              <p className="text-xs text-amber-200 mt-2">{TEXTS.ocrWarning[lang]}</p>
            </div>
          )}

          {ppError && (
            <div className="mt-3 p-3 bg-white rounded-lg">
              <p className="text-xs text-purple-800 font-medium">{TEXTS.ocrFail[lang]}</p>
              <p className="text-xs text-purple-600 mt-1">{TEXTS.ppOcrFailHint[lang]}</p>
            </div>
          )}

          <p className="text-[11px] text-purple-200 mt-3">{TEXTS.ocrPhotoTip[lang]}</p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 flex items-start gap-2">
          <span className="text-base">🔒</span>
          <div>
            <p className="text-sm font-medium text-green-900 mb-1">{TEXTS.privacyTitle[lang]}</p>
            <p className="text-xs text-green-700 leading-relaxed">{TEXTS.privacyDesc[lang]}</p>
            <Link href="/privacy" className="text-xs text-green-800 underline mt-2 inline-block hover:text-green-900">
              {TEXTS.privacyMore[lang]}
            </Link>
          </div>
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-3 mt-4">{TEXTS.basicInfo[lang]}</h3>
        <div className="space-y-4">
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">{TEXTS.fSurname[lang]}</label>
  <input type="text" value={surname} onChange={(e) => setSurname(e.target.value.toUpperCase())} placeholder="Hong"
    className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
</div>
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">{TEXTS.fGivenName[lang]}</label>
  <input type="text" value={givenName} onChange={(e) => setGivenName(e.target.value.toUpperCase())} placeholder="Gildong"
    className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
</div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{TEXTS.fNationality[lang]}</label>
            <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="대한민국 / South Korea"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-3 mt-6">{TEXTS.idInfo[lang]}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{TEXTS.fPassport[lang]}</label>
            <input type="text" value={passport} onChange={(e) => setPassport(e.target.value.toUpperCase())} placeholder="M12345678"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">{TEXTS.fPassportIssue[lang]}</label>
  <input type="text" value={passportIssue} onChange={(e) => setPassportIssue(e.target.value)} placeholder="yyyy.mm.dd"
    className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
</div>
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">{TEXTS.fPassportExpiry[lang]}</label>
  <input type="text" value={passportExpiry} onChange={(e) => setPassportExpiry(e.target.value)} placeholder="yyyy.mm.dd"
    className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
</div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{TEXTS.fAlienNo[lang]}</label>
            <input type="text" value={alienNo} onChange={(e) => setAlienNo(e.target.value)} placeholder="000000-0000000"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-3 mt-6">{TEXTS.contactInfo[lang]}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{TEXTS.fPhone[lang]}</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-0000-0000"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{TEXTS.fEmail[lang]}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-3 mt-6">{TEXTS.addressInfo[lang]}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{TEXTS.fAddressKr[lang]}</label>
            <input type="text" value={addressKr} onChange={(e) => setAddressKr(e.target.value)} placeholder="충청북도 청주시 ..."
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{TEXTS.fAddressHome[lang]}</label>
            <input type="text" value={addressHome} onChange={(e) => setAddressHome(e.target.value)} placeholder="Home country address"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-3 mt-6">{TEXTS.workplaceInfo[lang]}</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{TEXTS.fCompany[lang]}</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="㈜○○○○○"
            className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
        </div>

        <div className="mt-8">
          {isValid ? (
            <button onClick={handleNext} className="w-full px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors">
              {TEXTS.result[lang]}
            </button>
          ) : (
            <button disabled className="w-full px-6 py-3 rounded-xl font-medium text-sm bg-gray-100 text-gray-400 cursor-not-allowed">
              {TEXTS.required[lang]}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}