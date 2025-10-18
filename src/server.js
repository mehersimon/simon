require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const { connectToDatabase } = require('./utils/db');
const pagesRouter = require('./routes/pages');
const apiRouter = require('./routes/api');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(compression());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Static files
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Routers
app.use('/', pagesRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;

async function start() {
  const mongoUri = process.env.MONGO_URI || '';
  if (mongoUri) {
    await connectToDatabase(mongoUri);
  } else {
    console.warn('MONGO_URI not set. Using in-memory mock data only.');
  }
  app.listen(PORT, () => {
    console.log(`Sambalpuri Saree Hub running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
