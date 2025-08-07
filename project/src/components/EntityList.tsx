import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertTriangle, Shield, Users, Activity, Eye, RefreshCw } from 'lucide-react';
import { Entity, AssessmentResult } from '../types';
import { apiService } from '../services/api';

const EntityList: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [filteredEntities, setFilteredEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [assessing, setAssessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    loadEntities();
  }, []);

  useEffect(() => {
    filterEntities();
    setCurrentPage(1); // Reset to first page when filters change
  }, [entities, searchTerm, riskFilter]);

  const loadEntities = async () => {
    try {
      setLoading(true);
      const entitiesData = await apiService.getAllEntities();
      setEntities(entitiesData);
    } catch (error) {
      console.error('Failed to load entities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEntities = () => {
    let filtered = entities;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(entity =>
        entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply risk filter
    if (riskFilter !== 'all') {
      filtered = filtered.filter(entity => entity.riskLevel === riskFilter);
    }

    setFilteredEntities(filtered);
  };

  const assessEntityRisk = async (entityId: string) => {
    try {
      setAssessing(true);
      const result = await apiService.assessEntityRisk(entityId);
      setAssessmentResult(result);
      
      // Update the entity in the list with new risk score
      setEntities(prev => prev.map(entity => 
        entity.entityId === entityId 
          ? { 
              ...entity, 
              riskScore: result.combinedRiskScore, 
              riskLevel: result.riskLevel,
              isolationForestScore: result.isolationForestScore,
              randomForestScore: result.randomForestScore
            }
          : entity
      ));
    } catch (error) {
      console.error('Failed to assess entity risk:', error);
    } finally {
      setAssessing(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 40) return 'text-red-600';
    if (score >= 30) return 'text-orange-600';
    if (score >= 20) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredEntities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntities = filteredEntities.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Entity Management</h1>
        <button
          onClick={loadEntities}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Entity Details Drawer/Modal */}
      {selectedEntity && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedEntity(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Entity Details</h2>
            <div className="mb-2"><span className="font-semibold">Name:</span> {selectedEntity.name}</div>
            <div className="mb-2"><span className="font-semibold">Entity ID:</span> {selectedEntity.entityId}</div>
            <div className="mb-2"><span className="font-semibold">Department:</span> {selectedEntity.department}</div>
            <div className="mb-2"><span className="font-semibold">Role:</span> {selectedEntity.role}</div>
            <div className="mb-2"><span className="font-semibold">Risk Level:</span> {selectedEntity.riskLevel}</div>
            <div className="mb-2"><span className="font-semibold">Risk Score:</span> {selectedEntity.riskScore}</div>
            <div className="mb-2"><span className="font-semibold">Last Access:</span> {selectedEntity.lastAccessTime ? new Date(selectedEntity.lastAccessTime).toLocaleString() : 'N/A'}</div>
            {assessmentResult && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Latest Risk Assessment</h3>
                <div><span className="font-semibold">Combined Score:</span> {assessmentResult.combinedRiskScore}</div>
                <div><span className="font-semibold">Isolation Forest:</span> {assessmentResult.isolationForestScore}</div>
                <div><span className="font-semibold">Random Forest:</span> {assessmentResult.randomForestScore}</div>
                <div><span className="font-semibold">Risk Level:</span> {assessmentResult.riskLevel}</div>
                <div><span className="font-semibold">Timestamp:</span> {assessmentResult.timestamp ? new Date(assessmentResult.timestamp).toLocaleString() : ''}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search entities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Risk Levels</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
            <option value="CRITICAL">Critical Risk</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Total Entities</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{entities.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-gray-600">High Risk</span>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {entities.filter(e => e.riskLevel === 'HIGH' || e.riskLevel === 'CRITICAL').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Low Risk</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {entities.filter(e => e.riskLevel === 'LOW').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-600">Avg Score</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {(entities.reduce((sum, e) => sum + e.riskScore, 0) / entities.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Entity List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Assessment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntities.map((entity) => (
                <tr key={entity.entityId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{entity.name}</div>
                      <div className="text-sm text-gray-500">{entity.entityId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {entity.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entity.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getRiskScoreColor(entity.riskScore)}`}>
                      {entity.riskScore.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskColor(entity.riskLevel)}`}>
                      {entity.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entity.lastAccessTime ? new Date(entity.lastAccessTime).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedEntity(entity);
                          assessEntityRisk(entity.entityId);
                        }}
                        disabled={assessing}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-900 disabled:opacity-50"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Access</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-4 py-3 bg-white border border-gray-200 rounded-lg">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, filteredEntities.length)}</span> of{' '}
                <span className="font-medium">{filteredEntities.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Result Modal */}
      {selectedEntity && assessmentResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Risk Assessment Result</h2>
                <button
                  onClick={() => {
                    setSelectedEntity(null);
                    setAssessmentResult(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Entity Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Entity Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <span className="ml-2 font-medium">{selectedEntity.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">ID:</span>
                      <span className="ml-2 font-medium">{assessmentResult.entityId}</span>
                    </div>
                  </div>
                </div>

                {/* Risk Scores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Combined Risk Score</h4>
                    <p className={`text-2xl font-bold ${getRiskScoreColor(assessmentResult.combinedRiskScore)}`}>
                      {assessmentResult.combinedRiskScore.toFixed(1)}
                    </p>
                    <p className={`text-sm ${getRiskColor(assessmentResult.riskLevel).split(' ')[0]}`}>
                      {assessmentResult.riskLevel}
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Isolation Forest</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {assessmentResult.isolationForestScore.toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-500">Anomaly Detection</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Random Forest</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {assessmentResult.randomForestScore.toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-500">Pattern Recognition</p>
                  </div>
                </div>

                {/* Assessment Date */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Assessment Date</h4>
                  <p className="text-sm text-gray-900">
                    {new Date(assessmentResult.assessmentDate).toLocaleString()}
                  </p>
                </div>

                {/* Confidence Score */}
                {assessmentResult.confidence && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Model Confidence</h4>
                    <p className="text-sm text-gray-900">
                      {(assessmentResult.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                )}

                {/* Recommendations */}
                {assessmentResult.recommendations && assessmentResult.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                    <div className="space-y-3">
                      {assessmentResult.recommendations.map((rec, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm text-gray-700">{rec}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntityList;