---
trigger: model_decision
description: When working in the SpringBoot API Rest from package "api"
---

# Spring Boot REST API Standards

## 🧭 Visão Geral

Este arquivo define os padrões arquiteturais, tecnológicos e de código para APIs REST desenvolvidas com Spring Boot e Java 24+. Seguir estas regras é **obrigatório** em toda geração ou modificação de código.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Linguagem | Java 24+ (use records, sealed classes, pattern matching quando aplicável) |
| Framework | Spring Boot 3.x |
| Banco de Dados | PostgreSQL |
| Migrations | Flyway |
| Segurança | Spring Security + Keycloak (OIDC / OAuth2 Resource Server) |
| Testes | JUnit 5 + Mockito + Testcontainers |
| Build | Maven ou Gradle |
| Mapeamento | MapStruct |
| Persistência | Spring Data JPA + CriteriaBuilder para queries customizadas |

---

## 🏗️ Arquitetura Hexagonal (Layered)

A aplicação segue **Arquitetura Hexagonal** organizada em camadas de pacotes. Cada domínio/módulo funcional deve respeitar esta estrutura:
```
src/main/java/{base-package}/
├── core/                          # Configurações globais, utilitários e serviços compartilhados
│   ├── config/                    # Beans de configuração Spring (Security, JPA, etc.)
│   ├── exception/                 # ExceptionHandler global + exceções customizadas
│   ├── response/                  # DTOs de resposta padronizados (ApiResponse, PageResponse, etc.)
│   ├── security/                  # Configuração do Resource Server / Keycloak
│   └── util/                      # Utilitários genéricos (datas, strings, paginação, etc.)
│
└── {modulo}/                      # Ex: user, product, order
    ├── adapter/
    │   ├── inbound/
    │   │   └── rest/              # Controllers REST (porta de entrada HTTP)
    │   │       ├── {Modulo}Controller.java
    │   │       └── dto/           # Request e Response DTOs específicos do módulo
    │   └── outbound/
    │       └── persistence/       # Implementações de repositório / portas de saída
    │           ├── {Modulo}RepositoryImpl.java
    │           ├── {Modulo}JpaRepository.java   # interface Spring Data
    │           └── {Modulo}QueryRepository.java # CriteriaBuilder queries
    │
    ├── application/
    │   └── usecase/               # Casos de uso (uma classe por operação)
    │       ├── Create{Modulo}UseCase.java
    │       ├── Update{Modulo}UseCase.java
    │       ├── Delete{Modulo}UseCase.java
    │       ├── Get{Modulo}UseCase.java
    │       └── List{Modulo}UseCase.java
    │
    └── domain/
        ├── model/                 # Entidades de domínio (JPA Entities)
        ├── port/
        │   ├── inbound/           # Interfaces de casos de uso (contratos)
        │   └── outbound/          # Interfaces de repositório (contratos)
        └── exception/             # Exceções específicas do domínio
```

---

## 📦 Pacote `core`

O pacote `core` é **transversal** e não deve conter lógica de negócio. Ele provê:

- **`core.config`**: configurações de beans Spring (ex: `JpaConfig`, `SecurityConfig`, `FlywayConfig`)
- **`core.exception`**: `GlobalExceptionHandler` com `@RestControllerAdvice`, exceções base (`BusinessException`, `ResourceNotFoundException`, `ValidationException`)
- **`core.response`**: DTOs de resposta padronizados (`ApiResponse<T>`, `PageResponse<T>`, `ErrorResponse`)
- **`core.security`**: configuração OAuth2 Resource Server com Keycloak, extração de claims do JWT
- **`core.util`**: helpers reutilizáveis (paginação, formatação, conversão)

---

## ✅ Padrão de Use Cases

- Cada operação de negócio é representada por **uma classe de Use Case** dedicada.
- Use Cases implementam uma interface definida em `domain/port/inbound/`.
- Use Cases são anotados com `@Service` e `@Transactional` (ver seção de transações).
- Use Cases **não conhecem** detalhes HTTP — recebem e retornam objetos de domínio ou DTOs de aplicação.
- Controllers delegam **sempre** para um Use Case; nunca contêm lógica de negócio.
```java
// Exemplo de contrato
public interface CreateUserUseCase {
    UserResponse execute(CreateUserRequest request);
}

// Exemplo de implementação
@Service
@RequiredArgsConstructor
public class CreateUserUseCaseImpl implements CreateUserUseCase {
    private final UserRepository userRepository;

    @Transactional
    @Override
    public UserResponse execute(CreateUserRequest request) { ... }
}
```

---

## 🗄️ Banco de Dados e Migrations

### Convenções de Nomenclatura

| Elemento | Padrão | Exemplo |
|---|---|---|
| Tabelas | `TB_{NOME_PLURAL_MAIÚSCULO}` | `TB_USERS`, `TB_ORDERS` |
| PK | `{nome_entidade}_id` | `user_id`, `order_id` |
| FK | `{nome_entidade_referenciada}_id` | `user_id` (em TB_ORDERS) |
| Colunas | `snake_case` | `created_at`, `full_name` |
| Variáveis Java | `camelCase` | `createdAt`, `fullName` |

### Flyway

- Scripts em `src/main/resources/db/migration/`
- Nomenclatura: `V{versao}__{descricao}.sql` — ex: `V1__create_table_users.sql`
- **Nunca** alterar scripts já aplicados em produção — sempre criar novos
- Incluir scripts de rollback quando possível (`U{versao}__{descricao}.sql`)
```sql
-- Exemplo: V1__create_table_users.sql
CREATE TABLE TB_USERS (
    user_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name   VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP
);
```

---

## ⚡ Queries Otimizadas — CriteriaBuilder → DTO

- **Nunca** retornar entidades JPA diretamente para a camada de apresentação.
- Queries de leitura devem projetar **somente os campos necessários** via `CriteriaBuilder` + `Tuple` ou constructor expression, mapeando direto para DTOs.
- Usar `@Query` com JPQL/SQL nativo apenas para queries simples; prefer `CriteriaBuilder` para filtros dinâmicos.
- Paginação sempre via `Pageable`; retornar `PageResponse<T>` padronizado.
```java
// Exemplo de query otimizada com CriteriaBuilder → DTO
public List<UserSummaryDto> findActiveUsers(UserFilterRequest filter) {
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<UserSummaryDto> query = cb.createQuery(UserSummaryDto.class);
    Root<UserEntity> root = query.from(UserEntity.class);

    query.select(cb.construct(UserSummaryDto.class,
        root.get("idUser"),
        root.get("fullName"),
        root.get("email")
    ));

    List<Predicate> predicates = new ArrayList<>();
    if (filter.active() != null) {
        predicates.add(cb.equal(root.get("active"), filter.active()));
    }
    query.where(predicates.toArray(new Predicate[0]));

    return em.createQuery(query).getResultList();
}
```

---

## 🔄 Transações

- **`@Transactional`**: obrigatório em Use Cases de escrita (create, update, delete).
- **`@Transactional(readOnly = true)`**: obrigatório em Use Cases e queries de leitura — melhora performance e evita dirty checking.
- Nunca colocar `@Transactional` em Controllers ou DTOs.
- Propagar exceções não verificadas (unchecked) para garantir rollback automático.
- Para operações críticas com múltiplos repositórios, usar `@Transactional(rollbackFor = Exception.class)`.
```java
@Transactional(readOnly = true)
public UserResponse findById(UUID id) { ... }

@Transactional
public UserResponse create(CreateUserRequest request) { ... }

@Transactional(rollbackFor = Exception.class)
public void processComplexOperation(...) { ... }
```

---

## 🔐 Segurança — Resource Server com Keycloak

- A aplicação é um **OAuth2 Resource Server** — não gerencia sessões nem login.
- Autenticação via **JWT Bearer Token** emitido pelo Keycloak.
- Configurar `spring.security.oauth2.resourceserver.jwt.issuer-uri` para o realm do Keycloak.
- Extrair roles e claims do JWT via `JwtAuthenticationConverter`.
- Proteger endpoints com `@PreAuthorize("hasRole('ROLE_NAME')")` ou via `SecurityFilterChain`.
- Nunca expor endpoints sensíveis sem autenticação.
```java
// core/security/SecurityConfig.java
@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthConverter()))
            )
            .build();
    }
}
```

---

## 📤 DTOs e Respostas Padronizadas

- **Sempre** usar DTOs para entrada e saída — nunca expor entidades JPA.
- Usar **Java Records** para DTOs imutáveis.
- Toda resposta da API deve ser encapsulada em `ApiResponse<T>`.
```java
// core/response/ApiResponse.java
public record ApiResponse<T>(
    boolean success,
    String message,
    T data,
    Instant timestamp
) {
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, "Success", data, Instant.now());
    }

    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(true, message, data, Instant.now());
    }

    public static ApiResponse<Void> noContent() {
        return new ApiResponse<>(true, "No content", null, Instant.now());
    }
}

// core/response/ErrorResponse.java
public record ErrorResponse(
    int status,
    String error,
    String message,
    Map<String, String> fieldErrors,
    Instant timestamp
) {}

// core/response/PageResponse.java
public record PageResponse<T>(
    List<T> content,
    int page,
    int size,
    long totalElements,
    int totalPages,
    boolean last
) {
    public static <T> PageResponse<T> from(Page<T> page) { ... }
}
```

---

## 🚨 Tratamento de Erros — ExceptionHandler Global

- **Um único** `@RestControllerAdvice` em `core/exception/GlobalExceptionHandler.java`.
- Mapear cada tipo de exceção para o HTTP status correto.
- Retornar sempre `ErrorResponse` padronizado.
```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(404).body(new ErrorResponse(
            404, "Not Found", ex.getMessage(), null, Instant.now()
        ));
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusiness(BusinessException ex) {
        return ResponseEntity.status(422).body(new ErrorResponse(
            422, "Unprocessable Entity", ex.getMessage(), null, Instant.now()
        ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = ex.getBindingResult().getFieldErrors().stream()
            .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
        return ResponseEntity.status(400).body(new ErrorResponse(
            400, "Bad Request", "Validation failed", errors, Instant.now()
        ));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleForbidden(AccessDeniedException ex) {
        return ResponseEntity.status(403).body(new ErrorResponse(
            403, "Forbidden", "Access denied", null, Instant.now()
        ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
        return ResponseEntity.status(500).body(new ErrorResponse(
            500, "Internal Server Error", "Unexpected error", null, Instant.now()
        ));
    }
}
```

---

## 🌐 Padrão de Controllers REST

- Controllers ficam em `adapter/inbound/rest/`.
- Usar `@RestController` + `@RequestMapping("/api/v1/{modulo}")`.
- Retornar `ResponseEntity<ApiResponse<T>>` sempre.
- Delegar 100% da lógica para