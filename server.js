require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// ✅ CORS configuration
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173", // frontend port
  credentials: true
}));


// ✅ Middleware
app.use(bodyParser.json());
app.use(express.json());

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// ✅ MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
