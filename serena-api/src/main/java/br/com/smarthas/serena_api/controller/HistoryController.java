package br.com.smarthas.serena_api.controller;

import br.com.smarthas.serena_api.dto.HistoryRequest;
import br.com.smarthas.serena_api.dto.HistoryResponse;
import br.com.smarthas.serena_api.service.HistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping
    public ResponseEntity<List<HistoryResponse>> getUserHistory(@AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();
        List<HistoryResponse> history = historyService.getHistoryForUser(userEmail);
        return ResponseEntity.ok(history);
    }

    @PostMapping
    public ResponseEntity<Void> addHistoryRecord(
            @RequestBody HistoryRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        historyService.saveHistoryRecord(userDetails.getUsername(), request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHistoryRecord(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        historyService.deleteHistoryRecord(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}