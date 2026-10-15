# Usar una imagen oficial y ligera de Node.js
FROM node:18-alpine

# Crear el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo las dependencias de producción (o todas si se requieren para pruebas)
RUN npm install

# Copiar el resto del código fuente del proyecto
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]