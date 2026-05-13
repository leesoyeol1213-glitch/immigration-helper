"use client";

import { useState } from "react";
import Link from "next/link";

export default function Step2Page() {
  const [expiryDate, setExpiryDate] = useState<string>("");

  const today = new Date();
  const expiry = expiryDate ? new Date(expiryDate) : null;
  const daysLeft = expiry
    ? Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const getWarning = () => {
    if (daysLeft === null) return null;
    if (daysLeft < 0) {
      return {
        type: "danger",
        title: "⚠️ 체류기간이 이미 만료되었습니다",
        message:
          "과태료가 발생할 수 있습니다. 출입국 사무소에 즉시 문의하세요.",
      };
    }
    if (daysLeft < 30) {
      return {
        type: "warning",
        title: `⚠️ 체류기간이 ${daysLeft}일 남았습니다`,
        message: "지금 바로 연장 신청을 해야 합니다.",
      };
    }
    if (daysLeft < 60) {
      return {
        type: "info",
        title: `체류기간이 ${daysLeft}일 남았습니다`,
        message: "여유롭게 준비하시는 게 좋아요.",
      };
    }
    return {
      type: "info",
      title: `체류기간이 ${daysLeft}일 남았습니다`,
      message: "충분한 시간이 있습니다.",
    };
  };

  const warning = getWarning();

  return (
    <main className="min-h-screen bg-white">
      <header className="px-6 py-4 border-b border-gray-100 max-w-2xl mx-auto">
        <Link href="/start" className="text-sm text-gray-500 hover:text-blue-700">
          ← 이전
        </Link>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>2 / 5</span>
          <span>·</span>
          <span>체류기간 확인</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-700 rounded-full" style={{ width: "40%" }}></div>
        </div>
      </div>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          지금 비자가 언제까지인가요?
        </h1>
        <p className="text-sm text-gray-500 mb-2">
          외국인등록증에 적힌 체류기간 만료일을 입력하세요.
        </p>
        <div className="inline-block px-3 py-1 bg-blue-50 rounded-full mb-6">
          <p className="text-xs text-blue-700">
            💡 왜 묻나요? 체류기간이 얼마 남았는지에 따라 안내가 달라져요.
          </p>
        </div>

        <div className="mb-6">
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full p-4 text-base border-2 border-gray-200 rounded-xl focus:border-blue-700 focus:outline-none"
          />
        </div>

        {warning && (
          <div
            className={`p-4 rounded-xl border-l-4 mb-6 ${
              warning.type === "danger"
                ? "bg-red-50 border-red-500"
                : warning.type === "warning"
                ? "bg-amber-50 border-amber-500"
                : "bg-blue-50 border-blue-500"
            }`}
          >
            <p
              className={`text-sm font-medium mb-1 ${
                warning.type === "danger"
                  ? "text-red-900"
                  : warning.type === "warning"
                  ? "text-amber-900"
                  : "text-blue-900"
              }`}
            >
              {warning.title}
            </p>
            <p
              className={`text-xs leading-relaxed ${
                warning.type === "danger"
                  ? "text-red-700"
                  : warning.type === "warning"
                  ? "text-amber-700"
                  : "text-blue-700"
              }`}
            >
              {warning.message}
            </p>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-6 flex items-center gap-2">
          <span className="text-base">🔒</span>
          <p className="text-xs text-gray-600">
            입력한 정보는 서버에 저장되지 않습니다.
          </p>
        </div>

        <button
          disabled={!expiryDate}
          className={`w-full px-6 py-3 rounded-xl font-medium text-sm transition-colors ${
            expiryDate
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          다음 →
        </button>
      </section>
    </main>
  );
}