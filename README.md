# Nexus University

API RESTful para gestão de uma plataforma de ensino (cursos, turmas, disciplinas, módulos, aulas e progresso de alunos). Construída com **Node.js + TypeScript + Express 5**, **Prisma** (PostgreSQL) e validação com **Zod**.

## Stack

- **Runtime:** Node.js
- **Linguagem:** TypeScript
- **Framework:** Express 5
- **ORM:** Prisma (`@prisma/client`) + adapter `@prisma/adapter-pg`
- **Banco:** PostgreSQL
- **Validação:** Zod
- **Auth:** JWT (`jsonwebtoken`) + `bcrypt`
- **Email:** Nodemailer (convites/ativação de conta)

## Pré-requisitos

- Node.js (versão com suporte a ESM/TS 6)
- PostgreSQL em execução
- Yarn ou npm

## Instalação

```bash
# instalar dependências
yarn install
# ou
npm install

# copiar variáveis de ambiente
cp .env.example .env
```

Preencha o `.env` com os dados corretos (veja [Variáveis de ambiente](#variáveis-de-ambiente)).

## Configuração do banco

```bash
# aplicar migrações e gerar o client do Prisma
npx prisma migrate dev
```

## Seed

O seed (`prisma/seed.ts`) popula o banco com dados de exemplo (curso, disciplina, turma, um usuário de cada papel e uma aula com progresso). É **idempotente** — usa `upsert` em tudo, então rodar várias vezes não duplica dados.

Configurado em `prisma.config.ts` (`migrations.seed`), roda com:

```bash
npx prisma db seed
```

E também roda automaticamente antes do servidor subir em desenvolvimento — veja `start:dev` abaixo.

⚠️ As senhas dos usuários de seed são fixas (`123456`, hasheada) — uso exclusivo de ambiente de dev, nunca aponte esse seed pra um banco de produção.

## Scripts

| Script               | Descrição                                                    |
| -------------------- | ------------------------------------------------------------ |
| `yarn start:dev`     | Roda o seed e sobe o servidor em dev (`nodemon` + `ts-node`) |
| `yarn build`         | Compila para `dist/` (`tsc`)                                 |
| `yarn start`         | Roda o build (`node dist/server.js`) — **sem seed**          |
| `yarn prisma:studio` | Abre o Prisma Studio                                         |

`start:dev` e `start` são fluxos alternativos, não sequenciais: em desenvolvimento você só usa `start:dev`; para produção, primeiro `build`, depois `start`.

O servidor sobe em `http://localhost:${PORT}` e monta todas as rotas sob o prefixo **`/api`**.

## Variáveis de ambiente

| Variável       | Descrição                                         |
| -------------- | ------------------------------------------------- |
| `PORT`         | Porta do servidor (ex.: `3000`)                   |
| `DATABASE_URL` | String de conexão do PostgreSQL                   |
| `SECRET_KEY`   | Chave secreta para assinar os JWTs                |
| `APP_URL`      | URL base da aplicação (usada no link de ativação) |
| `SMTP_HOST`    | Host SMTP (ex.: `smtp.mailtrap.io`)               |
| `SMTP_PORT`    | Porta SMTP (ex.: `587`)                           |
| `SMTP_USER`    | Usuário SMTP                                      |
| `SMTP_PASS`    | Senha SMTP                                        |

## Modelo de dados

- **User** — usuário base (name, email, birthDate, password?, role, inviteToken). Pode ser `Student`, `Teacher` ou `Director` (relação 1:1).
- **Student** — matrícula (`registration`), turma (`classroomId`), progresso.
- **Teacher** — disciplinas lecionadas (`ClassDiscipline`).
- **Director** — papel administrativo.
- **Classroom** — turma (name, semester, year, courseId?).
- **Course** — curso (agrupa turmas).
- **Discipline** — disciplina.
- **ClassDiscipline** — associação turma + disciplina + professor (oferta de disciplina).
- **CourseModule** — módulo de uma disciplina.
- **Lesson** — aula de um módulo (videoUrl).
- **Progress** — registro de aula assistida por aluno (completed, watchedAt, completedAt).

Enum `Role`: `STUDENT`, `TEACHER`, `DIRECTOR`.

## Autenticação e autorização

- `POST /api/auth/login` — autentica e retorna um JWT.
- `PUT /api/auth/register-password/:token` — define a senha a partir de um `inviteToken` enviado por email.
- Rotas protegidas usam `authMiddleware` (valida o JWT) e `authMiddlewareRoles(...)` (restringe por papel).
- `DIRECTOR` ignora verificações de posse (`checkOwnership`).
- Guards de posse: `checkOwnership` (teacher/student por `:id`), `checkOwnershipStudentFromBody` (valida `studentId` do body) e `checkOwnershipProgress` (valida dono do progresso).
- **Não existe rota própria para criar `Student`/`Teacher`/`Director`** — todo usuário (de qualquer papel) é criado via `POST /api/user`, informando `role`. Quando `role` é `STUDENT`, o corpo também exige `registration` e `classroomId`.

## Paginação

Listagens aceitam query params validados por `pagination.validate.ts`:

| Param   | Tipo   | Default | Máx. |
| ------- | ------ | ------- | ---- |
| `page`  | number | `1`     | —    |
| `limit` | number | `10`    | 100  |

Resposta padronizada via `buildPaginatedResponse`:

```json
{
  "data": [ ... ],
  "meta": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

## Endpoints

> Prefixo base: `/api`

### Auth

| Método | Rota                             | Descrição                         |
| ------ | -------------------------------- | --------------------------------- |
| POST   | `/auth/login`                    | Login e emissão de JWT            |
| PUT    | `/auth/register-password/:token` | Define senha via token de convite |

### Users

_(todas as rotas exigem papel `DIRECTOR`)_

| Método | Rota        | Descrição                                                  |
| ------ | ----------- | ---------------------------------------------------------- |
| POST   | `/user`     | Cadastra usuário (qualquer papel — ver seção Autenticação) |
| GET    | `/user`     | Lista usuários (pag.)                                      |
| GET    | `/user/:id` | Busca usuário por id                                       |
| PUT    | `/user/:id` | Atualiza usuário                                           |
| DELETE | `/user/:id` | Remove usuário                                             |

### Teachers

_(sem rota de criação — professor é criado via `POST /user` com `role: TEACHER`)_

| Método | Rota                        | Papéis                   | Descrição                       |
| ------ | --------------------------- | ------------------------ | ------------------------------- |
| GET    | `/teachers`                 | DIRECTOR                 | Lista professores (pag.)        |
| GET    | `/teachers/:id`             | DIRECTOR, TEACHER (dono) | Busca professor por id          |
| GET    | `/teachers/:id/disciplines` | DIRECTOR, TEACHER (dono) | Disciplinas do professor (pag.) |
| PUT    | `/teachers/:id`             | DIRECTOR                 | Atualiza professor              |
| DELETE | `/teachers/:id`             | DIRECTOR                 | Remove professor                |

### Students

_(sem rota de criação — aluno é criado via `POST /user` com `role: STUDENT`)_

| Método | Rota                     | Papéis                            | Descrição                 |
| ------ | ------------------------ | --------------------------------- | ------------------------- |
| GET    | `/students`              | DIRECTOR, TEACHER                 | Lista alunos (pag.)       |
| GET    | `/students/:id`          | DIRECTOR, TEACHER, STUDENT (dono) | Busca aluno por id        |
| GET    | `/students/:id/progress` | DIRECTOR, TEACHER, STUDENT (dono) | Progresso do aluno (pag.) |
| PUT    | `/students/:id`          | DIRECTOR                          | Atualiza aluno            |
| DELETE | `/students/:id`          | DIRECTOR                          | Remove aluno              |

### Classrooms

| Método | Rota                         | Papéis                     | Descrição                   |
| ------ | ---------------------------- | -------------------------- | --------------------------- |
| POST   | `/classroom`                 | DIRECTOR                   | Cria turma                  |
| GET    | `/classroom`                 | DIRECTOR, TEACHER          | Lista turmas (pag.)         |
| GET    | `/classroom/:id`             | DIRECTOR, TEACHER, STUDENT | Busca turma por id          |
| GET    | `/classroom/:id/students`    | DIRECTOR, TEACHER          | Alunos da turma (pag.)      |
| GET    | `/classroom/:id/disciplines` | DIRECTOR, TEACHER, STUDENT | Disciplinas da turma (pag.) |
| PUT    | `/classroom/:id`             | DIRECTOR                   | Atualiza turma              |
| DELETE | `/classroom/:id`             | DIRECTOR                   | Remove turma                |

### Courses

| Método | Rota          | Papéis                     | Descrição           |
| ------ | ------------- | -------------------------- | ------------------- |
| POST   | `/course`     | DIRECTOR                   | Cria curso          |
| GET    | `/course`     | DIRECTOR, TEACHER, STUDENT | Lista cursos (pag.) |
| GET    | `/course/:id` | DIRECTOR, TEACHER, STUDENT | Busca curso por id  |
| PUT    | `/course/:id` | DIRECTOR                   | Atualiza curso      |
| DELETE | `/course/:id` | DIRECTOR                   | Remove curso        |

### Disciplines

| Método | Rota                      | Papéis                     | Descrição                    |
| ------ | ------------------------- | -------------------------- | ---------------------------- |
| POST   | `/discipline`             | DIRECTOR                   | Cria disciplina              |
| GET    | `/discipline`             | DIRECTOR, TEACHER, STUDENT | Lista disciplinas (pag.)     |
| GET    | `/discipline/:id`         | DIRECTOR, TEACHER, STUDENT | Busca disciplina por id      |
| GET    | `/discipline/:id/modules` | DIRECTOR, TEACHER, STUDENT | Módulos da disciplina (pag.) |
| PUT    | `/discipline/:id`         | DIRECTOR                   | Atualiza disciplina          |
| DELETE | `/discipline/:id`         | DIRECTOR                   | Remove disciplina            |

### Course Modules

| Método | Rota                  | Papéis                     | Descrição              |
| ------ | --------------------- | -------------------------- | ---------------------- |
| POST   | `/module`             | DIRECTOR                   | Cria módulo            |
| GET    | `/module`             | DIRECTOR, TEACHER, STUDENT | Lista módulos (pag.)   |
| GET    | `/module/:id`         | DIRECTOR, TEACHER, STUDENT | Busca módulo por id    |
| GET    | `/module/:id/lessons` | DIRECTOR, TEACHER, STUDENT | Aulas do módulo (pag.) |
| PUT    | `/module/:id`         | DIRECTOR                   | Atualiza módulo        |
| DELETE | `/module/:id`         | DIRECTOR                   | Remove módulo          |

### Lessons

_(sem listagem própria — aulas são listadas via `/module/:id/lessons`)_

| Método | Rota          | Papéis                     | Descrição         |
| ------ | ------------- | -------------------------- | ----------------- |
| POST   | `/lesson`     | DIRECTOR                   | Cria aula         |
| GET    | `/lesson/:id` | DIRECTOR, TEACHER, STUDENT | Busca aula por id |
| PUT    | `/lesson/:id` | DIRECTOR                   | Atualiza aula     |
| DELETE | `/lesson/:id` | DIRECTOR                   | Remove aula       |

### Class-Disciplines (ofertas)

| Método | Rota                    | Papéis            | Descrição                           |
| ------ | ----------------------- | ----------------- | ----------------------------------- |
| POST   | `/class-discipline`     | DIRECTOR          | Cria oferta (turma + disc. + prof.) |
| GET    | `/class-discipline`     | DIRECTOR, TEACHER | Lista ofertas (pag.)                |
| GET    | `/class-discipline/:id` | DIRECTOR, TEACHER | Busca oferta por id                 |
| PUT    | `/class-discipline/:id` | DIRECTOR          | Atualiza oferta                     |
| DELETE | `/class-discipline/:id` | DIRECTOR          | Remove oferta                       |

### Progress

| Método | Rota                             | Papéis                            | Descrição                                         |
| ------ | -------------------------------- | --------------------------------- | ------------------------------------------------- |
| POST   | `/progress`                      | STUDENT (dono)                    | Registra aula assistida (valida turma/disciplina) |
| PATCH  | `/progress/:id/complete`         | STUDENT (dono)                    | Marca aula como concluída                         |
| GET    | `/progress/student/:studentId`   | STUDENT (dono), TEACHER, DIRECTOR | Progresso de um aluno (pag.)                      |
| GET    | `/progress/class-discipline/:id` | DIRECTOR, TEACHER                 | Progresso de todos os alunos de uma oferta (pag.) |

## Tratamento de erros

Erros de domínio são lançados como `new Error("CODIGO")` e mapeados no `error-handler.middleware.ts` para status HTTP e mensagem em português (ex.: `STUDENT_NOT_FOUND` → 404, `FORBIDDEN` → 403, `INVALID_CREDENTIALS` → 401, `TOKEN_MISSING` → 401).

## Estrutura de pastas

```
src/
├── generated/      # client Prisma gerado
├── infra/          # email (nodemailer)
├── lib/            # prisma client
├── middlewares/    # auth, erros, ownership
├── modules/        # auth, users, teachers, students, classrooms,
│                   # courses, disciplines, course-modules, lessons,
│                   # class-disciplines, progress
├── routers/        # index que agrega as rotas
├── types/          # tipos (AuthRequest, etc.)
├── utils/          # paginação e formatação
└── server.ts       # entrypoint
```

## Licença

MIT — Lucas Pinheiro
