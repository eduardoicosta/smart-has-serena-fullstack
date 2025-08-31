package br.com.smarthas.serena_api.controller;

import br.com.smarthas.serena_api.dto.ProfileResponse;
import br.com.smarthas.serena_api.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ProfileResponse> getUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();

        ProfileResponse profile = userService.getUserProfile(userEmail);

        return ResponseEntity.ok(profile);
    }
}