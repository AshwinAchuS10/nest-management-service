FROM node:18.12.1-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/user
WORKDIR /var/www/user
ADD . /var/www/user
RUN npm install
CMD npm run build && npm run start:prod
