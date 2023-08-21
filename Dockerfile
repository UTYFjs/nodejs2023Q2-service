FROM node:18-alpine 
WORKDIR /app
COPY package*.json ./
RUN npm i && npm cache clean --force 
COPY --chown=node:node ./ /app
EXPOSE ${PORT}
CMD [ "npm", "run", "start:prisma"]