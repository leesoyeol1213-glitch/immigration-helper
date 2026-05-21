import Tesseract from "tesseract.js";

// 이미지 전처리: 확대 + 흑백 + 대비 강화 → OCR 정확도 향상
async function preprocessImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // 너무 작으면 2배 확대 (최대 2000px 제한)
      const scale = img.width < 1000 ? 2 : 1;
      const w = Math.min(img.width * scale, 2000);
      const h = Math.round(img.height * (w / img.width));

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);

      // 흑백 + 대비 강화
      const imageData = ctx.getImageData(0, 0, w, h);
      const d = imageData.data;
      const contrast = 1.4; // 대비 강도 (1.0 = 변화 없음)
      const intercept = 128 * (1 - contrast);

      for (let i = 0; i < d.length; i += 4) {
        // 흑백 변환 (가중 평균)
        const gray = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
        // 대비 강화
        const v = Math.max(0, Math.min(255, gray * contrast + intercept));
        d[i] = d[i + 1] = d[i + 2] = v;
      }
      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(file);
          return;
        }
        resolve(new File([blob], file.name, { type: "image/png" }));
      }, "image/png");
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file); // 실패 시 원본 그대로
    };

    img.src = url;
  });
}

export interface OcrResult {
  rawText: string;
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
    // 이미지 전처리 후 인식
  const processed = await preprocessImage(imageFile);
  // 한글 + 영문 동시 인식
  const result = await Tesseract.recognize(processed, "kor+eng", {
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
// === 여권 OCR (MRZ 기반) ===
export interface PassportResult {
  rawText: string;
  surname?: string;
  givenName?: string;
  passport?: string;
  nationality?: string;
  birthDate?: string;
  expiryDate?: string;
  issueDate?: string;
}

// 국적코드(ISO 3자리) → 한글/영문
const NATION_MAP: Record<string, string> = {
  KHM: "캄보디아 / Cambodia",
  THA: "태국 / Thailand",
  NPL: "네팔 / Nepal",
  MMR: "미얀마 / Myanmar",
  LKA: "스리랑카 / Sri Lanka",
  VNM: "베트남 / Vietnam",
  PHL: "필리핀 / Philippines",
  IDN: "인도네시아 / Indonesia",
  CHN: "중국 / China",
  BGD: "방글라데시 / Bangladesh",
  UZB: "우즈베키스탄 / Uzbekistan",
};

// YYMMDD → yyyy.mm.dd (만료일은 미래라 2000년대로 가정)
function parseMrzDate(yymmdd: string, isExpiry = false): string {
  if (yymmdd.length !== 6) return "";
  const yy = yymmdd.substring(0, 2);
  const mm = yymmdd.substring(2, 4);
  const dd = yymmdd.substring(4, 6);
  let century: string;
  if (isExpiry) {
    century = "20"; // 만료일은 미래
  } else {
    // 생년월일: 현재 연도 두자리보다 크면 1900년대
    const nowYY = new Date().getFullYear() % 100;
    century = parseInt(yy) > nowYY ? "19" : "20";
  }
  return `${century}${yy}.${mm}.${dd}`;
}

// visual zone 텍스트에서 발급일 추출
// 모든 날짜를 찾아서 생년월일/만료일과 다른 것 = 발급일 후보
function extractIssueDate(
  rawText: string,
  birthDate?: string,
  expiryDate?: string
): string {
  const months: Record<string, string> = {
    JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
    JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12",
  };

  const found: string[] = [];

  // 형식 A: "19 Dec 2022" / "14 MAR 2022"
  const reA = /\b(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})\b/g;
  let m;
  while ((m = reA.exec(rawText)) !== null) {
    const dd = m[1].padStart(2, "0");
    const mon = months[m[2].toUpperCase()];
    const yyyy = m[3];
    if (mon) found.push(`${yyyy}.${mon}.${dd}`);
  }

  // 형식 B: "20/04/2020"
  const reB = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
  while ((m = reB.exec(rawText)) !== null) {
    const dd = m[1].padStart(2, "0");
    const mm = m[2].padStart(2, "0");
    const yyyy = m[3];
    found.push(`${yyyy}.${mm}.${dd}`);
  }

  // 생년월일/만료일과 겹치지 않는 날짜 = 발급일 후보
  const candidates = found.filter(
    (d) => d !== birthDate && d !== expiryDate
  );

  // 발급일은 만료일보다 과거여야 함
  if (expiryDate) {
    const valid = candidates.filter((d) => d < expiryDate);
    if (valid.length > 0) return valid[valid.length - 1];
  }

  return candidates[0] || "";
}

export async function recognizePassport(
  imageFile: File,
  onProgress?: (progress: number) => void
): Promise<PassportResult> {
  const processed = await preprocessImage(imageFile);
  const result = await Tesseract.recognize(processed, "eng", {
    logger: (m) => {
      if (m.status === "recognizing text" && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    },
  });

  const rawText = result.data.text;
  const extracted: PassportResult = { rawText };

  // MRZ 줄 찾기: < 기호가 많은 줄들
  const lines = rawText
    .split("\n")
    .map((l) => l.replace(/\s/g, "").toUpperCase())
    .filter((l) => l.length > 20 && (l.match(/</g) || []).length >= 2);

  // 줄2 찾기: 여권번호+국적+생년월일 패턴 (영숫자, < 포함, 첫부분 영숫자)
  let line1 = "";
  let line2 = "";

  for (const l of lines) {
    // 줄1: P로 시작 (P< 또는 P+종류)
    if (!line1 && /^P[A-Z<]/.test(l)) {
      line1 = l;
    }
    // 줄2: 9자리 영숫자 + 국적코드 패턴
    else if (!line2 && /[A-Z0-9<]{9}[0-9<][A-Z]{3}[0-9]{6}/.test(l)) {
      line2 = l;
    }
  }

  // 줄1 파싱: 성/이름 (P[종류][국적3] 다음부터 << 기준)
  if (line1) {
    // P 다음 종류(1) + 국적(3) 건너뛰기 → 보통 위치 5부터 이름
    // 단 P< 형태도 있어서 유연하게: 첫 3~5자 건너뛰고 << 기준 분리
    const body = line1.replace(/^P[A-Z<]?[A-Z]{3}/, "");
    const parts = body.split("<<");
    if (parts.length >= 2) {
      extracted.surname = parts[0].replace(/</g, " ").trim();
      extracted.givenName = parts[1].replace(/</g, " ").trim();
    }
  }

  // 줄2 파싱: 위치 기반
  if (line2) {
    extracted.passport = line2.substring(0, 9).replace(/</g, "").trim();
    const natCode = line2.substring(10, 13);
    extracted.nationality = NATION_MAP[natCode] || natCode;
    extracted.birthDate = parseMrzDate(line2.substring(13, 19), false);
    extracted.expiryDate = parseMrzDate(line2.substring(21, 27), true);
  }

  // 발급일자 추출 (visual zone에서) — 완벽하지 않으니 수동 검증 전제
    extracted.issueDate = extractIssueDate(rawText, extracted.birthDate, extracted.expiryDate);

  return extracted;
}