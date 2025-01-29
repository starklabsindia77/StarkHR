dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { errorHandler } from './middleware/error.js';
import logger from './utils/logger.js';
import db from './models/index.js'; 
import router from './routes/index.js';





const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    // logger.info('Request Body:', req.body);
    console.log('Request Body:', req.body);
  }
  next();
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads')));

// Routes
app.use('/api', router);

// Error handling
app.use(errorHandler);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Function to sync the database
async function syncDatabase() {
  try {
    await db.testConnection();

    // Synchronize public schema models
    logger.info('Synchronizing public schema models...');
    for (const modelName of Object.keys(db.getPublicModels())) {
      const model = db.getPublicModels()[modelName];
      await model.sync({ alter: true }); // Use { force: true } if tables need to be recreated
      logger.info(`Synchronized public model: ${modelName}`);
    }

    logger.info('Database synchronized successfully.');
  } catch (error) {
    logger.error('Error during database synchronization:', error);
    process.exit(1); // Exit the process on failure
  }
}


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  await syncDatabase(); // Synchronize the database when the server starts
});


export default app;