import React from 'react';

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = `${year}/${month}/${date}/${hour}:${min}`;
  // date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

function getRemainingHours(deadline) {
  const currentTime = Math.round(new Date().getTime() / 1000.0);
  let remainingHours;
  const remainingMinutes = (deadline - currentTime) / 60;
  console.log(remainingHours);
  if (remainingMinutes < 0) {
    const overTime = Math.abs(remainingMinutes);
    if (overTime < 60) {
      remainingHours = `-${Math.floor(overTime)}m`;
    } else if (overTime / 60 < 24) {
      remainingHours = `-${Math.floor(overTime / 60)}h`;
    } else {
      remainingHours = `-${Math.floor(overTime / 60 / 24)}day`;
    }
  } else {
    if (remainingMinutes < 60) {
      remainingHours = `+${Math.floor(remainingMinutes)}m`;
    } else if (remainingMinutes / 60 < 24) {
      remainingHours = `+${Math.floor(remainingMinutes / 60)}h`;
    } else {
      remainingHours = `+${Math.floor(remainingHours / 60 / 24)}day`;
    }
  }
  return remainingHours;
}
export { getRemainingHours, timeConverter };
