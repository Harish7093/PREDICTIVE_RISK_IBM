# 🛡️ Cybersecurity Risk Scoring System

A comprehensive real-time cybersecurity risk assessment platform that uses Machine Learning to detect insider threats and security anomalies.

## 🚀 Features

### 📊 **Dashboard**
- Real-time risk scoring overview
- Quick actions (Run Full Assessment, Update Models, Generate Report)
- System status monitoring
- PDF report generation with direct download

### 👥 **Entity Management** 
- **100 Realistic Entities** with diverse profiles
- Real-time risk assessment for each entity
- Advanced filtering and search capabilities
- Pagination for large datasets (20 entities per page)
- Individual entity risk analysis with ML scores

### 🔍 **Risk Analysis**
- **Isolation Forest** anomaly detection
- **Random Forest** pattern recognition  
- **15 ML Features** for comprehensive analysis:
  - Failed login attempts
  - Unusual time access patterns
  - Suspicious location detection
  - Data access patterns
  - Privilege abuse indicators
  - Geographic anomalies
  - Time anomalies
  - Privilege escalation attempts
  - Data access velocity
  - Concurrent sessions
  - Resource access patterns
  - Session duration analysis
  - Network anomalies
  - Data exfiltration risk
  - Insider threat scoring

### 🚨 **Real-time Threat Detection**
- **Live Threat Monitoring** with real-time updates
- **Threat Analytics** with distribution charts
- **Mitigation Actions** for active threats
- **Threat Types Detected**:
  - Brute Force Attempts
  - Suspicious Login Locations
  - Unusual Access Patterns
  - Multiple Failed Logins
  - After Hours Access
  - Privileged Account Abuse
  - Data Exfiltration Attempts
  - Malware Detection
  - Phishing Attempts
  - Insider Threat Indicators

### 📈 **Advanced Analytics**
- Interactive charts and visualizations
- Risk distribution analysis
- Trend analysis and predictions
- Performance metrics

### 🔔 **Security Alerts**
- **8 Realistic Alert Types** with real-time updates
- Alert filtering by severity and status
- Acknowledge and resolve functionality
- Auto-refresh every 30 seconds

## 🏗️ Architecture

### **Backend (Java Spring Boot)**
- **Spring Boot 3.2.0** with RESTful APIs
- **H2 Database** for data persistence
- **Machine Learning Services**:
  - Isolation Forest for anomaly detection
  - Random Forest for pattern recognition
  - Advanced feature extraction (15 features)
- **Real-time Updates** with scheduled tasks
- **PDF Generation** for reports

### **Frontend (React + TypeScript)**
- **React 18** with TypeScript
- **Tailwind CSS** for modern UI
- **Lucide React** for icons
- **Recharts** for data visualization
- **Real-time Updates** with auto-refresh
- **Responsive Design** for all devices

## 📊 **Dataset & ML Features**

### **100 Entity Dataset**
- **Diverse User Profiles**: 100 realistic employees
- **Multiple Departments**: IT, Finance, HR, Marketing, Sales, Engineering, Operations, Legal, Research, Support, Development, QA, Product Management, Customer Success, Business Intelligence, Security, Infrastructure, Data Science, Design, Content
- **Various Roles**: 80+ different job titles
- **Geographic Distribution**: 30+ US cities
- **Realistic Activity Patterns**: Login attempts, data access, privileged operations

### **15 ML Features for Training**
1. **Failed Login Attempts** (0-15 range)
2. **Unusual Time Access** (0-0.8 normalized)
3. **Suspicious Location** (0-0.6 normalized)
4. **Data Access Pattern** (0-1 normalized)
5. **Privilege Abuse** (0-0.7 normalized)
6. **Login Attempts** (5-200, normalized)
7. **Failed Attempts** (0-15, normalized)
8. **Data Access Count** (20-1000, normalized)
9. **Privileged Operations** (0-50, normalized)
10. **After Hours Access** (0-30, normalized)
11. **Suspicious IPs** (0-8, normalized)
12. **Data Download Size** (0-5MB, normalized)
13. **Geographic Anomalies** (0-3, normalized)
14. **Time Anomalies** (0-10, normalized)
15. **Privilege Escalation Attempts** (0-3, normalized)

### **Risk Scoring Algorithm**
- **Base Score**: 5.0 (minimum)
- **Maximum Score**: 50.0
- **Risk Levels**: LOW (5-19), MEDIUM (20-29), HIGH (30-39), CRITICAL (40-50)
- **Combined ML Approach**: Isolation Forest (60%) + Random Forest (40%)

## 🚀 Quick Start

### **Prerequisites**
- Java 17+
- Node.js 16+
- Maven 3.6+

### **Backend Setup**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
Backend will start on `http://localhost:8080`

### **Frontend Setup**
   ```bash
   cd project
   npm install
   npm run dev
```
Frontend will start on `http://localhost:5173`

## 📋 API Endpoints

### **Dashboard**
- `GET /api/dashboard/stats` - Dashboard statistics
- `POST /api/assessment/run-full` - Run full assessment
- `POST /api/models/update` - Update ML models
- `POST /api/reports/generate` - Generate report

### **Entities**
- `GET /api/entities` - Get all entities (100 entities)
- `POST /api/assess/{entityId}` - Assess specific entity

### **Risk Analysis**
- `GET /api/risk-analysis/scores` - Risk scores
- `GET /api/risk-analysis/model-accuracy` - ML model performance
- `GET /api/risk-analysis/patterns` - Detected patterns
- `GET /api/risk-analysis/recommendations` - Actionable recommendations

### **Threat Detection**
- `GET /api/threats/detect` - Detect threats
- `GET /api/threats/active` - Get active threats
- `POST /api/threats/{threatId}/mitigate` - Mitigate threat
- `GET /api/threats/analytics` - Threat analytics

### **Security Alerts**
- `GET /api/alerts` - Get security alerts
- `POST /api/alerts/{alertId}/acknowledge` - Acknowledge alert
- `POST /api/alerts/{alertId}/resolve` - Resolve alert

### **Reports**
- `POST /api/reports/generate-pdf` - Generate PDF report
- `GET /api/reports/pdf/{reportId}` - Download PDF report

## 🎯 **Hackathon Ready Features**

### **Real-time Capabilities**
- ✅ Live threat detection and monitoring
- ✅ Real-time risk score updates
- ✅ Auto-refresh every 30 seconds
- ✅ Dynamic ML model performance

### **Professional UI/UX**
- ✅ Modern, responsive design
- ✅ Loading states and error handling
- ✅ Interactive charts and visualizations
- ✅ Pagination for large datasets

### **Comprehensive Security Features**
- ✅ 100 realistic entity profiles
- ✅ 15 ML features for training
- ✅ Multiple threat detection types
- ✅ Realistic security alerts
- ✅ PDF report generation

### **ML Implementation**
- ✅ Isolation Forest for anomaly detection
- ✅ Random Forest for pattern recognition
- ✅ Feature normalization and scaling
- ✅ Confidence scoring
- ✅ Model performance metrics

## 🔧 **Technical Stack**

### **Backend**
- **Java 17** with Spring Boot 3.2.0
- **Spring Security** for authentication
- **Spring Data JPA** for data persistence
- **H2 Database** (in-memory)
- **Machine Learning** (simulated with realistic algorithms)
- **PDF Generation** for reports
- **Scheduled Tasks** for real-time updates

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Recharts** for data visualization
- **Real-time updates** with auto-refresh

## 📈 **Performance Metrics**

- **100 Entities** with realistic data
- **15 ML Features** for comprehensive analysis
- **Real-time Updates** every 30 seconds
- **PDF Generation** with direct download
- **Responsive UI** for all devices
- **Professional Security Dashboard** ready for hackathon

## 🏆 **Perfect for Hackathons**

This project demonstrates:
- **Real-time cybersecurity monitoring**
- **Machine Learning implementation**
- **Professional UI/UX design**
- **Comprehensive feature set**
- **Scalable architecture**
- **Production-ready code quality**

**Ready to impress judges with a full-featured cybersecurity risk assessment platform!** 🚀 
