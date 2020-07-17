FROM node:12
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]

# docker build -t sunnyla/node-web-app .
# docker run -p 3000:3000 -d sunnyla/node-web-app
