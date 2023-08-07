FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .



EXPOSE ${PORT}
RUN npx prisma generate
CMD [ "npm", "run", "start:prisma"]