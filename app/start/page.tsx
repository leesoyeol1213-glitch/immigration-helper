"use client";

import { useState } from "react";
import Link from "next/link";

export default function StartPage() {
  const [visa, setVisa] = useState<string>("");

  const visaOptions = [
    { value: "E-9", label: "E-9 비자 (비전문 취업)", desc: "제조업, 농업, 어업 등" },
    { value: "other", label: "다른 비자입니다", desc: "준비 중입니다" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* 상단 헤더 */}
      <header className="px-6 py-4 border-b border-gray-100 max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-gray-500 hover:text-blue-700">
          ← 처음으로
        </Link>
      </header>

      {/* 진행 표시 */}
      <div className="max-w-2xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>1 / 5</span>
          <span>·</span>
          <span>상황 확인</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "20%" }}></div>
        </div>
      </div>

      {/* 질문 영역 */}
      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          어떤 비자를 가지고 계신가요?
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          외국인등록증에 적힌 체류자격을 선택하세요.
        </p>

        {/* 옵션 카드들 */}
        <div className="space-y-3">
          {visaOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setVisa(option.value)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                visa === option.value
                  ? "border-blue-700 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                </div>
                {visa === option.value && (
                  <span className="text-blue-700 text-lg">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* 하단 버튼 */}
        <div className="mt-8">
          <button
            disabled={!visa}
            className={`w-full px-6 py-3 rounded-xl font-medium text-sm transition-colors ${
              visa
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            다음 →
          </button>
        </div>

        {visa === "other" && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
            <p className="text-xs text-amber-800">
              현재는 E-9 비자만 지원합니다. 다른 비자는 곧 추가될 예정이에요.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}