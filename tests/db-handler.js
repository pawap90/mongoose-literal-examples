'use strict';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
    // Specify v4.2 to get access to update aggregation pipelines.
    mongod = await MongoMemoryServer.create({ binary: { version: '4.2.6' } });

    const uri = await mongod.getConnectionString();

    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useFindAndModify: false
    };

    await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};