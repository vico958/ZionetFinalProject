
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Email service api',
    description: 'Email service api'
  },
  host: 'localhost:3006'
};

const outputFile = './swagger-output.json';
const routes = ["../../../server.js"];

swaggerAutogen(outputFile, routes, doc).then(() =>{
    require("../../../server.js")
})