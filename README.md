# News Hub

A personalised news aggregator built with **React 19 · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui**.  
It pulls articles from three sources — [NewsAPI](https://newsapi.org/), [The Guardian](https://open-platform.theguardian.com/), and the [New York Times](https://developer.nytimes.com/) — and lets users filter by keyword, category, date, source, and preferred authors.

🚀 **Live demo:** [https://news-hub-ruby.vercel.app](https://news-hub-ruby.vercel.app)

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Running with Docker](#running-with-docker)
  - [Option A — Docker Compose (recommended)](#option-a--docker-compose-recommended)
  - [Option B — Plain Docker CLI](#option-b--plain-docker-cli)
- [Running Locally (without Docker)](#running-locally-without-docker)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)

---

## Prerequisites

| Tool | Minimum version | Purpose |
|------|----------------|---------|
| [Docker](https://docs.docker.com/get-docker/) | 24+ | Build & run the containerised app |
| [Docker Compose](https://docs.docker.com/compose/) | v2 (bundled with Docker Desktop) | Orchestrate the container with a single command |
| [Node.js](https://nodejs.org/) *(optional)* | 22+ | Local development without Docker |

---

## Environment Variables

The app requires three API keys at **build time** (Vite bakes them into the static bundle via the `VITE_` prefix).

1. Copy the example file:

   ```bash
   cp .env.example .env
   ```

2. Fill in your keys in `.env`:

   | Variable | Where to get it |
   |----------|----------------|
   | `VITE_NEWSAPI_KEY` | <https://newsapi.org/register> |
   | `VITE_GUARDIAN_KEY` | <https://open-platform.theguardian.com/access/> |
   | `VITE_NYT_KEY` | <https://developer.nytimes.com/get-started> |

> [!IMPORTANT]
> The `.env` file is intentionally excluded from version control. Never commit real API keys.

---

## Running with Docker

### Option A — Docker Compose (recommended)

Docker Compose reads your `.env` file automatically and passes the values as build-time arguments.

```bash
# 1. Build the image and start the container
docker compose up --build

# 2. Open the app
open http://localhost:8080        # macOS
# or visit http://localhost:8080 in your browser
```

To run in the background (detached mode):

```bash
docker compose up --build -d
```

To stop and remove the container:

```bash
docker compose down
```

---

### Option B — Plain Docker CLI

Use this approach if you prefer not to use Docker Compose.

```bash
# 1. Build the image, passing API keys as build arguments
docker build \
  --build-arg VITE_NEWSAPI_KEY="$(grep VITE_NEWSAPI_KEY .env | cut -d= -f2)" \
  --build-arg VITE_GUARDIAN_KEY="$(grep VITE_GUARDIAN_KEY .env | cut -d= -f2)" \
  --build-arg VITE_NYT_KEY="$(grep VITE_NYT_KEY .env | cut -d= -f2)" \
  -t news-hub:latest .

# 2. Run the container
docker run -d \
  --name news-hub \
  -p 8080:80 \
  --restart unless-stopped \
  news-hub:latest

# 3. Open the app
open http://localhost:8080
```

To stop and remove the container:

```bash
docker stop news-hub && docker rm news-hub
```

---

### How the Docker Build Works

The `Dockerfile` uses a **two-stage build** to keep the final image small and production-safe:

```
┌─────────────────────────────────────────────┐
│  Stage 1 — builder (node:22-alpine)         │
│  • npm ci                                   │
│  • npm run build  →  /app/dist              │
└────────────────────┬────────────────────────┘
                     │ COPY /app/dist
┌────────────────────▼────────────────────────┐
│  Stage 2 — runner (nginx:1.27-alpine)       │
│  • Serves /usr/share/nginx/html on port 80  │
│  • Custom nginx.conf for SPA fallback       │
│  • Gzip compression + asset caching         │
└─────────────────────────────────────────────┘
```

The Node.js toolchain, source files, and `node_modules` are **not present** in the final image — only the compiled static assets and Nginx.

---

## Running Locally (without Docker)

```bash
# Install dependencies
npm install

# Start the development server (with HMR)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Project Structure

```
news-hub/
├── public/               # Static assets copied as-is
├── src/
│   ├── components/       # Shared UI components (shadcn/ui + custom)
│   ├── features/         # Feature modules (preferences, search, …)
│   ├── lib/              # Utilities (cn, debounce, …)
│   ├── services/
│   │   └── api/          # HTTP client & news-provider adapters
│   └── main.tsx          # App entry point
├── .env.example          # Template for required environment variables
├── .dockerignore         # Files excluded from the Docker build context
├── docker-compose.yml    # One-command Docker Compose setup
├── Dockerfile            # Multi-stage production build
├── nginx.conf            # Nginx config with SPA routing & caching
├── index.html            # HTML shell
├── vite.config.ts        # Vite configuration
└── package.json
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 |
| UI components | shadcn/ui · Base UI · Lucide React |
| Data fetching | TanStack Query v5 |
| State management | Zustand |
| Routing | React Router v7 |
| Container runtime | Docker + Nginx (Alpine) |
