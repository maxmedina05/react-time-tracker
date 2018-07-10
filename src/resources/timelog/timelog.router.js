const express = require('express');
const router = express.Router();

const {
  getAllTimelogs,
  addTimelog,
  deleteTimelog,
  getTimelog,
  updateTimelog,
  getTimelogsGroupByStartTime
} = require('./timelog.controller');

router.get('/', getAllTimelogs);
router.get('/group', getTimelogsGroupByStartTime);

router.post('/', addTimelog);

router.get('/:objectId', getTimelog);

router.put('/:objectId', updateTimelog);

router.delete('/:objectId', deleteTimelog);

module.exports = router;
