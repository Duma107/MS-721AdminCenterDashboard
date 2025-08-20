import React from 'react';
import { 
  Home, 
  Phone, 
  Video, 
  Monitor, 
  Network, 
  Users, 
  BarChart3,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import type { ActiveSection } from '../App';

interface SidebarProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'phone' as const, label: 'Teams Phone', icon: Phone },
    { id: 'meetings' as const, label: 'Meetings & Events', icon: Video },
    { id: 'rooms' as const, label: 'Teams Rooms', icon: Monitor },
    { id: 'network' as const, label: 'Network & QoS', icon: Network },
    { id: 'users' as const, label: 'Users & Policies', icon: Users },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
    { id: 'learning' as const, label: 'MS-721 Learning Center', icon: GraduationCap },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-blue-400">MS-721 Admin Center</h1>
        <p className="text-sm text-gray-400 mt-1">Collaboration Communications</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    isActive ? 'rotate-90' : 'group-hover:translate-x-1'
                  }`} />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          <p>Microsoft Teams Admin</p>
          <p className="text-blue-400">Certification Ready</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;