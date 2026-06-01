// 충북 외국인 통계 데이터
// 출처: 법무부 체류외국인 현황(2024.12.31), 충청북도 주민등록 인구통계(2025.09.16)

export const STATS_META = {
  totalForeigners: 56301,
  cbPopulation: 1647478,
  foreignerRatio: 3.4, // %
  cityCount: 11,
  sourceCb: "충청북도 주민등록 인구통계 (2025.09.16)",
  sourceMoj: "법무부 체류외국인 국적 및 체류자격별 현황 (2024.12.31)",
};

// 1. 충북 시군별 외국인 (실데이터)
export const REGION_DATA = [
  { name: "청주시", count: 19300, isReduction: false },
  { name: "음성군", count: 13808, isReduction: false, isInterest: true },  // 인구감소관심지역
  { name: "진천군", count: 8419, isReduction: false },
  { name: "충주시", count: 6162, isReduction: false },
  { name: "제천시", count: 2823, isReduction: true },  // 인구감소지역
  { name: "증평군", count: 1269, isReduction: false },
  { name: "옥천군", count: 1183, isReduction: true },
  { name: "괴산군", count: 1143, isReduction: true },
  { name: "영동군", count: 1122, isReduction: true },
  { name: "보은군", count: 737, isReduction: true },
  { name: "단양군", count: 335, isReduction: true },
];

// 2. 충북 국적별 외국인 TOP 10 (실데이터)
export const NATIONALITY_DATA = [
  { name: "베트남", count: 9127, flag: "🇻🇳" },
  { name: "중국", count: 6373, flag: "🇨🇳" },
  { name: "한국계중국인", count: 4931, flag: "🇨🇳" },
  { name: "우즈베키스탄", count: 4472, flag: "🇺🇿" },
  { name: "캄보디아", count: 3482, flag: "🇰🇭" },
  { name: "네팔", count: 3337, flag: "🇳🇵" },
  { name: "태국", count: 2518, flag: "🇹🇭" },
  { name: "필리핀", count: 2406, flag: "🇵🇭" },
  { name: "스리랑카", count: 2182, flag: "🇱🇰" },
  { name: "미얀마", count: 2056, flag: "🇲🇲" },
];

// 3. 전국 비자별 현황 (우리 서비스 메뉴와 매칭)
export const VISA_DATA = [
  { name: "E-9 비전문취업", code: "E-9", count: 337279, ours: true, desc: "제조업·농축산업" },
  { name: "D-2 유학", code: "D-2", count: 178519, ours: false, desc: "대학·대학원생" },
  { name: "E-7 특정활동", code: "E-7", count: 63580, ours: true, desc: "전문/숙련 (E-7-4 포함)" },
  { name: "F-2 거주", code: "F-2", count: 61292, ours: true, desc: "장기 거주 (F-2-R 포함)" },
  { name: "H-2 방문취업", code: "H-2", count: 93302, ours: false, desc: "동포 방문" },
  { name: "F-6 결혼이민", code: "F-6", count: 148376, ours: false, desc: "결혼" },
];

// 4. 충북 외국인 근로자 업종별 (한국고용정보원 고용행정통계, 2026년 1분기, E-9 일반외국인)
export const INDUSTRY_DATA = [
  { name: "제조업", count: 16490, pct: 87.0 },
  { name: "농축산업", count: 2171, pct: 11.5 },
  { name: "서비스업", count: 150, pct: 0.8 },
  { name: "건설업", count: 100, pct: 0.5 },
  { name: "임업", count: 20, pct: 0.1 },
  { name: "어업", count: 19, pct: 0.1 },
  { name: "광업", count: 9, pct: 0.0 },
];

export const INDUSTRY_META = {
  total: 18959,
  source: "한국고용정보원 고용행정통계 (2026년 1분기, E-9 고용허가제)",
  topShare: 87, // 제조업 비율
};