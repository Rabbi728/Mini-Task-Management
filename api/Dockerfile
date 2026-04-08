FROM node:24-alpine

WORKDIR /app

RUN corepack enable

COPY package*.json ./

RUN yarn install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["yarn", "start:debug"]