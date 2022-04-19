const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatSecondTime = r => {
  var e = ~~(r / 60);
  return e + ":" + ("00" + parseInt(r - 60 * e)).substr(-2);
}

const isEmpty = val => {
  // null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

      // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length;
    }
  }

  return false;
}

const compareVersion = (r, e) => {
  r = r.split("."), e = e.split(".");
  for (var t = Math.max(r.length, e.length); r.length < t;) r.push("0");
  for (; e.length < t;) e.push("0");
  for (var n = 0; n < t; n++) {
    var u = parseInt(r[n]),
      i = parseInt(e[n]);
    if (u > i) return 1;
    if (u < i) return -1;
  }
  return 0;
}

module.exports ={
  formatTime: formatTime,
  formatSecondTime: formatSecondTime,
  formatSecondTime: formatSecondTime,
  isEmpty: isEmpty,
  compareVersion: compareVersion,
}
