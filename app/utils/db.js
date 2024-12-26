const mongodb = require('mongodb'); // Import MongoDB package
const MongoClient = mongodb.MongoClient; // Get MongoClient from the mongodb package

let _db;
const dbUrl = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_USER_PWD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

const mongoConnect = callback => {
  if (_db) {
    console.log('MongoDB already connected');
    return callback();
  }

  // Use MongoClient to connect to the MongoDB server
  MongoClient.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,  // Use maxPoolSize instead of poolSize
  })
    .then(client => {
      console.log('Connected to MongoDB!');
      _db = client.db(); // Use client.db() to get the database instance
      callback();
    })
    .catch(err => {
      console.error(`Error connecting to MongoDB: ${err.message}`);
      process.exit(1); // Stop process on connection error
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error('Database not initialized. Call mongoConnect first.');
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
