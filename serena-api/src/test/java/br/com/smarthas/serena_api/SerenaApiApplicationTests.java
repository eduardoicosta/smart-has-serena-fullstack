package br.com.smarthas.serena_api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

// 1. Importações necessárias para a nova abordagem
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.mockito.Mockito;
import br.com.smarthas.serena_api.service.GeminiService; // (Confirme o caminho)


@SpringBootTest
class SerenaApiApplicationTests {

	/**
	 * Esta classe interna de configuração é carregada APENAS
	 * durante este teste. Ela cria um "dublê" (mock) do
	 * GeminiService, satisfazendo a dependência do SuggestionController.
	 */
	@TestConfiguration
	static class TestConfig {
		
		@Bean
		public GeminiService geminiService() {
			// Cria um mock (imitação) da interface GeminiService
			return Mockito.mock(GeminiService.class);
		}
	}


	@Test
	void contextLoads() {
		// Este teste agora vai passar, pois o Spring vai encontrar
		// o "GeminiService" falso que definimos acima.
	}

}