# Doc Course API

Esta API foi desenvolvida como parte do desafio de código elaborado no processo seletivo do grupo Doctor.

### Tecnologias Adotadas no Projeto:

##### NestJS:
A API foi construída utilizando o framework NestJS, conhecido por oferecer uma arquitetura modular baseada no Angular. Essa escolha, aliada ao suporte ao TypeScript, tem como objetivo facilitar a organização e manutenção do código. O NestJS utiliza o sistema de injeção de dependência, simplificando a gestão de componentes. A presença de uma CLI agiliza o desenvolvimento, fornecendo comandos que possibilitam, por exemplo, a criação rápida da estrutura CRUD para os módulos da aplicação. A ampla capacidade de integração do NestJS com diversas ferramentas também foi um fator determinante.

##### PostgreSQL:
Para o armazenamento e gestão das informações dos cursos, professores e dados de acesso dos alunos, optei pela utilização do banco de dados SQL PostgreSQL. Essa escolha foi motivada pela fácil integração e pela disponibilidade de hospedagem na AWS, proporcionando uma solução robusta e escalável.

##### Realtime Database (A Implementar):
Com a intenção de armazenar e gerenciar o progresso dos alunos nos cursos da plataforma, está prevista a implementação de um banco de dados NoSQL em tempo real. A escolha por essa solução é respaldada pela expectativa de uma maior escalabilidade e um desempenho aprimorado.

##### CORS:
A implementação do CORS possibilita o controle da origem das solicitações à API, contribuindo para a segurança e eficiência na comunicação com a aplicação.

##### Vercel: 
O deploy da aplicação foi realizado na Vercel. A Vercel disponibiliza uma estrutura de fácil configuração e manutenção. A aplicação encontra-se disponível através da rota [https://job-test-api-kr1d.vercel.app/](https://job-test-api-kr1d.vercel.app/).

-----

## Funcionalidades (Disponíveis):

#### Course
 - CRUD de cursos através do endpoint /course
   - `GET/course` - Retorna um array com a informação de todos os cursos disponíveis na base de dados da API.
   - `GET/course/{id}` - Retorna as informações do curso especificado através do parâmetro {id}.
   - `GET/course/{id}/classes` - Retorna as informações do curso especificado junto com a lista de aulas disponíveis.
   - `PATCH/course/{id}` - Permite a atualização dos dados do curso especificado via id.
   - `POST/course` - Permite a criação de um curso.
   - `DELETE/course/{id}` - Permite a exclusão de um curso da base de dados do sistema.

#### Professors
 - CRUD de professores
   - `GET/professor` - Retorna um array com a informação de todos os professores cadastrados na base de dados da API.
   - `GET/professor/{id}` - Retorna as informações do professor especificado através do parâmetro {id}.
   - `PATCH/professor/{id}` - Permite a atualização dos dados do professor especificado via id.
   - `POST/professor` - Permite o cadastro de um professor.
   - `DELETE/professor/{id}` - Permite a exclusão de um professor da base de dados do sistema.

#### Classes
 - CRUD de aulas
   - `PATCH/class/{id}` - Permite a atualização dos dados da aula especificada via id.
   - `POST/class` - Permite o cadastro de uma aula.
   - `DELETE/class/{id}` - Permite a exclusão de uma aula da base de dados do sistema.

   * Só é possível acessar uma aula informando o id do professor que a ministra ou o id do curso ao qual ela pertence. Essas informações devem ser passadas no cabeçalho da solicitação.

#### User
 - Cadastro e validação dos alunos 

#### Admin 
 - Validação do usuário Admin. 

##### Essas funcionalidades já estão disponíveis na aplicação frontend hospedada no endereço [https://job-test-app.vercel.app/](https://job-test-app.vercel.app/). O painel administrativo pode ser acessado através do endereço [https://job-test-app.vercel.app/admin](https://job-test-app.vercel.app/admin).

----------

### Funcionalidades (A Implementar):

- **Sistema de aulas ao vivo e por texto:** Buscando tornar os cursos mais dinâmicos, estamos trabalhando na melhoria do nosso sistema de aulas, permitindo a possibilidade de ministrar aulas ao vivo e fornecer material de apoio em texto.

- **Gestão de usuários do painel administrativo:** Visando permitir que os professores cadastrem suas aulas, agendem aulas ao vivo e disponibilizem novos cursos.

- **Acompanhamento de Progresso do Aluno:** Desenvolvimento do módulo que permitirá o armazenamento e a análise do progresso dos alunos em tempo real, proporcionando uma experiência personalizada de aprendizado.

Esta documentação será atualizada à medida que novas funcionalidades forem implementadas e aprimoramentos forem realizados.
