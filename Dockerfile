# --- FASE 1: EL CONSTRUCTOR (BUILDER) ---
# Usamos una imagen completa de Node para tener todas las herramientas de construcción
FROM node:18 AS builder

# Establecemos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos los archivos de dependencias y las instalamos TODAS (incluyendo las de desarrollo)
COPY package*.json ./
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# ¡EL PASO CLAVE! Compilamos el código de TypeScript a JavaScript
RUN npm run build

# --- FASE 2: EL EJECUTOR (RUNNER) ---
# Usamos una imagen "alpine", que es súper ligera y segura
FROM node:18-alpine

WORKDIR /usr/src/app

# Copiamos los archivos de dependencias de nuevo
COPY package*.json ./

# ¡Instalamos SOLAMENTE las dependencias de PRODUCCIÓN! Esto hace la imagen final mucho más pequeña.
RUN npm ci --omit=dev

# Copiamos el código ya compilado desde la fase "builder"
COPY --from=builder /usr/src/app/dist ./dist

# Expone el puerto 3000
EXPOSE 3000

# El comando para correr la aplicación en producción (directamente con Node, no con npm run start:dev)
CMD ["node", "dist/main.js"]