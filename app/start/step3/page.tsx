"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Step3Page() {
  const [companyChanged, setCompanyChanged] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("answer_company");
    if (saved) setCompanyChanged(saved);
  }, []);

  const handleSelect = (value: string) => {
    setCompanyChanged(value);
    localStorage.setItem("answer_company", value);
  };

  const options = [
    { value: "same", label: "네, 같은 회사예요", desc: "처음 한국 왔을 때부터 같은 회사에서 일하고 있어요" },
    { value: "changed", label: "아니요, 회사가 바뀌었어요", desc: "사업장 변경을 한 적이 있어요" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <header className="px-6 py-4 border-b border-gray-100 max-w-2xl mx-auto">
        <Link href="/start/step2" className="text-sm text-gray-500 hover:text-blue-700">← 이전</Link>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>3 / 5</span><span>·</span><span>회사 정보</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "60%" }}></div>
        </div>
      </div>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">지금 일하는 회사가<br />처음 한국 왔을 때와 같은 회사인가요?</h1>
        <p className="text-sm text-gray-500 mb-2">회사가 바뀌었다면 추가 서류가 필요해요.</p>
        <div className="inline-block px-3 py-1 bg-blue-50 rounded-full mb-6">
          <p className="text-xs text-blue-700">💡 왜 묻나요? 회사 변경 시 고용센터의 사업장 변경 허가가 필요해요.</p>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <button key={option.value} onClick={() => handleSelect(option.value)} className={`w-full p-4 rounded-xl border-2 text-left transition-all ${companyChanged === option.value ? "border-blue-700 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                </div>
                {companyChanged === option.value && <span className="text-blue-700 text-lg">✓</span>}
              </div>
            </button>
          ))}
        </div>

        {companyChanged === "changed" && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
            <p className="text-sm font-medium text-amber-900 mb-1">⚠️ 잠깐, 중요한 안내가 있어요</p>
            <p className="text-xs text-amber-700 leading-relaxed">회사 변경의 경우 출입국에 가기 전에 먼저 처리할 일이 있어요:<br /><br />1️⃣ 고용센터에서 "사업장 변경 허가" 받기<br />2️⃣ 그 후 출입국에서 체류 연장 신청<br /><br />순서가 바뀌면 출입국에서 돌려보낼 수 있어요.</p>
          </div>
        )}

        <div className="mt-8">
          {companyChanged ? (
            <Link href="/start/step4" className="block w-full px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors text-center">다음 →</Link>
          ) : (
            <button disabled className="w-full px-6 py-3 rounded-xl font-medium text-sm bg-gray-100 text-gray-400 cursor-not-allowed">다음 →</button>
          )}
        </div>
      </section>
    </main>
  );
}