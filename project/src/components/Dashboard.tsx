import React, { useState, useEffect } from 'react';
import { Shield, Users, AlertTriangle, TrendingUp, Activity, Target, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { DashboardStats } from '../types';
import { apiService } from '../services/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [backendStatus, setBackendStatus] = useState<boolean>(true);
  
  // Quick Actions states
  const [quickActionLoading, setQuickActionLoading] = useState<string | null>(null);
  const [quickActionResult, setQuickActionResult] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    loadDashboardStats();
    checkBackendStatus();
  }, []);

  // Clear result message after 5 seconds
  useEffect(() => {
    if (quickActionResult) {
      const timer = setTimeout(() => {
        setQuickActionResult(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [quickActionResult]);

  const checkBackendStatus = async () => {
    const isHealthy = await apiService.healthCheck();
    setBackendStatus(isHealthy);
  };

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const dashboardStats = await apiService.getDashboardStats();
      setStats(dashboardStats);
      setLastUpdated(new Date());
      setBackendStatus(true);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
      // Fallback to mock data if backend is unavailable
      setStats({
        totalEntities: 1247,
        highRiskEntities: 23,
        averageRiskScore: 18.5,
        threatsDetected: 156,
        falsePositiveRate: 2.3,
        accuracyRate: 97.7
      });
      setBackendStatus(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardStats();
    checkBackendStatus();
  };

  // Quick Actions handlers
  const handleRunFullAssessment = async () => {
    try {
      setQuickActionLoading('assessment');
      setQuickActionResult(null);
      const result = await apiService.runFullAssessment();
      setQuickActionResult({
        type: 'success',
        message: `Assessment completed! ${result.entitiesAssessed} entities assessed in ${result.processingTime}`
      });
      // Refresh dashboard stats after assessment
      await loadDashboardStats();
    } catch (error) {
      console.error('Full assessment failed:', error);
      setQuickActionResult({
        type: 'error',
        message: 'Failed to run full assessment. Please try again.'
      });
    } finally {
      setQuickActionLoading(null);
    }
  };

  const handleUpdateModels = async () => {
    try {
      setQuickActionLoading('models');
      setQuickActionResult(null);
      const result = await apiService.updateModels();
      setQuickActionResult({
        type: 'success',
        message: `Models updated! Accuracy improved by ${result.accuracyImprovement}`
      });
    } catch (error) {
      console.error('Model update failed:', error);
      setQuickActionResult({
        type: 'error',
        message: 'Failed to update models. Please try again.'
      });
    } finally {
      setQuickActionLoading(null);
    }
  };

  const handleGenerateReport = async () => {
    try {
      setQuickActionLoading('report');
      setQuickActionResult(null);
      const result = await apiService.generatePdfReport({
        reportType: 'COMPREHENSIVE_RISK_ASSESSMENT',
        includeCharts: true,
        includeRecommendations: true,
        timeframe: 'Last 30 days'
      });
      
      // Download the PDF file
      const pdfBlob = await apiService.downloadPdfFile(result.reportId);
      
      // Create a download link and trigger download
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `risk-assessment-report-${result.reportId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setQuickActionResult({
        type: 'success',
        message: `PDF Report downloaded! Report ID: ${result.reportId} - ${result.fileSize}`
      });
    } catch (error) {
      console.error('Report generation failed:', error);
      setQuickActionResult({
        type: 'error',
        message: 'Failed to generate and download report. Please try again.'
      });
    } finally {
      setQuickActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getRiskColor = (score: number) => {
    if (score >= 40) return 'text-red-600 bg-red-50';
    if (score >= 25) return 'text-orange-600 bg-orange-50';
    if (score >= 15) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-red-600 bg-red-50';
      case 'HIGH':
        return 'text-orange-600 bg-orange-50';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Result Message */}
      {quickActionResult && (
        <div className={`flex items-center space-x-2 p-4 rounded-lg ${
          quickActionResult.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {quickActionResult.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{quickActionResult.message}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Risk Assessment Dashboard</h1>
        <div className="flex items-center space-x-4">
          {/* Backend Status Indicator */}
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            backendStatus 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              backendStatus ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span>{backendStatus ? 'Backend Connected' : 'Backend Disconnected'}</span>
          </div>
          
          <button
            onClick={handleRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Activity className="w-4 h-4" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Entities</p>
              <p className="text-3xl font-bold text-gray-900">{stats?.totalEntities.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk Entities</p>
              <p className="text-3xl font-bold text-red-600">{stats?.highRiskEntities}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Risk Score</p>
              <p className={`text-3xl font-bold ${getRiskColor(stats?.averageRiskScore || 0).split(' ')[0]}`}>
                {stats?.averageRiskScore}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Threats Detected</h3>
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">{stats?.threatsDetected}</div>
          <p className="text-sm text-gray-600">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">False Positive Rate</h3>
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">{stats?.falsePositiveRate}%</div>
          <p className="text-sm text-gray-600">Continuously improving</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Accuracy Rate</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">{stats?.accuracyRate}%</div>
          <p className="text-sm text-gray-600">Model performance</p>
        </div>
      </div>

      {/* Machine Learning Models Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Machine Learning Models</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Isolation Forest</p>
                <p className="text-sm text-green-600">Anomaly Detection</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Random Forest</p>
                <p className="text-sm text-blue-600">Pattern Recognition</p>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Score Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Critical (40-50)</span>
              <span className="text-sm font-medium text-red-600">5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">High (30-39)</span>
              <span className="text-sm font-medium text-orange-600">12%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Medium (20-29)</span>
              <span className="text-sm font-medium text-yellow-600">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Low (5-19)</span>
              <span className="text-sm font-medium text-green-600">55%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={handleRunFullAssessment}
            disabled={quickActionLoading === 'assessment'}
            className={`flex items-center justify-center space-x-2 p-4 border border-blue-200 rounded-lg transition-colors ${
              quickActionLoading === 'assessment'
                ? 'bg-blue-50 cursor-not-allowed'
                : 'hover:bg-blue-50'
            }`}
          >
            {quickActionLoading === 'assessment' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            ) : (
              <Shield className="w-5 h-5 text-blue-600" />
            )}
            <span className="text-blue-600 font-medium">
              {quickActionLoading === 'assessment' ? 'Running...' : 'Run Full Assessment'}
            </span>
          </button>
          
          <button 
            onClick={handleUpdateModels}
            disabled={quickActionLoading === 'models'}
            className={`flex items-center justify-center space-x-2 p-4 border border-green-200 rounded-lg transition-colors ${
              quickActionLoading === 'models'
                ? 'bg-green-50 cursor-not-allowed'
                : 'hover:bg-green-50'
            }`}
          >
            {quickActionLoading === 'models' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
            ) : (
              <TrendingUp className="w-5 h-5 text-green-600" />
            )}
            <span className="text-green-600 font-medium">
              {quickActionLoading === 'models' ? 'Updating...' : 'Update Models'}
            </span>
          </button>
          
          <button 
            onClick={handleGenerateReport}
            disabled={quickActionLoading === 'report'}
            className={`flex items-center justify-center space-x-2 p-4 border border-purple-200 rounded-lg transition-colors ${
              quickActionLoading === 'report'
                ? 'bg-purple-50 cursor-not-allowed'
                : 'hover:bg-purple-50'
            }`}
          >
            {quickActionLoading === 'report' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
            ) : (
              <Target className="w-5 h-5 text-purple-600" />
            )}
            <span className="text-purple-600 font-medium">
              {quickActionLoading === 'report' ? 'Generating...' : 'Generate Report'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;