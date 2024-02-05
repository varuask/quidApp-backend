const express = require('express');
const router = express.Router();
const {
  getData,
  insertPoint,
  updatePoint,
  deletePoint,
} = require('../controllers/activity');

router.get('/getData', getData);
router.post('/insertPoint', insertPoint);
router.put('/updatePoint', updatePoint);
router.delete('/deletePoint', deletePoint);

module.exports = router;
