FROM node:20.10.0

RUN mkdir /UserAccessor

COPY package.json /UserAccessor

WORKDIR /UserAccessor

RUN npm install

COPY . /UserAccessor/

CMD ["npm", "start"]