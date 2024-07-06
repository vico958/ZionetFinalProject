FROM node:20.10.0

RUN mkdir /User

COPY package.json /User

WORKDIR /User

RUN npm install

copy . /User/

CMD ["npm", "start"]