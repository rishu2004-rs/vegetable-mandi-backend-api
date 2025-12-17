require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const { errorHandler } = require('./middlewares/errorMiddleware');



// App create
const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get('/', (req, res)=>{
    res.send("Server is running");
})

// Static folder for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));


// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



