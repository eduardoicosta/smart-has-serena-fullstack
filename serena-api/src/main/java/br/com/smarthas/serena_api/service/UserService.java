package br.com.smarthas.serena_api.service;

import br.com.smarthas.serena_api.dto.ChangePasswordRequest;
import br.com.smarthas.serena_api.dto.ProfileResponse;
import br.com.smarthas.serena_api.dto.UserResponse; // <-- NOVO IMPORT
import br.com.smarthas.serena_api.exception.ResourceNotFoundException; // <-- NOVO IMPORT
import br.com.smarthas.serena_api.model.User;
import br.com.smarthas.serena_api.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors; // <-- NOVO IMPORT

@Service
public class UserService {

    // MUDANÇA 1: INJEÇÃO DE DEPENDÊNCIA VIA CONSTRUTOR
    // Removemos @Autowired e tornamos os campos 'final'
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Adicionamos o construtor para receber as dependências
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Este método continua o mesmo
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // MUDANÇA 2: USANDO DTO PARA RETORNAR DADOS SEGUROS
    // Alteramos o tipo de retorno de List<User> para List<UserResponse>
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                // Para cada objeto User, criamos um novo objeto UserResponse
                .map(user -> new UserResponse(user.getId(), user.getName(), user.getEmail()))
                .collect(Collectors.toList());
    }

    // Este método continua o mesmo, pois já retorna um DTO (ProfileResponse)
    public ProfileResponse getUserProfile(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                // MUDANÇA 3: USANDO A EXCEÇÃO CUSTOMIZADA
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com o email: " + userEmail));

        return new ProfileResponse(user.getId(), user.getName(), user.getEmail());
    }
    
    // Este método continua o mesmo
    public void changePassword(String userEmail, ChangePasswordRequest request) {
        User user = userRepository.findByEmail(userEmail)
                // MUDANÇA 3: USANDO A EXCEÇÃO CUSTOMIZADA
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com o email: " + userEmail));

        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new IllegalStateException("Senha atual incorreta");
        }

        if (!request.newPassword().equals(request.confirmationPassword())) {
            throw new IllegalStateException("Nova senha e senha de confirmação não coincidem");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    public Map<String, Object> getUserSummary(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("Usuário com ID " + userId + " não encontrado.");
        }
        return userRepository.generateUserSummary(userId);
    }
}