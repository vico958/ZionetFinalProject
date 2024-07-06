FROM node:20.10.0

RUN mkdir /NewsApp

COPY package.json /NewsApp

WORKDIR /NewsApp

RUN npm install

copy . /NewsApp/

CMD ["npm", "start"]