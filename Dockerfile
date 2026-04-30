# ============================================================
# STAGE 1 — Builder: instala dependencias y compila con Vite
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /build

# La URL del backend la inyecta docker-compose en build time
# (Vite la "incrusta" en el bundle JS — no es runtime)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copiamos solo package.json y lock primero para cachear dependencias
COPY package.json package-lock.json ./
RUN npm ci

# Copiamos el resto del código y construimos
COPY . .
RUN npm run build

# ============================================================
# STAGE 2 — Runtime: nginx sirviendo los estáticos del dist/
# ============================================================
FROM nginx:alpine AS runtime

# Reemplazamos la config por defecto de nginx por la nuestra (con SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos la salida del build a la carpeta donde nginx busca archivos
COPY --from=builder /build/dist /usr/share/nginx/html

# Puerto en el que escucha nginx
EXPOSE 80

# nginx ya tiene su CMD por defecto, no hace falta ENTRYPOINT