const userModel = require('../../model/user')

exports.login = async (req, res, next) => {
 try {
  const reqParams = req['body'] || {}
  const result = await userModel.login(reqParams);
  if (result['data']) {
   res.status(200).json(result)
  } else {
   res.status(200).json({ status: false, msg: 'Invalid Details' })
  }
 } catch (error) {
  res.status(500).json({ status: false, msg: 'Internal server error', error: error })
 }
}


exports.signUp = async (req, res, next) => {
 try {
  const reqParams = req['body'] || {}
  const result = await userModel.signUp(reqParams);
  if (result['data']) {
   res.status(200).json(result)
  } else {
   res.status(200).json({ status: false, msg: 'Username already Exists!!!' })
  }
 } catch (error) {
  res.status(500).json({ status: false, msg: 'Internal server error', error: error })
 }
}