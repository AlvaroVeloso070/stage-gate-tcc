# 📁 Manipulação de Arquivos (File Manipulation)

Esta documentação descreve a arquitetura e o funcionamento do módulo de manipulação de arquivos do sistema Stage-Gate.

## 🏗️ Arquitetura

O módulo segue o padrão de **Arquitetura Hexagonal** do projeto, garantindo o desacoplamento entre a lógica de negócio e os provedores de armazenamento.

### Camadas

- **`domain/`**: Define o contrato `FileManipulator`, a entidade `File` (metadados) e exceções customizadas.
- **`application/`**: Contém os Use Cases que orquestram o upload, download, deleção e consulta de metadados.
- **`adapter/outbound/storage`**: Implementações reais de armazenamento (**MinIO/S3** e **FileSystem Local**).
- **`adapter/outbound/persistence`**: Implementação do repositório de metadados com Spring Data JPA.
- **`adapter/inbound/rest`**: Controller REST que expõe os endpoints para o frontend/outros serviços.

---

## 🚀 Performance e Escalabilidade

A implementação foi projetada para minimizar o uso de memória e disco do servidor de aplicação:

1.  **Streaming Puro**: O upload e o download utilizam `InputStream`. O arquivo percorre o backend em fluxo, sem nunca ser carregado integralmente em memória (`byte[]`).
2.  **Checksum Single-Pass**: O cálculo do hash SHA-256 é feito em uma única passagem durante a leitura/escrita dos streams, utilizando `DigestInputStream` e `DigestOutputStream`, eliminando leituras extras em disco/memória.
3.  **StreamingResponseBody**: No download, utilizamos o `StreamingResponseBody` do Spring, que permite que o servidor escreva diretamente do storage para o output da resposta HTTP.
4.  **Resolução Lazily**: O parser de multipart do Spring é configurado como `resolve-lazily=true`, permitindo que o Use Case decida quando abrir o stream do arquivo.

---

## 🛠️ Modos de Armazenamento (Storage)

O sistema suporta dois tipos de armazenamento, controlados via propriedade `file.storage.type`:

### 1. MinIO (Padrão S3)
Utilizado para ambientes de produção e homologação. É compatível com o protocolo S3 da AWS.
- **Configuração**: `file.storage.type=minio`
- **Validação de Startup**: A aplicação verifica a existência (e cria, se necessário) do bucket `stage-gate` ao iniciar.

### 2. FileSystem Local
Utilizado como fallback caso o MinIO não esteja disponível ou para desenvolvimento simplificado.
- **Configuração**: `file.storage.type=local`
- **Caminho Base**: Definido por `file.storage.local.base-path`.

---

## 🗄️ Metadados e Referência (`TB_FILES`)

Nenhum arquivo deve existir no storage sem uma referência correspondente na tabela `TB_FILES`. A entidade `File` armazena:
- `original_name`: Nome original enviado pelo usuário.
- `stored_name`: Nome único gerado (`UUID + extensão`).
- `storage_path`: Caminho lógico dentro do bucket (ex: `projects/123/anexo_01.pdf`).
- `checksum_sha256`: Hash para verificação de integridade.
- `size_bytes`: Tamanho em bytes.

### Como vincular a outras entidades

Para vincular um arquivo a uma entidade de domínio (ex: `Project`), utilize um relacionamento `@ManyToOne` para a entidade `File`.

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "file_id")
private File attachment;
```

---

## ⚙️ Configuração (Variáveis de Ambiente)

Abaixo as variáveis que podem ser configuradas no `application.yaml`:

| Variável | Descrição | Padrão |
|---|---|---|
| `FILE_STORAGE_TYPE` | Define o driver (`minio` ou `local`) | `minio` |
| `MINIO_ENDPOINT` | URL do servidor MinIO | `http://localhost:9000` |
| `MINIO_ACCESS_KEY` | Credencial de acesso | `minioadmin` |
| `MINIO_SECRET_KEY` | Senha de acesso | `minioadmin` |
| `MINIO_BUCKET` | Bucket principal | `stage-gate` |
| `MAX_FILE_SIZE` | Tamanho máximo por arquivo | `100MB` |

---

## 📡 Endpoints Disponíveis

- **Upload**: `POST /api/v1/files/upload` (campos: `file`, `entityPath`)
- **Download**: `GET /api/v1/files/{id}/download`
- **Metadados**: `GET /api/v1/files/{id}`
- **Remover**: `DELETE /api/v1/files/{id}`
