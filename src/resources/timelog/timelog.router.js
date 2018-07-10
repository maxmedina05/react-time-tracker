const express = require('express');
const router = express.Router();

const {
  getAllTimelogs,
  addTimelog,
  deleteTimelog,
  getTimelog,
  updateTimelog
} = require('./timelog.controller');

router.get('/', getAllTimelogs);

router.post('/', addTimelog);

router.get('/:objectId', getTimelog);

router.put('/:objectId', updateTimelog);

router.delete('/:objectId', deleteTimelog);

module.exports = router;
