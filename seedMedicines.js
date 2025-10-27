require('dotenv').config();
const mongoose = require('mongoose');
const Medicine = require('./models/medicine'); // তোমার medicine model path ঠিক রাখো

const medicines = [
  { name: 'Paracetamol', description: 'Fever reducer & pain reliever', price: 20, stock: 100, category: 'Pain Relief' },
  { name: 'Amoxicillin', description: 'Antibiotic for bacterial infections', price: 45, stock: 60, category: 'Antibiotic' },
  { name: 'Cetirizine', description: 'Anti-allergy tablet', price: 15, stock: 150, category: 'Allergy' },
  { name: 'Pantoprazole', description: 'For acidity and gastric issues', price: 35, stock: 80, category: 'Antacid' },
  { name: 'Metformin', description: 'For type-2 diabetes control', price: 50, stock: 120, category: 'Diabetes' },
  { name: 'Azithromycin', description: 'Antibiotic for respiratory infections', price: 60, stock: 75, category: 'Antibiotic' },
  { name: 'Ibuprofen', description: 'Pain and inflammation relief', price: 25, stock: 90, category: 'Pain Relief' },
  { name: 'Dolo-650', description: 'Common fever and body pain medicine', price: 30, stock: 110, category: 'Pain Relief' },
  { name: 'Crocin Advance', description: 'Fast-acting pain reliever', price: 28, stock: 100, category: 'Pain Relief' },
  { name: 'Allegra', description: 'Allergy & cold medicine', price: 65, stock: 70, category: 'Allergy' },
  { name: 'Ciprofloxacin', description: 'Broad-spectrum antibiotic', price: 55, stock: 60, category: 'Antibiotic' },
  { name: 'Calpol Syrup', description: 'Pediatric fever medicine', price: 40, stock: 50, category: 'Pediatric' },
  { name: 'ORS Sachet', description: 'Rehydration solution for dehydration', price: 10, stock: 200, category: 'Electrolyte' },
  { name: 'Betadine Ointment', description: 'Antiseptic for wounds', price: 75, stock: 40, category: 'First Aid' },
  { name: 'B-complex Capsules', description: 'Vitamin supplement', price: 80, stock: 90, category: 'Supplement' },
  { name: 'Zincovit', description: 'Multivitamin and mineral tablet', price: 95, stock: 100, category: 'Supplement' },
  { name: 'Ecosprin 75', description: 'Blood thinner for heart patients', price: 50, stock: 60, category: 'Cardiac' },
  { name: 'Losartan', description: 'Blood pressure control medicine', price: 60, stock: 70, category: 'Cardiac' },
  { name: 'Montelukast', description: 'Anti-allergic for asthma', price: 70, stock: 55, category: 'Respiratory' },
  { name: 'Levocetirizine', description: 'Allergy & sneezing relief', price: 25, stock: 100, category: 'Allergy' }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // পুরনো medicines মুছে ফেলো
    await Medicine.deleteMany();
    console.log('🗑️ Old medicines deleted');

    // নতুনগুলো ইনসার্ট করো
    await Medicine.insertMany(medicines);
    console.log('💊 New medicines inserted successfully!');

    mongoose.connection.close();
    console.log('🔒 Connection closed');
  } catch (error) {
    console.error('❌ Error inserting medicines:', error.message);
    mongoose.connection.close();
  }
})();
