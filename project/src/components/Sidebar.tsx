import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Eye, 
  TrendingUp,
  Bell,
  Activity
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'entities', label: 'Entity Management', icon: Users },
    { id: 'risk-analysis', label: 'Risk Analysis', icon: BarChart3 },
    { id: 'threat-detection', label: 'Threat Detection', icon: Eye },
    { id: 'analytics', label: 'Advanced Analytics', icon: TrendingUp },
    { id: 'alerts', label: 'Security Alerts', icon: Bell }
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">Risk Scoring</h1>
        <p className="text-sm text-gray-600 mt-1">Assessment System</p>
      </div>
      
      <nav className="mt-6 flex-1">
        <div className="px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activePage === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* System Status */}
      <div className="mt-auto px-4 pb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <Activity className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">System Active</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Real-time monitoring enabled
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;