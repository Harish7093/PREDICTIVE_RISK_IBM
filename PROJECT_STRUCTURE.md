# Project Structure

## 📁 Root Directory
```
project-bolt-sb1-4jkcuzbz/
├── README.md                    # Main project documentation
├── PROJECT_STRUCTURE.md         # This file - project structure overview
├── start-system.bat            # Windows script to start both servers
├── start-system.sh             # Unix/Linux script to start both servers
├── backend/                    # Java Spring Boot backend
└── project/                    # React TypeScript frontend
```

## 🗂️ Backend Structure (Java/Spring Boot)

```
backend/
├── pom.xml                     # Maven project configuration
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── cybersecurity/
│       │           └── riskscoring/
│       │               ├── RiskScoringApplication.java    # Main application class
│       │               ├── controller/
│       │               │   └── RiskAssessmentController.java  # REST API endpoints
│       │               ├── service/
│       │               │   ├── MachineLearningService.java    # ML algorithms implementation
│       │               │   ├── RiskAssessmentService.java     # Risk assessment orchestration
│       │               │   └── DataInitializationService.java # Sample data loader
│       │               ├── model/
│       │               │   ├── Entity.java                    # Entity domain model
│       │               │   ├── ActivityLog.java               # Activity log model
│       │               │   ├── RiskRule.java                  # Risk rule model
│       │               │   └── Recommendation.java            # Recommendation model
│       │               ├── repository/
│       │               │   ├── EntityRepository.java          # Entity data access
│       │               │   ├── ActivityLogRepository.java     # Activity log data access
│       │               │   ├── RiskRuleRepository.java        # Risk rule data access
│       │               │   └── RecommendationRepository.java  # Recommendation data access
│       │               └── dto/
│       │                   └── RiskAssessmentResult.java      # Assessment result DTO
│       └── resources/
│           └── application.properties  # Spring Boot configuration
```

### Backend Components

#### 🎯 Core Services
- **MachineLearningService**: Implements Isolation Forest and Random Forest algorithms
- **RiskAssessmentService**: Orchestrates risk assessment process and generates recommendations
- **DataInitializationService**: Loads sample data for demonstration

#### 📊 Domain Models
- **Entity**: Represents users, systems, or networks being monitored
- **ActivityLog**: Tracks user activities and behaviors
- **RiskRule**: Defines risk assessment rules and patterns
- **Recommendation**: Stores actionable security recommendations

#### 🔧 Data Access
- **EntityRepository**: Manages entity data persistence
- **ActivityLogRepository**: Handles activity log storage and retrieval
- **RiskRuleRepository**: Manages risk rule configurations
- **RecommendationRepository**: Stores and retrieves recommendations

## 🗂️ Frontend Structure (React/TypeScript)

```
project/
├── package.json                 # Node.js dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── index.html                  # Main HTML template
├── src/
│   ├── main.tsx               # React application entry point
│   ├── App.tsx                # Main application component
│   ├── index.css              # Global styles
│   ├── vite-env.d.ts          # Vite environment types
│   ├── components/
│   │   ├── Dashboard.tsx      # Main dashboard component
│   │   ├── EntityList.tsx     # Entity management component
│   │   ├── RiskAnalysis.tsx   # Risk analysis component
│   │   ├── AlertsPanel.tsx    # Alerts and notifications
│   │   ├── Settings.tsx       # System settings
│   │   └── Sidebar.tsx        # Navigation sidebar
│   ├── services/
│   │   └── api.ts             # API service for backend communication
│   └── types/
│       └── index.ts            # TypeScript type definitions
```

### Frontend Components

#### 🎨 UI Components
- **Dashboard**: Main overview with metrics and charts
- **EntityList**: Entity management with risk assessment
- **RiskAnalysis**: Detailed risk analysis and visualization
- **AlertsPanel**: Security alerts and notifications
- **Settings**: System configuration
- **Sidebar**: Navigation and menu

#### 🔌 Services
- **api.ts**: Centralized API service for backend communication

#### 📝 Types
- **index.ts**: TypeScript interfaces for all data models

## 🔄 Data Flow

### 1. Entity Management Flow
```
Frontend → API Service → Backend Controller → Service → Repository → Database
```

### 2. Risk Assessment Flow
```
Entity Data → Activity Logs → ML Service → Risk Assessment → Recommendations → Frontend
```

### 3. Real-time Updates
```
Backend Events → API Endpoints → Frontend State → UI Updates
```

## 🗄️ Database Schema

### Entities Table
- `id`: Primary key
- `entity_id`: Unique entity identifier
- `name`: Entity name
- `type`: USER/SYSTEM/NETWORK
- `department`: Department assignment
- `role`: Entity role
- `risk_score`: Current risk score (5-50)
- `risk_level`: LOW/MEDIUM/HIGH/CRITICAL
- `last_risk_assessment`: Timestamp of last assessment

### Activity Logs Table
- `id`: Primary key
- `entity_id`: Foreign key to entities
- `activity_type`: Type of activity
- `resource`: Accessed resource
- `ip_address`: Source IP address
- `timestamp`: Activity timestamp
- `is_successful`: Success/failure flag
- `risk_weight`: Risk weight for this activity

### Risk Rules Table
- `id`: Primary key
- `entity_id`: Foreign key to entities
- `rule_name`: Rule name
- `rule_type`: Rule category
- `weight`: Rule weight
- `threshold`: Rule threshold
- `is_active`: Active status
- `impact_score`: Rule impact score

### Recommendations Table
- `id`: Primary key
- `entity_id`: Foreign key to entities
- `title`: Recommendation title
- `description`: Detailed description
- `category`: Recommendation category
- `priority`: Priority level
- `expected_impact`: Expected impact score
- `is_implemented`: Implementation status

## 🔧 Configuration Files

### Backend Configuration
- **pom.xml**: Maven dependencies and build configuration
- **application.properties**: Spring Boot application settings
- **RiskScoringApplication.java**: Main application class

### Frontend Configuration
- **package.json**: Node.js dependencies and scripts
- **tsconfig.json**: TypeScript compiler settings
- **vite.config.ts**: Vite build tool configuration
- **tailwind.config.js**: CSS framework configuration

## 🚀 Deployment Structure

### Development
```
Local Development:
├── Backend: http://localhost:8080
├── Frontend: http://localhost:5173
└── Database: H2 in-memory
```

### Production
```
Production Deployment:
├── Backend: Spring Boot JAR on application server
├── Frontend: Built React app on web server/CDN
├── Database: PostgreSQL/MySQL
└── Load Balancer: Nginx/Apache
```

## 📊 Key Features by Component

### Backend Features
- ✅ RESTful API endpoints
- ✅ Machine learning algorithms
- ✅ Risk assessment engine
- ✅ Recommendation system
- ✅ Data persistence
- ✅ Sample data initialization

### Frontend Features
- ✅ Modern React UI
- ✅ Real-time dashboard
- ✅ Entity management
- ✅ Risk assessment modal
- ✅ Search and filtering
- ✅ Responsive design

## 🔒 Security Considerations

### Backend Security
- Input validation and sanitization
- CORS configuration
- Database security
- API endpoint protection

### Frontend Security
- XSS prevention
- CSRF protection
- Secure API communication
- Input validation

## 📈 Performance Optimizations

### Backend Optimizations
- Database indexing
- Caching strategies
- Connection pooling
- Algorithm optimization

### Frontend Optimizations
- Code splitting
- Lazy loading
- Bundle optimization
- Image optimization

---

This structure provides a comprehensive, scalable foundation for the Predictive Risk Scoring Assessment System. 