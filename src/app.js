// src/app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const setupSwagger = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Swagger docs
setupSwagger(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Library Management API is running on port ${PORT}`);
});

