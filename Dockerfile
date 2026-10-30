# ──────────────────────────────────────────────
# Stage 1 — Build
# ──────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (layer-cached unless lockfile changes)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source
COPY . .

# Accept build-time env vars for Vite (VITE_* prefix)
ARG VITE_NEWSAPI_KEY
ARG VITE_GUARDIAN_KEY
ARG VITE_NYT_KEY

# Build the production bundle
RUN npm run build

# ──────────────────────────────────────────────
# Stage 2 — Serve
# ──────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Copy custom Nginx config that handles SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

