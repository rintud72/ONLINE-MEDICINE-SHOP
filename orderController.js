const Order = require('../models/order');

// Place new order
exports.createOrder = async (req, res) => {
  try {
    const { medicineId, quantity } = req.body;
    const newOrder = new Order({
      userId: req.user.userId,
      medicineId,
      quantity,
      status: 'Pending',
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};
