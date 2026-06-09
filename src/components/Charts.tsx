"use client";

type MiniLineChartProps = {
  points: number[];
  tone?: "red" | "blue" | "purple" | "green";
};

const toneMap = {
  red: "#ff3655",
  blue: "#3478ff",
  purple: "#a855f7",
  green: "#16a34a"
};

export function MiniLineChart({ points, tone = "red" }: MiniLineChartProps) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const path = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 42 - ((value - min) / Math.max(max - min, 1)) * 34;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg className="mini-chart" viewBox="0 0 100 48" aria-hidden="true">
      <defs>
        <linearGradient id={`fill-${tone}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={toneMap[tone]} stopOpacity="0.22" />
          <stop offset="100%" stopColor={toneMap[tone]} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L 100 48 L 0 48 Z`} fill={`url(#fill-${tone})`} />
      <path d={path} fill="none" stroke={toneMap[tone]} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function CandlestickChart({ dark = false }: { dark?: boolean }) {
  const candles = [
    [16, 28, 12, 24],
    [21, 34, 16, 30],
    [29, 38, 24, 27],
    [25, 40, 20, 35],
    [34, 52, 31, 49],
    [47, 62, 40, 44],
    [43, 57, 38, 52],
    [50, 64, 47, 61],
    [60, 78, 55, 74],
    [72, 90, 68, 82],
    [81, 88, 70, 76],
    [75, 84, 66, 72],
    [71, 86, 68, 79],
    [78, 91, 72, 83],
    [82, 96, 76, 87],
    [86, 102, 80, 92],
    [91, 108, 83, 86],
    [85, 97, 76, 81],
    [80, 92, 72, 84],
    [83, 94, 77, 88]
  ];
  const width = 720;
  const height = 360;
  const y = (value: number) => 300 - value * 2.25;
  const xStep = width / (candles.length + 1);

  return (
    <svg className={dark ? "candle-chart dark-chart" : "candle-chart"} viewBox={`0 0 ${width} ${height}`} aria-label="주석이 있는 캔들 차트">
      <defs>
        <linearGradient id="chart-risk" x1="0" x2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.24" />
        </linearGradient>
        <linearGradient id="chart-watch" x1="0" x2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((line) => (
        <line key={line} x1="34" x2="668" y1={58 + line * 52} y2={58 + line * 52} className="grid-line" />
      ))}
      {dark && (
        <>
          <rect x="50" y="56" width="610" height="54" rx="10" fill="url(#chart-risk)" />
          <rect x="358" y="114" width="270" height="54" rx="10" fill="url(#chart-watch)" />
          <rect x="336" y="206" width="244" height="52" rx="8" fill="#ef444422" stroke="#ef4444" strokeDasharray="6 5" />
          <rect x="434" y="258" width="172" height="42" rx="7" fill="#16a34a1f" stroke="#16a34a" strokeDasharray="6 5" />
        </>
      )}
      <path d="M42 236 C 150 230, 210 214, 286 198 S 420 162, 510 134 S 590 154, 664 124" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <path d="M42 242 C 154 238, 236 224, 326 214 S 468 188, 664 178" fill="none" stroke="#3478ff" strokeWidth="2" />
      <path d="M42 258 C 180 254, 286 244, 382 232 S 520 214, 664 202" fill="none" stroke="#22c55e" strokeWidth="2" />
      {candles.map(([open, high, low, close], index) => {
        const x = 42 + (index + 0.5) * xStep;
        const up = close >= open;
        const color = up ? "#ef4444" : "#2f7af5";
        const rectY = Math.min(y(open), y(close));
        const rectH = Math.max(Math.abs(y(open) - y(close)), 9);
        return (
          <g key={index}>
            <line x1={x} x2={x} y1={y(high)} y2={y(low)} stroke={color} strokeWidth="3" />
            <rect x={x - 7} y={rectY} width="14" height={rectH} rx="2" fill={color} />
            <rect x={x - 6} y={300 - (index % 5) * 16 - 34} width="12" height={(index % 5) * 16 + 28} fill={color} opacity="0.78" />
          </g>
        );
      })}
      {!dark && (
        <>
          {[
            ["A", 214, 198, "05/13", "거래량 급증 시작"],
            ["B", 394, 146, "05/21", "외국인 순매수 전환"],
            ["C", 512, 84, "05/30", "2차전지 테마 강세"],
            ["D", 620, 160, "06/04", "기관 순매수 유입"]
          ].map(([label, x, yPos]) => (
            <g key={label}>
              <circle cx={Number(x)} cy={Number(yPos)} r="17" fill="#3b3f46" />
              <text x={Number(x)} y={Number(yPos) + 6} textAnchor="middle" fill="white" fontSize="17" fontWeight="700">
                {label}
              </text>
            </g>
          ))}
        </>
      )}
      {dark && (
        <>
          <text x="56" y="86" className="chart-label red">저항선 85,500</text>
          <text x="56" y="142" className="chart-label red">저항선 81,000</text>
          <text x="540" y="156" className="chart-label amber">관찰 구간</text>
          <text x="500" y="238" className="chart-label red">위험 구간</text>
          <text x="556" y="284" className="chart-label green">거래량 증가 구간</text>
          <circle cx="235" cy="176" r="46" fill="none" stroke="#22c55e" strokeWidth="3" />
        </>
      )}
    </svg>
  );
}
