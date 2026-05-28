# Espaco Naturale Digital Menu

Sistema full stack para cardapio digital do restaurante **Espaco Naturale**, com pagina publica para clientes acessarem via QR Code e area administrativa para gerenciar produtos e categorias.

## Tecnologias usadas

- React + Vite
- TailwindCSS v4 com `@tailwindcss/vite`
- Node.js + Express
- SQLite + Prisma ORM
- JWT para autenticacao admin
- Fetch API
- lucide-react

## Funcionalidades

- Cardapio publico responsivo em `/`
- Filtro por categorias
- Secao de pratos do dia
- Produtos com estado disponivel/indisponivel
- Cardapio informativo para clientes presentes no local
- Login administrativo com senha unica
- Dashboard protegido por token JWT
- CRUD de produtos
- Criacao, edicao e remocao de categorias
- Alternancia de disponibilidade e destaque

## Estrutura

```txt
espaco-naturale-menu/
├── client/
│   ├── src/
│   └── package.json
├── server/
│   ├── prisma/
│   ├── src/
│   └── package.json
└── README.md
```

## Configuracao do back-end

```bash
cd server
npm install
cp .env.example .env
npx prisma migrate dev --name init
npm run seed
npm run dev
```

O servidor roda em:

```txt
http://localhost:3333
```

Arquivo `server/.env.example`:

```env
DATABASE_URL="file:./dev.db"
PORT=3333
JWT_SECRET="change-me"
ADMIN_PASSWORD="admin123"
```

## Configuracao do front-end

Em outro terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

O front-end roda em:

```txt
http://localhost:5173
```

Arquivo `client/.env.example`:

```env
VITE_API_URL="http://localhost:3333/api"
```

## Rotas principais

### Publicas

- `GET /api/products`
- `GET /api/products/featured`
- `GET /api/categories`
- `POST /api/auth/login`

### Protegidas

- `GET /api/auth/me`
- `POST /api/products`
- `PUT /api/products/:id`
- `PATCH /api/products/:id/availability`
- `PATCH /api/products/:id/featured`
- `DELETE /api/products/:id`
- `POST /api/categories`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`

## Login admin

Acesse:

```txt
http://localhost:5173/admin/login
```

Senha padrao do `.env.example`:

```txt
admin123
```

## Prints placeholders

Adicione aqui os prints quando o projeto estiver rodando:

- Cardapio publico mobile
- Cardapio publico desktop
- Login administrativo
- Dashboard administrativo

## Melhorias futuras

- Upload de imagens dos produtos
- Ordenacao visual por drag and drop
- Horarios de funcionamento e avisos do dia
- Tema escuro
- Impressao de QR Code para as mesas
