"use client";

import { useState } from "react";
import Link from "next/link";

export default function Step4Page() {
  const [addressChanged, setAddressChanged] = useState<string>("");

  const options = [
    {
      value: "same",
      label: "네, 같아요",
      desc: "외국인등록증의 주소와 지금 사는 주소가 같아요",
    },
    {
      value: "changed",
      label: "아니요, 주소가 바뀌었어요",
      desc: "이사를 했거나 등록증 주소와 달라요",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <header className="px-6 py-4 border-b border-gray-100 max-w-2xl mx-auto">
        <Link
          href="/start/step3"
          className="text-sm text-gray-500 hover:text-blue-700"
        >
          ← 이전
        </Link>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>4 / 5</span>
          <span>·</span>
          <span>주소 정보</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-700 rounded-full"
            style={{ width: "80%" }}
          ></div>
        </div>
      </div>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          외국인등록증에 적힌 주소가
          <br />
          지금 사는 주소와 같나요?
        </h1>
        <p className="text-sm text-gray-500 mb-2">
          주소가 바뀌었다면 임대차계약서가 추가로 필요해요.
        </p>
        <div className="inline-block px-3 py-1 bg-blue-50 rounded-full mb-6">
          <p className="text-xs text-blue-700">
            💡 왜 묻나요? 거주지 변경 시 입증 서류가 필요해요.
          </p>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => setAddressChanged(option.value)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                addressChanged === option.value
                  ? "border-blue-700 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                </div>
                {addressChanged === option.value && (
                  <span className="text-blue-700 text-lg">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {addressChanged === "changed" && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-sm font-medium text-blue-900 mb-1">
              📋 추가로 필요한 서류
            </p>
            <p className="text-xs text-blue-700 leading-relaxed">
              임대차계약서 (사본)
              <br />
              <span className="text-blue-600">
                지금 사는 곳의 계약서를 미리 챙겨두세요.
              </span>
            </p>
          </div>
        )}

        <div className="mt-8">
          {addressChanged ? (
            <Link
              href="/start/result"
              className="block w-full px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors text-center"
            >
              결과 보기 →
            </Link>
          ) : (
            <button
              disabled
              className="w-full px-6 py-3 rounded-xl font-medium text-sm bg-gray-100 text-gray-400 cursor-not-allowed"
            >
              결과 보기 →
            </button>
          )}
        </div>
      </section>
    </main>
  );
}