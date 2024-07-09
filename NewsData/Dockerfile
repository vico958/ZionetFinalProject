FROM node:20.10.0

RUN mkdir /NewsData

COPY package.json /NewsData

WORKDIR /NewsData

RUN npm install

copy . /NewsData/

CMD ["npm", "start"]