export const TEXTS: Record<string, any> = {
  // 비자 선택 (step1)
  visaTitle: {
    ko: "어떤 비자를 가지고 계신가요?",
    en: "Which visa do you have?",
    vi: "Bạn đang sử dụng loại visa nào?",
  },
  visaSub: {
    ko: "외국인등록증에 적힌 체류자격을 선택하세요.",
    en: "Select the status of stay on your alien registration card.",
    vi: "Chọn tư cách lưu trú ghi trên thẻ ngoại kiều.",
  },
  visaE9Label: {
    ko: "E-9 비자 (비전문 취업)",
    en: "E-9 (Non-professional Employment)",
    vi: "E-9 (Lao động phổ thông)",
  },
  visaE9Desc: {
    ko: "제조업, 농업, 어업 등",
    en: "Manufacturing, agriculture, fishing",
    vi: "Sản xuất, nông nghiệp, đánh bắt",
  },
  visaOtherLabel: {
    ko: "다른 비자입니다",
    en: "Other visa",
    vi: "Loại visa khác",
  },
  visaOtherDesc: {
    ko: "준비 중입니다",
    en: "Coming soon",
    vi: "Sắp ra mắt",
  },
  visaOtherWarn: {
    ko: "현재는 E-9 비자만 지원합니다. 다른 비자는 곧 추가될 예정이에요.",
    en: "Only E-9 is supported. Other visas coming soon.",
    vi: "Hiện tại chỉ hỗ trợ E-9. Các visa khác sẽ sớm được bổ sung.",
  },

  // 공통
  next: { ko: "다음 →", en: "Next →", vi: "Tiếp theo →" },
  prev: { ko: "이전", en: "Back", vi: "Quay lại" },
  back: { ko: "처음으로", en: "Home", vi: "Trang đầu" },
  result: { ko: "결과 보기 →", en: "See Result →", vi: "Xem kết quả →" },
  why: {
    ko: "💡 왜 묻나요?",
    en: "💡 Why are we asking?",
    vi: "💡 Tại sao chúng tôi hỏi?",
  },
  noSave: {
    ko: "입력한 정보는 서버에 저장되지 않습니다.",
    en: "Your information is not saved on our server.",
    vi: "Thông tin nhập sẽ không được lưu trên máy chủ.",
  },

  // step2 (만료일)
  expiryTitle: {
    ko: "지금 비자가 언제까지인가요?",
    en: "When does your visa expire?",
    vi: "Visa của bạn có hiệu lực đến khi nào?",
  },
  expirySub: {
    ko: "외국인등록증에 적힌 체류기간 만료일을 입력하세요.",
    en: "Enter the expiry date on your alien registration card.",
    vi: "Nhập ngày hết hạn lưu trú trên thẻ ngoại kiều.",
  },
  expiryWhy: {
    ko: "체류기간이 얼마 남았는지에 따라 안내가 달라져요.",
    en: "Guidance differs based on remaining stay period.",
    vi: "Hướng dẫn khác nhau tùy thuộc vào thời gian còn lại.",
  },
  expiryStep: { ko: "체류기간 확인", en: "Visa Expiry", vi: "Kiểm tra hạn visa" },

  // step3 (회사)
  companyTitle: {
    ko: "지금 일하는 회사가\n처음 한국 왔을 때와 같은 회사인가요?",
    en: "Is your current company the same as when you first arrived in Korea?",
    vi: "Công ty hiện tại có giống công ty khi bạn mới đến Hàn Quốc không?",
  },
  companySub: {
    ko: "회사가 바뀌었다면 추가 서류가 필요해요.",
    en: "If the company changed, additional documents are required.",
    vi: "Nếu công ty thay đổi, cần thêm giấy tờ.",
  },
  companyWhy: {
    ko: "회사 변경 시 고용센터의 사업장 변경 허가가 필요해요.",
    en: "Workplace change permit from Employment Center is required.",
    vi: "Cần giấy phép thay đổi nơi làm việc từ Trung tâm Việc làm.",
  },
  companySame: {
    ko: "네, 같은 회사예요",
    en: "Yes, same company",
    vi: "Có, cùng công ty",
  },
  companySameDesc: {
    ko: "처음부터 같은 회사에서 일하고 있어요",
    en: "Working at the same company since arrival",
    vi: "Làm việc tại cùng công ty từ khi đến",
  },
  companyChanged: {
    ko: "아니요, 회사가 바뀌었어요",
    en: "No, company changed",
    vi: "Không, đã đổi công ty",
  },
  companyChangedDesc: {
    ko: "사업장 변경을 한 적이 있어요",
    en: "Have changed workplace before",
    vi: "Đã từng thay đổi nơi làm việc",
  },
  companyWarn: {
    ko: "⚠️ 회사 변경 시 출입국 가기 전에:\n1️⃣ 고용센터에서 사업장 변경 허가 받기\n2️⃣ 그 후 출입국에서 체류 연장 신청\n순서가 바뀌면 출입국에서 돌려보낼 수 있어요.",
    en: "⚠️ When changing companies, before visiting Immigration:\n1️⃣ Get workplace change permit from Employment Center\n2️⃣ Then apply for extension at Immigration\nWrong order may result in rejection.",
    vi: "⚠️ Khi đổi công ty, trước khi đến Cục Xuất nhập cảnh:\n1️⃣ Lấy giấy phép thay đổi nơi làm việc tại Trung tâm Việc làm\n2️⃣ Sau đó nộp đơn gia hạn\nThứ tự sai có thể bị từ chối.",
  },
  companyStep: { ko: "회사 정보", en: "Company Info", vi: "Thông tin công ty" },

  // step4 (주소)
  addressTitle: {
    ko: "외국인등록증에 적힌 주소가\n지금 사는 주소와 같나요?",
    en: "Is the address on your card the same as your current address?",
    vi: "Địa chỉ trên thẻ có giống địa chỉ hiện tại không?",
  },
  addressSub: {
    ko: "주소가 바뀌었다면 임대차계약서가 추가로 필요해요.",
    en: "If address changed, a lease contract is required.",
    vi: "Nếu địa chỉ thay đổi, cần hợp đồng thuê nhà.",
  },
  addressWhy: {
    ko: "거주지 변경 시 입증 서류가 필요해요.",
    en: "Proof of residence is required when address changes.",
    vi: "Cần giấy tờ chứng minh khi địa chỉ thay đổi.",
  },
  addressSame: { ko: "네, 같아요", en: "Yes, same", vi: "Có, giống nhau" },
  addressSameDesc: {
    ko: "외국인등록증의 주소와 같아요",
    en: "Same as the card",
    vi: "Giống với thẻ",
  },
  addressChanged: {
    ko: "아니요, 주소가 바뀌었어요",
    en: "No, address changed",
    vi: "Không, địa chỉ đã thay đổi",
  },
  addressChangedDesc: {
    ko: "이사를 했거나 등록증 주소와 달라요",
    en: "Moved or different from the card",
    vi: "Đã chuyển nhà hoặc khác với thẻ",
  },
  addressDoc: {
    ko: "📋 추가로 필요한 서류\n임대차계약서 (사본)",
    en: "📋 Additional document\nLease contract (copy)",
    vi: "📋 Giấy tờ bổ sung\nHợp đồng thuê nhà (bản sao)",
  },
  addressStep: { ko: "주소 정보", en: "Address", vi: "Thông tin địa chỉ" },

  // step5 (본인정보)
  step5Title: {
    ko: "본인 정보를 입력해주세요",
    en: "Please enter your information",
    vi: "Vui lòng nhập thông tin của bạn",
  },
  step5Sub: {
    ko: "신청서에 자동으로 입력될 정보입니다.",
    en: "This information will be auto-filled in the form.",
    vi: "Thông tin sẽ được tự động điền vào đơn.",
  },
  step5Step: { ko: "본인 정보 입력", en: "Personal Info", vi: "Thông tin cá nhân" },
  privacyTitle: {
    ko: "개인정보는 저장되지 않습니다",
    en: "Your personal info is not saved",
    vi: "Thông tin cá nhân không được lưu",
  },
  privacyDesc: {
    ko: "여기서 입력한 정보는 우리 서버에 저장되지 않아요. 창을 닫으면 자동으로 사라집니다.",
    en: "Information entered here is not saved on our server. It disappears when you close the window.",
    vi: "Thông tin nhập ở đây không lưu trên máy chủ. Sẽ biến mất khi bạn đóng cửa sổ.",
  },
  basicInfo: { ko: "기본 정보", en: "Basic Info", vi: "Thông tin cơ bản" },
  idInfo: { ko: "신분 정보", en: "Identity", vi: "Thông tin nhận dạng" },
  contactInfo: { ko: "연락처", en: "Contact", vi: "Liên hệ" },
  addressInfo: { ko: "주소", en: "Address", vi: "Địa chỉ" },
  workplaceInfo: { ko: "근무처", en: "Workplace", vi: "Nơi làm việc" },
  fName: { ko: "영문 이름 (여권 기준) *", en: "Name in English *", vi: "Tên tiếng Anh *" },
  fNameKr: { ko: "한글 이름 (있다면)", en: "Korean Name", vi: "Tên tiếng Hàn" },
  fNationality: { ko: "국적 *", en: "Nationality *", vi: "Quốc tịch *" },
  fPassport: { ko: "여권 번호 *", en: "Passport No. *", vi: "Số hộ chiếu *" },
  fAlienNo: { ko: "외국인등록번호 *", en: "Alien Reg. No. *", vi: "Số thẻ ngoại kiều *" },
  fPhone: { ko: "한국 연락처 *", en: "Korea Phone *", vi: "SĐT Hàn Quốc *" },
  fEmail: { ko: "이메일 (있다면)", en: "Email", vi: "Email" },
  fAddressKr: { ko: "한국 내 주소 *", en: "Address in Korea *", vi: "Địa chỉ ở Hàn *" },
  fAddressHome: { ko: "본국 주소 (있다면)", en: "Home Address", vi: "Địa chỉ quê nhà" },
  fCompany: { ko: "회사 이름 (있다면)", en: "Company Name", vi: "Tên công ty" },
  required: {
    ko: "필수 항목을 모두 입력해주세요 (*)",
    en: "Please fill in all required fields (*)",
    vi: "Vui lòng điền tất cả mục bắt buộc (*)",
  },

  // result
  resultTitle: { ko: "맞춤 체크리스트", en: "Your Checklist", vi: "Danh sách của bạn" },
  resultSub: {
    ko: "본인 상황에 맞는 서류를 준비하세요.",
    en: "Prepare documents tailored to your situation.",
    vi: "Chuẩn bị giấy tờ phù hợp với hoàn cảnh của bạn.",
  },
  pdfOfficial: {
    ko: "📄 통합신청서 (공식 양식)",
    en: "📄 Application Form (Official)",
    vi: "📄 Đơn đăng ký (Chính thức)",
  },
  pdfOfficialDesc: {
    ko: "출입국 공식 양식에 정보 자동 채움 — 출력 후 그대로 제출",
    en: "Auto-fill official form — print and submit",
    vi: "Tự động điền mẫu chính thức — in và nộp",
  },
  pdfDownload: { ko: "공식 양식 PDF ↓", en: "Download Official PDF ↓", vi: "Tải PDF chính thức ↓" },
  pdfGenerating: { ko: "생성 중...", en: "Generating...", vi: "Đang tạo..." },
  pdfSummary: { ko: "📋 요약지 (참고용)", en: "📋 Summary (Reference)", vi: "📋 Tóm tắt (Tham khảo)" },
  pdfSummaryDesc: {
    ko: "본인 정보 한눈에 보기",
    en: "Review your information",
    vi: "Xem lại thông tin của bạn",
  },
  pdfSummaryDownload: { ko: "요약지 PDF ↓", en: "Download Summary ↓", vi: "Tải tóm tắt ↓" },
  docsTitle: { ko: "📋 필요한 서류", en: "📋 Required Documents", vi: "📋 Giấy tờ cần thiết" },
  docExtra: { ko: "상황별 추가", en: "Additional", vi: "Bổ sung" },
  warnTitle: { ko: "⚠️ 안내:", en: "⚠️ Notice:", vi: "⚠️ Lưu ý:" },
  warnDesc: {
    ko: "이 체크리스트는 일반적인 경우 기준입니다. 사례별로 다를 수 있으니 출입국 사무소의 안내를 우선하세요.",
    en: "This checklist is for general cases. Specific cases may vary. Always follow Immigration's guidance.",
    vi: "Danh sách này dành cho trường hợp chung. Trường hợp cụ thể có thể khác. Hãy ưu tiên hướng dẫn của Cục Xuất nhập cảnh.",
  },
  reset: { ko: "다시 시작", en: "Restart", vi: "Bắt đầu lại" },
  homeBtn: { ko: "처음으로 →", en: "Home →", vi: "Trang đầu →" },

  // 경고 메시지
  expired: {
    ko: "체류기간이 이미 만료되었습니다",
    en: "Stay period has already expired",
    vi: "Thời hạn lưu trú đã hết hạn",
  },
  expiredDesc: {
    ko: "과태료가 발생할 수 있습니다. 출입국 사무소에 즉시 문의하세요.",
    en: "Penalties may apply. Contact Immigration immediately.",
    vi: "Có thể bị phạt. Liên hệ Cục Xuất nhập cảnh ngay.",
  },
  daysLeft: {
    ko: (n: number) => `체류기간이 ${n}일 남았습니다`,
    en: (n: number) => `${n} days left until expiry`,
    vi: (n: number) => `Còn ${n} ngày`,
  },
  urgent: {
    ko: "지금 바로 연장 신청을 해야 합니다.",
    en: "Apply for extension immediately.",
    vi: "Nộp đơn gia hạn ngay lập tức.",
  },
  soon: {
    ko: "여유롭게 준비하시는 게 좋아요.",
    en: "Prepare with time to spare.",
    vi: "Nên chuẩn bị từ sớm.",
  },
  enough: {
    ko: "충분한 시간이 있습니다.",
    en: "You have enough time.",
    vi: "Bạn có đủ thời gian.",
  },
// 출입국 사무소
  officeTitle: { 
    ko: "📍 가까운 출입국 사무소", 
    en: "📍 Your Immigration Office", 
    vi: "📍 Văn phòng XNC gần bạn" 
  },
  officeDesc: { 
    ko: "본인 주소 기준 관할 사무소입니다", 
    en: "Your jurisdiction office based on your address", 
    vi: "Văn phòng quản lý theo địa chỉ của bạn" 
  },
  officeAddress: { ko: "주소", en: "Address", vi: "Địa chỉ" },
  officePhone: { ko: "전화", en: "Phone", vi: "Điện thoại" },
  officeNotFound: { 
    ko: "주소를 입력하면 가까운 사무소를 안내해드립니다", 
    en: "Enter your address to find the nearest office", 
    vi: "Nhập địa chỉ để tìm văn phòng gần nhất" 
  },
  officeDataSource: { 
    ko: "데이터 출처: 법무부 출입국·외국인정책본부", 
    en: "Source: Ministry of Justice Immigration Service", 
    vi: "Nguồn: Bộ Tư pháp Hàn Quốc" 
  },

// OCR
  ocrTitle: { 
    ko: "📷 사진으로 자동 입력", 
    en: "📷 Auto-fill from photo", 
    vi: "📷 Tự động điền từ ảnh" 
  },
  ocrDesc: { 
    ko: "외국인등록증 사진을 업로드하면 자동으로 정보가 채워집니다", 
    en: "Upload a photo of your alien card to auto-fill", 
    vi: "Tải lên ảnh thẻ ngoại kiều để tự động điền" 
  },
  ocrUpload: { ko: "사진 선택", en: "Choose photo", vi: "Chọn ảnh" },
  ocrProcessing: { 
    ko: "AI가 정보를 읽는 중", 
    en: "AI is reading the image", 
    vi: "AI đang đọc ảnh" 
  },
  ocrSuccess: { 
    ko: "✅ 인식 완료! 정보를 확인하고 필요시 수정해주세요.", 
    en: "✅ Recognition done! Please check and edit if needed.", 
    vi: "✅ Đã nhận diện! Vui lòng kiểm tra và chỉnh sửa nếu cần." 
  },
  ocrWarning: { 
    ko: "⚠️ AI 인식은 100% 정확하지 않을 수 있습니다. 반드시 확인하세요.", 
    en: "⚠️ AI recognition may not be 100% accurate. Please verify.", 
    vi: "⚠️ Nhận diện AI có thể không chính xác 100%. Vui lòng xác minh." 
  },
};

export type Lang = "ko" | "en" | "vi" | "th" | "km" | "ne" | "si" | "my" | "zh";

type TextItem = Partial<Record<Lang, string>> | Partial<Record<Lang, (n: number) => string>>;

export const LANG_INFO: Record<Lang, { flag: string; name: string }> = {
  ko: { flag: "🇰🇷", name: "한국어" },
  en: { flag: "🇺🇸", name: "English" },
  vi: { flag: "🇻🇳", name: "Tiếng Việt" },
  th: { flag: "🇹🇭", name: "ภาษาไทย" },
  km: { flag: "🇰🇭", name: "ខ្មែរ" },
  ne: { flag: "🇳🇵", name: "नेपाली" },
  si: { flag: "🇱🇰", name: "සිංහල" },
  my: { flag: "🇲🇲", name: "မြန်မာ" },
  zh: { flag: "🇨🇳", name: "中文" },
};

// === Fallback 헬퍼 함수 ===
// 번역이 없는 언어는 자동으로 영어 → 한국어 순서로 대체
export function t(textGroup: any, lang: Lang): string {
  if (!textGroup) return "";
  
  // 함수 형태 (예: daysLeft(n))는 그대로 반환
  if (typeof textGroup[lang] === "function") return textGroup[lang];
  
  // 문자열 번역이 있으면 그대로
  if (typeof textGroup[lang] === "string") return textGroup[lang];
  
  // 없으면 영어 → 한국어 순서로 fallback
  if (typeof textGroup.en === "string") return textGroup.en;
  if (typeof textGroup.ko === "string") return textGroup.ko;
  
  return "";
}

// 함수 형태 텍스트용 (예: daysLeft(30))
export function tf(textGroup: any, lang: Lang, ...args: any[]): string {
  if (!textGroup) return "";
  const fn = textGroup[lang] || textGroup.en || textGroup.ko;
  if (typeof fn === "function") return fn(...args);
  if (typeof fn === "string") return fn;
  return "";
}

// === TEXTS 자동 Fallback 적용 ===
// 각 텍스트 항목에 Proxy를 씌워서 누락된 언어는 자동으로 영어로 대체
(function applyFallback() {
  for (const key of Object.keys(TEXTS)) {
    const item = (TEXTS as any)[key];
    if (typeof item !== "object" || item === null || Array.isArray(item)) continue;
    
    (TEXTS as any)[key] = new Proxy(item, {
      get(target: any, prop: string) {
        if (target[prop] !== undefined) return target[prop];
        if (target.en !== undefined) return target.en;
        if (target.ko !== undefined) return target.ko;
        return "";
      },
    });
  }
})();