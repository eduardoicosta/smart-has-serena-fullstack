# 🌱 Serena: Ecossistema de Saúde Mental  
### Smart HAS Full-stack (FIAP)

**Serena** é uma solução *full-stack* de apoio à saúde mental, composta por:

- 🧠 **API (Java + Spring Boot)**
- 📱 **App Mobile (React Native)**
- 🖥️ **Dashboard Web (Angular)**

🎥 **Vídeo demonstrativo:** [YouTube](https://youtu.be/_mJlrOdDJ7c)  
📂 **Repositório oficial:** [github.com/eduardoicosta/smart-has-serena-fullstack](https://github.com/eduardoicosta/smart-has-serena-fullstack)

---

## 🏛️ Estrutura do Monorepo

### `/serena-api`
- **Descrição:** API REST com autenticação (JWT), persistência, lógica em PL/SQL e documentação Swagger  
- **Tecnologias:** Java 21, Spring Boot, Spring Security (JWT), Spring Data JPA, Oracle Database (Docker), PL/SQL, Gemini API 

### `/smart-has-serena`
- **Descrição:** Aplicativo mobile para usuários finais, com integração Google Maps  
- **Tecnologias:** React Native (Expo), TypeScript, React Navigation, Axios  

### `/serena-dashboard`
- **Descrição:** Painel administrativo web  
- **Tecnologias:** Angular, TypeScript, Angular Router, HttpClient  

---

## 💻 Tecnologias Utilizadas

**Back-end:**  
`Java 21`, `Spring Boot`, `Spring Security`, `Oracle Database (Docker)`, `PL/SQL`, `Maven`, `Gemini API`

**Mobile:**  
`React Native (Expo)`, `TypeScript`

**Web:**  
`Angular`, `TypeScript`

**Infra & Docs:**  
`Docker`, `springdoc-openapi (Swagger UI)`, `Git/GitHub`

---

## 🚀 Como Executar

### 🔧 Pré-requisitos
- Java **JDK 21+**  
- Node.js e NPM  
- Angular CLI  
  ```bash
  npm install -g @angular/cli
  ```
- Docker Desktop (para executar o Oracle Database)  
- Google Cloud API Key (para Google Maps e Geocoding)  
- Celular Android (com depuração USB ativada) **ou** Emulador Android (Android Studio)

---

### 🗄️ Banco de Dados Oracle (via Docker)

Antes de iniciar a API, suba o container do Oracle:

```bash
docker run -d --name oracle-serena -p 1521:1521 -e ORACLE_PASSWORD=minhasenha_oracle gvenzl/oracle-xe
```

Após subir o container, conecte-se ao **XEPDB1**  
**Usuário:** `system`  
**Senha:** `minhasenha_oracle`

Em seguida, **execute o script SQL completo** do projeto para criar tabelas, sequences, functions e procedures.

---

### ⚙️ API (`serena-api`)

Após o Oracle estar rodando:

```bash
cd serena-api
./mvnw spring-boot:run
```

Servidor:  
[http://SEU_IP_DA_MAQUINA:8080](http://SEU_IP_DA_MAQUINA:8080)  
(exemplo: `http://192.168.1.4:8080`)

📘 Documentação Swagger UI:  
[http://SEU_IP_DA_MAQUINA:8080/swagger-ui.html](http://SEU_IP_DA_MAQUINA:8080/swagger-ui.html)

---

### 💻 Dashboard (`serena-dashboard`)

```bash
cd serena-dashboard
npm install
ng serve
```

Acesse:  
👉 [http://localhost:4200](http://localhost:4200)

---

### 📱 Mobile (`smart-has-serena`)

> ⚠️ **Importante:** Certifique-se de configurar corretamente o IP do seu computador em  
> `src/services/api.js` (ex: `http://192.168.1.4:8080`).  
> O celular e o computador **devem estar na mesma rede Wi-Fi**.

```bash
cd smart-has-serena
npm install
npx react-native run-android
```

---

## 🗺️ Roadmap (Próximas Evoluções)

| Status | Funcionalidade |
|:------:|----------------|
| ✅ | Autenticação JWT |
| ✅ | Histórico de mensagens |
| ✅ | Dashboard administrativo |
| ✅ | Migração para Oracle Database |
| ✅ | Desenvolvimento de lógica em PL/SQL |
| ✅ | Documentação interativa da API (Swagger UI) |
| ✅ | Refatoração e padrões de código no Backend |
| ✅ | Integração Google Maps API (Geocoding e Places) |
| ✅ | Chat com IA (LLM - Google Gemini) |
| 🔜 | Notificações push (Expo) |
| 🔜 | Animações (react-native-reanimated) |
| ✅ | Integração com ferramentas ManageEngine |
| ✅ | Testes automatizados (Jest + React Native Testing Library) |

---

## 🤝 Contribuição

Este projeto foi desenvolvido como parte da atividade acadêmica da **FIAP**.  
Sugestões e melhorias são muito bem-vindas! 💡

---

## 📄 Licença

Uso **acadêmico e educacional**.
