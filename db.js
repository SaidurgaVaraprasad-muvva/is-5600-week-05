// db.js
const mongoose = require('mongoose')

// Connect to MongoDB using environment variables or a default URI
// Add options like `useUnifiedTopology: true` to avoid warnings
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin',
  {
    useNewUrlParser: true,
  }
)

// Add event listeners to handle database connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})

module.exports = mongoose
