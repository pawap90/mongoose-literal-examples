'use strict';

const mongoose = require('mongoose');

const dbHandler = require('./db-handler');

const productModel = require('../src/models/product');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbHandler.connect();
});

/**
 * Seed the database for every test.
 */
beforeEach(async () => {
    await createProducts();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
    await dbHandler.clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await dbHandler.closeDatabase();
});

/**
 * Product update test suite.
 */
describe('product update ', () => {
    /**
    * Should throw an exception when the currency is set to "$" and the operator $literal is not applied.
    */
    it('should fail if currency = "$" and $literal is not applied', async () => {
        const newCurrency = '$';

        const updateOperation = productModel.findByIdAndUpdate(productIphoneId,
            [{
                $set:
                {
                    currency: newCurrency,
                    updatedAt: '$$NOW'
                }
            }],
            {
                runValidators: true
            });

        await expect(updateOperation)
            .rejects
            .toThrow(mongoose.mongo.MongoError);
    });

    /**
    * Should update the document correctly when the currency is set to "$" but the $literal operator is applied.
    */
    it('should succeed if currency = "$" but $literal is applied', async () => {
        const newCurrency = '$';

        const updateOperation = productModel.findByIdAndUpdate(productIphoneId,
            [{
                $set:
                {
                    currency: { $literal: newCurrency },
                    updatedAt: '$$NOW'
                }
            }],
            {
                runValidators: true
            });

        await expect(updateOperation)
            .resolves
            .not
            .toThrow(mongoose.mongo.MongoError);

        const updatedProduct = await productModel.findById(productIphoneId);
        expect(updatedProduct.currency).toBe(newCurrency);
    });
});

/**
 * Seed the database with products.
 */
const createProducts = async () => {
    const createdIphone = await productModel.create(productIphone);
    productIphoneId = createdIphone.id;
};

let productIphoneId = null;
const productIphone = {
    name: 'iPhone 11',
    price: 699,
    description: 'A new dual‑camera system captures more of what you see and love. '
};