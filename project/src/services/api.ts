import { DashboardStats, Entity, AssessmentResult, ActivityLog, RiskRule, Recommendation } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Return mock data if API fails
      return {
        totalEntities: 25,
        highRiskEntities: 8,
        mediumRiskEntities: 12,
        lowRiskEntities: 5,
        averageRiskScore: 32.5,
        activeUsers: 15,
        backendStatus: 'DISCONNECTED',
        mlModelStatus: 'INACTIVE'
      };
    }
  }

  // Entities
  async getAllEntities(): Promise<Entity[]> {
    return this.request<Entity[]>('/entities');
  }

  async getEntity(entityId: string): Promise<Entity> {
    const entities = await this.getAllEntities();
    return entities.find(e => e.entityId === entityId)!;
  }

  // Risk Assessment
  async assessEntityRisk(entityId: string): Promise<AssessmentResult> {
    return this.request<AssessmentResult>(`/assess/${entityId}`, {
      method: 'POST',
    });
  }

  // Active Users
  async getActiveUsers(): Promise<any> {
    return this.request<any>('/users/active');
  }

  async userLogin(loginRequest: any): Promise<any> {
    return this.request<any>('/users/login', {
      method: 'POST',
      body: JSON.stringify(loginRequest),
    });
  }

  async userLogout(logoutRequest: any): Promise<any> {
    return this.request<any>('/users/logout', {
      method: 'POST',
      body: JSON.stringify(logoutRequest),
    });
  }

  async recordActivity(activityRequest: any): Promise<any> {
    return this.request<any>('/users/activity', {
      method: 'POST',
      body: JSON.stringify(activityRequest),
    });
  }

  // Real-time Stats
  async getRealTimeStats(): Promise<any> {
    return this.request<any>('/real-time/stats');
  }

  // Real-time Risk Data
  async getRealTimeRiskData(): Promise<any> {
    return this.request<any>('/real-time/risk-data');
  }

  // Risk Events
  async getRiskEvents(): Promise<any> {
    return this.request<any>('/real-time/risk-events');
  }

  // Health Check
  async healthCheck(): Promise<boolean> {
    try {
      await this.request('/health');
      return true;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }

  // Quick Actions
  async runFullAssessment(): Promise<any> {
    return this.request<any>('/assessment/run-full', {
      method: 'POST',
    });
  }

  async updateModels(): Promise<any> {
    return this.request<any>('/models/update', {
      method: 'POST',
    });
  }

  async generateReport(): Promise<any> {
    return this.request<any>('/reports/generate', {
      method: 'POST',
    });
  }

  // Threat Detection
  async detectThreats(): Promise<any> {
    return this.request<any>('/threats/detect');
  }

  async getActiveThreats(): Promise<any> {
    return this.request<any>('/threats/active');
  }

  async mitigateThreat(threatId: string): Promise<any> {
    return this.request<any>(`/threats/${threatId}/mitigate`, {
      method: 'POST',
    });
  }

  async getThreatAnalytics(): Promise<any> {
    return this.request<any>('/threats/analytics');
  }

  // Risk Analysis
  async getRiskScores(): Promise<any> {
    try {
      return await this.request<any>('/risk-analysis/scores');
    } catch (error) {
      console.error('Failed to fetch risk scores:', error);
      throw error;
    }
  }

  async getModelAccuracy(): Promise<any> {
    try {
      return await this.request<any>('/risk-analysis/model-accuracy');
    } catch (error) {
      console.error('Failed to fetch model accuracy:', error);
      throw error;
    }
  }

  async getPatterns(): Promise<any> {
    try {
      return await this.request<any>('/risk-analysis/patterns');
    } catch (error) {
      console.error('Failed to fetch patterns:', error);
      throw error;
    }
  }

  async getRecommendations(): Promise<any> {
    try {
      return await this.request<any>('/risk-analysis/recommendations');
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      throw error;
    }
  }

  // Security Alerts
  async getAlerts(): Promise<any> {
    return this.request<any>('/alerts');
  }

  async acknowledgeAlert(alertId: string): Promise<any> {
    return this.request<any>(`/alerts/${alertId}/acknowledge`, {
      method: 'POST',
    });
  }

  async resolveAlert(alertId: string): Promise<any> {
    return this.request<any>(`/alerts/${alertId}/resolve`, {
      method: 'POST',
    });
  }

  // PDF Reports
  async generatePdfReport(reportRequest: any): Promise<any> {
    return this.request<any>('/reports/generate-pdf', {
      method: 'POST',
      body: JSON.stringify(reportRequest),
    });
  }

  async downloadReport(reportId: string): Promise<any> {
    return this.request<any>(`/reports/download/${reportId}`);
  }

  async downloadPdfFile(reportId: string): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/reports/pdf/${reportId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.blob();
  }
}

export const apiService = new ApiService();