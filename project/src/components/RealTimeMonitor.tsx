import React, { useState, useEffect } from 'react';
import { Users, Activity, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { apiService } from '../services/api';

interface RealTimeStats {
  activeUsersCount: number;
  riskAssessmentsToday: number;
  alertsGenerated: number;
  averageResponseTime: number;
  timestamp: string;
}

interface ActiveUser {
  entityId: string;
  sessionId: string;
  ipAddress: string;
  loginTime: string;
}

const RealTimeMonitor: React.FC = () => {
  const [stats, setStats] = useState<RealTimeStats | null>(null);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, usersData] = await Promise.all([
          apiService.getRealTimeStats(),
          apiService.getActiveUsers()
        ]);
        
        setStats(statsData);
        setActiveUsers(usersData.activeUsers || []);
        setIsConnected(true);
      } catch (error) {
        console.error('Error fetching real-time data:', error);
        setIsConnected(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isConnected) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span className="text-red-700 font-medium">Backend Disconnected</span>
        </div>
        <p className="text-red-600 text-sm mt-1">Unable to fetch real-time data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.activeUsersCount || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Assessments Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.riskAssessmentsToday || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-sm text-gray-600">Alerts Generated</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.alertsGenerated || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.averageResponseTime || 0}s</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Users List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Active Users</h3>
          <p className="text-sm text-gray-500">Real-time user sessions</p>
        </div>
        <div className="divide-y divide-gray-200">
          {activeUsers.length > 0 ? (
            activeUsers.map((user, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.entityId}</p>
                      <p className="text-xs text-gray-500">IP: {user.ipAddress}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Session: {user.sessionId}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(user.loginTime).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No active users</p>
            </div>
          )}
        </div>
      </div>

      {/* Connection Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-700 font-medium">Connected to Backend</span>
        </div>
        <p className="text-green-600 text-sm mt-1">
          Last updated: {stats?.timestamp ? new Date(stats.timestamp).toLocaleTimeString() : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default RealTimeMonitor; 