---
sidebar_position: 1
---

# Local Deployment

Run Qlarr locally using Docker Compose. This sets up the full stack -- frontend, backend, PostgreSQL, and a mail testing server -- on your machine.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
- [Git](https://git-scm.com/downloads) installed

## Setup

Clone the frontend repository and navigate to the deployment directory:

```bash
git clone https://github.com/qlarr-surveys/frontend.git && cd frontend/deploy
```

Start all services:

```bash
docker compose -f docker-compose.local.yml up -d
```

Once the containers are running, open [http://localhost:3000](http://localhost:3000) in your browser.

## Services

| Service | URL | Description |
|---|---|---|
| Frontend | [http://localhost:3000](http://localhost:3000) | Qlarr UI served by Caddy |
| Backend API | [http://localhost:8080](http://localhost:8080) | Spring Boot API |
| Mailhog | [http://localhost:8025](http://localhost:8025) | Email testing UI (captures all outgoing emails) |
| PostgreSQL | localhost:5432 | Database |

## Default Credentials

Log in with:

- **Email**: `admin@admin.admin`
- **Password**: `admin`

## Stop

```bash
docker compose -f docker-compose.local.yml down
```

## Full Reset

To remove all data (database, uploaded files) and start fresh:

```bash
docker compose -f docker-compose.local.yml down -v
docker compose -f docker-compose.local.yml up -d
```
