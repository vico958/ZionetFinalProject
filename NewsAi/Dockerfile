FROM node:20.10.0

RUN mkdir /NewsAi

COPY package.json /NewsAi

WORKDIR /NewsAi

RUN npm install

COPY . /NewsAi/

CMD ["npm", "start"]