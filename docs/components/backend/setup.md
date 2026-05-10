---
sidebar_position: 2
---

# Getting Started

How to set up and run the backend locally for development.

## Prerequisites

- **Java 19+**
- **Docker** — for PostgreSQL (and optionally Mailhog for email testing)

## Running Locally

**1. Start the database:**

```bash
docker-compose up -d postgres-db
```

This starts PostgreSQL at `localhost:5432` with database `qlarrdb` (user: `qlarr`, password: `password`).

**2. Run the application:**

```bash
./gradlew bootRun
```

The backend starts at `http://localhost:8080` using the `local` profile.

**3. Default admin account:**

On first startup, the backend creates a default admin user:
- **Email:** `admin@admin.admin`
- **Password:** `admin`
- **Roles:** all roles

**4. (Optional) Email testing with Mailhog:**

```bash
docker-compose up -d mailhog
```

Mailhog catches outgoing emails and provides a web UI at `http://localhost:8025`.

## Building

```bash
./gradlew build
```

## Running Tests

Tests use Testcontainers (requires Docker):

```bash
./gradlew test
```
