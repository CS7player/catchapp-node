const routes = require("express").Router();
const chatController = require('../../controller/chat');
const { check, validationResult } = require('express-validator');

routes.post('/send', [
 check('sender_id').optional().isLength({ min: 4 }).withMessage('Invalid sender Id'),
 check('receiver_id').optional().isLength({ min: 4 }).withMessage('Invalid receiver Id'),
], async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 } try {
  await chatController.send(req, res, next);
 } catch (error) {
  console.error(error);
 }
})

routes.post('/get', [
 check('sender_id').optional().isLength({ min: 4 }).withMessage('Invalid sender Id'),
 check('receiver_id').optional().isLength({ min: 4 }).withMessage('Invalid receiver Id'),
], async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 } try {
  await chatController.get(req, res, next);
 } catch (error) {
  console.error(error);
 }
})

module.exports = routes