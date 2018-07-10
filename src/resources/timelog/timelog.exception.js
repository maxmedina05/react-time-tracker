class TimelogNotFoundException extends Error {
  constructor(...args) {
    super(...args);

    this.name = 'TIMELOG_NOT_FOUND_EXCEPTION';
    this.message = 'Timelog was not found!';
    Error.captureStackTrace(this, TimelogNotFoundException);
  }
}

module.exports = {
  TimelogNotFoundException
};
