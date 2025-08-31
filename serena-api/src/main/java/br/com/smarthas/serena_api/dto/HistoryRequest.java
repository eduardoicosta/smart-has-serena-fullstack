package br.com.smarthas.serena_api.dto;

import jakarta.validation.constraints.NotBlank;

public record HistoryRequest(
    @NotBlank String eventDescription
) {
}