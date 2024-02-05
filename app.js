const express = require('express');
const stepsRouters = require('./routers/stepsrouters');

const app = express();

app.use(express.json());

app.use('/api/v1/steps',stepsRouters);

module.exports = app;