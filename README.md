Serena: Ecossistema de Saúde Mental

Smart HAS Full-stack (FIAP)

Serena é uma solução full-stack de apoio à saúde mental, composta por:
- API (Java + Spring Boot)
- App Mobile (React Native)
- Dashboard Web (Angular)

------------------------------------------------------------------------

Estrutura do Projeto

  -----------------------------------------------------------------------
  Diretório                          Descrição        Tecnologias
  ---------------------------------- ---------------- -------------------
  /serena-api                        API REST com     Java 21, Spring
                                     autenticação,    Boot, Spring
                                     persistência e   Security (JWT),
                                     documentação     Spring Data JPA,
                                     Swagger          PostgreSQL

  /smart-has-serena                  Aplicativo       React Native
                                     mobile para      (Expo), TypeScript,
                                     usuários finais  React Navigation,
                                                      Axios

  /serena-dashboard                  Painel           Angular,
                                     administrativo   TypeScript, Angular
                                     web              Router, HttpClient
  -----------------------------------------------------------------------

------------------------------------------------------------------------

Tecnologias Utilizadas

-   Back-end: Java 21, Spring Boot, Spring Security, PostgreSQL, Maven
-   Mobile: React Native (Expo), TypeScript
-   Web: Angular, TypeScript
-   Infra & Docs: springdoc-openapi (Swagger UI), Git/GitHub

------------------------------------------------------------------------

Como Executar

Pré-requisitos

-   Java JDK 21+
-   Node.js e NPM
-   Angular CLI (npm install -g @angular/cli)
-   PostgreSQL rodando localmente
-   Emulador ou dispositivo Android/iOS

1. API (serena-api)

    cd serena-api
    ./mvnw spring-boot:run
    # Servidor: http://localhost:8080

2. Dashboard (serena-dashboard)

    cd serena-dashboard
    npm install
    ng serve
    # Acesse: http://localhost:4200

3. Mobile (smart-has-serena)

    cd smart-has-serena
    npm install
    npx expo run:android

------------------------------------------------------------------------

Roadmap (Próximas Evoluções)

-   ✅ Autenticação JWT
-   ✅ Histórico de mensagens
-   ✅ Dashboard administrativo
-   🔜 Chat com IA (LLM)
-   🔜 Notificações push (Expo)
-   🔜 Animações (react-native-reanimated)
-   🔜 Integração com ferramentas ManageEngine
-   🔜 Testes automatizados (Jest + React Native Testing Library)

------------------------------------------------------------------------

Contribuição

Este projeto foi desenvolvido como parte da atividade acadêmica da FIAP.
Sugestões e melhorias são bem-vindas!

------------------------------------------------------------------------

Licença

Uso acadêmico e educacional.
