const Medicine = require("../models/medicine");

// ✅ Add Medicine
exports.addMedicine = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    if (!name || !price || !description || !stock) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMedicine = new Medicine({
      name,
      price,
      description,
      stock,
    });

    await newMedicine.save();
    res.status(201).json({
      message: "Medicine added successfully ✅",
      medicine: newMedicine,
    });
  } catch (error) {
    console.error("Error adding medicine:", error);
    res.status(500).json({ message: "Failed to add medicine" });
  }
};

// ✅ Get All Medicines (with pagination + optional search)
exports.getMedicines = async (req, res) => {
  try {
    const { page = 1, limit = 5, name } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    const total = await Medicine.countDocuments(query);
    const medicines = await Medicine.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      medicines,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ message: "Failed to fetch medicines" });
  }
};

// ✅ Get Single Medicine by ID
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.json(medicine);
  } catch (error) {
    console.error("Error fetching single medicine:", error);
    res.status(500).json({ message: "Failed to fetch medicine" });
  }
};

// ✅ Update Medicine
exports.updateMedicine = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stock },
      { new: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json({
      message: "Medicine updated successfully ✅",
      medicine: updatedMedicine,
    });
  } catch (error) {
    console.error("Error updating medicine:", error);
    res.status(500).json({ message: "Failed to update medicine" });
  }
};

// ✅ Delete Medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json({ message: "Medicine deleted successfully 🗑️" });
  } catch (error) {
    console.error("Error deleting medicine:", error);
    res.status(500).json({ message: "Failed to delete medicine" });
  }
};
