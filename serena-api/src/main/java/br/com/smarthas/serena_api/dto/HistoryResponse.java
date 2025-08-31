package br.com.smarthas.serena_api.dto;

import java.time.LocalDateTime;

public record HistoryResponse(
    Long id,
    String eventDescription,
    LocalDateTime eventTimestamp
) {
}