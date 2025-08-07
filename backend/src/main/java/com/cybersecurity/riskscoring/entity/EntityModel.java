package com.cybersecurity.riskscoring.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "entities")
public class EntityModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "entity_id", unique = true, nullable = false)
    private String entityId;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "type")
    private String type;
    
    @Column(name = "department")
    private String department;
    
    @Column(name = "role")
    private String role;
    
    @Column(name = "risk_score")
    private Double riskScore;
    
    @Column(name = "risk_level")
    private String riskLevel;
    
    @Column(name = "last_access_time")
    private LocalDateTime lastAccessTime;
    
    @Column(name = "is_active")
    private Boolean isActive;
    
    @Column(name = "failed_logins")
    private Integer failedLogins;
    
    @Column(name = "unusual_time_access")
    private Double unusualTimeAccess;
    
    @Column(name = "suspicious_location")
    private Double suspiciousLocation;
    
    @Column(name = "data_access_pattern")
    private Double dataAccessPattern;
    
    @Column(name = "privilege_abuse")
    private Double privilegeAbuse;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public EntityModel() {}
    
    public EntityModel(String entityId, String name, String type, String department, String role) {
        this.entityId = entityId;
        this.name = name;
        this.type = type;
        this.department = department;
        this.role = role;
        this.isActive = true;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getEntityId() { return entityId; }
    public void setEntityId(String entityId) { this.entityId = entityId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public Double getRiskScore() { return riskScore; }
    public void setRiskScore(Double riskScore) { this.riskScore = riskScore; }
    
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    
    public LocalDateTime getLastAccessTime() { return lastAccessTime; }
    public void setLastAccessTime(LocalDateTime lastAccessTime) { this.lastAccessTime = lastAccessTime; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public Integer getFailedLogins() { return failedLogins; }
    public void setFailedLogins(Integer failedLogins) { this.failedLogins = failedLogins; }
    
    public Double getUnusualTimeAccess() { return unusualTimeAccess; }
    public void setUnusualTimeAccess(Double unusualTimeAccess) { this.unusualTimeAccess = unusualTimeAccess; }
    
    public Double getSuspiciousLocation() { return suspiciousLocation; }
    public void setSuspiciousLocation(Double suspiciousLocation) { this.suspiciousLocation = suspiciousLocation; }
    
    public Double getDataAccessPattern() { return dataAccessPattern; }
    public void setDataAccessPattern(Double dataAccessPattern) { this.dataAccessPattern = dataAccessPattern; }
    
    public Double getPrivilegeAbuse() { return privilegeAbuse; }
    public void setPrivilegeAbuse(Double privilegeAbuse) { this.privilegeAbuse = privilegeAbuse; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
} 