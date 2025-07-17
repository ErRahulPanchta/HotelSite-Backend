import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = ['https://hotel-site-frontend.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(json());
app.post('/update-section', (req, res) => {
  try {
    const { component, field, value } = req.body;

    console.log('FRONTEND EDIT DETECTED');
    console.log(`Component: ${component}`);
    console.log(`Field: ${field}`);
    console.log('New Value:');
    console.log(value);
    console.log('-'.repeat(50));

    res.status(200).json({ message: 'Edit logged successfully' });
  } catch (error) {
    console.error('Error logging edit:', error.message);
    res.status(500).json({ error: error.message });
  }
});


app.get('/', (req, res) => {
  res.send('Backend is running...');
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
