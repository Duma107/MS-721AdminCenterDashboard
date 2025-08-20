import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TeamsPhone from './components/TeamsPhone';
import Meetings from './components/Meetings';
import TeamsRooms from './components/TeamsRooms';
import Network from './components/Network';
import Users from './components/Users';
import Analytics from './components/Analytics';
import LearningCenter from './components/LearningCenter';

export type ActiveSection = 'dashboard' | 'phone' | 'meetings' | 'rooms' | 'network' | 'users' | 'analytics' | 'learning';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'phone':
        return <TeamsPhone />;
      case 'meetings':
        return <Meetings />;
      case 'rooms':
        return <TeamsRooms />;
      case 'network':
        return <Network />;
      case 'users':
        return <Users />;
      case 'analytics':
        return <Analytics />;
      case 'learning':
        return <LearningCenter />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;