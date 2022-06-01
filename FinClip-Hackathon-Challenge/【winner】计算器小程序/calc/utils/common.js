//解决js数字计算中的浮点数问题
function fixed(arg1, arg2, computeMethod){
  switch (computeMethod) {
    case 'add': 
      var r1, r2, m;
      try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
      m = Math.pow(10, Math.max(r1, r2))
      return (arg1 * m + arg2 * m) / m
      break;
    case 'sub':
      return (arg1 * 10 - arg2 * 10) / 10
      break;
    case 'mul':
      var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
      try { m += s1.split(".")[1].length } catch (e) { }
      try { m += s2.split(".")[1].length } catch (e) { }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
      break;
    case 'div':
      return (arg1 * 1000) / (arg2 * 1000);
      break;
  }
}

module.exports = {
  fixed: fixed,
}