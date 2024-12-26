const routes = require("express").Router();
const friendslistController = require('../../controller/friendslist');
const { check, validationResult } = require('express-validator');

routes.post('/users', [
 check('user_id').optional().isLength({ min: 4 }).withMessage('Invalid User Id')
], async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 } try {
  await friendslistController.users(req, res, next);
 } catch (error) {
  console.error(error);
 }
})

routes.post('/friends', [
 check('user_id').optional().isLength({ min: 4 }).withMessage('Invalid User Id')
], async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 } try {
  await friendslistController.friends(req, res, next);
 } catch (error) {
  console.error(error);
 }
})

routes.post('/request', [
 check('user_id').optional().isLength({ min: 4 }).withMessage('Invalid User Id')
], async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 } try {
  await friendslistController.request(req, res, next);
 } catch (error) {
  console.error(error);
 }
})

routes.post('/sendreq', [
 check('user_id').optional().isLength({ min: 4 }).withMessage('Invalid User Id')
], async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 } try {
  await friendslistController.sendreq(req, res, next);
 } catch (error) {
  console.error(error);
 }
})


routes.post('/acceptreq', [
 check('user_id').optional().isLength({ min: 4 }).withMessage('Invalid User Id')
], async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 } try {
  await friendslistController.acceptreq(req, res, next);
 } catch (error) {
  console.error(error);
 }
})


module.exports = routes