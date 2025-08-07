import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EntityList from './components/EntityList';
import RiskAnalysis from './components/RiskAnalysis';
import ThreatDetection from './components/ThreatDetection';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import AlertsPanel from './components/AlertsPanel';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [backendStatus, setBackendStatus] = useState('CONNECTING');

  useEffect(() => {
    checkBackendStatus();
    const interval = setInterval(checkBackendStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/health');
      if (response.ok) {
        setBackendStatus('CONNECTED');
      } else {
        setBackendStatus('DISCONNECTED');
      }
    } catch (error) {
      setBackendStatus('DISCONNECTED');
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard backendStatus={backendStatus} />;
      case 'entities':
        return <EntityList />;
      case 'risk-analysis':
        return <RiskAnalysis />;
      case 'threat-detection':
        return <ThreatDetection />;
      case 'analytics':
        return <AdvancedAnalytics />;
      case 'alerts':
        return <AlertsPanel />;
      default:
        return <Dashboard backendStatus={backendStatus} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
