const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Router = require('./Router/route');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/route', Router);
app.use(errorHandler);

// const PORT = process.env.PORT || 7777;
const PORT=7777;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const taskRoutes = require('./Router/route');
// const errorHandler = require('./middleware/errorHandler');

// dotenv.config();

// const app = express();
// app.use(express.json());


// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// app.use('/route', taskRoutes);
// app.use(errorHandler);

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });