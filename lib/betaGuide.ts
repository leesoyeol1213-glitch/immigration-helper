import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

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

  // 큰 제목
  let y = height - 100;
  page.drawText("외국인 근로자분께 부탁드립니다", {
    x: 40, y, size: 14, font: fontBold,
  });
  y -= 20;
  page.drawText("To our foreign workers / Gửi đến người lao động nước ngoài", {
    x: 40, y, size: 9, font, color: rgb(0.4, 0.4, 0.4),
  });

  // 본문 박스 함수
  const drawBox = (yPos: number, ko: string, en: string, vi: string) => {
    page.drawRectangle({
      x: 40, y: yPos - 95, width: width - 80, height: 95,
      borderColor: rgb(0.9, 0.9, 0.9), borderWidth: 1,
      color: rgb(0.98, 0.98, 1),
    });
    page.drawText(ko, { x: 50, y: yPos - 18, size: 11, font: fontBold });
    page.drawText(`🇺🇸 ${en}`, { x: 50, y: yPos - 45, size: 9, font, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(`🇻🇳 ${vi}`, { x: 50, y: yPos - 78, size: 9, font, color: rgb(0.3, 0.3, 0.3) });
  };

  y = height - 145;

  // 1번
  drawBox(y,
    "1. 아래 사이트에 휴대폰으로 접속해주세요",
    "Please visit the website below on your phone",
    "Vui lòng truy cập trang web dưới đây bằng điện thoại"
  );
  y -= 110;

  // 사이트 주소 박스 (큰 글씨)
  page.drawRectangle({
    x: 40, y: y - 40, width: width - 80, height: 40,
    color: rgb(0.15, 0.39, 0.92),
  });
  page.drawText("immigration-helper-two.vercel.app", {
    x: 90, y: y - 27, size: 15, font: fontBold, color: rgb(1, 1, 1),
  });
  y -= 60;

  // 2번
  drawBox(y,
    "2. 본인 모국어를 선택해서 끝까지 진행해주세요",
    "Choose your language and go through to the end",
    "Chọn ngôn ngữ của bạn và tiếp tục đến cuối"
  );
  y -= 110;

  // 3번
  drawBox(y,
    "3. 다 끝나면 알려주세요. 이야기 듣고 싶어요",
    "Please let me know when done. I want to hear your thoughts",
    "Khi xong, hãy cho tôi biết. Tôi muốn nghe ý kiến của bạn"
  );
  y -= 130;

  // 궁금한 점 박스
  page.drawRectangle({
    x: 40, y: y - 130, width: width - 80, height: 130,
    color: rgb(1, 0.97, 0.85),
    borderColor: rgb(0.95, 0.85, 0.4), borderWidth: 1,
  });
  page.drawText("궁금한 점 / Questions / Câu hỏi:", {
    x: 50, y: y - 20, size: 10, font: fontBold,
  });

  const questions = [
    "• 사용하기 쉬웠나요? / Was it easy? / Có dễ không?",
    "• 이해 안 되는 부분이 있었나요? / Anything unclear? / Có gì không hiểu?",
    "• 번역이 자연스러웠나요? / Was the translation natural? / Bản dịch có tự nhiên không?",
    "• PDF 결과가 좋았나요? / Was the PDF good? / PDF có tốt không?",
    "• 더 필요한 기능이 있나요? / Any missing features? / Còn thiếu chức năng nào?",
  ];

  let qy = y - 40;
  for (const q of questions) {
    page.drawText(q, { x: 55, y: qy, size: 8.5, font, color: rgb(0.2, 0.2, 0.2) });
    qy -= 16;
  }

  // 푸터
  page.drawText("개인정보는 저장되지 않습니다 / No personal info is saved / Không lưu thông tin cá nhân", {
    x: 40, y: 40, size: 8, font, color: rgb(0.5, 0.5, 0.5),
  });

  return await pdfDoc.save();
}