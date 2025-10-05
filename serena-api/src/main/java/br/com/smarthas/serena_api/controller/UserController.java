package br.com.smarthas.serena_api.controller;

import br.com.smarthas.serena_api.dto.ChangePasswordRequest;
import br.com.smarthas.serena_api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Usuários", description = "Endpoints para gerenciamento de usuários")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Altera a senha do usuário autenticado",
               description = "Permite que o usuário logado altere sua própria senha. A senha atual é verificada antes da alteração ser aplicada.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Senha alterada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos (ex: senha atual incorreta ou nova senha e confirmação não coincidem)"),
        @ApiResponse(responseCode = "403", description = "Acesso negado (usuário não autenticado)")
    })
    @PutMapping("/change-password")
    public ResponseEntity<Void> changePassword(
            @RequestBody ChangePasswordRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        userService.changePassword(userDetails.getUsername(), request);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Gera um resumo da atividade do usuário",
               description = "Chama uma procedure no banco de dados Oracle para calcular o total de eventos e obter a descrição do evento mais recente de um usuário específico.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Resumo gerado com sucesso"),
        @ApiResponse(responseCode = "403", description = "Acesso negado (usuário não autenticado)"),
        @ApiResponse(responseCode = "404", description = "Usuário com o ID especificado não foi encontrado")
    })
    @GetMapping("/{id}/summary")
    public ResponseEntity<Map<String, Object>> getUserSummary(
            @Parameter(description = "ID do usuário para o qual o resumo será gerado.", example = "1")
            @PathVariable Long id) {
        
        Map<String, Object> summary = userService.getUserSummary(id);
        return ResponseEntity.ok(summary);
    }
}