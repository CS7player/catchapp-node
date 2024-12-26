const { getDb } = require('../../utils/db');
const { ObjectId } = require('mongodb');

exports.users = async (reqParams) => {
 try {
  const user_id = reqParams['user_id'];
  const db = getDb();
  const collection = db.collection(COLLECTION_FRIENDLIST)
  const list = await collection.findOne({ user_id: user_id });
  const friends_ids = list ? list.friends_ids : [];
  if (friends_ids.length > 0) {
   friends_ids.push(user_id);
  }
  const collection1 = db.collection(COLLECTION_USER)
  const users = await collection1.find({
   '_id': { $nin: friends_ids.map(id => new ObjectId(id)) }
  },{ projection : {"password":0}}).toArray();
  return { status: true, data: users }
 } catch (error) {
  throw error
 }
}

exports.friends = async (reqParams) => {
 try {
  const user_id = reqParams['user_id'];
  const db = getDb();
  const collection = db.collection(COLLECTION_FRIENDLIST)
  const list = await collection.findOne({ user_id: user_id });
  const friends_ids = list ? list.friends_ids : [];
  const collection1 = db.collection(COLLECTION_USER)
  const users = await collection1.find({
   '_id': { $in: friends_ids.map(id => new ObjectId(id)) }
  },{ projection : {"password":0}}).toArray();
  return { status: true, data: users }
 } catch (error) {
  throw error
 }
}

exports.request = async (reqParams) => {
 try {
  const user_id = reqParams['user_id'];
  const db = getDb();
  const collection = db.collection(COLLECTION_FRIENDLIST)
  const list = await collection.findOne({ user_id: user_id });
  const request_ids = list ? list.request_ids : [];
  const collection1 = db.collection(COLLECTION_USER)
  const users = await collection1.find({
   '_id': { $in: request_ids.map(id => new ObjectId(id)) }
  },{ projection : {"password":0}}).toArray();
  return { status: true, data: users }
 } catch (error) {
  throw error
 }
}

exports.sendreq = async (reqParams) => {
 try {
  const user_id = reqParams['user_id'];
  const request_list = reqParams['request_list'];
  const db = getDb();
  const collection = db.collection(COLLECTION_FRIENDLIST);
  const result = await collection.updateMany(
   { "user_id": { $in: request_list } },
   { $push: { "request_ids": user_id } }
  );
  return { status: true, data: result };
 } catch (error) {
  throw error;
 }
}

exports.acceptreq = async (reqParams) => {
 try {
  const user_id = reqParams['user_id'];
  const accept_list = reqParams['accept_list'];
  const db = getDb();
  const collection = db.collection(COLLECTION_FRIENDLIST);
  const result = await collection.updateOne(
   { "user_id": user_id },
   { $push: { "friends_ids": { $each: accept_list } }, 
     $pull: { "request_ids": { $in: accept_list } } }
  );
  const accept = await collection.updateMany(
    { "user_id": { $in: accept_list } },
    { $push: { "friends_ids": user_id } }
  )
  return { status: true, data: result };
 } catch (error) {
  throw error;
 }
}
