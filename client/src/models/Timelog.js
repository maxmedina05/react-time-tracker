export default class TimeLog {
  constructor(description, startTime, endTime) {
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  static buildTimeLog(object) {
    return new TimeLog(object.description, object.startTime, object.endTime);
  }

  static defaultTimeLog() {
    return new TimeLog('', new Date(), new Date());
  }
}
