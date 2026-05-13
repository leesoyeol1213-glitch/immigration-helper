"use client";

import Link from "next/link";

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="px-6 py-4 border-b border-gray-100 max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-gray-500 hover:text-blue-700">
          ← 처음으로
        </Link>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            준비 완료!
          </h1>
          <p className="text-sm text-gray-500">
            E-9 체류기간 연장에 필요한 서류 목록입니다.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-4">
            📋 필수 서류
          </h2>
          <ul className="space-y-3">
            {[
              { name: "통합신청서", desc: "곧 앱에서 자동 생성됩니다 🎯" },
              { name: "여권 사본", desc: "본인 여권을 복사하세요" },
              { name: "외국인등록증 사본", desc: "본인 등록증을 복사하세요" },
              { name: "근로계약서", desc: "회사 인사팀에 요청하세요" },
              { name: "사업자등록증 사본", desc: "회사에서 받거나 홈택스에서 발급" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-blue-700 mt-0.5">☐</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
          <p className="text-sm font-medium text-amber-900 mb-1">
            🚧 개발 중인 기능
          </p>
          <p className="text-xs text-amber-700 leading-relaxed">
            곧 본인 상황에 따라 맞춤 체크리스트가 자동 생성되고, 통합신청서 PDF도 자동으로 만들어집니다.
          </p>
        </div>

        <Link
          href="/"
          className="block w-full px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors text-center"
        >
          처음으로 →
        </Link>
      </section>
    </main>
  );
}