const Order = require('../models/order');

exports.processPayment = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (status === 'success') {
      await Order.findByIdAndUpdate(orderId, { status: 'Paid' });
      res.status(200).json({ message: 'Payment successful' });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};
