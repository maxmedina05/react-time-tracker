export const computeTimeDuration = (date1, date2) => {
  let diff = Math.abs((date2.getTime() - date1.getTime()) / 1000);

  let seconds = Math.floor(diff % 60);
  let minutes = Math.floor(Math.floor(diff / 60) % 60);
  let hours = Math.floor(diff / 3600);

  hours = Math.round(hours);
  minutes = Math.round(minutes);
  seconds = Math.round(seconds);

  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`;
};
