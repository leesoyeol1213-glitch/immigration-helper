"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Doc {
  name: string;
  desc: string;
  isExtra?: boolean;
}

export default function ResultPage() {
  const [expiry, setExpiry] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    setExpiry(localStorage.getItem("answer_expiry") || "");
    setCompany(localStorage.getItem("answer_company") || "");
    setAddress(localStorage.getItem("answer_address") || "");
  }, []);

  const docs: Doc[] = [
    { name: "통합신청서", desc: "곧 앱에서 자동 생성됩니다 🎯" },
    { name: "여권 사본", desc: "본인 여권을 복사하세요" },
    { name: "외국인등록증 사본", desc: "본인 등록증을 복사하세요" },
    { name: "근로계약서", desc: "회사 인사팀에 요청하세요" },
    { name: "사업자등록증 사본", desc: "회사에서 받거나 홈택스에서 발급" },
  ];

  if (address === "changed") {
    docs.push({ name: "임대차계약서 사본", desc: "지금 사는 곳의 계약서", isExtra: true });
  }
  if (company === "changed") {
    docs.push({ name: "사업장 변경 허가서", desc: "고용센터에서 먼저 발급받으세요", isExtra: true });
  }

  const today = new Date();
  const expiryDate = expiry ? new Date(expiry) : null;
  const daysLeft = expiryDate ? Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : null;

  const handleReset = () => {
    localStorage.removeItem("answer_expiry");
    localStorage.removeItem("answer_company");
    localStorage.removeItem("answer_address");
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="px-6 py-4 border-b border-gray-100 max-w-2xl mx-auto">
        <Link href="/start/step4" className="text-sm text-gray-500 hover:text-blue-700">← 이전</Link>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">맞춤 체크리스트</h1>
          <p className="text-sm text-gray-500">본인 상황에 맞는 서류를 준비하세요.</p>
        </div>

        {daysLeft !== null && daysLeft < 30 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl mb-6">
            <p className="text-sm font-medium text-red-900 mb-1">
              {daysLeft < 0 ? "⚠️ 체류기간이 만료되었습니다" : `⚠️ 체류기간 ${daysLeft}일 남음`}
            </p>
            <p className="text-xs text-red-700">즉시 신청이 필요합니다.</p>
          </div>
        )}

        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-4">📋 필요한 서류 ({docs.length}개)</h2>
          <ul className="space-y-3">
            {docs.map((item, i) => (
              <li key={i} className={`flex items-start gap-3 p-3 rounded-lg ${item.isExtra ? "bg-blue-50" : ""}`}>
                <span className="text-blue-700 mt-0.5">☐</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                    {item.isExtra && <span className="ml-2 text-xs text-blue-600">상황별 추가</span>}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
          <p className="text-xs text-amber-700 leading-relaxed">
            <strong>⚠️ 안내:</strong> 이 체크리스트는 일반적인 경우 기준입니다. 사례별로 다를 수 있으니 출입국 사무소의 안내를 우선하세요.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={handleReset} className="flex-1 px-6 py-3 rounded-xl font-medium text-sm border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
            다시 시작
          </button>
          <Link href="/" className="flex-1 px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors text-center">
            처음으로 →
          </Link>
        </div>
      </section>
    </main>
  );
}