---
sidebar_position: 2
---

# Frontend Setup

## Prerequisites

- **Node.js 16+** and npm
- A running [Backend](/components/backend/setup) instance (default: `http://localhost:8080`)

## Running Locally

1. Clone the repository:

```bash
git clone https://github.com/qlarr-surveys/frontend.git && cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure the backend URL in `public/config.js`:

```js
window.APP_CONFIG = {
  FRONT_END_HOST: "localhost:3000",
  PROTOCOL: "http",
  BE_URL: "http://localhost:8080"
};
```

4. Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000`. Log in with the default admin account from the backend: `admin@admin.admin` / `admin`.

## Building for Production

```bash
npm run build
```

The output is written to the `build/` directory.

## Docker

The production Docker image uses **Caddy** as the web server:

```bash
docker build -t qlarr-frontend .
docker run -p 80:80 qlarr-frontend
```

The `entrypoint.sh` script handles runtime configuration injection so the same image can be deployed to different environments.
