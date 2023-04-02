FROM node:16-alpine
WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start"]

