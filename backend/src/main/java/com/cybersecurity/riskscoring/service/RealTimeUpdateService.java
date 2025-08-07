package com.cybersecurity.riskscoring.service;

import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.concurrent.ThreadLocalRandom;
import java.time.LocalDateTime;

@Service
public class RealTimeUpdateService {
    
    @Autowired
    private EntityDataService entityDataService;
    
    // Update entity activities every 30 seconds to simulate real-time data
    @Scheduled(fixedRate = 30000)
    public void updateEntityActivities() {
        entityDataService.simulateActivityUpdate();
    }
    
    // Update risk scores every minute
    @Scheduled(fixedRate = 60000)
    public void updateRiskScores() {
        // This will trigger recalculation of risk scores based on updated activities
        entityDataService.getEntitiesWithRiskScores();
    }
} 