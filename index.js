const express = require('express');
const connect = require('./config/db');
const users = require('./routes/users');
const products = require('./routes/products');
const orders = require('./routes/orders');
const stats = require('./routes/stats');
const auth = require('./routes/auth');
const contacts = require('./routes/contacts'); 
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connect();

// CORS middleware
app.use(cors());

// Swagger API documentation
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

// Routes
app.use("/api", [auth, users, products, orders, stats, contacts]); // Use Contact instead of contact

app.get('/status', (req, res) => {
  res.json({ status: 'active' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
