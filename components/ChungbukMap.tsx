"use client";

import { useState } from "react";
import { CHUNGBUK_GEO } from "@/lib/chungbuk-geo";
import { REGION_DATA } from "@/lib/stats";

// 외국인 수 매핑
const countByName: Record<string, number> = {};
REGION_DATA.forEach((r) => { countByName[r.name] = r.count; });
const maxCount = Math.max(...REGION_DATA.map((r) => r.count));

// 좌표 → SVG 변환 (경위도 범위를 800x600에 맞춤)
const W = 600, H = 480, PAD = 20;
let minX = 180, maxX = -180, minY = 90, maxY = -90;
CHUNGBUK_GEO.features.forEach((f) => {
  const geom = f.geometry as { type: string; coordinates: any };
  const coords = geom.type === "Polygon" ? geom.coordinates : geom.coordinates.flat();
  coords.forEach((ring: number[][]) => ring.forEach(([x, y]) => {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }));
});
const scaleX = (W - PAD * 2) / (maxX - minX);
const scaleY = (H - PAD * 2) / (maxY - minY);
const scale = Math.min(scaleX, scaleY);
const project = (x: number, y: number): [number, number] => [
  PAD + (x - minX) * scale,
  H - PAD - (y - minY) * scale, // y 뒤집기 (위도는 위로)
];

function ringToPath(ring: number[][]): string {
  return ring.map(([x, y], i) => {
    const [px, py] = project(x, y);
    return `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
  }).join(" ") + " Z";
}

function featurePath(f: typeof CHUNGBUK_GEO.features[number]): string {
  const geom = f.geometry as { type: string; coordinates: any };
  if (geom.type === "Polygon") {
    return (geom.coordinates as number[][][]).map(ringToPath).join(" ");
  } else {
    return (geom.coordinates as number[][][][]).map((poly) => poly.map(ringToPath).join(" ")).join(" ");
  }
}

// 색 농도 (외국인 수 비례)
function fillColor(name: string): string {
  const count = countByName[name] || 0;
  const t = count / maxCount; // 0~1
  // 연한 파랑 → 진한 파랑
  if (t > 0.7) return "#1d4ed8";
  if (t > 0.4) return "#3b82f6";
  if (t > 0.15) return "#60a5fa";
  if (t > 0.05) return "#93c5fd";
  return "#dbeafe";
}

// 진한 색이면 흰 글씨, 연한 색이면 진한 글씨
function textColor(name: string): string {
  const count = countByName[name] || 0;
  const t = count / maxCount;
  return t > 0.15 ? "#ffffff" : "#1e3a5f";
}

export default function ChungbukMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredCount = hovered ? (countByName[hovered] || 0) : 0;
  const hoveredRank = hovered
    ? [...REGION_DATA].sort((a, b) => b.count - a.count).findIndex((r) => r.name === hovered) + 1
    : 0;

  return (
    <div className="relative">
      {/* 툴팁 카드 */}
      {hovered && (() => {
        const region = REGION_DATA.find((r) => r.name === hovered);
        const zone = region?.isReduction
          ? { label: "🏔️ 인구감소지역", sub: "E-7-4R / F-2-R 가능", color: "text-amber-600" }
          : region?.isInterest
          ? { label: "🏔️ 인구감소관심지역", sub: "E-7-4R 가능", color: "text-orange-500" }
          : { label: "일반 지역", sub: "", color: "text-gray-400" };
        return (
          <div className="absolute top-3 right-3 z-10 bg-white border-2 border-blue-200 rounded-2xl shadow-lg px-4 py-3 pointer-events-none min-w-[150px]">
            <p className="text-[16px] font-extrabold text-gray-900">{hovered}</p>
            <p className="text-[22px] font-extrabold text-blue-700 mt-0.5">{hoveredCount.toLocaleString()}<span className="text-[13px] text-gray-500 font-medium ml-1">명</span></p>
            <p className="text-[12px] text-gray-400 font-medium">충북 {hoveredRank}위</p>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className={`text-[12px] font-bold ${zone.color}`}>{zone.label}</p>
              {zone.sub && <p className="text-[11px] text-gray-400 mt-0.5">{zone.sub}</p>}
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-[11px] text-gray-500 leading-snug">
                💼 충북 외국인 근로자<br /><span className="font-bold text-gray-700">87% 제조업</span> 종사
              </p>
              <p className="text-[9px] text-gray-300 mt-0.5">* 충북 전체 기준</p>
            </div>
          </div>
        );
      })()}
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {CHUNGBUK_GEO.features.map((f) => {
        const name = f.properties.name;
        const count = countByName[name] || 0;
        // 라벨 위치 (대략 중심)
         const g = f.geometry as { type: string; coordinates: any };
        const coords: number[][] = g.type === "Polygon"
          ? g.coordinates[0]
          : g.coordinates[0][0];
        const cx = coords.reduce((s, c) => s + c[0], 0) / coords.length;
        const cy = coords.reduce((s, c) => s + c[1], 0) / coords.length;
        const [lx, ly] = project(cx, cy);
        return (
          <g
            key={name}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            <path
              d={featurePath(f)}
              fill={fillColor(name)}
              stroke={hovered === name ? "#1e3a5f" : "#fff"}
              strokeWidth={hovered === name ? 3 : 1.5}
              style={{ transition: "stroke-width 0.15s" }}
            />
            <text x={lx} y={ly - 4} textAnchor="middle" style={{ fontSize: 13, fontWeight: 800, fill: textColor(name), pointerEvents: "none" }}>
              {name.replace("시", "").replace("군", "")}
            </text>
            <text x={lx} y={ly + 11} textAnchor="middle" style={{ fontSize: 11, fontWeight: 600, fill: textColor(name), opacity: 0.85, pointerEvents: "none" }}>
              {count.toLocaleString()}
            </text>
          </g>
        );
      })}
    </svg>
   </div>
  );
}