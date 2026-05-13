# FlowSync SaaS Application

FlowSync is a complete TypeScript SaaS starter for project management, CRM-style admin control, subscription billing simulation, realtime task updates, and analytics.

## Stack

- React, TypeScript, Vite, Recharts
- Node.js, Express, TypeScript
- MongoDB and Mongoose models for users, projects, tasks, subscriptions, and invoices
- JWT authentication with admin, user, and guest roles
- Socket.io realtime task events
- Docker Compose for local deployment
- GitHub Actions CI for client and server builds

## Local Development

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the API defaults to `http://localhost:5001/api`.

## Docker

```bash
docker compose up --build
```

This starts MongoDB, the Express API, and the Vite client.

## Core API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/subscriptions`
- `POST /api/subscriptions/checkout`
- `POST /api/subscriptions/cancel`
- `GET /api/admin/dashboard`
- `PUT /api/admin/users/:id`
