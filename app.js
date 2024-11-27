// app.js
const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')

// Import and validate environment variables
// Using dotenv or a similar library is recommended for safer configuration.
const port = process.env.PORT || 3000

// Boot the app
const app = express()

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// Register middleware
app.use(bodyParser.json()) // Parse JSON bodies for incoming requests
app.use(middleware.cors) // Handle CORS issues

// Register root route
app.get('/', api.handleRoot)

// Register routes for Products
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)

// Register routes for Orders
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder) // Update existing order
app.delete('/orders/:id', api.deleteOrder) // Delete an existing order

// Start the server and log the active port
app.listen(port, () => console.log(`Server listening on port ${port}`))
