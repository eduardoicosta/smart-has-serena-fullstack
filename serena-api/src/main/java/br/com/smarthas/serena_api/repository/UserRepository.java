package br.com.smarthas.serena_api.repository;

import br.com.smarthas.serena_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.Map;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    // <-- NOVO MÉTODO -->
    /**
     * Chama a Stored Procedure "SP_GENERATE_USER_SUMMARY" do Oracle.
     * O "apelido" "User.generateSummary" é o que definimos na entidade User.
     * @param userId O ID do usuário para o qual gerar o resumo.
     * @return Um Map onde a chave é o nome do parâmetro de saída da procedure.
     */
    @Procedure(name = "User.generateSummary")
    Map<String, Object> generateUserSummary(@Param("p_user_id") Long userId);
}