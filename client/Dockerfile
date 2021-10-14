FROM node:latest
WORKDIR /app
COPY package.json ./
RUN npm install -g @angular/cli@12.2.7
RUN npm install
COPY . .
EXPOSE 4200
CMD npm run start