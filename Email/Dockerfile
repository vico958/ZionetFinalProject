FROM node:20.10.0

RUN mkdir /Email

COPY package.json /Email

WORKDIR /Email

RUN npm install

COPY . /Email/

CMD ["npm", "start"]