package com.cybersecurity.riskscoring.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.time.LocalDateTime;
import java.io.IOException;

@Service
public class RealTimeNotificationService {
    
    private final Map<String, List<SseEmitter>> emitters = new ConcurrentHashMap<>();
    private final Map<String, Object> lastNotifications = new ConcurrentHashMap<>();
    
    public SseEmitter subscribe(String clientId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        
        emitters.computeIfAbsent(clientId, k -> new CopyOnWriteArrayList<>()).add(emitter);
        
        emitter.onCompletion(() -> removeEmitter(clientId, emitter));
        emitter.onTimeout(() -> removeEmitter(clientId, emitter));
        emitter.onError((ex) -> removeEmitter(clientId, emitter));
        
        // Send initial connection message
        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data(Map.of("message", "Connected to real-time notifications", "timestamp", LocalDateTime.now())));
        } catch (IOException e) {
            removeEmitter(clientId, emitter);
        }
        
        return emitter;
    }
    
    private void removeEmitter(String clientId, SseEmitter emitter) {
        List<SseEmitter> clientEmitters = emitters.get(clientId);
        if (clientEmitters != null) {
            clientEmitters.remove(emitter);
            if (clientEmitters.isEmpty()) {
                emitters.remove(clientId);
            }
        }
    }
    
    public void sendNotification(String clientId, String eventType, Object data) {
        List<SseEmitter> clientEmitters = emitters.get(clientId);
        if (clientEmitters != null) {
            List<SseEmitter> deadEmitters = new ArrayList<>();
            
            for (SseEmitter emitter : clientEmitters) {
                try {
                    Map<String, Object> notification = new HashMap<>();
                    notification.put("type", eventType);
                    notification.put("data", data);
                    notification.put("timestamp", LocalDateTime.now());
                    
                    emitter.send(SseEmitter.event()
                            .name(eventType)
                            .data(notification));
                    
                    lastNotifications.put(clientId + "_" + eventType, notification);
                } catch (IOException e) {
                    deadEmitters.add(emitter);
                }
            }
            
            // Remove dead emitters
            clientEmitters.removeAll(deadEmitters);
        }
    }
    
    public void broadcastNotification(String eventType, Object data) {
        for (String clientId : emitters.keySet()) {
            sendNotification(clientId, eventType, data);
        }
    }
    
    public void sendRiskScoreUpdate(String clientId, String entityId, double riskScore, String riskLevel) {
        Map<String, Object> update = new HashMap<>();
        update.put("entityId", entityId);
        update.put("riskScore", riskScore);
        update.put("riskLevel", riskLevel);
        update.put("timestamp", LocalDateTime.now());
        
        sendNotification(clientId, "risk_score_update", update);
    }
    
    public void sendThreatAlert(String clientId, String threatType, String description, String severity) {
        Map<String, Object> alert = new HashMap<>();
        alert.put("threatType", threatType);
        alert.put("description", description);
        alert.put("severity", severity);
        alert.put("timestamp", LocalDateTime.now());
        
        sendNotification(clientId, "threat_alert", alert);
    }
    
    public void sendSystemStatus(String clientId, String status, String message) {
        Map<String, Object> statusUpdate = new HashMap<>();
        statusUpdate.put("status", status);
        statusUpdate.put("message", message);
        statusUpdate.put("timestamp", LocalDateTime.now());
        
        sendNotification(clientId, "system_status", statusUpdate);
    }
    
    public Map<String, Object> getLastNotification(String clientId, String eventType) {
        return (Map<String, Object>) lastNotifications.get(clientId + "_" + eventType);
    }
    
    public int getActiveConnections() {
        return emitters.size();
    }
} 