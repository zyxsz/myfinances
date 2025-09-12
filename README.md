# MyFinances

Um aplicativo de gerenciamento de finanças, tenha o total controle sobre seus gastos, rendimentos e projeções!

## Features

- [ ] Gerenciamento do usuário

  - Possibilidade de criar diferentes contas sobre um mesmo usuário (ex: PF, PJ)

- [ ] Painel de controle

  - Gráficos, estimativas, outros dados e movimentações.

- [ ] Gerenciamento de gastos.

  - Criar, editar e excluir um gasto.

- [ ] Gerenciamento de rendimentos

  - Criar, editar e excluir um rendimento.

- [ ] Sistema de objetivos.

  - (Meta de um determinado valor até certo período)

- [ ] Grupamentos
  - (Lazer, Mercado, Contas, etc...)

## Features futuras

- [ ] Gerenciamento de investimentos.
- [ ] Projeções

## Tecnologias.

Algumas das possíveis tecnologias a serem usadas no projeto:

- Back-end

  - NestJS
  - Postgres
  - Jest (TDD)

- Front-end

  - ReactJS
  - NextJs (?)
  - Tailwind (?)
  - Redux/zustand

- Infra
  - Pulumi IAC

OBS: Acredito que a utilização de SSR no front-end não seja necessária para essa aplicação, sendo assim é provável a utilização de alguma outra tecnologia como o React Router V7.

## Idealização

Acompanhe abaixo todo o caminho de idealização e de criação das regras de negocio:

#### Regras de negocio

- Deverá ser possível a criação de novos usuários com os seguintes campos: **(email, nickname, firstName, lastName, password)** sendo eles apenas **(email, firstName, fullName e password)** necessários.

- Um usuário poderá criar inúmeras contas.

- Para a criação de uma conta deverá ser necessário os campos: **(name, type)**

- Uma conta pode conter inúmeros **Rendimentos** e **Gastos**.

- Para a criação de um **Rendimento** ou de um **Gasto** será utilizado os campos: **(name\*, description, valueInCents\*, releasedAt\*, currency\*)**

- Uma conta pode conter diferentes **Grupamentos**.

- Para a criação de um **Grupamento** será utilizado os campos: **(name\*, description, colorInHex)**

- Deverá ser possível associar diferentes **Rendimentos** e **Gastos** a um **Grupamento** especifico.

- O usuário deverá ter a liberdade de criar/adicionar/editar/excluir qualquer **Rendimentos**, **Gastos** e **Grupamentos** relacionados a uma conta especifica.

> \* Representa campos obrigatórios.
