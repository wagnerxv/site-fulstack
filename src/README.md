# Documentação do Projeto
## Introdução
Este projeto é uma aplicação fullstack moderna construída com Next.js, TypeScript, Prisma ORM e Shadcn UI, seguindo arquitetura modular baseada em features. O objetivo é fornecer uma base escalável e de fácil manutenção para produtos digitais.

## Pré-requisitos
Certifique-se de ter os seguintes softwares instalados:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (recomendado: versão 18+)
- [npm](https://www.npmjs.com/) (geralmente incluso com Node.js)

### Rodar banco de dados localmente - alternativas
- [Docker](https://www.docker.com/) (para rodar banco de dados localmente)
- [pgAdmin 4](https://www.pgadmin.org/download/pgadmin-4-windows/) (para rodar banco de dados localmente)

## Instalação
1. **Clone o repositório:**
```bash
git clone https://github.com/PrimeCode-Solutions/salao-fullstack.git
```

2. **Instale as dependências:**
```bash
npm install
```

## Configuração do Banco de Dados
1. **Para rodar o banco de dados localmente, utilize o Docker Compose:**
```bash
docker-compose up -d
```

2. **Gere o cliente Prisma:**
```bash
npx prisma generate
```

3. **Execute as migrations do Prisma para criar as tabelas:**
```bash
npx prisma migrate dev
```

4. **Popule o banco com dados iniciais:**
```bash
npx prisma db seed
```

## Execução
Para iniciar o projeto em modo desenvolvimento:
```bash
npm run dev
```

## Credênciais para login/teste
```
email: admin@email.com
senha: admin123
```

Acesse [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

## Estrutura do Projeto
```
public/                # Arquivos públicos (imagens, favicon, etc)
src/
 - app/                # Rotas, layouts e providers do Next.js
 - components/         # Componentes reutilizáveis (UI, layout, etc)
  features/            # Features isoladas por domínio (admin, event, user...)
  hooks/               # Custom hooks
  lib/                 # Utilitários e funções auxiliares
  providers/           # Providers globais (ex: prisma)
  igniter.ts           # Inicialização do Igniter.js
  igniter.client.ts    # Cliente API do Igniter.js
  igniter.context.ts   # Contexto global da aplicação
  igniter.router.ts    # Configuração das rotas do Igniter.js
prisma/                # Schema, migrations e seeds do banco de dados
```

## Comandos Úteis
- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera a build de produção
- `npm run start` — Inicia o servidor em produção
- `npx prisma generate` — Gera o cliente Prisma TypeScript
- `npx prisma migrate dev` — Executa as migrations do banco
- `npx prisma studio` — Abre o Prisma Studio para visualizar dados

## Observações
- Para customizar variáveis de ambiente, edite o arquivo `.env` na raiz do projeto.
- Execute `npx prisma generate` sempre que modificar o schema do Prisma para atualizar o cliente TypeScript.
- Consulte a documentação oficial do [Next.js](https://nextjs.org/docs), [Prisma](https://www.prisma.io/docs/) e [Shadcn UI](https://ui.shadcn.com/docs) para mais detalhes.

---
Pronto! Seu ambiente está configurado.
