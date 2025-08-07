import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'acknowledged' | 'resolved';
  entityId: string;
  entityName: string;
  timestamp: string;
  riskScore: number;
}

const AlertsPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    loadAlerts();
    
    // Refresh alerts every 30 seconds
    const interval = setInterval(() => {
      loadAlerts();
      setLastUpdate(new Date());
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const loadAlerts = () => {
    // Mock alerts data with more realistic security alerts
    const mockAlerts: Alert[] = [
      {
        id: '1',
        title: 'Suspicious Login Attempt Detected',
        description: 'Multiple failed login attempts from IP 192.168.1.100 for user admin@company.com',
        severity: 'critical',
        status: 'active',
        entityId: '1',
        entityName: 'admin@company.com',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        riskScore: 45
      },
      {
        id: '2',
        title: 'Unusual Data Access Pattern',
        description: 'User john.doe@company.com accessing sensitive files outside business hours',
        severity: 'high',
        status: 'acknowledged',
        entityId: '2',
        entityName: 'john.doe@company.com',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        riskScore: 38
      },
      {
        id: '3',
        title: 'Privilege Escalation Attempt',
        description: 'User service.account@company.com attempting to access admin privileges',
        severity: 'critical',
        status: 'active',
        entityId: '3',
        entityName: 'service.account@company.com',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        riskScore: 42
      },
      {
        id: '4',
        title: 'Geographic Anomaly Detected',
        description: 'Login attempt from unusual location (Moscow, RU) for user sales@company.com',
        severity: 'high',
        status: 'active',
        entityId: '4',
        entityName: 'sales@company.com',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        riskScore: 35
      },
      {
        id: '5',
        title: 'Database Connection Anomaly',
        description: 'Unusual database queries detected from development server',
        severity: 'medium',
        status: 'resolved',
        entityId: '5',
        entityName: 'dev-server-01',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        riskScore: 28
      },
      {
        id: '6',
        title: 'Network Traffic Spike',
        description: 'Abnormal network activity detected from marketing department',
        severity: 'medium',
        status: 'acknowledged',
        entityId: '6',
        entityName: 'marketing-dept',
        timestamp: new Date(Date.now() - 2400000).toISOString(),
        riskScore: 22
      },
      {
        id: '7',
        title: 'File Access Violation',
        description: 'Unauthorized access attempt to confidential HR documents',
        severity: 'critical',
        status: 'active',
        entityId: '7',
        entityName: 'temp.user@company.com',
        timestamp: new Date(Date.now() - 150000).toISOString(),
        riskScore: 48
      },
      {
        id: '8',
        title: 'API Rate Limit Exceeded',
        description: 'Excessive API calls detected from external service',
        severity: 'low',
        status: 'resolved',
        entityId: '8',
        entityName: 'external-api-service',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        riskScore: 18
      }
    ];
    setAlerts(mockAlerts);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-100 border-red-200';
      case 'high': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'acknowledged': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = filterSeverity === 'all' || alert.severity === filterSeverity;
    const statusMatch = filterStatus === 'all' || alert.status === filterStatus;
    return severityMatch && statusMatch;
  });

  const handleAcknowledge = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: 'acknowledged' as const } : alert
    ));
  };

  const handleResolve = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' as const } : alert
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Security Alerts</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {filteredAlerts.filter(a => a.status === 'active').length} active alerts
          </span>
          <span className="text-xs text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getStatusIcon(alert.status)}
                  <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{alert.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>Entity: <span className="font-medium">{alert.entityName}</span></span>
                  <span>Risk Score: <span className="font-medium">{alert.riskScore}</span></span>
                  <span>Time: <span className="font-medium">{new Date(alert.timestamp).toLocaleString()}</span></span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {alert.status === 'active' && (
                  <>
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      Acknowledge
                    </button>
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      Resolve
                    </button>
                  </>
                )}
                {alert.status === 'acknowledged' && (
                  <button
                    onClick={() => handleResolve(alert.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Resolve
                  </button>
                )}
                {alert.status === 'resolved' && (
                  <span className="text-green-600 text-sm font-medium">Resolved</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Alerts Found</h3>
          <p className="text-gray-600">
            {filterSeverity !== 'all' || filterStatus !== 'all' 
              ? 'No alerts match your current filters.' 
              : 'All systems are operating normally.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;