// products.js
const fs = require('fs').promises
const path = require('path')
const cuid = require('cuid')
const db = require('./db')

const productsFile = path.join(__dirname, 'data/full-products.json')

// Define the Product model schema
// Ensure all required fields are defined and validate data before saving
const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  description: { type: String },
  alt_description: { type: String },
  likes: { type: Number, required: true },
  urls: {
    regular: { type: String, required: true },
    small: { type: String, required: true },
    thumb: { type: String, required: true },
  },
  links: {
    self: { type: String, required: true },
    html: { type: String, required: true },
  },
  user: {
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    portfolio_url: { type: String },
    username: { type: String, required: true },
  },
  tags: [{
    title: { type: String, required: true },
  }],
})

/**
 * List products with optional filtering by tag, pagination support
 * @param {Object} options - Filter, offset, and limit options
 * @returns {Promise<Array>} - List of products
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options;
  const query = tag ? { tags: { $elemMatch: { title: tag } } } : {}
  
  // Fetch products from the database
  return await Product.find(query)
    .sort({ _id: 1 }) // Sort products by ID
    .skip(offset) // Skip initial results for pagination
    .limit(limit) // Limit the number of results
}

/**
 * Get a single product by ID
 * @param {string} id
 * @returns {Promise<Object>} - Product object
 */
async function get(_id) {
  return await Product.findById(_id) // Find product by ID
}

/**
 * Create a new product
 * @param {Object} fields - Product details
 * @returns {Promise<Object>} - Newly created product
 */
async function create(fields) {
  // Ensure validation and sanitize fields before saving
  return await new Product(fields).save()
}

/**
 * Edit an existing product
 * @param {string} _id - Product ID
 * @param {Object} change - Changes to be made
 * @returns {Promise<Object>} - Updated product
 */
async function edit(_id, change) {
  const product = await get(_id)
  Object.keys(change).forEach(key => {
    product[key] = change[key] // Update fields
  })
  await product.save() // Save changes
  return product
}

/**
 * Delete a product by ID
 * @param {string} _id - Product ID
 * @returns {Promise<Object>} - Deletion status
 */
async function destroy(_id) {
  return await Product.deleteOne({ _id })
}

module.exports = {
  list,
  create,
  edit,
  destroy,
  get
}
