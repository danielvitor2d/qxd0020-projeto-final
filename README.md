# :checkered_flag: SISTEMA DE TESTE VOCACIONAL PARA OS CURSOS DA UFC.

O objetivo do sistema é a realização de testes vocacionais voltados para a Universidade Federal do Ceará. Serão disponibilizados testes para que o usuário responda e consiga descobrir se, por uma relação entre as respostas que ele forneceu e os objetivos/grades dos cursos, se ele possui afinidade com essa área e qual curso especificamente. 

## :technologist: Membros da equipe

- Daniel Vitor Pereira Rodrigues - 521438 - Engenharia de Software
- Mônica Yasmin Costa da Silva - 469914 - Engenharia de Software

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

Administrador: O administrador será o tipo de acesso para o serviço social do campus e para psicologia, permitindo editar o formulário do teste vocacional e administrar os relacionamentos das respostas do teste com os cursos do campus.
Aluno: O acesso de aluno permitirá que, tanto estudantes que desejam ingressar na universidade, quanto estudantes que já estão cursando uma graduação de nível superior, possam acessar o teste vocacional para tentar identificar sua afinidade com os cursos do campus.

## :spiral_calendar: Entidades ou tabelas do sistema

Liste as principais entidades do sistema.

- users
- test
- courses

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

Descreve ou liste brevemente as principais funcionalidades da aplicação que será desenvolvida. Destaque a funcionalidades que serão acessévies a todos os usuários e aquelas restriras a usuários logados.

Funcionalidades usuários logados:

(ADMIN)
- CRUD dos testes vocacionais
- CRUD das perguntas do teste vocacional
- CRUD da associação de respostas com os cursos do campus no teste vocacional

(TODOS)
- CRUD do histórico de testes

Funcionalidades para todos os usuários:
 - Visualizar os testes vocacionais
 - Responder os testes vocacionais

----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.
- [Vue3](https://vuejs.org/)
- [ViteJS](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [axios](https://axios-http.com/ptbr/)
- [Docker](https://www.docker.com/)

**Backend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.
- [NestJS](https://nestjs.com/)
- [GraphQL](https://graphql.org/)
- [Prisma](https://www.prisma.io/nestjs)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Entidade 1 | X |  X  |  | X |
| Entidade 2 | X |    |  X | X |
| Entidade 3 | X |    |  |  |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/entidade1/|
| POST | api/entidade2 |
