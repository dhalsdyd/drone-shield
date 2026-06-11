import { baseList } from '../data/mockData';

const features = [
  { id: 'detect', icon: '🛰️', title: 'Drone\nDetect', subtitle: 'Pillar 1 · 데모 메인', color: '#06b6d4', bg: 'rgba(6,182,212,0.15)' },
  { id: 'threat', icon: '⚠️', title: 'Threat\nClassify', subtitle: 'Pillar 2', color: '#d97706', bg: 'rgba(217,119,6,0.15)' },
  { id: 'playbook', icon: '📋', title: 'Response\nPlaybook', subtitle: 'Pillar 3', color: '#dc2626', bg: 'rgba(220,38,38,0.15)' },
];

export default function HomeScreen({ base, onBaseChange, onNavigate, screens }) {
  return (
    <>
      <header className="app-header">
        <h1>DRONE-SHIELD</h1>
        <p>AI 기반 기지 드론 침투 탐지·대응 플랫폼</p>
      </header>
      <main className="app-body">
        <div className="card" style={{ marginBottom: 20 }}>
          <select
            value={base.id}
            onChange={(e) => {
              const b = baseList.find((x) => x.id === e.target.value);
              if (b) onBaseChange(b);
            }}
          >
            {baseList.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} — 활주로 {b.runway}
              </option>
            ))}
          </select>
        </div>

        <div className="alert-banner" style={{ background: 'rgba(5,150,105,0.15)', border: '1px solid rgba(5,150,105,0.4)', color: '#34d399' }}>
          <span className="status-dot" style={{ background: '#059669' }} />
          경계 상태: GREEN — 이상 없음
        </div>

        <p className="section-title">기지방호 업무</p>
        <div className="feature-grid">
          {features.map((f) => (
            <button key={f.id} className="feature-card" onClick={() => onNavigate(screens[f.id] || screens.detect)}>
              <div className="feature-icon" style={{ background: f.bg, color: f.color }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <span>{f.subtitle}</span>
            </button>
          ))}
        </div>

        <div className="status-bar">
          <span>🔒</span>
          엣지 온프레미스 추론 · RF+영상 융합 · 폐쇄망 운용
        </div>
      </main>
    </>
  );
}
