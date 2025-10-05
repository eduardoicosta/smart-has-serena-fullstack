package br.com.smarthas.serena_api.controller;

import br.com.smarthas.serena_api.dto.AuthRequest;
import br.com.smarthas.serena_api.dto.AuthResponse;
import br.com.smarthas.serena_api.dto.RegisterRequest;
import br.com.smarthas.serena_api.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthService authService;

    public AuthenticationController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        System.out.println("=========================================");
        System.out.println(">>> REQUISIÇÃO DE LOGIN RECEBIDA <<<");
        System.out.println(">>> Email recebido: [" + request.email() + "]");
        System.out.println(">>> Senha recebida: [" + request.password() + "]");
        System.out.println("=========================================");
        
        return ResponseEntity.ok(authService.authenticate(request));
    }
}