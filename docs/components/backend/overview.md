---
sidebar_position: 1
---

# Backend Overview

The Qlarr Surveys backend is a Spring Boot application providing REST APIs for survey management, execution, and data synchronization.

## Repository

[qlarr-surveys/backend](https://github.com/qlarr-surveys/backend)

## Role in the System

The backend is the central hub of the Qlarr ecosystem. It embeds the [Survey Engine (KMP)](/components/survey-engine-kmp/overview) (JVM build) and exposes its capabilities via REST APIs. The [Frontend](/components/frontend/overview) communicates with it for both survey design and execution, and the [Android](/components/android/overview) app connects to it to download surveys and sync responses.

## Technology Stack

- **Spring Boot 3** with Kotlin
- **PostgreSQL** — survey settings, responses, user data
- **Liquibase** — database migrations
- **GraalVM JavaScript** — sandboxed JS execution for survey logic
- **JWT** — stateless authentication
- **Java 19+**

## Authentication

The backend uses **stateless JWT-based authentication** with refresh tokens.

### Token Types

| Token | Expiration | Purpose |
|---|---|---|
| **Access token** | 1 hour | Sent in the `Authorization: Bearer {token}` header for API requests |
| **Refresh token** | 1 year | Stored in the database, used to obtain a new access token |
| **Password reset token** | 1 hour (30 days for new users) | Sent via email for password reset flow |

Tokens are signed with **HS256** (HMAC SHA-256). The access token contains the user ID, roles, and session ID as claims.

### Auth Flow

1. User logs in with email and password (`POST /user/login`)
2. Backend validates credentials (BCrypt) and returns an access token + refresh token
3. Client includes the access token in the `Authorization` header for subsequent requests
4. When the access token expires, the client uses the refresh token to get a new one (`POST /user/refresh_token`)
5. Logout invalidates the refresh token in the database

### Roles

- **Super Admin** — full system access, user management
- **Survey Admin** — survey management
- **Surveyor** — create and run surveys
- **Analyst** — analyze survey responses

### Public Endpoints

The following endpoints do not require authentication:
- Survey execution (`/survey/{surveyId}/run/*`)
- Survey resources and attachments
- Login, password reset, and token refresh

All other endpoints require a valid JWT token, with role-based access enforced via `@PreAuthorize` annotations.

## API Endpoints

See the [API Reference](/components/backend/api-reference) for the complete list of endpoints.
