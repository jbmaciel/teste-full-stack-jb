FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=development


COPY . .

CMD ["npm", "start"]
