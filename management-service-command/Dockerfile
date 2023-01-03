FROM node:18.12.1-alpine AS APPBUILD
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . /usr/src/app
RUN npm run build


FROM node:18.12.1-alpine AS FINALBUILD
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY --from=APPBUILD /usr/src/app/build ./build
COPY --from=APPBUILD /usr/src/app/.env ./
EXPOSE 8003
ENTRYPOINT [ "npm", "run", "start:prod" ]