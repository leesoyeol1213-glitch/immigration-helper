// 법무부 출입국·외국인청 공식 데이터 기준
// 출처: 법무부 출입국·외국인정책본부 (immigration.go.kr)

export interface Office {
  id: string;
  name: Record<string, string>;  // ← 변경
  region: string; // 관할 지역
  address: string;
  phone: string;
  // 주요 관할 시/도 (이름으로 매칭용)
  jurisdictions: string[];
}

export const OFFICES: Office[] = [
  {
    id: "cheongju",
    name: {
      ko: "청주 출입국·외국인사무소",
      en: "Cheongju Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Cheongju",
    },
    region: "충북",
    address: "충북 청주시 흥덕구 가경동 1508",
    phone: "043-230-9000",
    jurisdictions: ["충북", "청주", "충주", "제천", "보은", "옥천", "영동", "증평", "진천", "괴산", "음성", "단양"],
  },
  {
    id: "seoul",
    name: {
      ko: "서울출입국·외국인청",
      en: "Seoul Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Seoul",
    },
    region: "서울",
    address: "서울 양천구 목동동로 151",
    phone: "02-2650-6212",
    jurisdictions: ["서울", "강남", "강북", "강서", "강동", "관악", "광진", "구로", "금천", "노원", "도봉", "동대문", "동작", "마포", "서대문", "서초", "성동", "성북", "송파", "양천", "영등포", "용산", "은평", "종로", "중구", "중랑"],
  },
  {
    id: "incheon",
    name: {
      ko: "인천출입국·외국인청",
      en: "Incheon Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Incheon",
    },
    region: "인천",
    address: "인천 중구 서해대로 393",
    phone: "032-890-6300",
    jurisdictions: ["인천", "부평", "남동", "연수", "계양", "서구", "강화", "옹진"],
  },
  {
    id: "suwon",
    name: {
      ko: "수원출입국·외국인청",
      en: "Suwon Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Suwon",
    },
    region: "경기 남부",
    address: "경기 수원시 영통구 영통로 467",
    phone: "031-695-3800",
    jurisdictions: ["수원", "용인", "화성", "오산", "평택", "안성", "이천", "여주", "광주", "하남", "성남", "안양", "안산", "군포", "의왕", "과천", "시흥", "광명", "부천"],
  },
  {
    id: "uijeongbu",
    name: {
      ko: "의정부출입국·외국인사무소",
      en: "Uijeongbu Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Uijeongbu",
    },
    region: "경기 북부",
    address: "경기 의정부시 시민로 9",
    phone: "031-829-3000",
    jurisdictions: ["의정부", "고양", "파주", "김포", "양주", "동두천", "포천", "연천", "남양주", "구리", "가평"],
  },
  {
    id: "daejeon",
    name: {
      ko: "대전출입국·외국인사무소",
      en: "Daejeon Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Daejeon",
    },
    region: "대전·충남",
    address: "대전 중구 보문로 246",
    phone: "042-220-2600",
    jurisdictions: ["대전", "세종", "충남", "공주", "보령", "아산", "서산", "논산", "계룡", "당진", "금산", "부여", "서천", "청양", "홍성", "예산", "태안", "천안"],
  },
  {
    id: "daegu",
    name: {
      ko: "대구출입국·외국인사무소",
      en: "Daegu Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Daegu",
    },
    region: "대구·경북",
    address: "대구 동구 화랑로 451",
    phone: "053-980-3500",
    jurisdictions: ["대구", "경북", "포항", "경주", "김천", "안동", "구미", "영주", "영천", "상주", "문경", "경산"],
  },
  {
    id: "busan",
    name: {
      ko: "부산출입국·외국인청",
      en: "Busan Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Busan",
    },
    region: "부산",
    address: "부산 중구 충장대로 20",
    phone: "051-461-3000",
    jurisdictions: ["부산", "해운대", "수영", "사하", "사상", "동래", "남구", "북구", "서구", "동구", "영도", "기장"],
  },
  {
    id: "ulsan",
    name: {
      ko: "울산출입국·외국인사무소",
      en: "Ulsan Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Ulsan",
    },
    region: "울산",
    address: "울산 남구 돋질로 233",
    phone: "052-279-8002",
    jurisdictions: ["울산"],
  },
  {
    id: "gwangju",
    name: {
      ko: "광주출입국·외국인사무소",
      en: "Gwangju Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Gwangju",
    },
    region: "광주·전남",
    address: "광주 광산구 무진대로 1014",
    phone: "062-940-4222",
    jurisdictions: ["광주", "전남", "목포", "여수", "순천", "나주", "광양", "담양", "곡성", "구례", "고흥", "보성", "화순", "장흥", "강진", "해남", "영암", "무안", "함평", "영광", "장성", "완도", "진도", "신안"],
  },
  {
    id: "jeonju",
    name: {
      ko: "전주출입국·외국인사무소",
      en: "Jeonju Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Jeonju",
    },
    region: "전북",
    address: "전북 전주시 덕진구 가리내로 23",
    phone: "063-245-6161",
    jurisdictions: ["전북", "전주", "군산", "익산", "정읍", "남원", "김제", "완주", "진안", "무주", "장수", "임실", "순창", "고창", "부안"],
  },
  {
    id: "changwon",
    name: {
      ko: "창원출입국·외국인사무소",
      en: "Changwon Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Changwon",
    },
    region: "경남",
    address: "경남 창원시 마산합포구 자유무역3길 14",
    phone: "055-981-6111",
    jurisdictions: ["경남", "창원", "진주", "통영", "사천", "김해", "밀양", "거제", "양산", "의령", "함안", "창녕", "고성", "남해", "하동", "산청", "함양", "거창", "합천"],
  },
  {
    id: "jeju",
    name: {
      ko: "제주출입국·외국인청",
      en: "Jeju Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Jeju",
    },
    region: "제주",
    address: "제주 제주시 청사로 8",
    phone: "064-769-4815",
    jurisdictions: ["제주", "서귀포"],
  },
  {
    id: "gangneung",
    name: {
      ko: "춘천출입국·외국인사무소",
      en: "Chuncheon Immigration Office",
      vi: "Văn phòng Xuất nhập cảnh Chuncheon",
    },
    region: "강원",
    address: "강원 춘천시 영서로 2854",
    phone: "033-244-7351",
    jurisdictions: ["강원", "춘천", "원주", "강릉", "동해", "태백", "속초", "삼척", "홍천", "횡성", "영월", "평창", "정선", "철원", "화천", "양구", "인제", "고성", "양양"],
  },
];

// 주소에서 가장 잘 맞는 사무소 찾기
export function findNearestOffice(addressKr: string): Office | null {
  if (!addressKr) return null;

  const cleaned = addressKr.toLowerCase().replace(/\s/g, "");

  // 가장 긴 매칭 우선 (예: "충남" vs "충북")
  let bestMatch: Office | null = null;
  let bestMatchLength = 0;

  for (const office of OFFICES) {
    for (const region of office.jurisdictions) {
      if (cleaned.includes(region.toLowerCase())) {
        if (region.length > bestMatchLength) {
          bestMatch = office;
          bestMatchLength = region.length;
        }
      }
    }
  }

  return bestMatch;
}