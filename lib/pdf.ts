import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export interface PdfData {
  name: string;
  nameKr: string;
  nationality?: string;
  passport: string;
  alienNo: string;
  phone: string;
  addressKr?: string;
  addressHome?: string;
  email?: string;
  companyName?: string;
  expiry: string;
  company: string;
  address: string;
}

// 공식 양식 좌표 (595x841, y는 아래에서 위로)
const FIELDS = {
  extendCheckbox: { x: 28, y: 841 - 220 },

  // 영문 이름
  surname: { x: 215, y: 841 - 305 },
  givenName: { x: 358, y: 841 - 305 },

  // 한글 이름
  nameKr: { x: 130, y: 841 - 307 },

  // 생년월일 — 오른쪽으로 이동
  birthYear: { x: 220, y: 841 - 325 },
  birthMonth: { x: 282, y: 841 - 325 },
  birthDay: { x: 325, y: 841 - 325 },

  // 국적 - 잘 들어가니까 유지
  nationality: { x: 490, y: 841 - 338 },

  // 외국인등록번호 — 오른쪽으로 더 이동
  alienNo: { x: 215, y: 841 - 363 },

  // 여권번호
  passportNo: { x: 130, y: 841 - 378 },

  // 한국 내 주소 — 아래로 이동
  addressKr: { x: 145, y: 841 - 405 },

  // 전화번호
  phone: { x: 160, y: 841 - 425 },

  // 본국 주소
  addressHome: { x: 130, y: 841 - 444 },

  // 이메일
  email: { x: 360, y: 841 - 555 },

  // 회사명 — 원 근무처 칸으로 이동 (아래쪽)
  companyName: { x: 290, y: 841 - 520 },

  // 신청일
  applicationDate: { x: 130, y: 841 - 588 },
};

export async function fillOfficialForm(data: PdfData): Promise<Uint8Array> {
  const formRes = await fetch("/forms/integrated-application.pdf");
  const formBytes = await formRes.arrayBuffer();
  const pdfDoc = await PDFDocument.load(formBytes);

  pdfDoc.registerFontkit(fontkit);
  const fontRes = await fetch("/fonts/NotoSansKR-Regular.ttf");
  const fontBytes = await fontRes.arrayBuffer();
  const font = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.getPages()[0];

  const nameParts = data.name.trim().split(/\s+/);
  const surname = nameParts[0] || "";
  const givenName = nameParts.slice(1).join(" ") || "";

  const cleanAlienNo = data.alienNo.replace(/[^\d]/g, "");
  const birthYy = cleanAlienNo.substring(0, 2);
  const birthMm = cleanAlienNo.substring(2, 4);
  const birthDd = cleanAlienNo.substring(4, 6);
  const seventhDigit = parseInt(cleanAlienNo.charAt(6) || "0");
  const birthYear = seventhDigit >= 5 ? "20" + birthYy : "19" + birthYy;

  const today = new Date();
  const todayStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  const DEBUG = false; // 좌표 확인용 — 조정 끝나면 false로

const draw = (text: string | undefined, x: number, y: number, size = 9) => {
  if (!text) return;
  page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
  
  // DEBUG: 좌표 위치에 빨간 점 표시
  if (DEBUG) {
  page.drawRectangle({
    x: x - 2,
    y: y - 2,
    width: 30,
    height: 14,
    borderColor: rgb(1, 0, 0),
    borderWidth: 0.8,
  });
}
};

  // 체크박스
  draw("V", FIELDS.extendCheckbox.x, FIELDS.extendCheckbox.y, 11);

  // 이름
  draw(surname, FIELDS.surname.x, FIELDS.surname.y);
  draw(givenName, FIELDS.givenName.x, FIELDS.givenName.y);
  draw(data.nameKr, FIELDS.nameKr.x, FIELDS.nameKr.y);

  // 생년월일
  draw(birthYear, FIELDS.birthYear.x, FIELDS.birthYear.y);
  draw(birthMm, FIELDS.birthMonth.x, FIELDS.birthMonth.y);
  draw(birthDd, FIELDS.birthDay.x, FIELDS.birthDay.y);

  // 국적
  draw(data.nationality, FIELDS.nationality.x, FIELDS.nationality.y);

  // 번호들
  draw(data.alienNo, FIELDS.alienNo.x, FIELDS.alienNo.y);
  draw(data.passport, FIELDS.passportNo.x, FIELDS.passportNo.y);

  // 주소
  draw(data.addressKr, FIELDS.addressKr.x, FIELDS.addressKr.y);
  draw(data.addressHome, FIELDS.addressHome.x, FIELDS.addressHome.y);

  // 연락처
  draw(data.phone, FIELDS.phone.x, FIELDS.phone.y);
  draw(data.email, FIELDS.email.x, FIELDS.email.y);

  // 회사
  draw(data.companyName, FIELDS.companyName.x, FIELDS.companyName.y);

  // 신청일
  draw(todayStr, FIELDS.applicationDate.x, FIELDS.applicationDate.y);

  return await pdfDoc.save();
}

// === 정보 요약지 PDF ===
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
  const lh = 28;

  page.drawText("■ 본인 정보 (Personal Information)", {
    x: 50, y, size: 12, font: fontBold,
  });
  y -= lh;

  const fields = [
    { label: "영문 이름", value: data.name },
    { label: "한글 이름", value: data.nameKr || "-" },
    { label: "국적", value: data.nationality || "-" },
    { label: "여권 번호", value: data.passport },
    { label: "외국인등록번호", value: data.alienNo },
    { label: "한국 연락처", value: data.phone },
    { label: "이메일", value: data.email || "-" },
    { label: "한국 내 주소", value: data.addressKr || "-" },
    { label: "본국 주소", value: data.addressHome || "-" },
    { label: "회사", value: data.companyName || "-" },
    { label: "체류기간 만료일", value: data.expiry },
  ];

  for (const f of fields) {
    page.drawText(f.label, { x: 60, y, size: 9, font, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(f.value, { x: 60, y: y - 14, size: 11, font: fontBold });
    y -= lh + 2;
  }

  page.drawText("※ 본 양식은 정보 확인용 요약지입니다. 공식 양식은 별도 출력하세요.", {
    x: 50, y: 60, size: 8, font, color: rgb(0.5, 0.5, 0.5),
  });

  return await pdfDoc.save();
}