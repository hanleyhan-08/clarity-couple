# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (using pnpm)
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build args
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build
RUN pnpm build

# Serve Stage
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html

# Default Nginx config usually works for SPA if we add try_files, 
# but let's assume default for now or add a custom one if needed.
# For SPA routing to work, we usually need custom nginx.conf.
# Let's create a simple one inline or assume typical usage.
# If /index.html is served for 404s, it works.

# Simple SPA config
RUN echo 'server { \
    listen 80; \
    location / { \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    try_files $uri $uri/ /index.html; \
    } \
    error_page 500 502 503 504 /50x.html; \
    location = /50x.html { \
    root /usr/share/nginx/html; \
    } \
    }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
