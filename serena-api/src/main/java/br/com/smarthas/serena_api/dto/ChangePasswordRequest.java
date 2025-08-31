package br.com.smarthas.serena_api.dto;

public record ChangePasswordRequest(
    String currentPassword,
    String newPassword,
    String confirmationPassword
) {
}