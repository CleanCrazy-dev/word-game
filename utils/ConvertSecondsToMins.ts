export const ConvertSecondsToMinutesSeconds = (time: number) => {
  let tempTime = Math.abs(time);
  let minutes = Math.floor(tempTime / 60);
  let seconds = tempTime % 60 === 0 ? '00' : tempTime % 60;
  if (Number(seconds) < 10 && Number(seconds) > 0) {
    seconds = `0${seconds}`;
  }
  return time>=0?`${minutes}:${seconds}`:`-${minutes}:${seconds}`;
};
