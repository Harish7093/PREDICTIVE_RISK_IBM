package com.cybersecurity.riskscoring.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class EntityDataService {
    
    private final List<Map<String, Object>> entities;
    private final Map<String, Map<String, Object>> entityActivityData;
    
    public EntityDataService() {
        this.entities = initializeEntities();
        this.entityActivityData = initializeActivityData();
    }
    
    private List<Map<String, Object>> initializeEntities() {
        List<Map<String, Object>> entityList = new ArrayList<>();
        
        // Expanded data for 100 entities
        String[] firstNames = {"John", "Jane", "Bob", "Alice", "Charlie", "Diana", "Ethan", "Fiona", "George", "Helen",
                              "Michael", "Sarah", "David", "Emily", "James", "Lisa", "Robert", "Jennifer", "William", "Amanda",
                              "Richard", "Jessica", "Joseph", "Ashley", "Thomas", "Nicole", "Christopher", "Stephanie", "Daniel", "Melissa",
                              "Matthew", "Lauren", "Anthony", "Rachel", "Mark", "Heather", "Donald", "Michelle", "Steven", "Tiffany",
                              "Paul", "Kimberly", "Andrew", "Amy", "Joshua", "Angela", "Kenneth", "Rebecca", "Kevin", "Laura",
                              "Brian", "Sharon", "George", "Cynthia", "Timothy", "Deborah", "Ronald", "Sandra", "Jason", "Donna",
                              "Edward", "Carol", "Jeffrey", "Ruth", "Ryan", "Julie", "Jacob", "Joyce", "Gary", "Virginia",
                              "Nicholas", "Victoria", "Eric", "Kelly", "Jonathan", "Lauren", "Stephen", "Christine", "Larry", "Emma",
                              "Justin", "Catherine", "Scott", "Martha", "Brandon", "Debra", "Benjamin", "Virginia", "Samuel", "Helen",
                              "Frank", "Diane", "Gregory", "Julie", "Raymond", "Joyce", "Alexander", "Emma", "Patrick", "Catherine"};
        
        String[] lastNames = {"Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
                             "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
                             "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
                             "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
                             "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"};
        
        String[] departments = {"IT", "Finance", "HR", "Marketing", "Sales", "Engineering", "Operations", "Legal", "Research", "Support",
                              "Development", "Quality Assurance", "Product Management", "Customer Success", "Business Intelligence", "Security", "Infrastructure", "Data Science", "Design", "Content"};
        
        String[] roles = {"System Administrator", "Accountant", "HR Manager", "Marketing Manager", "Sales Director", "Senior Developer", 
                         "Operations Manager", "Legal Counsel", "Research Analyst", "Support Specialist", "Software Engineer", "QA Engineer", 
                         "Product Manager", "Customer Success Manager", "Data Analyst", "Security Engineer", "DevOps Engineer", "Data Scientist", 
                         "UX Designer", "Content Writer", "Network Administrator", "Financial Analyst", "Recruiter", "Brand Manager", 
                         "Account Executive", "Frontend Developer", "Backend Developer", "Project Manager", "Compliance Officer", "Business Analyst",
                         "Database Administrator", "Business Intelligence Analyst", "Talent Acquisition Specialist", "Digital Marketing Specialist", 
                         "Sales Manager", "Full Stack Developer", "Test Engineer", "Scrum Master", "Corporate Counsel", "Market Research Analyst",
                         "Cloud Engineer", "Investment Analyst", "Benefits Specialist", "Social Media Manager", "Regional Sales Manager", 
                         "Mobile Developer", "Automation Engineer", "Program Manager", "Legal Assistant", "Data Engineer", "UI Designer",
                         "Security Analyst", "Financial Controller", "Training Coordinator", "Marketing Coordinator", "Inside Sales Rep", 
                         "DevOps Specialist", "QA Lead", "Product Owner", "Legal Analyst", "Research Coordinator", "Technical Writer",
                         "Network Engineer", "Treasury Analyst", "HR Coordinator", "Marketing Assistant", "Sales Development Rep", 
                         "Site Reliability Engineer", "Test Lead", "Release Manager", "Paralegal", "Business Intelligence Developer",
                         "Information Security Analyst", "Cost Accountant", "HR Assistant", "Marketing Specialist", "Sales Coordinator", 
                         "Platform Engineer", "QA Manager", "Agile Coach", "Legal Secretary", "Data Visualization Specialist", "Content Designer",
                         "Cybersecurity Analyst", "Budget Analyst", "Recruiting Coordinator", "Brand Specialist", "Sales Operations", 
                         "Infrastructure Engineer", "Test Manager", "Technical Project Manager", "Legal Researcher", "Machine Learning Engineer",
                         "Security Operations Analyst", "Financial Planning Analyst", "HR Business Partner", "Marketing Operations", "Sales Enablement",
                         "Cloud Architect", "QA Director", "Program Director", "Legal Operations", "Business Intelligence Manager"};
        
        String[] locations = {"New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA", 
                             "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA", "Austin, TX", "Jacksonville, FL", 
                             "Fort Worth, TX", "Columbus, OH", "Charlotte, NC", "San Francisco, CA", "Indianapolis, IN", "Seattle, WA", 
                             "Denver, CO", "Washington, DC", "Boston, MA", "El Paso, TX", "Nashville, TN", "Detroit, MI", "Oklahoma City, OK",
                             "Portland, OR", "Las Vegas, NV", "Memphis, TN", "Louisville, KY", "Baltimore, MD", "Milwaukee, WI"};
        
        for (int i = 0; i < 100; i++) {
            Map<String, Object> entity = new HashMap<>();
            entity.put("entityId", "USER" + String.format("%03d", i + 1));
            entity.put("name", firstNames[i % firstNames.length] + " " + lastNames[i % lastNames.length]);
            entity.put("type", "USER");
            entity.put("department", departments[i % departments.length]);
            entity.put("role", roles[i % roles.length]);
            entity.put("location", locations[i % locations.length]);
            entity.put("lastAccessTime", LocalDateTime.now().minusMinutes(ThreadLocalRandom.current().nextInt(1, 1440)).toString());
            entity.put("isActive", ThreadLocalRandom.current().nextBoolean());
            entity.put("employeeId", "EMP" + String.format("%06d", i + 1));
            entity.put("email", firstNames[i % firstNames.length].toLowerCase() + "." + lastNames[i % lastNames.length].toLowerCase() + "@company.com");
            
            // Generate realistic risk factors with more variation
            entity.put("failedLogins", ThreadLocalRandom.current().nextInt(0, 8));
            entity.put("unusualTimeAccess", ThreadLocalRandom.current().nextDouble(0, 0.8));
            entity.put("suspiciousLocation", ThreadLocalRandom.current().nextDouble(0, 0.6));
            entity.put("dataAccessPattern", ThreadLocalRandom.current().nextDouble(0, 1));
            entity.put("privilegeAbuse", ThreadLocalRandom.current().nextDouble(0, 0.7));
            entity.put("networkAnomalies", ThreadLocalRandom.current().nextInt(0, 5));
            entity.put("dataExfiltrationRisk", ThreadLocalRandom.current().nextDouble(0, 0.5));
            entity.put("insiderThreatScore", ThreadLocalRandom.current().nextDouble(0, 0.8));
            
            entityList.add(entity);
        }
        
        return entityList;
    }
    
    private Map<String, Map<String, Object>> initializeActivityData() {
        Map<String, Map<String, Object>> activityData = new HashMap<>();
        
        for (int i = 0; i < 100; i++) {
            String entityId = "USER" + String.format("%03d", i + 1);
            Map<String, Object> activity = new HashMap<>();
            
            // Create realistic distribution: 60% low risk, 30% medium risk, 10% high risk
            double riskFactor = ThreadLocalRandom.current().nextDouble();
            
            if (riskFactor < 0.6) {
                // Low risk users (60%) - Normal behavior
                activity.put("loginAttempts", ThreadLocalRandom.current().nextInt(5, 50));
                activity.put("failedAttempts", ThreadLocalRandom.current().nextInt(0, 2));
                activity.put("dataAccessCount", ThreadLocalRandom.current().nextInt(20, 200));
                activity.put("privilegedOperations", ThreadLocalRandom.current().nextInt(0, 5));
                activity.put("afterHoursAccess", ThreadLocalRandom.current().nextInt(0, 3));
                activity.put("suspiciousIPs", ThreadLocalRandom.current().nextInt(0, 1));
                activity.put("dataDownloadSize", ThreadLocalRandom.current().nextLong(0, 100000));
                activity.put("dataUploadSize", ThreadLocalRandom.current().nextLong(0, 50000));
                activity.put("sessionDuration", ThreadLocalRandom.current().nextInt(30, 180));
                activity.put("uniqueResourcesAccessed", ThreadLocalRandom.current().nextInt(1, 15));
                activity.put("concurrentSessions", ThreadLocalRandom.current().nextInt(1, 2));
                activity.put("geographicAnomalies", ThreadLocalRandom.current().nextInt(0, 1));
                activity.put("timeAnomalies", ThreadLocalRandom.current().nextInt(0, 2));
                activity.put("privilegeEscalationAttempts", ThreadLocalRandom.current().nextInt(0, 1));
                activity.put("dataAccessVelocity", ThreadLocalRandom.current().nextDouble(0, 30));
            } else if (riskFactor < 0.9) {
                // Medium risk users (30%) - Some suspicious behavior
                activity.put("loginAttempts", ThreadLocalRandom.current().nextInt(30, 120));
                activity.put("failedAttempts", ThreadLocalRandom.current().nextInt(1, 8));
                activity.put("dataAccessCount", ThreadLocalRandom.current().nextInt(100, 500));
                activity.put("privilegedOperations", ThreadLocalRandom.current().nextInt(2, 20));
                activity.put("afterHoursAccess", ThreadLocalRandom.current().nextInt(2, 15));
                activity.put("suspiciousIPs", ThreadLocalRandom.current().nextInt(0, 3));
                activity.put("dataDownloadSize", ThreadLocalRandom.current().nextLong(50000, 500000));
                activity.put("dataUploadSize", ThreadLocalRandom.current().nextLong(20000, 200000));
                activity.put("sessionDuration", ThreadLocalRandom.current().nextInt(60, 300));
                activity.put("uniqueResourcesAccessed", ThreadLocalRandom.current().nextInt(10, 30));
                activity.put("concurrentSessions", ThreadLocalRandom.current().nextInt(1, 3));
                activity.put("geographicAnomalies", ThreadLocalRandom.current().nextInt(0, 2));
                activity.put("timeAnomalies", ThreadLocalRandom.current().nextInt(1, 6));
                activity.put("privilegeEscalationAttempts", ThreadLocalRandom.current().nextInt(0, 2));
                activity.put("dataAccessVelocity", ThreadLocalRandom.current().nextDouble(20, 60));
            } else {
                // High risk users (10%) - Suspicious behavior
                activity.put("loginAttempts", ThreadLocalRandom.current().nextInt(80, 200));
                activity.put("failedAttempts", ThreadLocalRandom.current().nextInt(3, 15));
                activity.put("dataAccessCount", ThreadLocalRandom.current().nextInt(300, 1000));
                activity.put("privilegedOperations", ThreadLocalRandom.current().nextInt(15, 50));
                activity.put("afterHoursAccess", ThreadLocalRandom.current().nextInt(10, 30));
                activity.put("suspiciousIPs", ThreadLocalRandom.current().nextInt(1, 8));
                activity.put("dataDownloadSize", ThreadLocalRandom.current().nextLong(200000, 5000000));
                activity.put("dataUploadSize", ThreadLocalRandom.current().nextLong(100000, 2000000));
                activity.put("sessionDuration", ThreadLocalRandom.current().nextInt(120, 480));
                activity.put("uniqueResourcesAccessed", ThreadLocalRandom.current().nextInt(25, 50));
                activity.put("concurrentSessions", ThreadLocalRandom.current().nextInt(2, 5));
                activity.put("geographicAnomalies", ThreadLocalRandom.current().nextInt(1, 3));
                activity.put("timeAnomalies", ThreadLocalRandom.current().nextInt(3, 10));
                activity.put("privilegeEscalationAttempts", ThreadLocalRandom.current().nextInt(1, 3));
                activity.put("dataAccessVelocity", ThreadLocalRandom.current().nextDouble(50, 100));
            }
            
            activity.put("lastActivity", LocalDateTime.now().minusMinutes(ThreadLocalRandom.current().nextInt(1, 2880)).toString());
            activityData.put(entityId, activity);
        }
        
        return activityData;
    }
    
    public List<Map<String, Object>> getAllEntities() {
        return new ArrayList<>(entities);
    }
    
    public Map<String, Object> getEntity(String entityId) {
        return entities.stream()
                .filter(e -> entityId.equals(e.get("entityId")))
                .findFirst()
                .orElse(null);
    }
    
    public Map<String, Object> getEntityActivity(String entityId) {
        return entityActivityData.get(entityId);
    }
    
    public void updateEntityActivity(String entityId, Map<String, Object> newActivity) {
        Map<String, Object> currentActivity = entityActivityData.get(entityId);
        if (currentActivity != null) {
            currentActivity.putAll(newActivity);
            currentActivity.put("lastUpdated", LocalDateTime.now().toString());
        }
    }
    
    public List<Map<String, Object>> getEntitiesWithRiskScores() {
        List<Map<String, Object>> entitiesWithScores = new ArrayList<>();
        
        for (Map<String, Object> entity : entities) {
            Map<String, Object> entityWithScore = new HashMap<>(entity);
            
            // Calculate risk score based on activity data
            Map<String, Object> activity = entityActivityData.get(entity.get("entityId"));
            if (activity != null) {
                double riskScore = calculateRiskScore(activity);
                entityWithScore.put("riskScore", riskScore);
                entityWithScore.put("riskLevel", determineRiskLevel(riskScore));
            }
            
            entitiesWithScores.add(entityWithScore);
        }
        
        return entitiesWithScores;
    }
    
    private double calculateRiskScore(Map<String, Object> activity) {
        double score = 5.0; // Base score
        
        // Failed login attempts (high impact)
        int failedAttempts = (Integer) activity.getOrDefault("failedAttempts", 0);
        score += failedAttempts * 1.5; // Reduced multiplier
        
        // After hours access (medium impact)
        int afterHoursAccess = (Integer) activity.getOrDefault("afterHoursAccess", 0);
        score += afterHoursAccess * 1.0; // Reduced multiplier
        
        // Suspicious IPs (high impact)
        int suspiciousIPs = (Integer) activity.getOrDefault("suspiciousIPs", 0);
        score += suspiciousIPs * 2.5; // Reduced multiplier
        
        // Privileged operations (medium impact)
        int privilegedOps = (Integer) activity.getOrDefault("privilegedOperations", 0);
        score += privilegedOps * 0.8; // Reduced multiplier
        
        // Large data downloads (high impact)
        long downloadSize = (Long) activity.getOrDefault("dataDownloadSize", 0L);
        if (downloadSize > 1000000) { // > 1MB (increased threshold)
            score += 4.0;
        } else if (downloadSize > 500000) { // > 500KB
            score += 2.0;
        }
        
        // Data uploads (medium impact)
        long uploadSize = (Long) activity.getOrDefault("dataUploadSize", 0L);
        if (uploadSize > 500000) { // > 500KB (increased threshold)
            score += 1.5;
        }
        
        // Geographic anomalies (high impact)
        int geoAnomalies = (Integer) activity.getOrDefault("geographicAnomalies", 0);
        score += geoAnomalies * 2.5; // Reduced multiplier
        
        // Time anomalies (medium impact)
        int timeAnomalies = (Integer) activity.getOrDefault("timeAnomalies", 0);
        score += timeAnomalies * 1.2; // Reduced multiplier
        
        // Privilege escalation attempts (critical impact)
        int privilegeEscalation = (Integer) activity.getOrDefault("privilegeEscalationAttempts", 0);
        score += privilegeEscalation * 5.0; // Reduced multiplier
        
        // High data access velocity (suspicious)
        double accessVelocity = (Double) activity.getOrDefault("dataAccessVelocity", 0.0);
        if (accessVelocity > 80) { // Increased threshold
            score += 2.5;
        }
        
        // Multiple concurrent sessions (suspicious)
        int concurrentSessions = (Integer) activity.getOrDefault("concurrentSessions", 1);
        if (concurrentSessions > 4) { // Increased threshold
            score += 2.0;
        }
        
        // Unusual resource access patterns
        int uniqueResources = (Integer) activity.getOrDefault("uniqueResourcesAccessed", 1);
        if (uniqueResources > 40) { // Increased threshold
            score += 1.5;
        }
        
        // Session duration anomalies
        int sessionDuration = (Integer) activity.getOrDefault("sessionDuration", 60);
        if (sessionDuration > 480) { // > 8 hours (increased threshold)
            score += 1.5;
        }
        
        return Math.min(50.0, Math.max(5.0, score));
    }
    
    private String determineRiskLevel(double score) {
        if (score >= 45) return "CRITICAL";
        if (score >= 35) return "HIGH";
        if (score >= 25) return "MEDIUM";
        return "LOW";
    }
    
    public void simulateActivityUpdate() {
        // Simulate real-time activity updates
        for (Map<String, Object> entity : entities) {
            String entityId = (String) entity.get("entityId");
            Map<String, Object> activity = entityActivityData.get(entityId);
            
            if (activity != null) {
                // Randomly update some activities
                if (ThreadLocalRandom.current().nextDouble() < 0.3) {
                    activity.put("loginAttempts", (Integer) activity.get("loginAttempts") + ThreadLocalRandom.current().nextInt(1, 5));
                }
                
                if (ThreadLocalRandom.current().nextDouble() < 0.1) {
                    activity.put("failedAttempts", (Integer) activity.get("failedAttempts") + 1);
                }
                
                if (ThreadLocalRandom.current().nextDouble() < 0.05) {
                    activity.put("suspiciousIPs", (Integer) activity.get("suspiciousIPs") + 1);
                }
                
                activity.put("lastActivity", LocalDateTime.now().toString());
            }
        }
    }
} 