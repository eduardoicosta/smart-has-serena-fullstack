package br.com.smarthas.serena_api.repository;

import br.com.smarthas.serena_api.model.History;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {

    List<History> findByUserId(Long userId);
}