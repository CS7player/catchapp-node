const { getDb } = require('../../utils/db');
const { ObjectId } = require('mongodb');

exports.send = async (reqParams) => {
 try {
  const sender_id = reqParams['sender_id'];
  const receiver_id = reqParams['receiver_id'];
  const message = reqParams['message'];
  const db = getDb();
  const collection = db.collection(COLLECTION_CHAT);
  const result = await collection.insertOne({ sender_id: sender_id, receiver_id: receiver_id, message: message, date: new Date() })
  return { status: true, data: result }
 } catch (error) {
  throw error
 }
}

exports.get = async (reqParams) => {
 try {
  const sender_id = reqParams['sender_id'];
  const receiver_id = reqParams['receiver_id'];
  const db = getDb();
  const collection = db.collection(COLLECTION_CHAT);

  let pipeline = [
   {
    $match: {
     $or: [
      { $and: [{ "sender_id": sender_id }, { "receiver_id": receiver_id }] },
      { $and: [{ "sender_id": receiver_id }, { "receiver_id": sender_id }] }
     ]
    }
   },
   { $sort: { date: 1 } }
  ];
  const result = await collection.aggregate(pipeline).toArray();
  return { status: true, data: result };

 } catch (error) {
  throw error;
 }
};
