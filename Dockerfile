FROM node:18-alpine As production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force 
COPY . .
EXPOSE ${PORT}
RUN npx prisma generate
CMD [ "npm", "run", "start:prisma"]