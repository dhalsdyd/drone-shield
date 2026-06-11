import { SCENARIOS } from '../data/mockData';

export default function ThreatClassifyScreen({ scenarioKey, onBack, onPlaybook }) {
  const s = SCENARIOS[scenarioKey];

  return (
    <>
      <header className="app-header colored" style={{ background: '#1e293b' }}>
        <button className="back-btn" onClick={onBack}>← 뒤로</button>
        <div>
          <h1>Threat Classify</h1>
          <p>Pillar 2 · 위협등급·예측 경로</p>
        </div>
      </header>
      <main className="app-body">
        <div className="alert-banner" style={{ background: `${s.levelColor}22`, border: `1px solid ${s.levelColor}`, color: s.levelColor, fontSize: 18 }}>
          위협등급: {s.level}
        </div>

        <div className="card">
          <div className="info-row"><span className="info-label">유형</span><span className="info-value">{s.type}</span></div>
          <div className="info-row"><span className="info-label">속도</span><span className="info-value">{s.speed}</span></div>
          <div className="info-row"><span className="info-label">고도</span><span className="info-value">{s.altitude}</span></div>
          <div className="info-row"><span className="info-label">침투 깊이</span><span className="info-value">{s.depth}</span></div>
          <div className="info-row"><span className="info-label">예측 경로</span><span className="info-value">{s.prediction}</span></div>
        </div>

        <div className="metric-row">
          <div className="metric-box"><div className="label">신뢰도</div><div className="value" style={{ color: '#06b6d4' }}>94%</div></div>
          <div className="metric-box"><div className="label">오탐 확률</div><div className="value" style={{ color: '#34d399' }}>6%</div></div>
          <div className="metric-box"><div className="label">대응 시한</div><div className="value" style={{ color: s.levelColor }}>{s.level === 'RED' ? '90s' : '3m'}</div></div>
        </div>

        <button className="btn-primary" style={{ background: '#dc2626', marginTop: 20 }} onClick={onPlaybook}>
          📋 대응 SOP 실행 → Playbook
        </button>
      </main>
    </>
  );
}
