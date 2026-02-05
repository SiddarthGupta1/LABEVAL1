import { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CountingModule } from './components/CountingModule';
import { SocialSkillsModule } from './components/SocialSkillsModule';
import { CelebrationScreen } from './components/CelebrationScreen';
import { createSession, logProgress } from './lib/supabase.js';
import { ArrowLeft } from 'lucide-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [sessionId, setSessionId] = useState('');
  const [completedModule, setCompletedModule] = useState('');

  useEffect(() => {
    const initSession = async () => {
      const id = await createSession();
      if (id) {
        setSessionId(id);
      }
    };

    initSession();
  }, []);

  const handleSelectModule = (module) => {
    setCurrentScreen(module);
  };

  const handleModuleComplete = (moduleName) => {
    setCompletedModule(moduleName);
    setCurrentScreen('celebration');
  };

  const handleLogProgress = (module, activity, success, attempts) => {
    if (sessionId) {
      logProgress({
        session_id: sessionId,
        module,
        activity,
        success,
        attempts
      });
    }
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onSelectModule={handleSelectModule} />;
      case 'counting':
        return (
          <CountingModule
            sessionId={sessionId}
            onComplete={() => handleModuleComplete('Counting')}
            onLogProgress={handleLogProgress}
          />
        );
      case 'social':
        return (
          <SocialSkillsModule
            sessionId={sessionId}
            onComplete={() => handleModuleComplete('Social Skills')}
            onLogProgress={handleLogProgress}
          />
        );
      case 'celebration':
        return (
          <CelebrationScreen
            moduleName={completedModule}
            onContinue={handleBackToHome}
          />
        );
      default:
        return <HomeScreen onSelectModule={handleSelectModule} />;
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      {currentScreen !== 'home' && currentScreen !== 'celebration' && (
        <button
          onClick={handleBackToHome}
          className="absolute top-6 left-6 z-10 bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-2xl shadow-lg transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Home
        </button>
      )}
      {renderScreen()}
    </div>
  );
}

export default App;
