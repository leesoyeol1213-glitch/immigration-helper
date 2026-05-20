// 한국 내 주요 외국인 노동자 송출국 대사관 정보
// 출처: 외교부, 각 대사관 공식 사이트

export interface Embassy {
  id: string;
  country: { ko: string; en: string };
  flag: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  website?: string;
  // 필요 서류 (여권 갱신 시)
  requiredDocs: { ko: string; en: string }[];
}

export const EMBASSIES: Embassy[] = [
  {
    id: "china",
    country: { ko: "중국", en: "China" },
    flag: "🇨🇳",
    name: "주한 중국대사관",
    address: "서울 중구 명동2길 27",
    phone: "02-738-1038",
    hours: "월~금 09:00~12:00, 13:30~17:30",
    website: "http://kr.china-embassy.gov.cn",
    requiredDocs: [
      { ko: "여권 갱신 신청서", en: "Passport renewal form" },
      { ko: "기존 여권 원본", en: "Original old passport" },
      { ko: "사진 2매 (48mm × 33mm)", en: "2 photos (48mm × 33mm)" },
      { ko: "외국인등록증 사본", en: "Alien card copy" },
      { ko: "수수료 약 35,000원", en: "Fee approx ₩35,000" },
    ],
  },
  {
    id: "vietnam",
    country: { ko: "베트남", en: "Vietnam" },
    flag: "🇻🇳",
    name: "주한 베트남대사관",
    address: "서울 종로구 삼청로 23-9",
    phone: "02-720-5124",
    hours: "월~금 09:00~12:00, 14:00~17:00",
    website: "https://vnembassy-seoul.mofa.gov.vn",
    requiredDocs: [
      { ko: "여권 갱신 신청서", en: "Passport renewal form" },
      { ko: "기존 여권", en: "Old passport" },
      { ko: "사진 2매 (4cm × 6cm)", en: "2 photos (4cm × 6cm)" },
      { ko: "외국인등록증 사본", en: "Alien card copy" },
      { ko: "수수료 약 50,000원", en: "Fee approx ₩50,000" },
    ],
  },
  {
    id: "cambodia",
    country: { ko: "캄보디아", en: "Cambodia" },
    flag: "🇰🇭",
    name: "주한 캄보디아대사관",
    address: "서울 강남구 도산대로 50길 23",
    phone: "02-3785-1041",
    hours: "월~금 09:00~12:00, 14:00~17:00",
    website: "https://www.cambodiaembassy.or.kr",
    requiredDocs: [
      { ko: "여권 갱신 신청서", en: "Passport renewal form" },
      { ko: "기존 여권 원본", en: "Original passport" },
      { ko: "사진 4매", en: "4 photos" },
      { ko: "외국인등록증 사본", en: "Alien card copy" },
      { ko: "수수료 (대사관 확인)", en: "Fee (check embassy)" },
    ],
  },
  {
    id: "thailand",
    country: { ko: "태국", en: "Thailand" },
    flag: "🇹🇭",
    name: "주한 태국대사관",
    address: "서울 용산구 대사관로 42-1",
    phone: "02-795-3098",
    hours: "월~금 09:00~12:00, 14:00~16:30",
    website: "https://seoul.thaiembassy.org",
    requiredDocs: [
      { ko: "여권 갱신 신청서", en: "Passport renewal form" },
      { ko: "기존 여권", en: "Old passport" },
      { ko: "사진 2매", en: "2 photos" },
      { ko: "외국인등록증 사본", en: "Alien card copy" },
      { ko: "수수료 (대사관 확인)", en: "Fee (check embassy)" },
    ],
  },
  {
    id: "myanmar",
    country: { ko: "미얀마", en: "Myanmar" },
    flag: "🇲🇲",
    name: "주한 미얀마대사관",
    address: "서울 용산구 대사관로 38-15",
    phone: "02-790-3814",
    hours: "월~금 09:00~12:00",
    requiredDocs: [
      { ko: "여권 갱신 신청서", en: "Passport renewal form" },
      { ko: "기존 여권", en: "Old passport" },
      { ko: "사진 2매", en: "2 photos" },
      { ko: "외국인등록증 사본", en: "Alien card copy" },
    ],
  },
  {
    id: "nepal",
    country: { ko: "네팔", en: "Nepal" },
    flag: "🇳🇵",
    name: "주한 네팔대사관",
    address: "서울 용산구 한남대로 27길 8",
    phone: "02-3789-9770",
    hours: "월~금 09:30~12:30, 13:30~17:30",
    requiredDocs: [
      { ko: "여권 갱신 신청서", en: "Passport renewal form" },
      { ko: "기존 여권", en: "Old passport" },
      { ko: "사진 2매", en: "2 photos" },
      { ko: "외국인등록증 사본", en: "Alien card copy" },
    ],
  },
  {
    id: "srilanka",
    country: { ko: "스리랑카", en: "Sri Lanka" },
    flag: "🇱🇰",
    name: "주한 스리랑카대사관",
    address: "서울 용산구 두텁바위로 60길 15",
    phone: "02-797-2725",
    hours: "월~금 09:30~13:00, 14:00~17:30",
    requiredDocs: [
      { ko: "여권 갱신 신청서", en: "Passport renewal form" },
      { ko: "기존 여권", en: "Old passport" },
      { ko: "사진 2매", en: "2 photos" },
      { ko: "외국인등록증 사본", en: "Alien card copy" },
    ],
  },
  {
    id: "indonesia",
    country: { ko: "인도네시아", en: "Indonesia" },
    flag: "🇮🇩",
    name: "주한 인도네시아대사관",
    address: "서울 영등포구 여의공원로 13",
    phone: "02-783-5675",
    hours: "월~금 09:00~12:00, 14:00~16:00",
    website: "https://kemlu.go.id/seoul",
    requiredDocs: [
      { ko: "여권 갱신 신청서", en: "Passport renewal form" },
      { ko: "기존 여권", en: "Old passport" },
      { ko: "사진 2매", en: "2 photos" },
      { ko: "외국인등록증 사본", en: "Alien card copy" },
    ],
  },
  {
    id: "philippines",
    country: { ko: "필리핀", en: "Philippines" },
    flag: "🇵🇭",
    name: "주한 필리핀대사관",
    address: "서울 용산구 이태원로 80",
    phone: "02-796-7387",
    hours: "월~금 09:00~17:00",
    requiredDocs: [
      { ko: "여권 갱신 신청서", en: "Passport renewal form" },
      { ko: "기존 여권", en: "Old passport" },
      { ko: "사진 2매", en: "2 photos" },
      { ko: "외국인등록증 사본", en: "Alien card copy" },
    ],
  },
];

export function findEmbassy(countryId: string): Embassy | null {
  return EMBASSIES.find((e) => e.id === countryId) || null;
}