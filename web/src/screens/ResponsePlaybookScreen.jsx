import { SCENARIOS, weeklyStats } from '../data/mockData';

export default function ResponsePlaybookScreen({ scenarioKey, onBack }) {
  const s = SCENARIOS[scenarioKey];

  return (
    <>
      <header className="app-header colored" style={{ background: '#7f1d1d' }}>
        <button className="back-btn" onClick={onBack}>← 뒤로</button>
        <div>
          <h1>Response Playbook</h1>
          <p>Pillar 3 · SOP·유닛 알림</p>
        </div>
      </header>
      <main className="app-body">
        <p className="section-title">자동 배포 SOP — {s.level}</p>
        {s.sop.map((step, i) => (
          <div key={i} className="sop-item" style={{ borderLeftColor: s.levelColor }}>
            <div>
              <div className="sop-time">{step.time}</div>
              <div className="sop-unit">{step.unit}</div>
              <div className="sop-action">{step.action}</div>
            </div>
          </div>
        ))}

        <p className="section-title" style={{ marginTop: 24 }}>주간 Risk Dashboard</p>
        <div className="metric-row">
          <div className="metric-box"><div className="label">FOD 유사 이벤트</div><div className="value">{weeklyStats.total}</div></div>
          <div className="metric-box"><div className="label">야간 비율</div><div className="value">{weeklyStats.nightRatio}%</div></div>
          <div className="metric-box"><div className="label">핫스팟</div><div className="value" style={{ fontSize: 12 }}>{weeklyStats.hotspots[0]}</div></div>
        </div>

        <div className="status-bar" style={{ marginTop: 20 }}>
          ✅ SOP 타임라인 기록 완료 · Human-in-the-loop 확인 대기
        </div>
      </main>
    </>
  );
}
