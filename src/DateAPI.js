import React from 'react';

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

function getRemainingHours(deadline) {
  const currentTime = Math.round(new Date().getTime() / 1000.0);
  let remainingHours;
  const remainingMinutes = (deadline - currentTime) / 60;
  console.log(remainingHours)
  if (remainingMinutes < 0) {
    const overTime = Math.abs(remainingMinutes);
    if (overTime < 60) {
      remainingHours = `마감시간이${Math.floor(overTime)}분 지났습니다.`;
    } else {
      remainingHours = `마감시간이${Math.floor(overTime / 60)}시간 지났습니다.`;
    }
  } else {
    if (remainingMinutes < 60) {
      remainingHours = `마감시간이${Math.floor(
        remainingMinutes
      )}분 남았습니다.`;
    } else {
      remainingHours = `마감시간이${Math.floor(
        remainingMinutes / 60
      )}시간 남았습니다.`;
    }
  }
  return remainingHours;
}
export { getRemainingHours, timeConverter };
