const mongoose = require('mongoose');

const quantitySchema = new mongoose.Schema({
    Total: { type: Number, default: 0 },
    Unit: { type: String, default: '' }
});

const storageSchema = new mongoose.Schema({
    Product: { type: String, required: true },
    Quantities: [quantitySchema]  
}, {
    timestamps: true,
});

const Storage = mongoose.model('Storage', storageSchema);

module.exports = Storage;
