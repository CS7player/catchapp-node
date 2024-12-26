const { getDb } = require('../../utils/db');
const { ObjectId } = require('mongodb');

exports.login = async (reqParams) => {
 try {
  const username = reqParams['username'];
  const password = reqParams['password'];
  const db = getDb();
  const collection = db.collection(COLLECTION_USER)
  const user = await collection.findOne({ username: username, password: password });
  return { status: true, data: user }
 } catch (error) {
  throw error
 }
}

exports.signUp = async (reqParams) => {
 try {
  if (await userExist(reqParams)) {
   return { status: false }
  }
  const username = reqParams['username'];
  const password = reqParams['password'];
  const db = getDb();
  const collection = db.collection(COLLECTION_USER)
  const user = await collection.insertOne({ username: username, password: password });
  const collection1 = db.collection(COLLECTION_FRIENDLIST);
  const record = await collection1.insertOne({"user_id":user['insertedId'].toString(),"friends_ids":[],"request_ids":[]})
  return { status: true, data: user }
 } catch (error) {
  throw error
 }
}

const userExist = async (reqParams) => {
 try {
  const username = reqParams['username'];
  const db = getDb();
  const collection = db.collection(COLLECTION_USER)
  const user = await collection.findOne({ username: username });
  if (user) {
   return true;
  } else {
   return false;
  }
 } catch (error) {
  throw error
 }
}