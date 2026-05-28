import { NextResponse } from "next/server";

// 6시간 캐시 (호출 한도 절약)
export const revalidate = 21600;

const API_URL = "https://api.odcloud.kr/api/3045188/v1/uddi:2183c61a-db54-4844-ae97-a69d1c2ad47b";

interface ApiRow {
  대륙?: string;
  국적?: string;
  성별?: string;
  [key: string]: string | number | undefined;
}

export async function GET() {
  try {
    const key = process.env.DATA_GO_KR_KEY;
    if (!key) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const url = `${API_URL}?page=1&perPage=500&returnType=JSON&serviceKey=${encodeURIComponent(key)}`;
    const res = await fetch(url, { next: { revalidate: 21600 } });

    if (!res.ok) {
      return NextResponse.json({ error: "API failed", status: res.status }, { status: 502 });
    }

    const json = await res.json();
    const rows: ApiRow[] = json.data || [];

    // 비자별 전국 합계 (성별 합치고, 모든 국적 합산)
    const visaKeys = [
      "E9(비전문취업)",
      "E7(특정활동)",
      "F2(거주)",
      "D2(유학)",
      "H2(방문취업)",
      "F6(결혼이민)",
    ];

    const visaTotals: Record<string, number> = {};
    for (const key of visaKeys) {
      visaTotals[key] = rows.reduce((sum, r) => sum + (Number(r[key]) || 0), 0);
    }

    // 국적별 합계 (성별 합치고 모든 비자 합산)
    const nationMap: Record<string, number> = {};
    for (const r of rows) {
      const nat = r.국적;
      if (!nat) continue;
      let total = 0;
      for (const [k, v] of Object.entries(r)) {
        if (k === "대륙" || k === "국적" || k === "성별") continue;
        total += Number(v) || 0;
      }
      nationMap[nat] = (nationMap[nat] || 0) + total;
    }
    const topNations = Object.entries(nationMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      sourceDate: "2024-12-31",
      visa: visaTotals,
      topNations,
      totalRows: rows.length,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}