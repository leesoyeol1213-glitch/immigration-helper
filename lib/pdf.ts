import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export interface PdfData {
  name: string;
  nameKr: string;
  passport: string;
  alienNo: string;
  phone: string;
  expiry: string;
  company: string;
  address: string;
}

// 공식 양식의 빈 칸 좌표 (PDF 595x841 기준, y는 아래에서 위로)
// PDF는 좌표가 아래에서 위로 증가. 측정한 top 값을 841에서 빼야 함.
const FIELDS = {
  // 체류기간 연장 체크박스 (자동 체크)
  extendCheckbox: { x: 28, y: 841 - 220 },

  // 성명 - 영문
  surname: { x: 215, y: 841 - 305 },
  givenName: { x: 358, y: 841 - 305 },

  // 한글 이름
  nameKr: { x: 130, y: 841 - 307 },

  // 생년월일
  birthYear: { x: 205, y: 841 - 320 },
  birthMonth: { x: 265, y: 841 - 320 },
  birthDay: { x: 308, y: 841 - 320 },

  // 외국인등록번호
  alienNo: { x: 175, y: 841 - 358 },

  // 여권번호
  passportNo: { x: 130, y: 841 - 378 },

  // 대한민국 내 주소
  addressKr: { x: 130, y: 841 - 398 },

  // 전화번호 / 휴대전화
  phone: { x: 360, y: 841 - 421 },

  // 신청일
  applicationDate: { x: 130, y: 841 - 588 },
};

export async function fillOfficialForm(data: PdfData): Promise<Uint8Array> {
  // 1. 공식 양식 PDF 로드
  const formRes = await fetch("/forms/integrated-application.pdf");
  const formBytes = await formRes.arrayBuffer();
  const pdfDoc = await PDFDocument.load(formBytes);

  // 2. 한글 폰트 로드
  pdfDoc.registerFontkit(fontkit);
  const fontRes = await fetch("/fonts/NotoSansKR-Regular.ttf");
  const fontBytes = await fontRes.arrayBuffer();
  const font = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.getPages()[0];

  // 3. 영문 이름 분리 (HONG GIL DONG → HONG / GIL DONG)
  const nameParts = data.name.trim().split(/\s+/);
  const surname = nameParts[0] || "";
  const givenName = nameParts.slice(1).join(" ") || "";

  // 4. 외국인등록번호 + 생년월일 추출
  // 외국인등록번호 형식: 000000-0000000
  // 앞 6자리가 생년월일 (YYMMDD)
  const cleanAlienNo = data.alienNo.replace(/[^\d]/g, "");
  const birthYy = cleanAlienNo.substring(0, 2);
  const birthMm = cleanAlienNo.substring(2, 4);
  const birthDd = cleanAlienNo.substring(4, 6);
  // 연도 추정: 7번째 숫자가 1~4면 19xx, 5~8이면 20xx
  const seventhDigit = parseInt(cleanAlienNo.charAt(6) || "0");
  const birthYear = seventhDigit >= 5 ? "20" + birthYy : "19" + birthYy;

  // 5. 오늘 날짜 (신청일)
  const today = new Date();
  const todayStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  // 6. 텍스트 그리기 함수
  const draw = (text: string, x: number, y: number, size = 9) => {
    if (!text) return;
    page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
  };

  // 7. 각 필드 채우기
  // 체크박스 (체류기간 연장)
  draw("V", FIELDS.extendCheckbox.x, FIELDS.extendCheckbox.y, 11);

  // 영문 이름
  draw(surname, FIELDS.surname.x, FIELDS.surname.y);
  draw(givenName, FIELDS.givenName.x, FIELDS.givenName.y);

  // 생년월일
  draw(birthYear, FIELDS.birthYear.x, FIELDS.birthYear.y);
  draw(birthMm, FIELDS.birthMonth.x, FIELDS.birthMonth.y);
  draw(birthDd, FIELDS.birthDay.x, FIELDS.birthDay.y);

  // 외국인등록번호
  draw(data.alienNo, FIELDS.alienNo.x, FIELDS.alienNo.y);

  // 여권번호
  draw(data.passport, FIELDS.passportNo.x, FIELDS.passportNo.y);

  // 전화번호
  draw(data.phone, FIELDS.phone.x, FIELDS.phone.y);

  // 신청일
  draw(todayStr, FIELDS.applicationDate.x, FIELDS.applicationDate.y);

  return await pdfDoc.save();
}

// === 기존 정보 요약지 PDF (그대로 유지) ===
export async function generatePdf(data: PdfData): Promise<Uint8Array> {
  const fontRes = await fetch("/fonts/NotoSansKR-Regular.ttf");
  const fontBytes = await fontRes.arrayBuffer();

  const fontBoldRes = await fetch("/fonts/NotoSansKR-Bold.ttf");
  const fontBoldBytes = await fontBoldRes.arrayBuffer();

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const font = await pdfDoc.embedFont(fontBytes);
  const fontBold = await pdfDoc.embedFont(fontBoldBytes);

  const page = pdfDoc.addPage([595, 842]);
  const { width, height } = page.getSize();

  page.drawText("외국인 체류기간 연장 허가 신청서 (요약지)", {
    x: 50, y: height - 60, size: 16, font: fontBold,
  });

  page.drawText("Application Summary - For Reference Only", {
    x: 50, y: height - 80, size: 9, font, color: rgb(0.4, 0.4, 0.4),
  });

  page.drawLine({
    start: { x: 50, y: height - 95 },
    end: { x: width - 50, y: height - 95 },
    thickness: 1,
  });

  let y = height - 130;
  const lineHeight = 28;

  page.drawText("■ 본인 정보 (Personal Information)", {
    x: 50, y, size: 12, font: fontBold,
  });
  y -= lineHeight;

  const fields = [
    { label: "영문 이름 (Name in English)", value: data.name },
    { label: "한글 이름 (Name in Korean)", value: data.nameKr || "-" },
    { label: "여권 번호 (Passport No.)", value: data.passport },
    { label: "외국인등록번호 (Alien Reg. No.)", value: data.alienNo },
    { label: "한국 연락처 (Phone in Korea)", value: data.phone },
    { label: "체류기간 만료일 (Expiry Date)", value: data.expiry },
  ];

  for (const f of fields) {
    page.drawText(f.label, { x: 60, y, size: 9, font, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(f.value, { x: 60, y: y - 14, size: 11, font: fontBold });
    y -= lineHeight + 4;
  }

  y -= 10;
  page.drawText("■ 신청 상황 (Application Details)", {
    x: 50, y, size: 12, font: fontBold,
  });
  y -= lineHeight;

  const situation = [
    { label: "비자 종류", value: "E-9 (비전문 취업)" },
    { label: "회사 변경 여부", value: data.company === "changed" ? "변경됨" : "동일" },
    { label: "주소 변경 여부", value: data.address === "changed" ? "변경됨" : "동일" },
  ];

  for (const f of situation) {
    page.drawText(f.label, { x: 60, y, size: 9, font, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(f.value, { x: 60, y: y - 14, size: 11, font: fontBold });
    y -= lineHeight + 4;
  }

  page.drawText("※ 본 양식은 정보 확인용 요약지입니다. 공식 양식은 별도 출력하세요.", {
    x: 50, y: 80, size: 8, font, color: rgb(0.5, 0.5, 0.5),
  });

  return await pdfDoc.save();
}