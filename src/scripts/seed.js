require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { connectToDatabase } = require('../utils/db');
const Saree = require('../models/Saree');

async function run() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI not set. Please set it in your .env');
    process.exit(1);
  }
  await connectToDatabase(mongoUri);

  const dataPath = path.join(__dirname, '..', 'data', 'mockSarees.json');
  const items = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  await Saree.deleteMany({});
  await Saree.insertMany(items);
  console.log(`Seeded ${items.length} sarees.`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
