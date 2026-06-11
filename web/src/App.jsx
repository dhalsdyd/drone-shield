import { useState } from 'react';
import { baseList } from './data/mockData';
import HomeScreen from './screens/HomeScreen';
import DroneDetectScreen from './screens/DroneDetectScreen';
import ThreatClassifyScreen from './screens/ThreatClassifyScreen';
import ResponsePlaybookScreen from './screens/ResponsePlaybookScreen';

const SCREENS = {
  home: 'home',
  detect: 'detect',
  threat: 'threat',
  playbook: 'playbook',
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.home);
  const [base, setBase] = useState(baseList[0]);
  const [scenarioKey, setScenarioKey] = useState('amber_civilian');

  const goHome = () => setScreen(SCREENS.home);

  const renderScreen = () => {
    switch (screen) {
      case SCREENS.home:
        return (
          <HomeScreen
            base={base}
            onBaseChange={setBase}
            onNavigate={setScreen}
            screens={SCREENS}
          />
        );
      case SCREENS.detect:
        return (
          <DroneDetectScreen
            base={base}
            scenarioKey={scenarioKey}
            onScenarioChange={setScenarioKey}
            onBack={goHome}
            onThreat={() => setScreen(SCREENS.threat)}
          />
        );
      case SCREENS.threat:
        return (
          <ThreatClassifyScreen
            scenarioKey={scenarioKey}
            onBack={() => setScreen(SCREENS.detect)}
            onPlaybook={() => setScreen(SCREENS.playbook)}
          />
        );
      case SCREENS.playbook:
        return (
          <ResponsePlaybookScreen
            scenarioKey={scenarioKey}
            onBack={() => setScreen(SCREENS.threat)}
          />
        );
      default:
        return null;
    }
  };

  return <div className="app-shell">{renderScreen()}</div>;
}
