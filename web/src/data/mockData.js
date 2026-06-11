export const baseList = [
  { id: 'osan', name: '오산비행단', runway: '09L/27R', status: 'green' },
  { id: 'gunsan', name: '군산비행단', runway: '18/36', status: 'green' },
  { id: 'daegu', name: '대구비행단', runway: '12/30', status: 'green' },
];

export const SCENARIOS = {
  amber_civilian: {
    id: 'amber_civilian',
    level: 'AMBER',
    levelColor: '#d97706',
    type: '민간 촬영용 쿼드콥터',
    speed: '12 m/s',
    altitude: '85 m',
    depth: '펜스 외곽 120m (Amber Zone)',
    prediction: '북서 방향 이동, 3분 내 Green Zone 접근 예상',
    rfAlert: '2.4GHz RC 신호 감지 — Sector NW-3',
    ptzCapture: 'DJI Phantom급 4로터 확인',
    track: [
      { x: 12, y: 72 }, { x: 18, y: 65 }, { x: 25, y: 58 },
      { x: 32, y: 52 }, { x: 38, y: 48 }, { x: 44, y: 44 },
    ],
    geofence: { cx: 50, cy: 40, r: 28 },
    sop: [
      { time: 'T+0s', unit: '관제실', action: 'AMBER 알림 발령, PTZ NW-3 자동 추적' },
      { time: 'T+10s', unit: '경계병', action: 'Sector NW 펜스 라인 육안 확인 대기' },
      { time: 'T+30s', unit: '관제실', action: '민간 드론 신고 절차 안내 (112·항공관제 연계)' },
      { time: 'T+60s', unit: 'PTZ', action: '촬영 증거 영상 저장, 궤적 로그 DELIIS 외 로컬 DB' },
    ],
  },
  red_hostile: {
    id: 'red_hostile',
    level: 'RED',
    levelColor: '#dc2626',
    type: '고속 소형 UAV (적대적 접근)',
    speed: '28 m/s',
    altitude: '45 m',
    depth: 'Green Zone 침범 (활주로 인근)',
    prediction: '남동→활주로 측면 직접 접근, 90초 내 위험',
    rfAlert: '비표준 주파수 펄스 — Sector SE-1',
    ptzCapture: '고정익 소형기 의심 — 확인 요망',
    track: [
      { x: 78, y: 22 }, { x: 70, y: 28 }, { x: 62, y: 35 },
      { x: 54, y: 40 }, { x: 48, y: 42 }, { x: 42, y: 44 },
    ],
    geofence: { cx: 50, cy: 40, r: 28 },
    sop: [
      { time: 'T+0s', unit: '관제실', action: 'RED 경보 — 활주로 운용 일시 중단 권고' },
      { time: 'T+5s', unit: '경계병', action: '전 구역 경계 강화, 대피 방송' },
      { time: 'T+15s', unit: '지휘관', action: '대응 재밍 구역·ROE 확인' },
      { time: 'T+30s', unit: '전 유닛', action: 'SOP 타임라인 기록·사후 보고 자동 생성' },
    ],
  },
};

export const weeklyStats = {
  total: 12,
  nightRatio: 40,
  hotspots: ['NW-3', 'SE-1', 'Fence-B'],
};
