const mongoose = require('mongoose');

const SareeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, index: true },
    design: { type: String, index: true },
    material: { type: String, enum: ['Cotton', 'Silk', 'Mixed'], default: 'Cotton' },
    price: { type: Number, default: 0 },
    imageUrl: { type: String },
    description: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Saree || mongoose.model('Saree', SareeSchema);
