export default class TimeLog {
  constructor(description, startTime, endTime, _id, isNew = true) {
    this.description = description;
    this.startTime =
      typeof startTime === 'string' ? new Date(startTime) : startTime;
    this.endTime = typeof endTime === 'string' ? new Date(endTime) : endTime;
    this.isNew = isNew;
    this._id = _id;
  }

  static buildTimeLog(object) {
    const isNew = !object._id;
    return new TimeLog(
      object.description,
      object.startTime,
      object.endTime,
      object._id,
      isNew
    );
  }

  static defaultTimeLog() {
    return new TimeLog('', new Date(), new Date());
  }
}
