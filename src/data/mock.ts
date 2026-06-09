export type Stock = {
  id: string;
  name: string;
  code: string;
  market: "KOSPI" | "KOSDAQ";
  price: string;
  change: string;
  changeTone: "up" | "down";
  score: number;
  risk: "낮음" | "중간" | "증가";
  reasons: string[];
  community: {
    label: string;
    mentions: string;
    positive: string;
    tone: "hot" | "good" | "quiet" | "up" | "down";
    delta?: string;
  };
  spark: number[];
};

export type Replay = {
  id: string;
  rank: number;
  name: string;
  code: string;
  date: string;
  duration: "10초" | "30초";
  change: string;
  reason: string;
  evidence: string[];
  risk: string;
  likes: number;
  color: "pink" | "blue" | "amber";
};

export const candidates: Stock[] = [
  {
    id: "abtech",
    name: "에이아이테크",
    code: "123456",
    market: "KOSDAQ",
    price: "18,750",
    change: "+12.45%",
    changeTone: "up",
    score: 92,
    risk: "증가",
    reasons: ["거래량 급증", "외국인 순매수", "신규 공시"],
    community: {
      label: "커뮤니티 반응 뜨거워요",
      mentions: "1,234",
      positive: "78%",
      tone: "hot",
      delta: "+285"
    },
    spark: [12, 16, 15, 19, 18, 24, 22, 29, 27, 34]
  },
  {
    id: "bionex",
    name: "바이오넥스",
    code: "234567",
    market: "KOSDAQ",
    price: "34,200",
    change: "+8.76%",
    changeTone: "up",
    score: 88,
    risk: "낮음",
    reasons: ["거래량 급증", "신규 공시"],
    community: {
      label: "관심 높아요",
      mentions: "892",
      positive: "71%",
      tone: "good"
    },
    spark: [11, 14, 10, 18, 17, 20, 22, 21, 27, 25]
  },
  {
    id: "alphaenergy",
    name: "알파에너지",
    code: "345678",
    market: "KOSPI",
    price: "27,900",
    change: "+7.32%",
    changeTone: "up",
    score: 85,
    risk: "증가",
    reasons: ["외국인 순매수", "거래량 증가", "테마 강세"],
    community: {
      label: "긍정적 반응 많아요",
      mentions: "675",
      positive: "74%",
      tone: "good"
    },
    spark: [9, 16, 14, 18, 13, 20, 19, 25, 23, 28]
  },
  {
    id: "smartsolution",
    name: "스마트솔루션",
    code: "456789",
    market: "KOSDAQ",
    price: "15,480",
    change: "+6.18%",
    changeTone: "up",
    score: 82,
    risk: "낮음",
    reasons: ["거래량 급증", "신규 공시"],
    community: {
      label: "조용하지만 주목 중",
      mentions: "412",
      positive: "65%",
      tone: "quiet"
    },
    spark: [8, 11, 12, 15, 14, 16, 18, 17, 20, 24]
  },
  {
    id: "futuremobility",
    name: "미래모빌리티",
    code: "567890",
    market: "KOSPI",
    price: "22,350",
    change: "+5.27%",
    changeTone: "up",
    score: 78,
    risk: "증가",
    reasons: ["테마 강세", "외국인 순매수"],
    community: {
      label: "언급 증가 중",
      mentions: "389",
      positive: "62%",
      tone: "up"
    },
    spark: [7, 12, 15, 13, 17, 16, 19, 18, 21, 25]
  }
];

export const watchlist = [
  {
    stock: "에코프로비엠",
    code: "247540",
    market: "KOSDAQ",
    price: "234,500",
    change: "+7,500 (+3.31%)",
    reason: "하이니켈 양극재 출하 증가 전망 및 고객사 재고 소진",
    news: "북미 고객사향 양극재 공급 계약 체결",
    signal: "인기 급상승",
    delta: "+285",
    on: true,
    spark: [9, 8, 10, 11, 9, 12, 13, 18]
  },
  {
    stock: "LG에너지솔루션",
    code: "373220",
    market: "KOSPI",
    price: "399,000",
    change: "-6,000 (-1.48%)",
    reason: "ESS 시장 성장 수혜 기대감 및 수주 모멘텀 지속",
    news: "미국 현지 ESS 공장 건설 검토",
    signal: "관심 감소",
    delta: "-42",
    on: false,
    spark: [20, 18, 15, 14, 13, 12, 10, 9]
  },
  {
    stock: "POSCO홀딩스",
    code: "005490",
    market: "KOSPI",
    price: "301,000",
    change: "+2,000 (+0.67%)",
    reason: "리튬 확보 전략 가속화 및 2차전지 소재 사업 강화",
    news: "아르헨티나 리튬 염호 개발 본격화",
    signal: "관심 증가",
    delta: "+63",
    on: true,
    spark: [8, 9, 12, 11, 13, 15, 14, 18]
  },
  {
    stock: "삼성전자",
    code: "005930",
    market: "KOSPI",
    price: "78,300",
    change: "-300 (-0.38%)",
    reason: "HBM4 양산 준비와 반도체 업황 회복 기대",
    news: "HBM4 목표가 상향 전망",
    signal: "NEW",
    delta: "+18",
    on: false,
    spark: [13, 12, 12, 14, 13, 15, 16, 15]
  }
];

export const replays: Replay[] = [
  {
    id: "eco",
    rank: 1,
    name: "에코프로",
    code: "086520",
    date: "2024.05.03 (금)",
    duration: "10초",
    change: "+14.62%",
    reason: "2차 전지 테마 강세 + 기관/외국인 동시 순매수 유입",
    evidence: ["유럽 전기차 판매량 성장 발표 (YoY +24%)", "수주 공시로 밸류체인 기대감 확대"],
    risk: "오전 10시 이후 단기 과열로 급락 전환",
    likes: 342,
    color: "pink"
  },
  {
    id: "ls",
    rank: 2,
    name: "LS ELECTRIC",
    code: "010120",
    date: "2024.05.02 (목)",
    duration: "30초",
    change: "+9.81%",
    reason: "전력기기 수주 기대감 + 실적 서프라이즈",
    evidence: ["1분기 영업이익 컨센서스 상회 발표", "변압기 수출 호조 뉴스로 수급 집중"],
    risk: "단기 급등에 따른 차익실현 매물 출회",
    likes: 287,
    color: "blue"
  },
  {
    id: "jio",
    rank: 3,
    name: "제이오",
    code: "418550",
    date: "2024.05.01 (수)",
    duration: "10초",
    change: "+16.37%",
    reason: "신소재 공급 기대감과 커뮤니티 언급량 급증",
    evidence: ["고객사 증설 루머 확산", "거래량 전일 대비 310% 증가"],
    risk: "확인되지 않은 루머 기반 변동성 확대",
    likes: 198,
    color: "amber"
  }
];

export const communityPosts = [
  {
    source: "네이버 종목톡",
    author: "방금",
    title: "이번 분기 실적 진짜 깜짝 놀랐네요",
    body: "매출이 컨센서스를 크게 상회하고 가이던스도 상향. AI 서버 수요가 계속 이어질 듯 합니다.",
    positive: 72,
    neutral: 18,
    negative: 10,
    mentions: "132%"
  },
  {
    source: "클리앙",
    author: "15분 전",
    title: "너무 올랐나? 이제 좀 부담되네",
    body: "단기 주가가 너무 빠르게 오른 것 같아요. PER도 높은 구간이라 조정 가능성도 있어 보입니다.",
    positive: 28,
    neutral: 22,
    negative: 50,
    mentions: "48%"
  },
  {
    source: "뽐뿌",
    author: "1시간 전",
    title: "신제품 기대감이 더 큰 것 같아요",
    body: "새 GPU 라인업 발표가 곧 있을 예정이라 기대감이 커요. 성능이 얼마나 나올지가 관건!",
    positive: 65,
    neutral: 20,
    negative: 15,
    mentions: "96%"
  },
  {
    source: "디시인사이드 · 주식갤러리",
    author: "2시간 전",
    title: "기관들 목표가 줄상향 ㄷㄷ",
    body: "여러 증권사에서 목표가를 올리고 있음. 내년 실적도 기대된다는 듯.",
    positive: 60,
    neutral: 25,
    negative: 15,
    mentions: "75%"
  }
];

export const alertEvent = {
  id: "eco-alert",
  stock: "에코프로비엠",
  code: "247540",
  time: "2025.05.24 09:37:52",
  reason: "전고점(245,000원) 돌파 + 거래량 급증",
  frames: [
    { time: "09:33", price: "243,000", volume: "128,570" },
    { time: "09:34", price: "244,200", volume: "192,840" },
    { time: "09:35", price: "246,500", volume: "384,210" },
    { time: "09:37", price: "247,500", volume: "568,930" }
  ]
};

export const tradeUploads = [
  ["binance_trades_20250523.csv", "2025.05.23 14:32 · 156건", "분석 완료"],
  ["bybit_history_20250522.csv", "2025.05.22 09:15 · 89건", "분석 완료"],
  ["okx_trades_20250521.csv", "2025.05.21 16:45 · 201건", "분석 완료"],
  ["manual_input_20250520.csv", "2025.05.20 11:20 · 12건", "분석 완료"],
  ["binance_trades_20250519.csv", "2025.05.19 08:30 · 98건", "분석 중"],
  ["bybit_history_20250518.csv", "2025.05.18 21:10 · 67건", "분석 실패"]
];
