# Arquitetura do Projeto

## Design
* **Estrutura de Navegação**: Barra de navegação inferior (*Bottom Tab Bar*) com 3 a 4 itens.
* **Módulos Principais**:
    * **Home**: Exibição de destaques, filmes populares e tendências.
    * **Explorar**: Interface de busca global com suporte a filtros.
    * **Minha Lista**: Exibição de títulos salvos pelo usuário.

## Estrutura de Pastas e Responsabilidades
* **Componentes**:
    * **UI (Shadcn)**: Componentes base, atômicos e reutilizáveis.
    * **Custom**: Componentes personalizados e compostos que utilizam a base da UI.
* **Rotas**:
    * **Auth**: Fluxos de autenticação (Login) e gerenciamento de acesso.
    * **Navegação**: Centralização de caminhos e proteção de rotas.
* **Serviços**: Camada de lógica de negócio e consumo de APIs externas.
* **Stores**: Gerenciamento de estado global e persistência.
    * **Autenticação**: Persistência de sessão via **Cookies**.
    * **Watchlist**: Persistência de dados via **LocalStorage**.
* **Testes**: Suítes de testes unitários e de integração.
* **Modelos**: Definição de interfaces, tipos e contratos (TypeScript).
* **Estilos**: Centralização de tokens de design e configurações globais (Tailwind CSS), com utilização predominante de padrões **Beyond**.