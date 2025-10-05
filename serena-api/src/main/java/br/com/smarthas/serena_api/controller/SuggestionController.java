package br.com.smarthas.serena_api.controller;

import br.com.smarthas.serena_api.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/suggestions")
public class SuggestionController {

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/daily")
    public ResponseEntity<Map<String, String>> getDailySuggestion() {
        String suggestion = geminiService.generateWellBeingSuggestion();

        Map<String, String> response = Map.of("suggestion", suggestion);
        return ResponseEntity.ok(response);
    }
}