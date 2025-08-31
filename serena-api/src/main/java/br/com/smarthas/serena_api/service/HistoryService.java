package br.com.smarthas.serena_api.service;

import br.com.smarthas.serena_api.dto.HistoryRequest;
import br.com.smarthas.serena_api.dto.HistoryResponse;
import br.com.smarthas.serena_api.model.History;
import br.com.smarthas.serena_api.model.User;
import br.com.smarthas.serena_api.repository.HistoryRepository;
import br.com.smarthas.serena_api.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoryService {

    private final HistoryRepository historyRepository;
    private final UserRepository userRepository;

    public HistoryService(HistoryRepository historyRepository, UserRepository userRepository) {
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
    }

    public List<HistoryResponse> getHistoryForUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + userEmail));
        List<History> historyRecords = historyRepository.findByUserId(user.getId());
        return historyRecords.stream()
                .map(record -> new HistoryResponse(
                        record.getId(),
                        record.getEventDescription(),
                        record.getEventTimestamp()))
                .collect(Collectors.toList());
    }

    public void saveHistoryRecord(String userEmail, HistoryRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + userEmail));

        History newRecord = new History();
        newRecord.setUser(user);
        newRecord.setEventDescription(request.eventDescription());
        newRecord.setEventTimestamp(LocalDateTime.now());

        historyRepository.save(newRecord);
    }

    /**
     * Apaga um registro de histórico, verificando se pertence ao usuário logado.
     * @param recordId O ID do registro a ser apagado.
     * @param userEmail O email do usuário que está fazendo a requisição.
     */
    public void deleteHistoryRecord(Long recordId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + userEmail));

        History historyRecord = historyRepository.findById(recordId)
                .orElseThrow(() -> new IllegalStateException("Registro de histórico não encontrado"));

        if (!historyRecord.getUser().getId().equals(user.getId())) {
            throw new IllegalStateException("Acesso negado: Você não pode apagar o histórico de outro usuário.");
        }

        historyRepository.deleteById(recordId);
    }
}