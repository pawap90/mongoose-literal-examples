'use strict';

const mongoose = require('mongoose');

/**
 * Product model schema.
 */
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    currency: { type: String, required: false },
    price: { type: Number, required: true },
    priceWithCurrency: { type: String, required: false },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, required: false }
});

module.exports = mongoose.model('product', productSchema);