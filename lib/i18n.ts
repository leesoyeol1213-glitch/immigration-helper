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
visaE7Label: {
    ko: "E-7-4 비자 (숙련기능인력 점수제)",
    en: "E-7-4 (Specialized Worker)",
    vi: "E-7-4 (Chuyên gia)",
  },
  visaE7Desc: {
    ko: "전문직, 학위/경력 필요",
    en: "Professional, requires degree/experience",
    vi: "Chuyên gia, cần bằng cấp/kinh nghiệm",
  },
  visaF2RLabel: {
    ko: "F-2-R 비자 (지역특화)",
    en: "F-2-R (Regional Talent)",
    vi: "F-2-R (Vùng đặc thù)",
  },
  visaF2RDesc: {
    ko: "충북 등 인구감소지역 우수 인재",
    en: "Regional talent in declining areas",
    vi: "Nhân tài vùng giảm dân số",
  },
  visaD2Label: {
    ko: "D-2 비자 (유학)",
    en: "D-2 (Student)",
    vi: "D-2 (Du học)",
  },
  visaD2Desc: {
    ko: "대학교, 대학원 재학",
    en: "University students",
    vi: "Sinh viên đại học",
  },
  reissueLabel: {
    ko: "외국인등록증 재발급",
    en: "Alien Card Reissuance",
    vi: "Cấp lại thẻ ngoại kiều",
  },
  reissueDesc: {
    ko: "분실, 훼손, 정보변경 등",
    en: "Lost, damaged, info changed",
    vi: "Mất, hỏng, đổi thông tin",
  },
  passportLabel: {
    ko: "여권 갱신 가이드",
    en: "Passport Renewal Guide",
    vi: "Hướng dẫn gia hạn hộ chiếu",
  },
  passportDesc: {
    ko: "대사관 정보 + 필요 서류 안내",
    en: "Embassy info + required documents",
    vi: "Thông tin đại sứ quán + giấy tờ cần",
  },
  passportTitle: {
    ko: "여권 갱신 안내",
    en: "Passport Renewal Guide",
    vi: "Hướng dẫn gia hạn hộ chiếu",
  },
  passportSub: {
    ko: "본국 대사관 정보와 필요 서류를 안내합니다",
    en: "Embassy info and required documents",
    vi: "Thông tin đại sứ quán và giấy tờ cần thiết",
  },
  passportStep: {
    ko: "여권 갱신 안내",
    en: "Passport Renewal",
    vi: "Gia hạn hộ chiếu",
  },
  passportNoticeTitle: {
    ko: "⚠️ 중요 안내",
    en: "⚠️ Important Notice",
    vi: "⚠️ Lưu ý quan trọng",
  },
  passportNoticeDesc: {
    ko: "여권 갱신은 본국 대사관에서 직접 처리합니다. 갱신 후 반드시 하이코리아에 신고하세요.",
    en: "Passport renewal is handled directly by your country's embassy. After renewal, must report to HiKorea.",
    vi: "Gia hạn hộ chiếu được xử lý trực tiếp tại đại sứ quán nước bạn. Sau khi gia hạn, phải báo cáo cho HiKorea.",
  },
  passportSelectCountry: {
    ko: "🌍 본국을 선택해주세요",
    en: "🌍 Select your country",
    vi: "🌍 Chọn quốc gia của bạn",
  },
  embassyHours: {
    ko: "운영시간",
    en: "Hours",
    vi: "Giờ làm việc",
  },
  embassyWebsite: {
    ko: "공식 사이트",
    en: "Website",
    vi: "Trang web",
  },
  requiredDocs: {
    ko: "필요 서류",
    en: "Required Documents",
    vi: "Giấy tờ cần thiết",
  },
  hikoreaTitle: {
    ko: "📌 여권 갱신 후 필수 절차",
    en: "📌 After Renewal: Mandatory Step",
    vi: "📌 Sau khi gia hạn: Bước bắt buộc",
  },
  hikoreaDesc: {
    ko: "새 여권을 받으면 14일 이내에 하이코리아에서 '여권정보 변경 신고'를 해야 합니다. (미신고 시 과태료 부과 가능)",
    en: "After receiving new passport, you must report to HiKorea within 14 days. (Penalty may apply if not reported)",
    vi: "Sau khi nhận hộ chiếu mới, phải báo cáo cho HiKorea trong vòng 14 ngày. (Có thể bị phạt nếu không báo cáo)",
  },
  hikoreaVisit: {
    ko: "하이코리아 바로가기",
    en: "Visit HiKorea",
    vi: "Truy cập HiKorea",
  },
  embassyDataSource: {
    ko: "🏛️ 데이터 출처: 외교부 + 각 대사관 공식 사이트 (2025.10 기준)",
    en: "🏛️ Source: MOFA + Embassy websites (Updated 2025.10)",
    vi: "🏛️ Nguồn: MOFA + Đại sứ quán (Cập nhật 2025.10)",
  },
  reissueTitle: {
    ko: "재발급 사유를 선택해주세요",
    en: "Select reissuance reason",
    vi: "Chọn lý do cấp lại",
  },
  reissueSub: {
    ko: "사유에 따라 필요한 서류가 달라집니다",
    en: "Required documents vary by reason",
    vi: "Giấy tờ cần thiết khác nhau theo lý do",
  },
  reissueStep: {
    ko: "재발급 사유 선택",
    en: "Choose reason",
    vi: "Chọn lý do",
  },
  reasonLost: {
    ko: "분실 (잃어버림)",
    en: "Lost",
    vi: "Bị mất",
  },
  reasonLostDesc: {
    ko: "경찰서 분실신고서 추가 필요",
    en: "Need police report",
    vi: "Cần báo cáo công an",
  },
  reasonDamaged: {
    ko: "훼손 (찢어짐, 못 읽음)",
    en: "Damaged",
    vi: "Bị hỏng",
  },
  reasonDamagedDesc: {
    ko: "훼손된 카드 반납",
    en: "Return damaged card",
    vi: "Nộp thẻ bị hỏng",
  },
  reasonInfo: {
    ko: "정보 변경",
    en: "Info Change",
    vi: "Đổi thông tin",
  },
  reasonInfoDesc: {
    ko: "이름, 국적 등 변경 시",
    en: "Name, nationality change",
    vi: "Đổi tên, quốc tịch",
  },
  lostWarnTitle: {
    ko: "⚠️ 분실 시 필수 절차",
    en: "⚠️ Required for Lost",
    vi: "⚠️ Bắt buộc khi mất",
  },
  lostWarnDesc: {
    ko: "1️⃣ 가까운 경찰서에서 '분실신고확인서' 발급\n2️⃣ 그 서류와 함께 출입국 방문\n순서 바꾸면 처리 안 됩니다.",
    en: "1️⃣ Get 'Lost Report' from police\n2️⃣ Bring it to immigration\nMust be in this order.",
    vi: "1️⃣ Lấy 'Báo cáo mất' từ công an\n2️⃣ Đến XNC với báo cáo đó\nPhải theo thứ tự này.",
  },
  selectReason: {
    ko: "사유를 선택해주세요",
    en: "Please select a reason",
    vi: "Vui lòng chọn lý do",
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
    ko: "같은 회사 계속 / 변경 신고 완료",
    en: "Same company / change reported",
    vi: "Cùng công ty / đã báo cáo thay đổi",
  },
  companySameDesc: {
    ko: "처음부터 같은 회사이거나, 사업장을 옮겼지만 변경 신고를 완료한 경우예요. 추가 서류 없이 연장할 수 있어요.",
    en: "Same company from the start, or you changed workplace but already reported it. No extra documents needed.",
    vi: "Cùng công ty từ đầu, hoặc đã đổi nơi làm việc nhưng đã báo cáo. Không cần giấy tờ thêm.",
  },
  companyChanged: {
    ko: "사업장 변경 + 신고 안 했어요",
    en: "Changed workplace, not reported",
    vi: "Đổi nơi làm việc, chưa báo cáo",
  },
  companyChangedDesc: {
    ko: "사업장을 옮겼는데 아직 변경 신고를 하지 않은 경우예요. 사업장 변경 허가서가 추가로 필요해요.",
    en: "You changed workplace but haven't reported it yet. A workplace change permit is required.",
    vi: "Bạn đã đổi nơi làm việc nhưng chưa báo cáo. Cần giấy phép đổi nơi làm việc.",
  },
  companyBlocked: {
    ko: "먼저 사업장 변경 신고가 필요해요",
    en: "Report workplace change first",
    vi: "Cần báo cáo đổi nơi làm việc trước",
  },
  companyBlockedTitle: {
    ko: "⚠️ 먼저 사업장 변경 신고를 완료하세요",
    en: "⚠️ Complete your workplace change report first",
    vi: "⚠️ Hãy hoàn thành báo cáo đổi nơi làm việc trước",
  },
  companyBlockedDesc: {
    ko: "사업장 변경 신고를 하지 않으면 고용센터의 허가를 받을 수 없고, 연장에 필요한 근로계약서·고용허가서를 준비할 수 없습니다. 먼저 고용센터에 사업장 변경 신고를 완료한 뒤 다시 진행해주세요.",
    en: "Without reporting the workplace change, you cannot get Employment Center approval or prepare the employment contract/permit required for extension. Please complete the report at the Employment Center first.",
    vi: "Nếu không báo cáo đổi nơi làm việc, bạn không thể nhận được sự chấp thuận của Trung tâm Việc làm hoặc chuẩn bị hợp đồng/giấy phép lao động cần thiết. Hãy hoàn thành báo cáo trước.",
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
  addressDeadlineTitle: {
    ko: "⏰ 전입일부터 15일 이내 신고하세요",
    en: "⏰ Report within 15 days of moving",
    vi: "⏰ Báo cáo trong vòng 15 ngày kể từ khi chuyển đến",
  },
  addressDeadlineDesc: {
    ko: "출입국관리법 제36조에 따라, 거주지를 옮긴 날부터 15일 이내에 새 주소지의 시·군·구청 또는 출입국·외국인관서에 전입신고를 해야 합니다. 기간 내에 신고하지 않으면 과태료가 부과될 수 있습니다.",
    en: "Under Article 36 of the Immigration Act, you must report your new address to the local office or immigration office within 15 days of moving. Late reporting may result in a fine.",
    vi: "Theo Điều 36 Luật Xuất nhập cảnh, bạn phải báo cáo địa chỉ mới cho cơ quan địa phương hoặc cơ quan xuất nhập cảnh trong vòng 15 ngày. Báo cáo trễ có thể bị phạt.",
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
  privacyMore: {
    ko: "개인정보 처리방침 자세히 보기 →",
    en: "View Privacy Policy →",
    vi: "Xem chính sách bảo mật →",
  },
  basicInfo: { ko: "기본 정보", en: "Basic Info", vi: "Thông tin cơ bản" },
  idInfo: { ko: "신분 정보", en: "Identity", vi: "Thông tin nhận dạng" },
  contactInfo: { ko: "연락처", en: "Contact", vi: "Liên hệ" },
  addressInfo: { ko: "주소", en: "Address", vi: "Địa chỉ" },
  workplaceInfo: { ko: "근무처", en: "Workplace", vi: "Nơi làm việc" },
  fSurname: {
    ko: "영문 성 (Surname) *",
    en: "Surname *",
    vi: "Họ (Surname) *",
  },
  fGivenName: {
    ko: "영문 이름 (Given names) *",
    en: "Given Names *",
    vi: "Tên (Given names) *",
  },
  fPassportIssue: {
    ko: "여권 발급일자 (여권에서 직접 확인)",
    en: "Passport Issue Date (check your passport)",
    vi: "Ngày cấp hộ chiếu (xem trên hộ chiếu)",
  },
  fPassportExpiry: {
    ko: "여권 유효기간 (yyyy.mm.dd)",
    en: "Passport Expiry Date",
    vi: "Ngày hết hạn hộ chiếu",
  },
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
  docDone: {
    ko: "준비완료",
    en: "ready",
    vi: "đã chuẩn bị",
  },
  docGroupSelf: {
    ko: "본인이 준비",
    en: "You prepare",
    vi: "Bạn chuẩn bị",
  },
  docGroupCompany: {
    ko: "회사가 준비",
    en: "Company prepares",
    vi: "Công ty chuẩn bị",
  },
  docAllDone: {
    ko: "모든 서류 준비 완료!",
    en: "All documents ready!",
    vi: "Đã chuẩn bị tất cả giấy tờ!",
  },
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
  ko: "🏛️ 공공데이터 출처: 법무부 출입국·외국인정책본부 (2025.10 기준)",
  en: "🏛️ Public Data: Korea Immigration Service (Updated 2025.10)",
  vi: "🏛️ Dữ liệu công: Bộ Tư pháp Hàn Quốc (Cập nhật 2025.10)",
  },

  officeDirections: {
    ko: "길찾기 (구글 지도)",
    en: "Get Directions (Google Maps)",
    vi: "Chỉ đường (Google Maps)",
  },

// OCR
  ocrTitle: { 
    ko: " 사진으로 자동 입력", 
    en: " Auto-fill from photo", 
    vi: " Tự động điền từ ảnh" 
  },
  ppOcrTitle: {
    ko: "여권으로 자동 입력",
    en: "Auto-fill with Passport",
    vi: "Tự động điền bằng hộ chiếu",
  },
  ppOcrDesc: {
    ko: "여권 사진을 올리면 MRZ(하단 두 줄)에서 성/이름/여권번호/국적/유효기간을 자동 인식합니다",
    en: "Upload passport photo to auto-detect name, number, nationality, expiry from MRZ",
    vi: "Tải ảnh hộ chiếu để tự động nhận diện từ MRZ",
  },
  ppOcrUpload: {
    ko: "여권 사진 업로드",
    en: "Upload Passport Photo",
    vi: "Tải ảnh hộ chiếu",
  },
  ppOcrSuccess: {
    ko: "✅ 여권 인식 완료! 정보를 확인해주세요.",
    en: "✅ Passport recognized! Please verify.",
    vi: "✅ Đã nhận diện hộ chiếu! Vui lòng kiểm tra.",
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
  ocrFail: {
    ko: "사진 인식이 어려웠어요 😢",
    en: "Couldn't read the photo 😢",
    vi: "Không đọc được ảnh 😢",
  },
  ocrFailHint: {
    ko: "괜찮아요! 아래 칸에 직접 입력하시면 됩니다 ↓",
    en: "It's okay! Just type below ↓",
    vi: "Không sao! Hãy nhập trực tiếp bên dưới ↓",
  },
  ppOcrFailHint: {
    ko: "여권 아래쪽 기호(<<) 두 줄이 잘 보이게 다시 찍거나, 아래에 직접 입력하세요 ↓",
    en: "Retake with the bottom 2 lines (<<) clearly visible, or type below ↓",
    vi: "Chụp lại rõ 2 dòng dưới (<<), hoặc nhập bên dưới ↓",
  },
  ocrPhotoTip: {
    ko: "📸 밝은 곳에서 · 흔들림 없이 · 전체가 보이게",
    en: "📸 Good lighting · Steady · Full document visible",
    vi: "📸 Đủ sáng · Không rung · Thấy toàn bộ",
  },
  ocrSafeNote: {
    ko: "🔒 사진은 기기에서만 처리되며 서버에 저장되지 않습니다",
    en: "🔒 Photos are processed on your device, never stored on our server",
    vi: "🔒 Ảnh chỉ xử lý trên thiết bị, không lưu trên máy chủ",
  },
  privacyPageTitle: {
    ko: "개인정보 처리방침",
    en: "Privacy Policy",
    vi: "Chính sách bảo mật",
  },
  privacyPageSub: {
    ko: "서류도우미는 당신의 개인정보를 저장하지 않습니다.",
    en: "Document Helper does not store your personal information.",
    vi: "Document Helper không lưu trữ thông tin cá nhân của bạn.",
  },
  privacyHero: {
    ko: "✅ 수집하는 개인정보: 없음",
    en: "✅ Personal data collected: None",
    vi: "✅ Dữ liệu cá nhân thu thập: Không có",
  },
  privacyHeroDesc: {
    ko: "입력하신 정보와 업로드한 사진은 우리 서버로 전송되지 않습니다.",
    en: "Your input and uploaded photos are never sent to our server.",
    vi: "Thông tin và ảnh tải lên không bao giờ được gửi đến máy chủ.",
  },
  privacyCollect: {
    ko: "수집하지 않습니다",
    en: "We don't collect",
    vi: "Chúng tôi không thu thập",
  },
  privacyCollectDesc: {
    ko: "이름, 여권번호, 외국인등록번호 등 어떤 개인정보도 서버에 수집·저장하지 않습니다.",
    en: "We do not collect or store any personal data (name, passport, alien number) on our server.",
    vi: "Chúng tôi không thu thập hoặc lưu trữ bất kỳ thông tin cá nhân nào trên máy chủ.",
  },
  privacyProcess: {
    ko: "기기에서만 처리됩니다",
    en: "Processed on your device only",
    vi: "Chỉ xử lý trên thiết bị của bạn",
  },
  privacyProcessDesc: {
    ko: "OCR 이미지 인식과 PDF 생성은 모두 당신의 브라우저(기기) 안에서만 이루어집니다.",
    en: "OCR and PDF generation happen entirely within your browser (device).",
    vi: "OCR và tạo PDF diễn ra hoàn toàn trong trình duyệt của bạn.",
  },
  privacyRetention: {
    ko: "창을 닫으면 사라집니다",
    en: "Deleted when you close the window",
    vi: "Xóa khi bạn đóng cửa sổ",
  },
  privacyRetentionDesc: {
    ko: "입력 정보는 브라우저 임시 저장소에만 있으며, 창을 닫으면 자동으로 삭제됩니다.",
    en: "Your data exists only in temporary browser storage and is deleted when you close the window.",
    vi: "Dữ liệu chỉ tồn tại tạm thời trong trình duyệt và bị xóa khi đóng cửa sổ.",
  },
  privacyThird: {
    ko: "제3자에게 제공하지 않습니다",
    en: "Never shared with third parties",
    vi: "Không chia sẻ với bên thứ ba",
  },
  privacyThirdDesc: {
    ko: "수집하는 정보가 없으므로, 제3자에게 제공하거나 판매할 정보 자체가 없습니다.",
    en: "Since we collect nothing, there is no data to share or sell to anyone.",
    vi: "Vì không thu thập gì, không có dữ liệu để chia sẻ hoặc bán.",
  },
  privacyDisclaimerTitle: {
    ko: "⚠️ 참고하세요",
    en: "⚠️ Please note",
    vi: "⚠️ Xin lưu ý",
  },
  privacyDisclaimerDesc: {
    ko: "서류도우미는 행정 절차를 돕는 안내 도구이며, 공식 기관이 아닙니다. 최종 제출 전 출입국·외국인청 등 공식 기관에서 다시 확인하세요.",
    en: "Document Helper is a guidance tool, not an official agency. Always reconfirm with official authorities before final submission.",
    vi: "Document Helper là công cụ hướng dẫn, không phải cơ quan chính thức. Hãy xác nhận lại với cơ quan chính thức trước khi nộp.",
  },
  privacyUpdated: {
    ko: "최종 업데이트: 2026년 5월",
    en: "Last updated: May 2026",
    vi: "Cập nhật lần cuối: Tháng 5/2026",
  },
  statsTag: { ko: "공공데이터로 보는", en: "Public Data Insights", vi: "Dữ liệu công khai" },
  statsTitle: { ko: "충북 외국인 5만 6천 명", en: "56,301 Foreigners in Chungbuk", vi: "56.301 người nước ngoài tại Chungbuk" },
  statsSub: { ko: "법무부·충청북도 공공데이터로 본 충북 외국인 현황", en: "Based on public data from Ministry of Justice & Chungbuk Province", vi: "Dựa trên dữ liệu công khai" },
  statsTotal: { ko: "총 외국인", en: "Total foreigners", vi: "Tổng số" },
  statsRatio: { ko: "충북 인구 대비", en: "Of Chungbuk pop.", vi: "Tỷ lệ" },
  statsCities: { ko: "시군 분포", en: "Cities/Counties", vi: "Thành phố/Huyện" },
  statsRegionTitle: { ko: "시군별 분포", en: "By City/County", vi: "Theo địa phương" },
  statsRegionDesc: { ko: "청주·음성·진천 3개 지역에 약 73% 집중", en: "~73% in Cheongju, Eumseong, Jincheon", vi: "73% tại 3 khu vực chính" },
  statsNormal: { ko: "일반", en: "Normal", vi: "Thường" },
  statsInterest: { ko: "인구감소관심지역", en: "Pop. Decline Watch", vi: "Khu giảm dân số" },
  statsReduction: { ko: "인구감소지역", en: "Pop. Decline Area", vi: "Khu giảm dân số" },
  statsNationTitle: { ko: "국적별 TOP 10", en: "Top 10 Nationalities", vi: "TOP 10 quốc tịch" },
  statsNationDesc: { ko: "베트남·중국·우즈베키스탄·캄보디아·네팔 등", en: "Vietnam, China, Uzbekistan, Cambodia, Nepal etc.", vi: "Việt Nam, Trung Quốc, Uzbekistan..." },
  statsNationInsight: { ko: "서류도우미는 이 TOP10 국가 언어를 우선 지원합니다", en: "Document Helper prioritizes these top languages", vi: "Document Helper hỗ trợ các ngôn ngữ này" },
  statsVisaTitle: { ko: "비자별 현황 (전국)", en: "By Visa Type (Nationwide)", vi: "Theo loại visa" },
  statsVisaDesc: { ko: "우리 서비스가 다루는 비자 중심", en: "Focusing on visas we cover", vi: "Tập trung vào visa chúng tôi hỗ trợ" },
  statsVisaOurs: { ko: "우리 서비스 지원", en: "We cover", vi: "Chúng tôi hỗ trợ" },
  statsVisaOther: { ko: "그 외", en: "Others", vi: "Khác" },
  statsSource: { ko: "데이터 출처 (공공데이터)", en: "Data Sources (Public)", vi: "Nguồn dữ liệu" },
  statsCTA: { ko: "내 서류 준비하러 가기 →", en: "Prepare My Documents →", vi: "Chuẩn bị giấy tờ →" },
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