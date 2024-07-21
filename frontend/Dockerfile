FROM node:20-alpine AS development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
RUN npm run dev

FROM node:20-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .
RUN npm ci --only=production

COPY . .
RUN npm run build

CMD ["npm", "run", "start"]
