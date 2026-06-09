"use client";

import Link from "next/link";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  CloudUpload,
  FileText,
  Flame,
  ImageIcon,
  Info,
  LineChart,
  Mic,
  Play,
  Search,
  Settings2,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  TrendingUp,
  Upload,
  Volume2,
  Zap
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AppShell, Logo, Pill, SectionCard, TopBar } from "./AppShell";
import { CandlestickChart, MiniLineChart } from "./Charts";
import { alertEvent, candidates, communityPosts, replays, tradeUploads, watchlist } from "../data/mock";

export function HomeScreen() {
  return (
    <AppShell>
      <div className="home-header">
        <Logo />
        <div className="header-actions">
          <span className="bell-dot"><Bell size={30} /></span>
          <span className="profile-orb" />
        </div>
      </div>

      <div className="benefit-grid">
        <SectionCard className="benefit-card">
          <div>
            <h2>출석체크</h2>
            <p>매일 출석하고<br />포인트를 받아보세요!</p>
          </div>
          <CalendarDays className="soft-icon blue-soft" size={64} />
          <div className="check-row">
            {[0, 1, 2].map((item) => <span key={item} className="round-check"><Check size={18} /></span>)}
            {[0, 1, 2].map((item) => <span key={item} className="round-check muted"><Check size={18} /></span>)}
          </div>
          <button className="primary-button">오늘 출석 완료! <Check size={20} /></button>
        </SectionCard>
        <SectionCard className="benefit-card">
          <h2>오늘의 혜택</h2>
          <p>출석 포인트 + 10P<br />브리핑 청취 + 5P</p>
          <div className="coin-visual">P</div>
          <Link href="/investment" className="points-row">
            <span>보유 포인트</span>
            <strong>Ⓟ 1,250P</strong>
            <ChevronRight size={22} />
          </Link>
        </SectionCard>
      </div>

      <SectionCard className="briefing-card">
        <div className="briefing-head">
          <div className="section-title">
            <span className="ai-box">AI</span>
            <h2>AI 아침 브리핑</h2>
          </div>
          <span className="subtle">매일 오전 8:00 업데이트 <Info size={18} /></span>
        </div>
        <div className="briefing-body">
          <div>
            <h3>오늘 시장 한눈에 보기</h3>
            <p>간밤 뉴욕 증시는 금리 인하 기대감과 기술주 강세로 상승 마감했습니다. 오늘 국내 시장은 긍정적 흐름이 예상됩니다.</p>
            <div className="divider" />
            <h4>장전 관심 종목 TOP 3</h4>
            <div className="top-stock-row">
              {["삼성전자", "SK하이닉스", "현대차"].map((name, index) => (
                <span key={name} className="top-stock"><b>{index + 1}</b>{name}<small>{["005930", "000660", "005380"][index]}</small></span>
              ))}
            </div>
            <div className="briefing-actions">
              <Link href="/replay" className="secondary-button"><Volume2 size={23} /> 음성으로 듣기</Link>
              <Link href="/watchlist" className="primary-button"><Star size={23} /> 관심 종목에 담기</Link>
            </div>
          </div>
          <Link href="/candidates" className="play-orb" aria-label="브리핑 재생">
            <Play fill="white" size={54} />
          </Link>
        </div>
      </SectionCard>

      <SectionCard className="feed-card">
        <h2>오늘의 투자 피드</h2>
        {[
          { title: "오늘의 핵심 일정", text: "21:30 🇺🇸 5월 소비자물가지수(CPI) 발표", Icon: CalendarDays },
          { title: "미국장 요약", text: "다우 +0.25%   나스닥 +0.63%   S&P500 +0.41%", Icon: Flame },
          { title: "오늘 주목 테마", text: "AI 반도체  전력 인프라  2차전지  원전  바이오", Icon: Sparkles }
        ].map(({ title, text, Icon }) => (
          <Link href="/candidates" className="feed-row" key={title}>
            <span className="feed-icon"><Icon size={26} /></span>
            <span><b>{title}</b><small>{text}</small></span>
            <ChevronRight size={22} />
          </Link>
        ))}
      </SectionCard>
    </AppShell>
  );
}

export function CandidatesScreen() {
  const [active, setActive] = useState("전체");
  return (
    <AppShell hideNav>
      <TopBar title="오늘의 후보 종목" right={<span className="bell-dot"><Bell size={28} /></span>} />
      <div className="metric-grid three">
        <Metric title="오늘 후보 수" value="52개" note="전일 대비 +8" tone="purple" />
        <Metric title="평균 변동성" value="2.35%" note="보통" tone="blue" />
        <Metric title="커뮤니티 과열 종목" value="6개" note="주의" tone="red" />
      </div>
      <div className="chip-row sticky-chips">
        {["전체", "급등 가능성", "거래량", "뉴스", "수급", "테마"].map((chip) => (
          <button key={chip} className={active === chip ? "chip active" : "chip"} onClick={() => setActive(chip)}>{chip}</button>
        ))}
      </div>
      <div className="candidate-list">
        {candidates.map((stock, index) => (
          <SectionCard className="candidate-card" key={stock.id}>
            <div className="rank-badge">{index + 1}</div>
            <div className="candidate-main">
              <div>
                <h2>{stock.name} <small>{stock.code}</small></h2>
                <div className="price-line"><strong>{stock.price}</strong><b>{stock.change}</b></div>
                <div className="badge-row">
                  <Pill tone="purple">AI {stock.score}점</Pill>
                  <Pill tone={stock.risk === "낮음" ? "green" : "orange"}>위험도 {stock.risk}</Pill>
                </div>
                <div className="reason-line">{stock.reasons.map((item) => <span key={item}>• {item}</span>)}</div>
              </div>
              <MiniLineChart points={stock.spark} />
              <div className={`community-tile ${stock.community.tone}`}>
                <b>{stock.community.label} 🔥</b>
                <span>언급 {stock.community.mentions} ㅣ 긍정 {stock.community.positive}</span>
              </div>
            </div>
            <div className="candidate-actions">
              <button className="outline-button"><Star size={20} /> 관심 담기</button>
              <Link href="/stocks/abtech" className="dark-button">상세 보기</Link>
            </div>
          </SectionCard>
        ))}
      </div>
      <p className="foot-note"><Info size={18} /> AI 점수는 자체 분석 모델 기준입니다. <span>09:30 기준 업데이트</span></p>
    </AppShell>
  );
}

function Metric({ title, value, note, tone }: { title: string; value: string; note: string; tone: "purple" | "blue" | "red" }) {
  return (
    <div className={`metric ${tone}`}>
      <span className="metric-icon"><LineChart size={26} /></span>
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

export function StockDetailScreen() {
  return (
    <AppShell hideNav>
      <TopBar title="" right={<Link className="outline-button small" href="/watchlist"><Star fill="#f43f5e" color="#f43f5e" size={20} /> 관심 등록</Link>} />
      <div className="stock-hero">
        <h1>에이비테크 <Pill>298080</Pill> <Pill>KOSDAQ</Pill></h1>
        <div><strong>24,850</strong><span>▲ 2,350 (10.43%)</span></div>
      </div>
      <SectionCard>
        <div className="section-title compact"><h2>왜 선정됐나요?</h2><span>AI가 포착한 상승 신호 ✨</span></div>
        <div className="reason-card-grid">
          <Reason icon={<TrendingUp />} title="거래량 급증" main="전일 대비 324%" sub="3거래일 연속 증가" tone="red" />
          <Reason icon={<ShieldCheck />} title="외국인 수급 개선" main="3일 연속 순매수" sub="+42.1억" tone="green" />
          <Reason icon={<ClipboardList />} title="2차전지 테마 확산" main="테마 강도 상위 5%" sub="시장 관심 집중" tone="purple" />
        </div>
      </SectionCard>
      <SectionCard className="chart-card">
        <div className="period-tabs">{["1일", "1주", "1개월", "3개월", "6개월", "1년"].map((p, i) => <button className={i === 0 ? "active" : ""} key={p}>{p}</button>)}</div>
        <div className="legend"><span className="ma orange">MA5</span><span className="ma blue">MA20</span><span className="ma green">MA60</span></div>
        <CandlestickChart />
        <div className="annotation-row">
          {["05/13 거래량 급증 시작", "05/21 외국인 순매수 전환", "05/30 2차전지 테마 강세", "06/04 기관 순매수 유입"].map((item, index) => (
            <span key={item}><b>{String.fromCharCode(65 + index)}</b>{item}</span>
          ))}
        </div>
      </SectionCard>
      <SectionCard className="detail-panels">
        <div className="tab-labels"><b>뉴스</b><b>공시</b><b>수급</b><b>커뮤니티</b></div>
        <div className="panel-grid">
          <InfoPanel title="핵심 뉴스" lines={["2차전지 장비 수주 확대 기대", "북미 고객사향 공급 계약 체결 임박", "생산라인 증설 본격화"]} />
          <InfoPanel title="주요 공시" lines={["단일판매·공급계약 체결", "타법인 주식 취득 결정", "분기보고서 (1Q)"]} />
          <InfoPanel title="수급 현황" lines={["외국인 순매수 +42.1억", "기관 순매수 +18.7억"]} hot />
          <InfoPanel title="커뮤니티 반응" lines={["국내 반응 긍정적", "해외 반응 Bullish"]} />
        </div>
      </SectionCard>
      <div className="bottom-actions">
        <Link href="/alerts/eco-alert" className="outline-button"><Bell size={20} /> 알림 설정</Link>
        <Link href="/chart-analysis/result" className="outline-button purple-action"><Sparkles size={20} /> 이 화면 AI 분석</Link>
        <button className="primary-button">MTS에서 열기</button>
      </div>
    </AppShell>
  );
}

function Reason({ icon, title, main, sub, tone }: { icon: ReactNode; title: string; main: string; sub: string; tone: string }) {
  return <div className={`reason-card ${tone}`}><span>{icon}</span><b>{title}</b><strong>{main}</strong><small>{sub}</small></div>;
}

function InfoPanel({ title, lines, hot = false }: { title: string; lines: string[]; hot?: boolean }) {
  return <div className="info-panel"><b>{title}<ChevronRight size={18} /></b>{lines.map((line) => <span className={hot ? "hot-text" : ""} key={line}>{line}</span>)}</div>;
}

export function CommunityScreen() {
  return (
    <AppShell hideNav>
      <TopBar title="국내외 반응" right={<CircleHelp size={25} />} />
      <div className="sentiment-grid">
        {[
          ["관심도 지수", "72", "높음", "green"],
          ["긍정도", "64", "긍정적", "green"],
          ["과열도", "58", "주의", "orange"],
          ["해외 관심도", "68", "높음", "green"]
        ].map(([title, value, label, tone]) => (
          <SectionCard className="gauge-card" key={title}>
            <span>{title} <CircleHelp size={16} /></span>
            <strong>{value}<small>/100</small></strong>
            <div className={`gauge ${tone}`} />
            <b>{label}</b>
          </SectionCard>
        ))}
      </div>
      <div className="wide-tabs"><button className="active">국내 커뮤니티</button><button>뉴스 댓글</button><button>Reddit / X 반응</button></div>
      <SectionCard>
        <div className="section-title compact"><Sparkles color="#22c55e" /><h2>핵심 주장 3줄 요약</h2><CircleHelp size={18} /></div>
        <ol className="summary-list">
          <li>실적이 예상치를 상회하며 AI 수요가 지속될 것이라는 기대가 많아요.</li>
          <li>단기 급등에 따른 밸류에이션 부담을 지적하는 의견도 있어요.</li>
          <li>신제품 출시와 가이던스에 대한 시장의 관심이 집중되고 있어요.</li>
        </ol>
      </SectionCard>
      <SectionCard className="post-list">
        {communityPosts.map((post) => (
          <article className="post" key={post.title}>
            <div className="post-meta"><span>{post.source}</span><small>{post.author}</small><b>언급량 ↗ {post.mentions}</b></div>
            <h3>{post.title} <Pill tone="green">번역</Pill></h3>
            <p>{post.body}</p>
            <div className="sentiment-row"><span>☺ {post.positive}%</span><span>😐 {post.neutral}%</span><span>☹ {post.negative}%</span></div>
          </article>
        ))}
      </SectionCard>
      <p className="disclaimer">제공된 의견은 번역 및 요약된 내용으로 투자 판단의 참고 자료입니다.</p>
    </AppShell>
  );
}

export function AlertDetailScreen() {
  return (
    <AppShell hideNav>
      <TopBar title="알림 상세" right={<div className="inline-icons"><Bell size={24} /><Share2 size={24} /></div>} />
      <Pill tone="blue"><Zap size={16} /> 조건 충족 알림</Pill>
      <div className="alert-hero">
        <span className="alert-icon"><TrendingUp /></span>
        <h1>{alertEvent.stock} <small>{alertEvent.code}</small></h1>
        <p>◷ {alertEvent.time}</p>
        <p>알림 이유 <b>{alertEvent.reason}</b></p>
      </div>
      <SectionCard>
        <div className="section-title compact"><h2>가격 움직임 리플레이 <small>(직전 4분)</small></h2><span>▷ 10초 리플레이</span></div>
        <div className="replay-frames">
          {alertEvent.frames.map((frame, index) => (
            <div className={index === 2 ? "frame active" : "frame"} key={frame.time}>
              {index === 2 && <b className="breakout">돌파!</b>}
              <span>{frame.time}</span>
              <strong>{frame.price}</strong>
              <MiniLineChart points={[8, 9, 8, 11, 10, 13, 12, 16].map((v) => v + index * 2)} tone={index === 2 ? "red" : "blue"} />
              <small>거래량 {frame.volume}</small>
            </div>
          ))}
        </div>
        <div className="progress"><span /><b>00:10 / 00:10</b></div>
      </SectionCard>
      <SectionCard className="why-alert">
        <h2>왜 알림이 떴을까요?</h2>
        <div><b>거래량 급증</b><span>전일 대비 341%↑</span></div>
        <div><b>전고점 돌파</b><span>245,000원 돌파</span></div>
        <div><b>강한 상승 모멘텀</b><span>4분간 +3.2% 상승</span></div>
      </SectionCard>
      <SimpleRows rows={[["관련 속보", "[속보] 에코프로비엠, 북미 고객사와 4조원 규모 양극재 공급 계약 체결"], ["커뮤니티 반응", "공시 떴네요! 장 시작부터 강하더니 ㄷㄷ"], ["핵심 수급 데이터", "거래량 568,930주 · 외국인 +142,560주 · 기관 +68,230주"]]} />
      <div className="bottom-actions">
        <button className="outline-button"><Star size={20} /> 관심 종목 저장</button>
        <button className="outline-button">MTS 열기</button>
        <Link href="/stocks/abtech" className="primary-button">더 자세히 보기</Link>
      </div>
    </AppShell>
  );
}

function SimpleRows({ rows }: { rows: string[][] }) {
  return <>{rows.map(([title, body]) => <SectionCard className="simple-row" key={title}><b>{title}</b><span>{body}</span><ChevronRight size={20} /></SectionCard>)}</>;
}

export function ReplayScreen() {
  const [active, setActive] = useState("전체");
  return (
    <AppShell dark>
      <div className="dark-head"><h1>리플레이</h1><span><Play size={22} /> 그날의 기회를 10초로 다시 보기</span><Search size={30} /></div>
      <div className="chip-row dark-chips">{["전체", "10초", "30초", "🔥 오늘의 급등", "⭐ 과거 명장면"].map((chip) => <button key={chip} onClick={() => setActive(chip)} className={active === chip ? "chip active" : "chip"}>{chip}</button>)}</div>
      <div className="replay-list">
        {replays.map((item) => (
          <article className={`replay-card ${item.color}`} key={item.id}>
            <div className="replay-title"><span className="medal">{item.rank}</span><h2>{item.name} <small>{item.code}</small></h2><Pill tone="purple">▷ {item.duration} 리플레이</Pill><strong>{item.change}</strong></div>
            <small>{item.date}</small>
            <div className="timeline-strip">
              {["09:00:00", "09:00:03", "09:00:06", "09:00:09", "09:00:10"].map((time, index) => <div key={time}><span>{time}</span><MiniLineChart points={[6, 7, 8, 9, 10, 12, 13].map(v => v + index)} tone={index > 2 ? "purple" : "blue"} /></div>)}
            </div>
            <h3>당시 왜 올랐나?</h3>
            <p>{item.reason}</p>
            <div className="evidence-box">{item.evidence.map((line, index) => <span key={line}>핵심 근거 {index + 1} ㅣ {line}</span>)}<b>위험 신호 ㅣ {item.risk}</b></div>
            <div className="replay-actions"><button>현재 유사 종목 보기 <ChevronRight size={18} /></button><span>♡ {item.likes}</span><Share2 size={20} /></div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}

export function WatchlistScreen() {
  const [items, setItems] = useState(watchlist);
  return (
    <AppShell hideNav>
      <TopBar title="관심 종목" right={<div className="inline-icons"><Settings2 /><span>⋮</span></div>} />
      <SectionCard className="ask-ai"><Sparkles size={34} /><div><b>AI에게 물어보기</b><span>&apos;2차전지 종목만 보여줘&apos;, &apos;수급 좋은 종목만 정리해줘&apos;</span></div><button><Mic size={30} /></button></SectionCard>
      <div className="watch-filter"><span>총 18개</span><div className="chip-row"><button className="chip active">전체</button><button className="chip">2차전지</button><button className="chip">반도체</button><button className="chip">바이오</button><button className="chip">+</button></div><span>최근 수정⌄</span></div>
      {items.map((item, index) => (
        <SectionCard className="watch-card" key={item.code}>
          <div className="watch-top">
            <Star size={30} fill={index % 2 === 0 ? "#8b5cf6" : "none"} color="#8b5cf6" />
            <h2>{item.stock}<small>{item.code} ㅣ {item.market}</small></h2>
            <div className="watch-price"><strong>{item.price}</strong><span className={item.change.startsWith("+") ? "red-text" : "blue-text"}>{item.change}</span></div>
            <button className={item.on ? "toggle on" : "toggle"} onClick={() => setItems((prev) => prev.map((p) => p.code === item.code ? { ...p, on: !p.on } : p))}>{item.on ? "ON" : "OFF"}</button>
          </div>
          <div className="watch-columns">
            <div><small>마지막 주요 이유</small><p>{item.reason}</p></div>
            <div><small>최근 뉴스</small><p>{item.news}</p><span>◷ 2시간 전 · 연합뉴스</span></div>
            <div><small>커뮤니티 반응 변화</small><p className={item.delta.startsWith("+") ? "red-text" : "blue-text"}>▲ {item.signal} {item.delta}</p><MiniLineChart points={item.spark} tone={item.delta.startsWith("+") ? "red" : "blue"} /></div>
          </div>
          <div className="card-actions"><Link href="/stocks/abtech">상세 보기</Link><button>알림 수정</button><button>MTS 열기</button></div>
        </SectionCard>
      ))}
      <div className="floating-actions"><button><FileText /> 종목 추가</button><button><Settings2 /> 리스트 관리</button></div>
    </AppShell>
  );
}

export function ChartAnalysisScreen() {
  const [checks, setChecks] = useState(["추세 분석", "지지/저항 분석", "거래량 분석", "위험 구간 분석", "뉴스 연결", "수급 연결"]);
  const toggle = (item: string) => setChecks((prev) => prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]);
  return (
    <AppShell hideNav>
      <TopBar title="내 차트 분석" right={<CircleHelp size={25} />} />
      <p className="page-subtitle">내 차트를 업로드하거나 보고 있는 차트를 그대로 AI에게 넘겨보세요</p>
      <SectionCard className="upload-card">
        <div className="wide-tabs upload-tabs"><button className="active"><ImageIcon /> 이미지 업로드</button><button><Sparkles /> 현재 화면 분석</button><button>최근 분석</button></div>
        <div className="drop-zone">
          <CloudUpload size={64} />
          <h2>차트 이미지를 업로드하세요</h2>
          <p>PNG, JPG, JPEG 업로드 가능 (최대 10MB)</p>
          <button className="purple-button">이미지 선택</button>
          <span>또는 이미지를 여기로 끌어다 놓으세요</span>
        </div>
        <p className="hint"><Sparkles size={20} /> 트레이딩뷰, HTS, MTS 등 다양한 차트 이미지를 분석할 수 있어요.</p>
        <div className="preview-box">
          <div><h2>업로드 미리보기</h2><button><Trash2 size={18} /> 삭제</button></div>
          <div className="preview-content"><CandlestickChart /><div><h3>KOSPI 200 · 1일</h3><p className="purple-text">✓ 업로드 완료</p><span>업로드 시간: 방금 전</span><Pill>이미지 · 1.2MB</Pill></div></div>
        </div>
        <div className="check-section">
          <h2>분석 항목 선택 <Pill tone="purple">추천 항목이 선택되어 있어요</Pill></h2>
          <div className="check-grid">
            {["추세 분석", "지지/저항 분석", "거래량 분석", "위험 구간 분석", "뉴스 연결", "수급 연결"].map((item) => (
              <button className={checks.includes(item) ? "check-item on" : "check-item"} key={item} onClick={() => toggle(item)}>{item}<Check size={18} /></button>
            ))}
          </div>
          <p className="hint"><Sparkles size={18} /> 분석 항목은 언제든 변경할 수 있어요.</p>
        </div>
        <Link href="/chart-analysis/result" className="purple-button full"><Sparkles /> AI 분석 시작하기</Link>
      </SectionCard>
    </AppShell>
  );
}

export function ChartAnalysisResultScreen() {
  return (
    <AppShell dark hideNav>
      <TopBar title="AI 차트 분석 결과" dark right={<span>•••</span>} />
      <SectionCard className="analysis-head">
        <div className="thumb-chart"><MiniLineChart points={[8, 6, 11, 9, 15, 14, 19, 18]} tone="green" /></div>
        <div><h2>삼성전자 <small>005930</small></h2><span>업로드: 2025.05.22 09:38</span></div>
        <Pill tone="green">✓ 분석 완료</Pill>
        <span>AI 모델: STALK v2.1</span>
      </SectionCard>
      <SectionCard className="dark-chart-card">
        <div className="legend dark-legend"><span>저항선</span><span>지지선</span><span>관찰 구간</span><span>위험 구간</span><span>거래량 증가</span></div>
        <CandlestickChart dark />
        <div className="analysis-footer"><span>※ AI 분석 결과는 참고용이며, 투자 판단의 책임은 본인에게 있습니다.</span><b>연결 데이터: 실시간 ●</b></div>
      </SectionCard>
      <SectionCard className="analysis-summary">
        <h2>분석 요약</h2>
        {[
          ["현재 추세", "단기 상승세 유지 중이며, 81,000~85,500 구간이 강한 저항대로 작용 중"],
          ["관찰 포인트", "81,000 돌파 시 추가 상승 가능성. 거래량 동반 여부 주목"],
          ["위험 신호", "72,200 이탈 시 하락 전환 가능성. 거래량 감소 + 음봉 패턴 주의"],
          ["추가 확인 필요", "美 반도체 업황 / 외국인 수급 / 환율 / 삼성전자 실적 발표 일정"]
        ].map(([title, body]) => <div key={title}><b>{title}</b><span>{body}</span></div>)}
      </SectionCard>
      <div className="two-col">
        <SectionCard><h2>관련 뉴스</h2>{["HBM4 양산 준비 본격화", "반도체 업황 회복세 지속", "외국인 5거래일 연속 순매수"].map((n) => <p key={n}>{n}<small> · 2시간 전</small></p>)}</SectionCard>
        <SectionCard><h2>커뮤니티 요약</h2><p>“81K 돌파 시 9만원 가능” <Pill tone="green">64%</Pill></p><p>“실적 발표 전 관망이 안전할 듯” <Pill tone="orange">23%</Pill></p><p>“72K 이탈 시 손절 고려” <Pill tone="red">13%</Pill></p></SectionCard>
      </div>
      <div className="analysis-actions"><button><Star size={28} />관심 종목 저장<small>삼성전자를 내 리스트에 추가</small></button><button><Search size={30} />비슷한 종목 찾기<small>AI가 유사 종목을 추천해드려요</small></button></div>
    </AppShell>
  );
}

export function InvestmentScreen() {
  const [tab, setTab] = useState<"analysis" | "upload">("analysis");
  const uploads = useMemo(() => tradeUploads, []);
  return (
    <AppShell>
      <TopBar title="내 투자 분석" right={<CircleHelp />} />
      <div className="wide-tabs"><button className={tab === "analysis" ? "active green-line" : ""} onClick={() => setTab("analysis")}>분석</button><button className={tab === "upload" ? "active green-line" : ""} onClick={() => setTab("upload")}>업로드 기록</button><button>분석 기록</button></div>
      {tab === "analysis" ? (
        <>
          <SectionCard className="trade-card"><div><b>최근 거래</b><span>전체 보기 ›</span></div><h2>ETH/USDT <Pill tone="green">Long</Pill></h2><p>2025.05.23 14:32</p><strong className="green-text">+1,248.75 USDT<br />+12.47%</strong><div className="trade-stats"><span>진입가<b>2,645.30</b></span><span>청산가<b>2,973.50</b></span><span>보유 시간<b>6시간 23분</b></span><span>포지션 크기<b>10,000 USDT</b></span></div></SectionCard>
          <SectionCard><h2>거래 점수</h2><div className="score-grid">{[["종합 점수", "87"], ["진입 점수", "82"], ["청산 점수", "91"], ["리스크 관리", "78"]].map(([a, b]) => <div key={a}><b>{a}</b><strong>{b}<small>/100</small></strong><span /></div>)}</div></SectionCard>
          <SectionCard><h2>거래 복기 차트</h2><CandlestickChart /><p className="foot-note">※ 본 차트는 AI 복기용 예시이며 실제 체결 데이터와 다를 수 있습니다.</p></SectionCard>
          <div className="review-grid">{["잘한 점", "개선할 점", "다음 거래 과제", "오라클 비교"].map((title, index) => <SectionCard key={title}><h3>{title}</h3><p>{["추세 방향과 일치하는 진입, 리스크 대비 수익률 우수", "진입 타이밍이 다소 늦었고 부분 익절로 수익 보호 부족", "진입 타이밍을 더 정교하게, 손절 기준을 명확히", "식톡 오라클과 비교 분석 상위 24%"][index]}</p><span>자세히 보기 ›</span></SectionCard>)}</div>
        </>
      ) : (
        <>
          <SectionCard className="csv-card"><h2>CSV 업로드</h2><div className="csv-drop"><Upload size={56} /><p>CSV 파일을 드래그하거나 선택하세요</p><span>거래 내역을 업로드하면 AI가 자동 분석해드려요.</span><button>파일 선택</button><small>지원 형식: CSV (최대 10MB)</small></div></SectionCard>
          <SectionCard className="upload-list"><h2>업로드 기록</h2>{uploads.map(([file, meta, status]) => <div className="upload-row" key={file}><FileText /><span><b>{file}</b><small>{meta}</small></span><strong className={status === "분석 실패" ? "red-text" : status === "분석 중" ? "orange-text" : "green-text"}>{status}</strong><ChevronRight size={18} /></div>)}<button className="outline-button full">더 보기⌄</button></SectionCard>
          <SectionCard className="tip-card"><h2>업로드 팁</h2><p>거래쌍, 진입가, 청산가, 수량, 시간, 방향을 포함하면 더 정확한 복기가 가능합니다.</p></SectionCard>
        </>
      )}
    </AppShell>
  );
}
