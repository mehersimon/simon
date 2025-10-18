const mongoose = require('mongoose');

async function connectToDatabase(uri) {
  if (!uri) return;
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(uri, {
    autoIndex: true,
  });
  console.log('Connected to MongoDB');
}

module.exports = { connectToDatabase };
