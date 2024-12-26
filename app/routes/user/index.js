const routes = require("express").Router();
const userController = require('../../controller/user');
const { check, validationResult } = require('express-validator');

routes.post('/login', [
 check('username').optional().isLength({ min: 4 }).withMessage('Name must be at least 4 characters long'),
 check('password').optional().isLength({ min: 5 }).withMessage('password must be at least 5 characters long'),
], async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 } try {
  await userController.login(req, res, next);
 } catch (error) {
  console.error(error);
 }
})

routes.post('/signUp',[
 check('username').optional().isLength({ min: 4 }).withMessage('Name must be at least 4 characters long'),
 check('password').optional().isLength({ min: 5 }).withMessage('password must be at least 5 characters long'),
], async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 } try {
  await userController.signUp(req, res, next);
 } catch (error) {
  console.error(error);
 }
}
)
module.exports = routes