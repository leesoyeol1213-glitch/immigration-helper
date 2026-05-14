"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Step5Page() {
  const [name, setName] = useState("");
  const [nameKr, setNameKr] = useState("");
  const [nationality, setNationality] = useState("");
  const [passport, setPassport] = useState("");
  const [alienNo, setAlienNo] = useState("");
  const [phone, setPhone] = useState("");
  const [addressKr, setAddressKr] = useState("");
  const [addressHome, setAddressHome] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("personal_info");
    if (saved) {
      const data = JSON.parse(saved);
      setName(data.name || "");
      setNameKr(data.nameKr || "");
      setNationality(data.nationality || "");
      setPassport(data.passport || "");
      setAlienNo(data.alienNo || "");
      setPhone(data.phone || "");
      setAddressKr(data.addressKr || "");
      setAddressHome(data.addressHome || "");
      setEmail(data.email || "");
      setCompanyName(data.companyName || "");
    }
  }, []);

  const isValid = name && passport && alienNo && phone && nationality && addressKr;

  const handleNext = () => {
    sessionStorage.setItem(
      "personal_info",
      JSON.stringify({
        name, nameKr, nationality, passport, alienNo,
        phone, addressKr, addressHome, email, companyName,
      })
    );
    window.location.href = "/start/result";
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="px-6 py-4 border-b border-gray-100 max-w-2xl mx-auto">
        <Link href="/start/step4" className="text-sm text-gray-500 hover:text-blue-700">
          ← 이전
        </Link>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>5 / 5</span><span>·</span><span>본인 정보 입력</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "100%" }}></div>
        </div>
      </div>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          본인 정보를 입력해주세요
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          신청서에 자동으로 입력될 정보입니다.
        </p>

        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 flex items-start gap-2">
          <span className="text-base">🔒</span>
          <div>
            <p className="text-sm font-medium text-green-900 mb-1">
              개인정보는 저장되지 않습니다
            </p>
            <p className="text-xs text-green-700 leading-relaxed">
              여기서 입력한 정보는 우리 서버에 저장되지 않아요. 창을 닫으면 자동으로 사라집니다.
            </p>
          </div>
        </div>

        {/* 기본 정보 */}
        <h3 className="text-sm font-medium text-gray-900 mb-3 mt-4">기본 정보</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              영문 이름 (여권 기준) *
            </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value.toUpperCase())} placeholder="HONG GIL DONG"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              한글 이름 (있다면)
            </label>
            <input type="text" value={nameKr} onChange={(e) => setNameKr(e.target.value)} placeholder="홍길동"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              국적 *
            </label>
            <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="베트남 / Vietnam"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>
        </div>

        {/* 신분 정보 */}
        <h3 className="text-sm font-medium text-gray-900 mb-3 mt-6">신분 정보</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              여권 번호 *
            </label>
            <input type="text" value={passport} onChange={(e) => setPassport(e.target.value.toUpperCase())} placeholder="M12345678"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              외국인등록번호 *
            </label>
            <input type="text" value={alienNo} onChange={(e) => setAlienNo(e.target.value)} placeholder="000000-0000000"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>
        </div>

        {/* 연락처 */}
        <h3 className="text-sm font-medium text-gray-900 mb-3 mt-6">연락처</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              한국 연락처 *
            </label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-0000-0000"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일 (있다면)
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>
        </div>

        {/* 주소 */}
        <h3 className="text-sm font-medium text-gray-900 mb-3 mt-6">주소</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              한국 내 주소 *
            </label>
            <input type="text" value={addressKr} onChange={(e) => setAddressKr(e.target.value)} placeholder="경기도 화성시 ..."
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              본국 주소 (있다면)
            </label>
            <input type="text" value={addressHome} onChange={(e) => setAddressHome(e.target.value)} placeholder="Home country address"
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
          </div>
        </div>

        {/* 근무처 */}
        <h3 className="text-sm font-medium text-gray-900 mb-3 mt-6">근무처</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            회사 이름 (있다면)
          </label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="㈜○○제조"
            className="w-full p-3 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none" />
        </div>

        <div className="mt-8">
          {isValid ? (
            <button onClick={handleNext}
              className="w-full px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors">
              결과 보기 →
            </button>
          ) : (
            <button disabled
              className="w-full px-6 py-3 rounded-xl font-medium text-sm bg-gray-100 text-gray-400 cursor-not-allowed">
              필수 항목을 모두 입력해주세요 (*)
            </button>
          )}
        </div>
      </section>
    </main>
  );
}