import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

interface PdfData {
  name: string;
  nameKr: string;
  passport: string;
  alienNo: string;
  phone: string;
  expiry: string;
  company: string;
  address: string;
}

export async function generatePdf(data: PdfData): Promise<Uint8Array> {
  // 폰트 로드
  const fontRes = await fetch("/fonts/NotoSansKR-Regular.ttf");
  const fontBytes = await fontRes.arrayBuffer();

  const fontBoldRes = await fetch("/fonts/NotoSansKR-Bold.ttf");
  const fontBoldBytes = await fontBoldRes.arrayBuffer();

  // PDF 생성
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const font = await pdfDoc.embedFont(fontBytes);
  const fontBold = await pdfDoc.embedFont(fontBoldBytes);

  const page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  // 제목
  page.drawText("외국인 체류기간 연장 허가 신청서", {
    x: 50,
    y: height - 60,
    size: 16,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  page.drawText("Application for Extension of Period of Sojourn", {
    x: 50,
    y: height - 80,
    size: 9,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  });

  // 구분선
  page.drawLine({
    start: { x: 50, y: height - 95 },
    end: { x: width - 50, y: height - 95 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // 본인 정보 섹션
  let y = height - 130;
  const lineHeight = 28;

  page.drawText("■ 본인 정보 (Personal Information)", {
    x: 50,
    y,
    size: 12,
    font: fontBold,
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
    page.drawText(f.label, {
      x: 60,
      y,
      size: 9,
      font: font,
      color: rgb(0.3, 0.3, 0.3),
    });
    page.drawText(f.value, {
      x: 60,
      y: y - 14,
      size: 11,
      font: fontBold,
    });
    y -= lineHeight + 4;
  }

  // 상황 정보
  y -= 10;
  page.drawText("■ 신청 상황 (Application Details)", {
    x: 50,
    y,
    size: 12,
    font: fontBold,
  });
  y -= lineHeight;

  const situation = [
    { label: "비자 종류 (Visa Type)", value: "E-9 (비전문 취업)" },
    {
      label: "회사 변경 여부 (Company Change)",
      value: data.company === "changed" ? "변경됨 (Changed)" : "동일 (Same)",
    },
    {
      label: "주소 변경 여부 (Address Change)",
      value: data.address === "changed" ? "변경됨 (Changed)" : "동일 (Same)",
    },
  ];

  for (const f of situation) {
    page.drawText(f.label, {
      x: 60,
      y,
      size: 9,
      font: font,
      color: rgb(0.3, 0.3, 0.3),
    });
    page.drawText(f.value, {
      x: 60,
      y: y - 14,
      size: 11,
      font: fontBold,
    });
    y -= lineHeight + 4;
  }

  // 면책 조항
  page.drawText(
    "※ 본 양식은 서류도우미 서비스로 생성된 보조 자료입니다.",
    { x: 50, y: 80, size: 8, font, color: rgb(0.5, 0.5, 0.5) }
  );
  page.drawText(
    "최종 제출 전 반드시 출입국 사무소의 안내를 확인하시기 바랍니다.",
    { x: 50, y: 68, size: 8, font, color: rgb(0.5, 0.5, 0.5) }
  );

  return await pdfDoc.save();
}