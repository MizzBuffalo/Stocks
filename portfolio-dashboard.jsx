import { useState, useEffect, useRef } from "react";

const STOCKS = [
  {
    ticker: "ASTS",
    name: "AST SpaceMobile",
    sector: "Space / Telecom",
    price: 94.09,
    prevClose: 90.74,
    weekHigh52: 129.89,
    weekLow52: 18.22,
    marketCap: "27.1B",
    pe: "N/A",
    analystRating: "Neutral",
    analystTarget: 88.53,
    description: "Space-based cellular broadband for smartphones. BlueBird satellite constellation.",
    catalysts: ["TELUS partnership for Canada", "$30M U.S. Space Development Agency contract", "Revenue target ~$1B by 2027"],
    risks: ["Pre-revenue stage, heavy cash burn", "Satellite launch execution risk", "Short interest ~25%"],
    health: "bullish",
    healthScore: 72,
    ytdReturn: 1.79,
    oneYearReturn: 228,
    history: [18.22, 28, 42, 55, 75, 95, 129, 116, 90, 77, 87, 94],
    monthLabels: ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"],
    verdict: "HOLD — Explosive growth potential but volatile. Space-based broadband is a game-changer if execution follows.",
    exitTiming: "Consider trimming above $120. Core hold for 2027+ revenue ramp."
  },
  {
    ticker: "FTI",
    name: "TechnipFMC",
    sector: "Energy Services",
    price: 65.13,
    prevClose: 64.38,
    weekHigh52: 68.29,
    weekLow52: 22.12,
    marketCap: "26.5B",
    pe: "27.2",
    analystRating: "Strong Buy",
    analystTarget: 52.00,
    description: "Global leader in subsea oilfield services & deep-water energy infrastructure.",
    catalysts: ["All-time high price reached Mar 2026", "Strong backlog shifting to higher-margin iEPCI", "152% total return over past year"],
    risks: ["Oil price sensitivity", "Trading above analyst targets", "Offshore wind execution issues"],
    health: "strong-bullish",
    healthScore: 88,
    ytdReturn: 34.1,
    oneYearReturn: 152,
    history: [22, 26, 30, 33, 36, 38, 42, 48, 52, 58, 62, 65],
    monthLabels: ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"],
    verdict: "STRONG — Best performer in portfolio. Fundamentals are solid with growing backlog.",
    exitTiming: "Currently above analyst targets. Consider partial profit-taking; set trailing stop at $55."
  },
  {
    ticker: "EE",
    name: "Excelerate Energy",
    sector: "LNG / Energy Infrastructure",
    price: 33.61,
    prevClose: 34.36,
    weekHigh52: 43.18,
    weekLow52: 21.28,
    marketCap: "4.6B",
    pe: "28.1",
    analystRating: "Moderate Buy",
    analystTarget: 39.00,
    description: "LNG solutions provider with floating regasification units & gas-to-power infrastructure.",
    catalysts: ["Record 2025 EBITDA of $449M", "2026 guidance: $515-$545M EBITDA", "Iraq expansion & LNG supply deals"],
    risks: ["LNG price volatility", "Geopolitical exposure (Iraq)", "Recent gap-down from $42 highs"],
    health: "bullish",
    healthScore: 75,
    ytdReturn: 19.6,
    oneYearReturn: 58,
    history: [21, 22, 23, 24, 26, 25, 27, 28, 30, 35, 43, 34],
    monthLabels: ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"],
    verdict: "SOLID — Growing LNG infrastructure play with strong cash generation.",
    exitTiming: "Healthy hold. Upside to $39-44 analyst range. Watch for re-test of $43 high."
  },
  {
    ticker: "GCTS",
    name: "GCT Semiconductor",
    sector: "Semiconductors / 5G",
    price: 1.17,
    prevClose: 1.18,
    weekHigh52: 2.47,
    weekLow52: 0.90,
    marketCap: "85M",
    pe: "-1.6",
    analystRating: "Strong Buy",
    analystTarget: 4.00,
    description: "Fabless 5G/4G LTE chipset designer for IoT, CPE, and satellite connectivity.",
    catalysts: ["5G chipset commercial shipments begun", "Skylo satellite partnership", "MWC 2026: 5G-to-Space & IoT advances"],
    risks: ["Revenue cratered: $3M in 2025 vs $9M prior year", "Negative margins, cash burn", "Micro-cap with high dilution risk"],
    health: "speculative",
    healthScore: 32,
    ytdReturn: -17,
    oneYearReturn: -52,
    history: [2.47, 2.10, 1.80, 1.60, 1.40, 1.20, 1.10, 0.94, 1.05, 1.24, 1.20, 1.17],
    monthLabels: ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"],
    verdict: "HIGH RISK — Speculative 5G bet. Revenue collapse is concerning but analyst targets suggest 200%+ upside.",
    exitTiming: "Lottery ticket. If holding, wait for Q1 2026 earnings (Mar 25) for clarity."
  },
  {
    ticker: "CRWV",
    name: "CoreWeave",
    sector: "AI Cloud Infrastructure",
    price: 80.66,
    prevClose: 82.82,
    weekHigh52: 187.00,
    weekLow52: 33.52,
    marketCap: "41.6B",
    pe: "-31.7",
    analystRating: "Buy",
    analystTarget: 120.79,
    description: "AI cloud infrastructure — GPU compute, data centers, serving NVIDIA's ecosystem.",
    catalysts: ["Revenue up 168% YoY to $5.13B", "NVIDIA HGX B300 availability", "Partnerships: Cline, Perplexity, CrowdStrike"],
    risks: ["Still unprofitable: -$1.2B losses", "$100B+ funding deficit projected thru 2030", "Big Tech building own infrastructure"],
    health: "volatile-growth",
    healthScore: 58,
    ytdReturn: -2.4,
    oneYearReturn: 99,
    history: [40, 65, 100, 140, 187, 170, 150, 130, 105, 95, 77, 81],
    monthLabels: ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"],
    verdict: "HIGH CONVICTION GROWTH — AI infrastructure backbone. Massive revenue growth but heavy losses.",
    exitTiming: "Long-term hold for AI thesis believers. Consider adding below $70."
  },
  {
    ticker: "LVO",
    name: "LiveOne",
    sector: "Digital Media / Music",
    price: 4.70,
    prevClose: 4.50,
    weekHigh52: 12.00,
    weekLow52: 2.50,
    marketCap: "52M",
    pe: "N/A",
    analystRating: "Buy",
    analystTarget: 17.50,
    description: "Digital music streaming, live events, podcasting platform (LiveOne, PodcastOne, Slacker).",
    catalysts: ["Multi-year Merlin licensing deal", "AI initiatives reducing headcount (350→84)", "VIZIO Smart TV app launch"],
    risks: ["Consistent operating losses", "Micro-cap with thin trading", "Missing earnings estimates"],
    health: "speculative",
    healthScore: 35,
    ytdReturn: -38,
    oneYearReturn: -55,
    history: [10.5, 9, 8, 7, 6.5, 5.5, 5, 4, 3, 3.5, 4, 4.7],
    monthLabels: ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"],
    verdict: "SPECULATIVE — Interesting AI pivot but losses persist. Analyst targets imply huge upside if turnaround works.",
    exitTiming: "Speculative hold. Watch for profitability signals in next 2 quarters."
  },
  {
    ticker: "TNXP",
    name: "Tonix Pharmaceuticals",
    sector: "Biotech / Pharma",
    price: 13.24,
    prevClose: 13.41,
    weekHigh52: 69.96,
    weekLow52: 12.80,
    marketCap: "169M",
    pe: "N/A",
    analystRating: "Buy",
    analystTarget: 70.00,
    description: "Commercial-stage biotech. TONMYA for fibromyalgia (first new FDA approval in 15+ years). CNS pipeline.",
    catalysts: ["TONMYA launched Nov 2025: ~4,200 prescriptions", "~1,500 prescribers onboarded", "Uplisted to Nasdaq Global Select Market"],
    risks: ["$130M annual losses", "Stock down ~80% from 52-week high", "Heavy dilution history"],
    health: "high-risk-catalyst",
    healthScore: 40,
    ytdReturn: -32,
    oneYearReturn: -78,
    history: [60, 55, 50, 45, 40, 35, 30, 25, 20, 18, 15, 13],
    monthLabels: ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"],
    verdict: "DEEP VALUE or VALUE TRAP — TONMYA is real revenue but commercial ramp is slow vs burn rate.",
    exitTiming: "Critical watch zone. If TONMYA scripts accelerate → potential multi-bagger. Set stop-loss at $10."
  }
];

const SUGGESTIONS_AGGRESSIVE = [
  { ticker: "RKLB", name: "Rocket Lab", sector: "Space", reason: "Pairs with ASTS thesis. Satellite launch provider with growing revenue." },
  { ticker: "IONQ", name: "IonQ", sector: "Quantum Computing", reason: "Frontier tech like her space/5G picks. Quantum is next wave." },
  { ticker: "NBIS", name: "Nebius Group", sector: "AI Infrastructure", reason: "CoreWeave competitor. NVIDIA just invested $2B." },
];

const SUGGESTIONS_STABLE = [
  { ticker: "LNG", name: "Cheniere Energy", sector: "LNG", reason: "Blue-chip version of her EE play. Market leader in U.S. LNG exports." },
  { ticker: "CRWD", name: "CrowdStrike", sector: "Cybersecurity", reason: "Growth + profitability path. Iran conflict boosting demand." },
  { ticker: "VOO", name: "Vanguard S&P 500 ETF", sector: "Index Fund", reason: "Portfolio anchor. Diversification against her concentrated bets." },
];

function HealthBadge({ health, score }) {
  const config = {
    "strong-bullish": { color: "#00e676", bg: "#00e67622", label: "STRONG" },
    "bullish": { color: "#4caf50", bg: "#4caf5022", label: "BULLISH" },
    "volatile-growth": { color: "#ff9800", bg: "#ff980022", label: "VOLATILE" },
    "speculative": { color: "#ff5252", bg: "#ff525222", label: "SPECULATIVE" },
    "high-risk-catalyst": { color: "#ff1744", bg: "#ff174422", label: "HIGH RISK" },
  };
  const c = config[health] || config["speculative"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{
        background: c.bg, color: c.color, padding: "3px 10px", borderRadius: 4,
        fontSize: 11, fontWeight: 700, letterSpacing: 1, border: `1px solid ${c.color}44`
      }}>{c.label}</span>
      <span style={{ color: c.color, fontSize: 13, fontWeight: 600 }}>{score}/100</span>
    </div>
  );
}

function MiniChart({ data, color, height = 60, width = 200 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data) * 0.95;
  const max = Math.max(...data) * 1.05;
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");
  const areaPoints = points + ` ${width},${height} 0,${height}`;
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace('#','')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function GaugeChart({ score, size = 100 }) {
  const radius = 38;
  const circumference = Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? "#00e676" : score >= 50 ? "#ff9800" : "#ff5252";
  return (
    <svg width={size} height={size / 1.7} viewBox="0 0 100 60">
      <path d="M 10 55 A 40 40 0 0 1 90 55" fill="none" stroke="#1a1f2e" strokeWidth="8" strokeLinecap="round" />
      <path d="M 10 55 A 40 40 0 0 1 90 55" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`${circumference}`} strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1s ease" }} />
      <text x="50" y="50" textAnchor="middle" fill={color} fontSize="18" fontWeight="800">{score}</text>
    </svg>
  );
}

function PortfolioOverview({ stocks }) {
  const avgScore = Math.round(stocks.reduce((a, s) => a + s.healthScore, 0) / stocks.length);
  const avgYtd = (stocks.reduce((a, s) => a + s.ytdReturn, 0) / stocks.length).toFixed(1);
  const bestPerformer = stocks.reduce((a, b) => a.oneYearReturn > b.oneYearReturn ? a : b);
  const worstPerformer = stocks.reduce((a, b) => a.oneYearReturn < b.oneYearReturn ? a : b);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
      {[
        { label: "Portfolio Health", value: `${avgScore}/100`, sub: avgScore >= 50 ? "Moderate" : "Caution", color: avgScore >= 50 ? "#4caf50" : "#ff9800" },
        { label: "Avg YTD Return", value: `${avgYtd}%`, sub: parseFloat(avgYtd) >= 0 ? "Positive" : "Negative", color: parseFloat(avgYtd) >= 0 ? "#00e676" : "#ff5252" },
        { label: "Top Performer (1Y)", value: bestPerformer.ticker, sub: `+${bestPerformer.oneYearReturn}%`, color: "#00e676" },
        { label: "Weakest (1Y)", value: worstPerformer.ticker, sub: `${worstPerformer.oneYearReturn}%`, color: "#ff5252" },
      ].map((item, i) => (
        <div key={i} style={{
          background: "linear-gradient(135deg, #0d1117 0%, #151b28 100%)",
          border: "1px solid #1e2740", borderRadius: 10, padding: "16px 14px",
          display: "flex", flexDirection: "column", gap: 6
        }}>
          <span style={{ fontSize: 10, color: "#5a6a8a", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 600 }}>{item.label}</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: item.color }}>{item.value}</span>
          <span style={{ fontSize: 11, color: "#5a6a8a" }}>{item.sub}</span>
        </div>
      ))}
    </div>
  );
}

function StockCard({ stock, isSelected, onClick }) {
  const changePercent = (((stock.price - stock.prevClose) / stock.prevClose) * 100).toFixed(2);
  const isUp = parseFloat(changePercent) >= 0;
  const chartColor = stock.healthScore >= 60 ? "#00e676" : stock.healthScore >= 40 ? "#ff9800" : "#ff5252";
  return (
    <div onClick={onClick} style={{
      background: isSelected ? "linear-gradient(135deg, #0f1a2e 0%, #162040 100%)" : "linear-gradient(135deg, #0d1117 0%, #131920 100%)",
      border: isSelected ? "1px solid #2962ff" : "1px solid #1a2035",
      borderRadius: 12, padding: 16, cursor: "pointer",
      transition: "all 0.3s ease", position: "relative", overflow: "hidden"
    }}>
      {isSelected && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #2962ff, #00e5ff)" }} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#e8eaf6", letterSpacing: 0.5 }}>{stock.ticker}</div>
          <div style={{ fontSize: 10, color: "#546e7a", marginTop: 2 }}>{stock.sector}</div>
        </div>
        <HealthBadge health={stock.health} score={stock.healthScore} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>${stock.price.toFixed(2)}</div>
          <div style={{ fontSize: 12, color: isUp ? "#00e676" : "#ff5252", fontWeight: 600 }}>
            {isUp ? "▲" : "▼"} {changePercent}%
          </div>
        </div>
        <MiniChart data={stock.history} color={chartColor} height={45} width={120} />
      </div>
    </div>
  );
}

function DetailPanel({ stock }) {
  if (!stock) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: "#5a6a8a", fontSize: 14 }}>
      ← Select a stock to see detailed analysis
    </div>
  );
  const range52 = stock.weekHigh52 - stock.weekLow52;
  const posIn52 = ((stock.price - stock.weekLow52) / range52) * 100;
  const targetUpside = (((stock.analystTarget - stock.price) / stock.price) * 100).toFixed(1);
  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#e8eaf6", letterSpacing: -0.5 }}>{stock.ticker} <span style={{ fontSize: 14, fontWeight: 400, color: "#5a6a8a" }}>— {stock.name}</span></h2>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "#78909c", lineHeight: 1.5, maxWidth: 500 }}>{stock.description}</p>
        </div>
        <GaugeChart score={stock.healthScore} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          { l: "Market Cap", v: stock.marketCap },
          { l: "P/E Ratio", v: stock.pe },
          { l: "YTD Return", v: `${stock.ytdReturn > 0 ? "+" : ""}${stock.ytdReturn}%` },
          { l: "1Y Return", v: `${stock.oneYearReturn > 0 ? "+" : ""}${stock.oneYearReturn}%` },
        ].map((m, i) => (
          <div key={i} style={{ background: "#0a0e18", borderRadius: 8, padding: "10px 12px", border: "1px solid #141c2e" }}>
            <div style={{ fontSize: 9, color: "#546e7a", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>{m.l}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: m.v.includes("+") ? "#00e676" : m.v.includes("-") ? "#ff5252" : "#b0bec5" }}>{m.v}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: "#546e7a", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>52-Week Range</div>
        <div style={{ position: "relative", height: 8, background: "#141c2e", borderRadius: 4, overflow: "visible" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${posIn52}%`, background: "linear-gradient(90deg, #2962ff, #00e5ff)", borderRadius: 4 }} />
          <div style={{ position: "absolute", top: -6, left: `${posIn52}%`, transform: "translateX(-50%)", width: 4, height: 20, background: "#fff", borderRadius: 2 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 10, color: "#546e7a" }}>${stock.weekLow52}</span>
          <span style={{ fontSize: 10, color: "#b0bec5", fontWeight: 600 }}>Current: ${stock.price}</span>
          <span style={{ fontSize: 10, color: "#546e7a" }}>${stock.weekHigh52}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: "#091208", border: "1px solid #1b5e20", borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 10, color: "#66bb6a", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8, fontWeight: 700 }}>Catalysts & Positives</div>
          {stock.catalysts.map((c, i) => (
            <div key={i} style={{ fontSize: 12, color: "#a5d6a7", marginBottom: 5, paddingLeft: 10, borderLeft: "2px solid #2e7d32", lineHeight: 1.4 }}>{c}</div>
          ))}
        </div>
        <div style={{ background: "#120808", border: "1px solid #b71c1c33", borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 10, color: "#ef5350", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8, fontWeight: 700 }}>Risks & Concerns</div>
          {stock.risks.map((r, i) => (
            <div key={i} style={{ fontSize: 12, color: "#ef9a9a", marginBottom: 5, paddingLeft: 10, borderLeft: "2px solid #c62828", lineHeight: 1.4 }}>{r}</div>
          ))}
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg, #0d1225 0%, #0f1832 100%)", border: "1px solid #1a237e44", borderRadius: 8, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "#5c6bc0", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6, fontWeight: 700 }}>Analyst Consensus</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#b0bec5" }}>{stock.analystRating}</span>
          <span style={{ fontSize: 13, color: parseFloat(targetUpside) >= 0 ? "#00e676" : "#ff5252" }}>
            Target: ${stock.analystTarget} ({targetUpside > 0 ? "+" : ""}{targetUpside}%)
          </span>
        </div>
      </div>

      <div style={{ background: "#0a0e18", borderRadius: 8, padding: 14, border: "1px solid #1e2740" }}>
        <div style={{ fontSize: 10, color: "#ff9800", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6, fontWeight: 700 }}>Verdict & Timing</div>
        <div style={{ fontSize: 13, color: "#e0e0e0", lineHeight: 1.6, marginBottom: 8 }}>{stock.verdict}</div>
        <div style={{ fontSize: 12, color: "#ffcc80", fontStyle: "italic", lineHeight: 1.5 }}>{stock.exitTiming}</div>
      </div>
    </div>
  );
}

function SuggestionsSection() {
  const [tab, setTab] = useState("aggressive");
  const list = tab === "aggressive" ? SUGGESTIONS_AGGRESSIVE : SUGGESTIONS_STABLE;
  return (
    <div style={{ marginTop: 28 }}>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: "#e8eaf6", marginBottom: 12 }}>
        Stock Suggestions Based on Her Profile
      </h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {["aggressive", "stable"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab === t ? (t === "aggressive" ? "#ff5252" : "#2962ff") : "transparent",
            color: tab === t ? "#fff" : "#5a6a8a",
            border: `1px solid ${tab === t ? "transparent" : "#1e2740"}`,
            borderRadius: 6, padding: "6px 16px", fontSize: 12, fontWeight: 700,
            cursor: "pointer", textTransform: "uppercase", letterSpacing: 1
          }}>
            {t === "aggressive" ? "Match Her Style" : "Stabilizers"}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {list.map((s, i) => (
          <div key={i} style={{
            background: "linear-gradient(135deg, #0d1117, #131f2e)",
            border: "1px solid #1e2740", borderRadius: 10, padding: 14
          }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{s.ticker}</div>
            <div style={{ fontSize: 11, color: "#546e7a", marginBottom: 6 }}>{s.name} — {s.sector}</div>
            <div style={{ fontSize: 12, color: "#b0bec5", lineHeight: 1.5 }}>{s.reason}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskMatrix({ stocks }) {
  return (
    <div style={{ marginTop: 28 }}>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: "#e8eaf6", marginBottom: 12 }}>Portfolio Risk Distribution</h3>
      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 140, padding: "0 10px" }}>
        {stocks.map((s, i) => {
          const color = s.healthScore >= 75 ? "#00e676" : s.healthScore >= 50 ? "#ff9800" : "#ff5252";
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 10, color: "#5a6a8a", fontWeight: 600 }}>{s.healthScore}</span>
              <div style={{
                width: "100%", maxWidth: 50, height: `${s.healthScore * 1.2}px`,
                background: `linear-gradient(180deg, ${color}, ${color}44)`,
                borderRadius: "4px 4px 0 0", transition: "height 0.8s ease"
              }} />
              <span style={{ fontSize: 10, color: "#b0bec5", fontWeight: 700 }}>{s.ticker}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "0 10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#00e676" }} />
          <span style={{ fontSize: 10, color: "#5a6a8a" }}>Strong (75+)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#ff9800" }} />
          <span style={{ fontSize: 10, color: "#5a6a8a" }}>Moderate (40-74)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#ff5252" }} />
          <span style={{ fontSize: 10, color: "#5a6a8a" }}>High Risk (&lt;40)</span>
        </div>
      </div>
    </div>
  );
}

export default function StockDashboard() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{
      background: "#080c14", minHeight: "100vh", color: "#e0e0e0",
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      padding: "24px 20px"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e2740; border-radius: 2px; }
      `}</style>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00e5ff", boxShadow: "0 0 8px #00e5ff" }} />
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, letterSpacing: -1, background: "linear-gradient(135deg, #e8eaf6, #5c6bc0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Portfolio Intelligence
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: 12, color: "#546e7a", letterSpacing: 0.5 }}>
          7 Stocks · Analysis as of March 20, 2026 · Not investment advice
        </p>
      </div>

      <PortfolioOverview stocks={STOCKS} />

      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 10, color: "#5a6a8a", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4, fontWeight: 700 }}>Holdings</div>
          {STOCKS.map((s, i) => (
            <StockCard key={s.ticker} stock={s} isSelected={i === selected} onClick={() => setSelected(i)} />
          ))}
        </div>
        <div style={{
          background: "linear-gradient(180deg, #0d1117 0%, #0f1520 100%)",
          border: "1px solid #1a2035", borderRadius: 14, padding: 22, position: "sticky", top: 20, alignSelf: "start"
        }}>
          <DetailPanel stock={STOCKS[selected]} />
        </div>
      </div>

      <RiskMatrix stocks={STOCKS} />
      <SuggestionsSection />

      <div style={{ marginTop: 32, padding: 16, background: "#0a0e18", borderRadius: 10, border: "1px solid #1e2740" }}>
        <div style={{ fontSize: 10, color: "#5a6a8a", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10, fontWeight: 700 }}>Important Disclaimer</div>
        <p style={{ fontSize: 11, color: "#546e7a", lineHeight: 1.7, margin: 0 }}>
          This analysis is for informational and educational purposes only. It does not constitute investment advice, a recommendation, or a solicitation to buy or sell any securities. Stock prices, analyst targets, and projections can change rapidly. Past performance does not guarantee future results. All investments carry risk, including the potential loss of principal. Please consult with a qualified financial advisor before making any investment decisions.
        </p>
      </div>
    </div>
  );
}
