package br.com.smarthas.serena_api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

// 1. IMPORTAR ESTAS DUAS LINHAS
import org.springframework.boot.test.mock.mockito.MockBean;
import br.com.smarthas.serena_api.service.GeminiService; // (Confirme o caminho se estiver errado)

@SpringBootTest
class SerenaApiApplicationTests {

	// 2. ADICIONE ESTA ANOTAÇÃO E LINHA
	// Ela vai "substituir" o seu GeminiService real por um dublê,
	// fazendo o SuggestionController funcionar no teste.
	@MockBean
	private GeminiService geminiService;

	@Test
	void contextLoads() {
		// Este teste agora vai passar, pois o contexto consegue carregar.
	}

}