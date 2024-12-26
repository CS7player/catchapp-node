const friendslistModel = require('../../model/friendslist')

exports.users = async (req, res, next) => {
 try {
  const reqParams = req['body'] || {}
  const result = await friendslistModel.users(reqParams);
  if (result['data']) {
   res.status(200).json(result)
  } else {
   res.status(200).json({ status: false, msg: result })
  }
 } catch (error) {
  res.status(500).json({ status: false, msg: 'Internal server error', error: error })
 }
}

exports.friends = async (req, res, next) => {
 try {
  const reqParams = req['body'] || {}
  const result = await friendslistModel.friends(reqParams);
  if (result['data']) {
   res.status(200).json(result)
  } else {
   res.status(200).json({ status: false, msg: result })
  }
 } catch (error) {
  res.status(500).json({ status: false, msg: 'Internal server error', error: error })
 }
}

exports.request = async (req, res, next) => {
 try {
  const reqParams = req['body'] || {}
  const result = await friendslistModel.request(reqParams);
  if (result['data']) {
   res.status(200).json(result)
  } else {
   res.status(200).json({ status: false, msg: result })
  }
 } catch (error) {
  res.status(500).json({ status: false, msg: 'Internal server error', error: error })
 }
}

exports.sendreq = async (req, res, next) => {
 try {
  const reqParams = req['body'] || {}
  const result = await friendslistModel.sendreq(reqParams);
  if (result['data']) {
   res.status(200).json(result)
  } else {
   res.status(200).json({ status: false, msg: result })
  }
 } catch (error) {
  res.status(500).json({ status: false, msg: 'Internal server error', error: error })
 }
}


exports.acceptreq = async (req, res, next) => {
 try {
  const reqParams = req['body'] || {}
  const result = await friendslistModel.acceptreq(reqParams);
  if (result['data']) {
   res.status(200).json(result)
  } else {
   res.status(200).json({ status: false, msg: result })
  }
 } catch (error) {
  res.status(500).json({ status: false, msg: 'Internal server error', error: error })
 }
}

