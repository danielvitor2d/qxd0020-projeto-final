# :checkered_flag: SISTEMA DE TESTE VOCACIONAL PARA OS CURSOS DA UFC.

O objetivo do sistema é a realização de testes vocacionais voltados para a Universidade Federal do Ceará. Serão disponibilizados testes para que o usuário responda e consiga descobrir se, por uma relação entre as respostas que ele forneceu e os objetivos/grades dos cursos, se ele possui afinidade com essa área e qual curso especificamente. 

🌟 Link para acesso ao sistema: [teste-vocacional-pi-ii.netlify.app](https://teste-vocacional-pi-ii.netlify.app/)

## :technologist: Membros da equipe

- Daniel Vitor Pereira Rodrigues - 521438 - Engenharia de Software ( PI2 - V&V - WEB )
- Mônica Yasmin Costa da Silva - 469914 - Engenharia de Software ( PI2 - V&V - WEB )
- Gabriel Correia da Silva - 476751  - Engenharia de Software ( PI2 - V&V )
- Thiago Tharles Felicio de Oliveira - 471808 - Engenharia de Software ( PI2 - V&V )

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

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.
- [Vue3](https://vuejs.org/)
- [ViteJS](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)
- [vue-router](https://router.vuejs.org/)
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
|Departamento| X |  X  | X | X |
|Curso | X |  X  | X | X |
|Usuario | X |  X  | X | X |
|Teste | X |  X  | X | X |
|RespostaUsuarioTeste | X |  X  | X | X |
|Resposta | X |  X  | X | X |
|Questao | X |  X  | X | X |
|ItemQuestao| X |  X  | X | X |

## 📰 Documentação do desenvolvimento

- Kanbam/Users Stories (Trello): https://trello.com/b/Hz19uCvp/projeto-integrado-2
- Planilha de documentação de testes: https://docs.google.com/spreadsheets/d/1aYCBI-_QXXAHCjZtY0KzO8-6lzM_7D3nTG5iVuSX9CY/edit#gid=526071116
- documento de Visão: https://onedrive.live.com/edit.aspx?resid=45A106A6F5E6BCC2!115&ithint=file%2cdocx&authkey=!AIp3-8BJ8ceu4fE
- prototipação (Figma): https://www.figma.com/file/2AytQFQFz4CGu8FI3NHDne/Teste-Vocacional?type=design&node-id=53-65117&mode=design
