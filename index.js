import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ScrapeController from './controllers/scrapeController.js';
import routes from './routes/Routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', routes)

app.use(express.json());

app.get('/', (req, res) => {
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Scrape function
ScrapeController.scrapeAndSaveData(process.env.BASE_URL);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
