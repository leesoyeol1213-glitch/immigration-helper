export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-12">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
          <p className="text-xs font-medium text-amber-900 mb-2">
            ⚠️ 본 서비스는 행정 보조 도구입니다
          </p>
          <ul className="text-xs text-amber-700 leading-relaxed space-y-1 list-disc list-inside">
            <li>서류 작성을 돕는 정보 제공 도구이며, 행정대행이나 법률 자문이 아닙니다</li>
            <li>최종 제출 및 검토는 본인이 직접 해야 합니다</li>
            <li>출입국 사무소의 안내가 최우선입니다</li>
            <li>법적 판단이 필요한 경우 행정사 또는 변호사에게 문의하세요</li>
            <li>이용으로 발생하는 모든 결과는 사용자 본인에게 책임이 있습니다</li>
          </ul>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-gray-500">
          <div>
            <p className="font-medium text-gray-700">
              <span className="text-blue-700">서류</span>도우미
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              외국인 행정 서류 준비 보조 서비스
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">개인정보 무저장 원칙</p>
            <p className="text-xs text-gray-400 mt-0.5">🔒 안전한 정보 처리</p>
          </div>
        </div>
      </div>
    </footer>
  );
}