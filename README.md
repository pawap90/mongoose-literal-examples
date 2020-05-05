A Node.js + Mongoose + Jest project that demonstrates **how to use MongoDB's `$literal` operator** to fix some common issues.

>This repo was build as an example for my article [Fixing MongoDB's error "'$' by itself is not a valid FieldPath"](https://dev.to/paulasantamaria/fixing-mongodb-s-error-by-itself-is-not-a-valid-fieldpath-12p1).

# Dependencies
What you need to run this project:
- Node.js

(MongoDB is not required because it'll run in memory by the package `mongodb-memory-server`).

# Try it out
## 1. Install dependencies
```
npm install
```

## 2. Run tests
```
npm test
```

# Contribute
Feel free to contribute to this project either by leaving your comments and suggestions in the Issues section or creating a PR. 

# Testing MongoDB in memory
To learn more about how this project executes tests on a dynamically generated database in memory, check my article [Testing Node.js + Mongoose with an in-memory database](https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np)
