import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";

export async function generateBetaGuide(): Promise<Uint8Array> {
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

  // QR 코드 생성 (사이트 주소를 QR로 변환)
  const qrDataUrl = await QRCode.toDataURL(
    "https://immigration-helper-two.vercel.app",
    { width: 400, margin: 1, color: { dark: "#1d4ed8", light: "#ffffff" } }
  );
  const qrPngBytes = await fetch(qrDataUrl).then((r) => r.arrayBuffer());
  const qrImage = await pdfDoc.embedPng(qrPngBytes);

  // 헤더
  page.drawRectangle({
    x: 0, y: height - 60, width, height: 60,
    color: rgb(0.15, 0.39, 0.92),
  });
  page.drawText("서류도우미", {
    x: 40, y: height - 38, size: 22, font: fontBold, color: rgb(1, 1, 1),
  });
  page.drawText("Beta Test", {
    x: 165, y: height - 38, size: 11, font, color: rgb(0.85, 0.92, 1),
  });

  // 제목
  let y = height - 100;
  page.drawText("외국인 근로자분께 부탁드립니다", {
    x: 40, y, size: 14, font: fontBold,
  });
  y -= 20;
  page.drawText("To our foreign workers / Gửi đến người lao động nước ngoài", {
    x: 40, y, size: 9, font, color: rgb(0.4, 0.4, 0.4),
  });

  // QR 코드 박스 (가장 중요!)
  y = height - 145;
  page.drawRectangle({
    x: 40, y: y - 180, width: width - 80, height: 180,
    color: rgb(0.95, 0.97, 1),
    borderColor: rgb(0.15, 0.39, 0.92), borderWidth: 1.5,
  });

  // QR 코드 이미지 삽입
  page.drawImage(qrImage, {
    x: 60, y: y - 165, width: 150, height: 150,
  });

  // QR 옆 설명
  page.drawText("📱 휴대폰으로 스캔하세요", {
    x: 230, y: y - 30, size: 12, font: fontBold,
  });
  page.drawText("Scan with your phone", {
    x: 230, y: y - 50, size: 9, font, color: rgb(0.3, 0.3, 0.3),
  });
  page.drawText("Quét bằng điện thoại", {
    x: 230, y: y - 65, size: 9, font, color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText("또는 주소를 직접 입력하세요:", {
    x: 230, y: y - 95, size: 9, font, color: rgb(0.4, 0.4, 0.4),
  });
  page.drawText("immigration-helper-two", {
    x: 230, y: y - 115, size: 11, font: fontBold, color: rgb(0.15, 0.39, 0.92),
  });
  page.drawText(".vercel.app", {
    x: 230, y: y - 132, size: 11, font: fontBold, color: rgb(0.15, 0.39, 0.92),
  });

  y -= 200;

  // 사용 방법 박스
  const drawBox = (yPos: number, ko: string, en: string, vi: string) => {
    page.drawRectangle({
      x: 40, y: yPos - 75, width: width - 80, height: 75,
      borderColor: rgb(0.9, 0.9, 0.9), borderWidth: 1,
      color: rgb(0.98, 0.98, 1),
    });
    page.drawText(ko, { x: 50, y: yPos - 18, size: 10, font: fontBold });
    page.drawText(`🇺🇸 ${en}`, { x: 50, y: yPos - 40, size: 8.5, font, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(`🇻🇳 ${vi}`, { x: 50, y: yPos - 60, size: 8.5, font, color: rgb(0.3, 0.3, 0.3) });
  };

  drawBox(y,
    "1. 본인 모국어를 선택해서 끝까지 진행해주세요",
    "Choose your language and go through to the end",
    "Chọn ngôn ngữ của bạn và tiếp tục đến cuối"
  );
  y -= 90;

  drawBox(y,
    "2. 다 끝나면 알려주세요. 이야기 듣고 싶어요",
    "Please let me know when done. I want your feedback",
    "Khi xong, hãy cho tôi biết ý kiến của bạn"
  );
  y -= 100;

  // 질문 박스
  page.drawRectangle({
    x: 40, y: y - 95, width: width - 80, height: 95,
    color: rgb(1, 0.97, 0.85),
    borderColor: rgb(0.95, 0.85, 0.4), borderWidth: 1,
  });
  page.drawText("궁금한 점 / Questions / Câu hỏi:", {
    x: 50, y: y - 18, size: 9.5, font: fontBold,
  });

  const questions = [
    "• 사용하기 쉬웠나요? / Easy to use? / Có dễ không?",
    "• 이해 안 되는 부분? / Anything unclear? / Có gì không hiểu?",
    "• 번역이 자연스러웠나요? / Natural translation? / Tự nhiên không?",
    "• PDF 결과 어땠나요? / How was the PDF? / PDF thế nào?",
  ];

  let qy = y - 36;
  for (const q of questions) {
    page.drawText(q, { x: 55, y: qy, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
    qy -= 13;
  }

  // 푸터
  page.drawText("개인정보는 저장되지 않습니다 / No personal info saved / Không lưu thông tin", {
    x: 40, y: 25, size: 7.5, font, color: rgb(0.5, 0.5, 0.5),
  });

  return await pdfDoc.save();
}