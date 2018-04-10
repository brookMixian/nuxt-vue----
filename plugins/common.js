const tools = {
  // 全局方法
  dateFormate(date, fmt) {
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  scrollTo(partId, findId) {
    // partId-父id
    // findId-子id

    let top = partId ? document.getElementById(partId).offsetTop || 0 : 0;
    let targetTop = findId ? document.getElementById(findId).offsetTop || 0 : 0;
    window.scrollTo(0, top + targetTop)
  }
};
export {tools};
