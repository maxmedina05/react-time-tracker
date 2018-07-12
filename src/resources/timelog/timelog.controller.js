const Agp = require('api-query-params');
const Timelog = require('./timelog.schema');
const { TimelogNotFoundException } = require('./timelog.exception');
const { chopProperties, isStringNullOrEmpty } = require('../utils');

const propertiesBackList = [
  'createdAt',
  'modifiedAt',
  'timezoneOffset',
  '_id',
  '__v'
];

async function getAllTimelogs(req, res) {
  try {
    const {
      filter,
      skip = 0,
      limit = 20,
      sort,
      projection = {
        __v: 0,
        createdAt: 0,
        modifiedAt: 0,
        timezoneOffset: 0
      }
    } = Agp(req.query);
    const total = await Timelog.countDocuments(filter);
    let logs = await Timelog.find(filter)
      .find(filter)
      .skip(skip)
      .limit(limit)
      .select(projection)
      .sort(sort);

    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.set('X-Total-Count', total);
    res.json({
      payload: logs,
      count: logs.length,
      total
    });
  } catch (err) {
    res.status(400).json({ payload: null, error: buildError(err) });
  }
}

async function getTimelogsGroupByStartTime(req, res) {
  const { term = '', skip = 0, limit = 20 } = req.query;
  const stages = isStringNullOrEmpty(term)
    ? []
    : [
        {
          $match: {
            $text: {
              $search: term,
              $caseSensitive: false
            }
          }
        }
      ];
  stages.push({
    $group: {
      _id: {
        year: { $year: '$startTime' },
        month: { $month: '$startTime' },
        day: { $dayOfMonth: '$startTime' }
      },
      data: {
        $push: {
          endTime: '$endTime',
          startTime: '$startTime',
          description: '$description',
          _id: '$_id'
        }
      }
    }
  });

  try {
    let count = await Timelog.aggregate([
      ...stages,
      {
        $count: 'total'
      }
    ]);

    let result = await Timelog.aggregate([
      ...stages,
      {
        $sort: {
          _id: -1
        }
      },
      {
        $limit: limit
      },
      {
        $skip: skip
      }
    ]);

    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.set('X-Total-Count', count.total);
    res.json({
      payload: result,
      count: result.length,
      total: count.total
    });
  } catch (err) {
    res.status(400).json({ payload: null, error: buildError(err) });
  }
}

async function addTimelog(req, res) {
  const { startTime, endTime, description } = req.body;
  try {
    let newTimelog = await Timelog.create({
      startTime,
      endTime,
      description
    });

    newTimelog = chopProperties(newTimelog, propertiesBackList);

    res.status(201).json({
      payload: newTimelog,
      error: false
    });
  } catch (err) {
    res.status(400).json({ payload: null, error: buildError(err) });
  }
}

async function getTimelog(req, res) {
  const { objectId } = req.params;

  try {
    const timeLog = await Timelog.findById(objectId, {
      _id: 0,
      __v: 0,
      createdAt: 0,
      modifiedAt: 0,
      timezoneOffset: 0
    });
    if (!timeLog) {
      throw new TimelogNotFoundException();
    }

    res.json({ payload: timeLog });
  } catch (err) {
    res.status(400).json({ payload: null, error: buildError(err) });
  }
}

async function updateTimelog(req, res) {
  const { objectId } = req.params;
  const { startTime, endTime, description } = req.body;

  try {
    let timeLog = await Timelog.findById(objectId);

    if (!timeLog) {
      throw new TimelogNotFoundException();
    }

    timeLog.startTime = startTime ? startTime : timeLog.startTime;
    timeLog.endTime = endTime ? endTime : timeLog.endTime;
    timeLog.description = description ? description : timeLog.description;

    await timeLog.save();
    timeLog = chopProperties(timeLog, propertiesBackList);

    res.json({ payload: timeLog });
  } catch (err) {
    res.status(400).json({ payload: null, error: buildError(err) });
  }
}

async function deleteTimelog(req, res) {
  const objectId = req.params.objectId;
  try {
    let timeLogToDelete = await Timelog.findById(objectId);

    if (!timeLogToDelete) {
      throw new TimelogNotFoundException();
    }

    await timeLogToDelete.remove();

    res.status(204).send();
  } catch (err) {
    res.status(400).json({ payload: null, error: buildError(err) });
  }
}

function buildError(error) {
  return {
    name: error.name,
    message: error.message
  };
}

module.exports = {
  getAllTimelogs,
  getTimelogsGroupByStartTime,
  addTimelog,
  deleteTimelog,
  getTimelog,
  updateTimelog
};
