FROM node:20.10.0

RUN mkdir /NewsAi

COPY package.json /NewsAi

WORKDIR /NewsAi

RUN npm install

copy . /NewsAi/

CMD ["npm", "start"]