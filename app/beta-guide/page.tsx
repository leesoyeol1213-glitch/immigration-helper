"use client";

import { useState } from "react";
import Link from "next/link";
import { generateBetaGuide } from "@/lib/betaGuide";

export default function BetaGuidePage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const pdfBytes = await generateBetaGuide();
      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "서류도우미_베타테스트_안내.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("PDF 생성 실패");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="px-6 py-4 border-b border-gray-100 max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-gray-500 hover:text-blue-700">
          ← 처음으로
        </Link>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 bg-blue-100 rounded-full mb-4">
            <p className="text-xs font-medium text-blue-800">관리자 페이지</p>
          </div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            베타 테스트 안내문
          </h1>
          <p className="text-sm text-gray-500">
            외국인 근로자분에게 출력해서 드리세요
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
          <h2 className="text-sm font-medium text-blue-900 mb-3">📋 사용 방법</h2>
          <ol className="text-xs text-blue-800 leading-relaxed space-y-1.5 list-decimal list-inside">
            <li>아래 버튼 눌러 PDF 다운로드</li>
            <li>A4 용지에 출력</li>
            <li>외국인 근로자분에게 전달</li>
            <li>한/영/베트남어 3개 언어 함께 표기되어 있음</li>
            <li>사이트 주소, 사용 방법, 피드백 받을 질문 포함</li>
          </ol>
        </div>

        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="w-full px-6 py-4 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800 transition-colors disabled:opacity-50"
        >
          {isGenerating ? "생성 중..." : "📄 베타 테스트 안내문 PDF 다운로드"}
        </button>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl">
          <p className="text-xs text-amber-700 leading-relaxed">
            💡 <strong>팁:</strong> 외국인 근로자분이 휴대폰으로 사이트 접속하기 쉽도록 QR 코드도 함께 인쇄해서 드리면 좋아요. naver.com/qr 또는 chatgpt 활용 가능.
          </p>
        </div>
      </section>
    </main>
  );
}