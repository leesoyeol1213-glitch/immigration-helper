import Tesseract from "tesseract.js";

export interface OcrResult {
  rawText: string;
  // 추출된 필드들
  name?: string;
  alienNo?: string;
  nationality?: string;
  passport?: string;
  birthDate?: string;
}

// 외국인등록증에서 정보 추출
export async function recognizeAlienCard(
  imageFile: File,
  onProgress?: (progress: number) => void
): Promise<OcrResult> {
  // 한글 + 영문 동시 인식
  const result = await Tesseract.recognize(imageFile, "kor+eng", {
    logger: (m) => {
      if (m.status === "recognizing text" && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    },
  });

  const rawText = result.data.text;
  const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);

  // 정보 추출 (패턴 매칭)
  const extracted: OcrResult = { rawText };

  for (const line of lines) {
    // 외국인등록번호: 000000-0000000 패턴
    const alienMatch = line.match(/(\d{6}-\d{7})/);
    if (alienMatch && !extracted.alienNo) {
      extracted.alienNo = alienMatch[1];
    }

    // 영문 이름: 모두 대문자 + 공백 포함 (KAEWRIT SOMCHIT)
    const nameMatch = line.match(/^([A-Z]{2,}(?:\s+[A-Z]{2,})+)$/);
    if (nameMatch && !extracted.name) {
      extracted.name = nameMatch[1].trim();
    }

    // 여권번호 - 영문 1~2자 + 숫자 7~8자 (M12345678, AA1234567)
    const passportMatch = line.match(/\b([A-Z]{1,2}\d{7,8})\b/);
    if (passportMatch && !extracted.passport) {
      extracted.passport = passportMatch[1];
    }

    // 국적 - 흔한 국가 키워드
    const countries = [
      { ko: "태국", en: "THAILAND", value: "태국 / Thailand" },
      { ko: "베트남", en: "VIETNAM", value: "베트남 / Vietnam" },
      { ko: "필리핀", en: "PHILIPPINES", value: "필리핀 / Philippines" },
      { ko: "인도네시아", en: "INDONESIA", value: "인도네시아 / Indonesia" },
      { ko: "캄보디아", en: "CAMBODIA", value: "캄보디아 / Cambodia" },
      { ko: "네팔", en: "NEPAL", value: "네팔 / Nepal" },
      { ko: "미얀마", en: "MYANMAR", value: "미얀마 / Myanmar" },
      { ko: "방글라데시", en: "BANGLADESH", value: "방글라데시 / Bangladesh" },
      { ko: "스리랑카", en: "SRI LANKA", value: "스리랑카 / Sri Lanka" },
      { ko: "우즈베키스탄", en: "UZBEKISTAN", value: "우즈베키스탄 / Uzbekistan" },
      { ko: "중국", en: "CHINA", value: "중국 / China" },
    ];
    for (const c of countries) {
      if ((line.includes(c.ko) || line.toUpperCase().includes(c.en)) && !extracted.nationality) {
        extracted.nationality = c.value;
      }
    }

    // 생년월일은 외국인등록번호 앞 6자리에서 자동 추출되므로 별도 매칭 불필요
  }

  // 외국인등록번호에서 생년월일 추출
  if (extracted.alienNo) {
    const clean = extracted.alienNo.replace(/[^\d]/g, "");
    const yy = clean.substring(0, 2);
    const mm = clean.substring(2, 4);
    const dd = clean.substring(4, 6);
    const seventh = parseInt(clean.charAt(6) || "0");
    const year = seventh >= 5 ? "20" + yy : "19" + yy;
    extracted.birthDate = `${year}.${mm}.${dd}`;
  }

  return extracted;
}