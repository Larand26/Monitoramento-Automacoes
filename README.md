# 🖥️ Sistema de Monitoramento de Automações (SMA)

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Railway](https://img.shields.io/badge/Railway-131415?style=flat&logo=railway&logoColor=white)

O **Sistema de Monitoramento de Automações (SMA)** é uma solução interna desenvolvida para centralizar, visualizar e gerenciar o estado de execução de diversos processos automatizados da empresa (incluindo Webhooks, APIs, integrações com a plataforma Magento e consultas automatizadas via Infosimples).

O propósito principal deste painel web é resolver a dor da opacidade operacional, transformando registros brutos armazenados em banco de dados em informações visuais acionáveis em tempo real. Com isso, a equipe de tecnologia pode diagnosticar erros com maior agilidade, reduzindo o tempo de resposta a incidentes e garantindo a estabilidade das operações.

---

## 🏗️ Arquitetura do Sistema

A arquitetura do SMA foi desenhada seguindo um modelo desacoplado e assíncrono, composto por quatro camadas principais:

- **Automações (Produtores de Dados):** Os diversos microsserviços e rotinas de integração (Webhooks, Magento, Infosimples, etc.) executam suas tarefas e disparam os dados de telemetria diretamente para a camada de persistência.
- **Camada de Persistência (MongoDB):** Banco de dados NoSQL orientado a documentos, responsável por armazenar os logs de sucesso e erro com alta flexibilidade de esquema.
- **API Backend (Node.js + TypeScript):** Aplicação backend que se conecta ao MongoDB, consome os logs brutos, aplica paginação e filtros, expondo endpoints seguros para o consumo do cliente.
- **Front-end (Painel Web na Railway):** Interface de usuário moderna desenvolvida para renderizar os dados em tempo real e fornecer um dashboard interativo para diagnóstico.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:** React com TypeScript, proporcionando uma interface de usuário modular, componentizada e altamente tipada.
- **Backend:** Node.js para construção de uma API REST rápida, assíncrona e eficiente no consumo e tratamento dos dados.
- **Banco de Dados:** MongoDB como repositório de documentos persistentes para armazenamento ágil dos registros de telemetria.
- **Hospedagem:** Infraestrutura baseada na plataforma Railway para simplificar o deploy contínuo (CI/CD) e o gerenciamento de serviços.

---

## 🗃️ Estrutura de Dados (Schema do MongoDB)

Os logs são estruturados em uma coleção do MongoDB projetada para garantir rastreabilidade completa. A tabela abaixo detalha o esquema dos documentos:

| Campo (Mongo) | Tipo de Dados  | Obrigatório | Descrição / Restrições                                                |
| :------------ | :------------- | :---------: | :-------------------------------------------------------------------- |
| `jobName`     | string         |     Sim     | Nome identificador da automação executada.                            |
| `runId`       | string         |     Sim     | Identificador único global (UUID) da execução específica.             |
| `environment` | enum           |     Não     | Ambiente de execução: `"production"` ou `"development"`.              |
| `status`      | enum           |     Não     | Estado atual: `"success"`, `"error"`, `"warning"` ou `"running"`.     |
| `startedAt`   | date           |     Sim     | Data e hora de início do processo.                                    |
| `finishedAt`  | date           |     Não     | Data e hora de término do processo.                                   |
| `durationMs`  | bsonType       |     Não     | Duração total calculada em milissegundos `["int", "long", "double"]`. |
| `message`     | string         |     Não     | Mensagem resumida sobre o resultado ou erro.                          |
| `details`     | object `<any>` |     Não     | Objeto flexível para metadados e stack traces adicionais.             |

---

## 📌 Requisitos do Sistema

### 4.1 Requisitos Funcionais (RF)

- **RF-001 - Visualização de Estado:** O sistema deve listar as execuções mais recentes de cada automação com atualização contínua.
- **RF-002 - Filtros:** O usuário deve conseguir filtrar os registros por `jobName`, `status` e `environment`.
- **RF-003 - Inspeção de Detalhes:** Deve ser possível clicar em um registro com erro e expandir o campo `details` para inspecionar falhas técnicas.
- **RF-004 - Busca Textual:** O painel deve permitir a busca por palavras-chave contidas no campo `message`.

### 4.2 Requisitos Não Funcionais (RNF)

- **RNF-001 - Desempenho de Leitura:** As consultas à listagem de logs devem retornar em menos de 1000ms, utilizando indexação apropriada no MongoDB.
- **RNF-002 - Escalabilidade:** O banco de dados deve comportar o crescimento volumétrico diário dos registros de logs sem degradação do painel.
- **RNF-003 - Segurança:** O acesso ao painel deve ser restrito à rede interna ou protegido por autenticação para evitar vazamento de dados sensíveis da infraestrutura.
- **RNF-004 - Responsividade:** A interface do usuário deve se adaptar corretamente a diferentes tamanhos de tela.

---

## 🚀 Próximos Passos e Melhorias Futuras

1.  **Sistema Integrado de Alertas:** Configuração de webhooks ou integrações de e-mail/notificações em tempo real para alertar os administradores imediatamente quando um job crítico falhar (status `"error"`).
2.  **Métricas e Dashboards Analíticos:** Criação de gráficos históricos de desempenho, exibindo a taxa de sucesso e o tempo médio de execução (`durationMs`) de cada processo.
3.  **Política de Retenção de Dados:** Implementação de índices TTL (_Time-To-Live_) no MongoDB para expirar automaticamente logs muito antigos e otimizar custos de armazenamento.

---

## 📄 Licença

Este projeto é de uso interno e proprietário.

---

Desenvolvido por **Victor de Brito Laranjeira**
