package br.com.smarthas.serena_api.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GeminiChatService {
    private final Client client;

    public GeminiChatService(@Value("${google.gemini.api.key}") String apiKey) {
        this.client = Client.builder()
                .apiKey(apiKey)
                .build();
    }

    public String generateResponse(String userMessage) {
        try {
            GenerateContentResponse response = client
                    .models()
                    .generateContent("gemini-2.5-flash", userMessage, null);

            return response.text();
        } catch (Exception e) {
            e.printStackTrace();
            return "Desculpe, não consegui responder agora. Tente novamente.";
        }
    }
}