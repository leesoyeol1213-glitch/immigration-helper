export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* 상단 헤더 */}
      <header className="px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <h2 className="text-lg font-medium">
          <span className="text-blue-700">서류</span>도우미
        </h2>
        <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
          🇰🇷 한국어
        </span>
      </header>

      {/* 히어로 섹션 */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="inline-block px-3 py-1 bg-blue-100 rounded-full mb-6">
          <p className="text-xs font-medium text-blue-800">
            한국 행정서류 작성 도우미
          </p>
        </div>

        <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight mb-4">
          한국 서류 작성,<br />
          3분이면 충분합니다
        </h1>

        <p className="text-base text-gray-600 leading-relaxed mb-8">
          E-9 체류기간 연장부터 필요한 서류 안내까지<br />
          복잡한 출입국 민원을 쉽게 준비하세요
        </p>

        <button className="px-6 py-3 bg-blue-700 text-white rounded-xl font-medium text-sm hover:bg-blue-800 transition-colors shadow-sm">
          지금 바로 시작하기 →
        </button>

        {/* 통계 카드 */}
        <div className="grid grid-cols-3 gap-3 mt-12">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-lg font-medium text-gray-900">3분</p>
            <p className="text-xs text-gray-500 mt-0.5">소요 시간</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-lg font-medium text-gray-900">9개</p>
            <p className="text-xs text-gray-500 mt-0.5">지원 언어</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-lg font-medium text-gray-900">무료</p>
            <p className="text-xs text-gray-500 mt-0.5">평생 무료</p>
          </div>
        </div>

        {/* 면책 조항 */}
        <div className="mt-12 p-4 bg-amber-50 border border-amber-100 rounded-xl text-left">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>⚠️ 안내:</strong> 본 서비스는 서류 작성을 돕는 정보 제공 도구입니다.
            최종 제출 전 반드시 관계 기관의 안내를 확인하시기 바라며,
            서류 제출 및 승인 책임은 본인에게 있습니다.
          </p>
        </div>
      </section>
    </main>
  );
}