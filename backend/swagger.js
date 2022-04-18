const swaggerAutogen = require('swagger-autogen')();
require('dotenv/config');

const doc = {
    info: {
        version: "1.0.0",
        title: "Customers Consult",
        description: "A financial consultation system for some customers."
    },
    host: `localhost:${process.env.PORT}`,
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Users',
            description: 'Used to register users data'
        },
        {
            name: 'Customers',
            description: 'Used to access the customers data, to save this data, update and delete.'
        },
        {
            name: 'Signin',
            description: 'Used to login on the app and generate a new token to the user'
        },
    ],
    securityDefinitions: {
        authBearer: {
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "authorization",  // name of the header, query parameter or cookie
            scheme: "bearer",
        }
    },
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/app/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/server.js');           // Your project's root file
});
