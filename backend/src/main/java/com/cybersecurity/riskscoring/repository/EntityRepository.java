package com.cybersecurity.riskscoring.repository;

import com.cybersecurity.riskscoring.entity.EntityModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EntityRepository extends JpaRepository<EntityModel, Long> {
    
    Optional<EntityModel> findByEntityId(String entityId);
    
    List<EntityModel> findByIsActiveTrue();
    
    List<EntityModel> findByRiskLevel(String riskLevel);
    
    List<EntityModel> findByDepartment(String department);
    
    @Query("SELECT e FROM EntityModel e WHERE e.riskScore >= :minScore")
    List<EntityModel> findByRiskScoreGreaterThanEqual(@Param("minScore") Double minScore);
    
    @Query("SELECT e FROM EntityModel e WHERE e.riskScore BETWEEN :minScore AND :maxScore")
    List<EntityModel> findByRiskScoreBetween(@Param("minScore") Double minScore, @Param("maxScore") Double maxScore);
    
    @Query("SELECT AVG(e.riskScore) FROM EntityModel e WHERE e.isActive = true")
    Double getAverageRiskScore();
    
    @Query("SELECT COUNT(e) FROM EntityModel e WHERE e.riskLevel = :riskLevel")
    Long countByRiskLevel(@Param("riskLevel") String riskLevel);
    
    @Query("SELECT e FROM EntityModel e WHERE e.failedLogins > :threshold")
    List<EntityModel> findByFailedLoginsGreaterThan(@Param("threshold") Integer threshold);
    
    @Query("SELECT e FROM EntityModel e WHERE e.suspiciousLocation > :threshold")
    List<EntityModel> findBySuspiciousLocationGreaterThan(@Param("threshold") Double threshold);
} 