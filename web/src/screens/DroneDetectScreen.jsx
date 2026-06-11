import { useState, useEffect } from 'react';
import { SCENARIOS } from '../data/mockData';

function PerimeterMap({ track, geofence, animIndex }) {
  const points = track.slice(0, animIndex + 1);
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <svg viewBox="0 0 100 80" style={{ width: '100%', display: 'block' }}>
      <rect width="100" height="80" fill="#0f172a" />
      <rect x="20" y="15" width="60" height="50" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
      <text x="50" y="42" textAnchor="middle" fill="#475569" fontSize="3">RUNWAY</text>
      <circle cx={geofence.cx} cy={geofence.cy} r={geofence.r} fill="none" stroke="#d97706" strokeWidth="0.6" strokeDasharray="1.5,1" opacity="0.7" />
      <text x={geofence.cx} y={geofence.cy + geofence.r + 4} textAnchor="middle" fill="#d97706" fontSize="2.5">Amber Zone</text>
      {pathD && <path d={pathD} fill="none" stroke="#dc2626" strokeWidth="0.8" />}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 1.8 : 0.8} fill={i === points.length - 1 ? '#dc2626' : '#f87171'} />
      ))}
      {points.length > 0 && (
        <text x={points[points.length - 1].x + 3} y={points[points.length - 1].y} fill="#f87171" fontSize="2.5">UAV</text>
      )}
    </svg>
  );
}

export default function DroneDetectScreen({ base, scenarioKey, onScenarioChange, onBack, onThreat }) {
  const [loading, setLoading] = useState(false);
  const [detected, setDetected] = useState(false);
  const [animIndex, setAnimIndex] = useState(0);
  const scenario = SCENARIOS[scenarioKey];

  const runDetection = async () => {
    setLoading(true);
    setDetected(false);
    setAnimIndex(0);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setDetected(true);
  };

  useEffect(() => {
    if (!detected) return;
    const interval = setInterval(() => {
      setAnimIndex((i) => {
        if (i >= scenario.track.length - 1) {
          clearInterval(interval);
          return i;
        }
        return i + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [detected, scenario.track.length]);

  return (
    <>
      <header className="app-header colored" style={{ background: '#0f172a' }}>
        <button className="back-btn" onClick={onBack}>← 뒤로</button>
        <div>
          <h1>Drone Detect</h1>
          <p>Pillar 1 · RF + 영상 융합</p>
        </div>
      </header>
      <main className="app-body">
        <span className="chip" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4', marginBottom: 16 }}>
          🏛️ {base.name}
        </span>

        <div className="card" style={{ marginBottom: 12 }}>
          <p className="section-title" style={{ fontSize: 13, marginBottom: 8 }}>시나리오</p>
          <select value={scenarioKey} onChange={(e) => { onScenarioChange(e.target.value); setDetected(false); setAnimIndex(0); }}>
            <option value="amber_civilian">민간 촬영용 침투 (AMBER)</option>
            <option value="red_hostile">고속 UAV 접근 (RED)</option>
          </select>
        </div>

        <div className="map-container">
          <PerimeterMap track={scenario.track} geofence={scenario.geofence} animIndex={animIndex} />
        </div>

        {!detected && (
          <button className="btn-primary" style={{ background: '#06b6d4' }} onClick={runDetection} disabled={loading}>
            {loading ? <><span className="spinner" /> RF 스캔 중...</> : '🛰️ 침투 탐지 시뮬레이션'}
          </button>
        )}

        {detected && (
          <>
            <div className="alert-banner" style={{ background: `${scenario.levelColor}22`, border: `1px solid ${scenario.levelColor}`, color: scenario.levelColor }}>
              🚨 {scenario.level} — 비인가 UAV 탐지됨
            </div>
            <div className="card">
              <div className="info-row"><span className="info-label">RF 알림</span><span className="info-value">{scenario.rfAlert}</span></div>
              <div className="info-row"><span className="info-label">PTZ 확인</span><span className="info-value">{scenario.ptzCapture}</span></div>
              <div className="info-row"><span className="info-label">탐지 시간</span><span className="info-value" style={{ color: '#34d399' }}>8초</span></div>
            </div>
            <button className="btn-primary" style={{ background: scenario.levelColor, marginTop: 16 }} onClick={onThreat}>
              위협 분류 → Threat Classify
            </button>
          </>
        )}
      </main>
    </>
  );
}
