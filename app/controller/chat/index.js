const chatModel = require('../../model/chat')

exports.send = async (req, res, next) => {
 try {
  const reqParams = req['body'] || {}
  const result = await chatModel.send(reqParams);
  if (result['data']) {
   res.status(200).json(result)
  } else {
   res.status(200).json({ status: false, msg: result })
  }
 } catch (error) {
  res.status(500).json({ status: false, msg: 'Internal server error', error: error })
 }
}


exports.get = async (req, res, next) => {
 try {
  const reqParams = req['body'] || {}
  const result = await chatModel.get(reqParams);
  if (result['data']) {
   res.status(200).json(result)
  } else {
   res.status(200).json({ status: false, msg: result })
  }
 } catch (error) {
  res.status(500).json({ status: false, msg: 'Internal server error', error: error })
 }
}