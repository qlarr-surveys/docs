---
sidebar_position: 1
---

# Local Deployment

Run Qlarr locally using Docker Compose. The deployment files are in the [`deploy/`](https://github.com/qlarr-surveys/frontend/tree/main/deploy) directory of the frontend repository.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed

## Start

```bash
cd deploy
docker compose -f docker-compose.local.yml up -d
```

This starts four services:

| Service | URL | Description |
|---|---|---|
| Frontend | [http://localhost:3000](http://localhost:3000) | Qlarr UI served by Caddy |
| Backend API | [http://localhost:8080](http://localhost:8080) | Spring Boot API |
| Mailhog | [http://localhost:8025](http://localhost:8025) | Email testing UI (captures all outgoing emails) |
| PostgreSQL | localhost:5432 | Database (not exposed to host by default) |

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
