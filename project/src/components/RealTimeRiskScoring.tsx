import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Users, Activity, Clock, Shield, Zap } from 'lucide-react';
import { apiService } from '../services/api';

interface RiskData {
  entityId: string;
  isolationForestScore: number;
  randomForestScore: number;
  combinedRiskScore: number;
  riskLevel: string;
  lastActivity: string;
  ipAddress: string;
  activityCount: number;
  failedAttempts: number;
  recommendations: string[];
}

interface RiskEvent {
  entityId: string;
  riskScore: number;
  riskLevel: string;
  timestamp: string;
  eventType: string;
  description: string;
}

interface UserSession {
  entityId: string;
  sessionId: string;
  ipAddress: string;
  loginTime: string;
  lastActivity: string;
}

const RealTimeRiskScoring: React.FC = () => {
  const [riskData, setRiskData] = useState<Map<string, RiskData>>(new Map());
  const [riskEvents, setRiskEvents] = useState<RiskEvent[]>([]);
  const [activeSessions, setActiveSessions] = useState<UserSession[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [riskDataResponse, eventsResponse] = await Promise.all([
          apiService.getRealTimeRiskData(),
          apiService.getRiskEvents()
        ]);
        
        // Convert entity risk data to Map
        const riskDataMap = new Map();
        Object.entries(riskDataResponse.entityRiskData || {}).forEach(([key, value]: [string, any]) => {
          riskDataMap.set(key, value);
        });
        
        setRiskData(riskDataMap);
        setRiskEvents(eventsResponse || []);
        setActiveSessions(Object.values(riskDataResponse.activeSessions || {}));
        setIsConnected(true);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error fetching real-time risk data:', error);
        setIsConnected(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-600 bg-red-50';
      case 'HIGH': return 'text-orange-600 bg-orange-50';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50';
      case 'LOW': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskLevelIcon = (level: string) => {
    switch (level) {
      case 'CRITICAL': return <AlertTriangle className="h-4 w-4" />;
      case 'HIGH': return <TrendingUp className="h-4 w-4" />;
      case 'MEDIUM': return <Activity className="h-4 w-4" />;
      case 'LOW': return <Shield className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span className="text-red-700 font-medium">Real-time Risk Scoring Disconnected</span>
        </div>
        <p className="text-red-600 text-sm mt-1">Unable to fetch real-time risk data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Real-time Risk Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{activeSessions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-sm text-gray-600">High Risk Entities</p>
              <p className="text-2xl font-bold text-gray-900">
                {Array.from(riskData.values()).filter(d => d.riskLevel === 'HIGH' || d.riskLevel === 'CRITICAL').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Risk Events</p>
              <p className="text-2xl font-bold text-gray-900">{riskEvents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Avg Risk Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {Array.from(riskData.values()).length > 0 
                  ? Math.round(Array.from(riskData.values()).reduce((sum, d) => sum + d.combinedRiskScore, 0) / Array.from(riskData.values()).length)
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Risk Data Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Real-time Risk Assessment</h3>
          <p className="text-sm text-gray-500">Live risk scores and ML algorithm results</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Combined Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Isolation Forest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Random Forest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from(riskData.entries()).map(([entityId, data]) => (
                <tr key={entityId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entityId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelColor(data.riskLevel)}`}>
                      {getRiskLevelIcon(data.riskLevel)}
                      <span className="ml-1">{data.riskLevel}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{data.combinedRiskScore.toFixed(1)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{data.isolationForestScore.toFixed(1)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{data.randomForestScore.toFixed(1)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{data.activityCount}</div>
                    {data.failedAttempts > 0 && (
                      <div className="text-xs text-red-600">Failed: {data.failedAttempts}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{data.ipAddress}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Events */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Risk Events</h3>
          <p className="text-sm text-gray-500">Recent security events and alerts</p>
        </div>
        <div className="divide-y divide-gray-200">
          {riskEvents.length > 0 ? (
            riskEvents.slice(-10).reverse().map((event, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.entityId}</p>
                      <p className="text-xs text-gray-500">{event.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelColor(event.riskLevel)}`}>
                      {event.riskLevel}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No risk events detected</p>
            </div>
          )}
        </div>
      </div>

      {/* Connection Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-700 font-medium">Real-time Risk Scoring Active</span>
        </div>
        <p className="text-green-600 text-sm mt-1">
          Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString() : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default RealTimeRiskScoring; 