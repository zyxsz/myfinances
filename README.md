# 💵 MyFinances

Um aplicativo de gerenciamento de finanças, tenha o total controle sobre seus gastos, rendimentos e projeções!

## 🎯 Tecnologias

Algumas das possíveis tecnologias a serem usadas no projeto:

- Back-end

  - NestJS
  - Postgres
  - Jest (TDD)

- Front-end

  - ReactJS
  - React Router V7
  - Tailwind (?)
  - Redux/zustand

- Infra
  - Pulumi IAC

<!-- OBS: Acredito que a utilização de SSR no front-end não seja necessária para essa aplicação, sendo assim é provável a utilização de alguma outra tecnologia como o React Router V7. -->

## 📃 Idealização

Acompanhe abaixo todo o caminho de idealização e de criação das regras de negócio:

Objetivo: Um aplicativo para gerenciamento de finanças de maneira intuitiva e completa!

#### Regras de negócio:

- Usuários:

  - Campos: **(email\*, nickname, firstName\*, lastName\*, password\*)**.
  - [x] Deverá ser possível o cadastro um usuário.
  - [x] Deverá ser possível a atualização dos dados de um usuário.
  - [x] Deverá ser possível a atualização da senha de um usuário.
  - [x] Deverá ser possível a buscar pelos dados de um usuário.
  - [ ] ~~Deverá ser possível verificar o email de um usuário~~.
  - [ ] ~~Deverá ser possível a atualização do email de um usuário~~.
  - [ ] ~~Deverá ser possível excluir um usuário~~.
  <!-- - Um usuário cadastrado deve poder criar inúmeras **Contas**. -->

- Perfis:

  - Campos: **(name\*, type\*)**.
  - [x] Deverá ser possível a criação de um perfil com um usuário logado.
  - [x] Deverá ser possível a busca dos dados de um perfil.
  - [x] Deverá ser possível a atualização dos dados de um perfil.
  - [x] Deverá ser possível excluir um perfil.

- Lançamentos:
  - Campos: **(name\*, description, valueInCents\*, releasedAt\*, current\*, type\*)**
    - Type: (Income, Outcome)
  - Deverá ser possível a criação de novos lançamentos associada a um perfil diretamente.
  - Deverá ser possível buscar dados de um lançamento.
  - Deverá ser possível a busca por movimentações de um perfil.
  - Deverá ser possível atualizar um lançamento.
  - Deverá ser possível excluir um lançamento.
- Grupamentos:
  - Campos: **(name\*, description, colorInHex)**
  - Deverá ser possível a criação de grupamentos associados a um perfil especifica.
  - Deverá ser possível listar os grupamentos de um perfil.
  - Deverá ser possível buscar dados de um grupamento especifico.
  - Deverá ser possível atualizar um grupamento especifico.
  - Deverá ser possível excluir um grupamento especifico.
  - Deverá ser possível associar/desassociar um **Lançamento** a um grupamento especifico.

<!-- - Um perfil pode conter inúmeros **Rendimentos** e **Gastos**.

- Para a criação de um **Rendimento** ou de um **Gasto** será utilizado os campos: **(name\*, description, valueInCents\*, releasedAt\*, currency\*)**

- Um perfil pode conter diferentes **Grupamentos**.

- Para a criação de um **Grupamento** será utilizado os campos: **(name\*, description, colorInHex)**

- Deverá ser possível associar diferentes **Rendimentos** e **Gastos** a um **Grupamento** especifico.

- O usuário deverá ter a liberdade de criar/adicionar/editar/excluir qualquer **Rendimentos**, **Gastos** e **Grupamentos** relacionados a um perfil especifica. -->

> \* Representa campos obrigatórios.

## 📌 Funcionalidades

- [ ] Gerenciamento do usuário

<!-- - Possibilidade de criar diferentes contas sobre um mesmo usuário (ex: PF, PJ) -->

- [ ] Painel de controle

<!-- - Gráficos, estimativas, outros dados e movimentações. -->

- [ ] Gerenciamento de gastos.

<!-- - Criar, editar e excluir um gasto. -->

- [ ] Gerenciamento de rendimentos

<!-- - Criar, editar e excluir um rendimento. -->

- [ ] Sistema de objetivos.

<!-- - (Meta de um determinado valor até certo período) -->

- [ ] Grupamentos
<!-- - (Lazer, Mercado, Contas, etc...) -->

## 📂 Funcionalidades futuras

- [ ] Gerenciamento de investimentos.
- [ ] Projeções
