import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Users, Activity } from 'lucide-react';
import apiService from '../services/api';

interface AnalyticsData {
  riskDistribution: Array<{ name: string; value: number; color: string }>;
  trendData: Array<{ date: string; averageScore: number; threats: number }>;
  departmentStats: Array<{ department: string; avgRisk: number; count: number }>;
  mlPerformance: {
    isolationForestAccuracy: number;
    randomForestAccuracy: number;
    combinedAccuracy: number;
    falsePositiveRate: number;
    truePositiveRate: number;
  };
  realTimeMetrics: {
    activeThreats: number;
    totalEntities: number;
    highRiskEntities: number;
    systemHealth: string;
  };
}

const AdvancedAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  useEffect(() => {
    loadAnalyticsData();
    const interval = setInterval(loadAnalyticsData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [selectedTimeframe]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate advanced analytics data
      const mockData: AnalyticsData = {
        riskDistribution: [
          { name: 'Low Risk', value: 35, color: '#10B981' },
          { name: 'Medium Risk', value: 28, color: '#F59E0B' },
          { name: 'High Risk', value: 22, color: '#EF4444' },
          { name: 'Critical', value: 15, color: '#7C3AED' }
        ],
        trendData: [
          { date: '00:00', averageScore: 25.3, threats: 12 },
          { date: '04:00', averageScore: 28.7, threats: 18 },
          { date: '08:00', averageScore: 32.1, threats: 25 },
          { date: '12:00', averageScore: 29.8, threats: 22 },
          { date: '16:00', averageScore: 31.5, threats: 28 },
          { date: '20:00', averageScore: 27.2, threats: 15 },
          { date: '24:00', averageScore: 26.8, threats: 13 }
        ],
        departmentStats: [
          { department: 'IT', avgRisk: 38.5, count: 15 },
          { department: 'Finance', avgRisk: 42.1, count: 12 },
          { department: 'HR', avgRisk: 25.3, count: 8 },
          { department: 'Marketing', avgRisk: 31.7, count: 10 },
          { department: 'Sales', avgRisk: 35.2, count: 14 },
          { department: 'Engineering', avgRisk: 28.9, count: 18 }
        ],
        mlPerformance: {
          isolationForestAccuracy: 96.5,
          randomForestAccuracy: 98.2,
          combinedAccuracy: 98.7,
          falsePositiveRate: 1.3,
          truePositiveRate: 97.8
        },
        realTimeMetrics: {
          activeThreats: 156,
          totalEntities: 85,
          highRiskEntities: 22,
          systemHealth: 'EXCELLENT'
        }
      };

      setAnalyticsData(mockData);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'EXCELLENT': return 'text-green-600';
      case 'GOOD': return 'text-blue-600';
      case 'WARNING': return 'text-yellow-600';
      case 'CRITICAL': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
          <span className="text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
        <div className="flex space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Active Threats</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.realTimeMetrics.activeThreats}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Total Entities</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.realTimeMetrics.totalEntities}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">High Risk</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.realTimeMetrics.highRiskEntities}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">System Health</p>
              <p className={`text-lg font-bold ${getHealthColor(analyticsData.realTimeMetrics.systemHealth)}`}>
                {analyticsData.realTimeMetrics.systemHealth}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution Pie Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Analysis Line Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Score Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="averageScore" stroke="#3B82F6" strokeWidth={2} name="Avg Risk Score" />
              <Line type="monotone" dataKey="threats" stroke="#EF4444" strokeWidth={2} name="Threats Detected" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Risk Analysis */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Risk Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.departmentStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgRisk" fill="#3B82F6" name="Average Risk Score" />
              <Bar dataKey="count" fill="#10B981" name="Entity Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ML Performance Metrics */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ML Model Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Isolation Forest Accuracy</span>
              <span className="text-sm font-bold text-blue-600">{analyticsData.mlPerformance.isolationForestAccuracy}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Random Forest Accuracy</span>
              <span className="text-sm font-bold text-green-600">{analyticsData.mlPerformance.randomForestAccuracy}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Combined Accuracy</span>
              <span className="text-sm font-bold text-purple-600">{analyticsData.mlPerformance.combinedAccuracy}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">False Positive Rate</span>
              <span className="text-sm font-bold text-red-600">{analyticsData.mlPerformance.falsePositiveRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">True Positive Rate</span>
              <span className="text-sm font-bold text-green-600">{analyticsData.mlPerformance.truePositiveRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Panel */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">Positive Trend</p>
              <p className="text-sm text-gray-600">Risk scores have decreased by 12% over the last 24 hours</p>
            </div>
          </div>
          <div className="flex items-start">
            <TrendingDown className="h-5 w-5 text-red-600 mr-2 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">Attention Required</p>
              <p className="text-sm text-gray-600">Finance department shows 15% increase in suspicious activities</p>
            </div>
          </div>
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-blue-600 mr-2 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">System Health</p>
              <p className="text-sm text-gray-600">ML models performing at 98.7% accuracy with 1.3% false positives</p>
            </div>
          </div>
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">Recommendation</p>
              <p className="text-sm text-gray-600">Consider implementing additional monitoring for IT department</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics; 