export interface DashboardStats {
  totalEntities: number;
  highRiskEntities: number;
  mediumRiskEntities: number;
  lowRiskEntities: number;
  averageRiskScore: number;
  activeUsers: number;
  backendStatus: string;
  mlModelStatus: string;
  threatsDetected: number;
  falsePositiveRate: number;
  accuracyRate: number;
}

export interface Entity {
  entityId: string;
  name: string;
  type: string;
  department: string;
  role: string;
  riskScore: number;
  riskLevel: string;
  lastAccessTime: string;
  isActive: boolean;
  isolationForestScore?: number;
  randomForestScore?: number;
  confidence?: number;
}

export interface ActivityLog {
  id?: number;
  entity?: Entity;
  activityType: string; // LOGIN, LOGOUT, DATA_ACCESS, FILE_DOWNLOAD, etc.
  resource: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  isSuccessful: boolean;
  failureReason?: string;
  riskWeight: number;
  sessionId: string;
  additionalData?: string;
}

export interface RiskRule {
  id?: number;
  entity?: Entity;
  ruleName: string;
  ruleType: string; // BEHAVIORAL, ACCESS, TIME_BASED, LOCATION_BASED
  description: string;
  weight: number;
  threshold: number;
  isActive: boolean;
  createdAt: string;
  lastTriggered: string;
  triggerCount: number;
  impactScore: number;
  conditions?: string;
}

export interface Recommendation {
  id?: number;
  entity?: Entity;
  title: string;
  description: string;
  category: string; // CONFIGURATION, FIREWALL, ACCESS_CONTROL, MONITORING
  priority: string; // LOW, MEDIUM, HIGH, CRITICAL
  expectedImpact: number;
  createdAt: string;
  expiresAt: string;
  isImplemented: boolean;
  isAcknowledged: boolean;
  implementationNotes?: string;
  implementedAt?: string;
}

export interface AssessmentResult {
  entityId: string;
  isolationForestScore: number;
  randomForestScore: number;
  combinedRiskScore: number;
  riskLevel: string;
  confidence: number;
  assessmentDate: string;
  recommendations: string[];
}

export interface Alert {
  id: string;
  entityId: string;
  entityName: string;
  alertType: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  timestamp: string;
  isAcknowledged: boolean;
}

export interface RiskTrend {
  date: string;
  riskScore: number;
  entityCount: number;
}

export interface ModelPerformance {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  lastUpdated: string;
}