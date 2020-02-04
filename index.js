function startMove(obj, json, fn) {
  obj.timer = setInterval(() => {
    let bStop = true; //停止条件
    //遍历对象
    for (let key in json) {
      let cur = 0;
      if (key === 'opacity') {
        cur = Math.round(parseFloat(getComputedStyle(obj, false)[key]) * 100);
        // console.log(cur);
      } else {
        if (obj.currentStyle) {
          //IE
          cur = obj.currentStyle[key];
        } else {
          cur = parseInt(getComputedStyle(obj, false)[key]);
        }
      }
      //控制变化速度
      let speed = (json[key] - cur) / 5;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      // console.log(cur, json[key]);
      if (cur !== json[key]) bStop = false;

      if (key === 'opacity') {
        obj.style.opacity = (cur + speed) / 100;
      }
      obj.style[key] = cur + speed + 'px';
    }

    if (bStop) {
      clearInterval(obj.timer);
      fn && fn()
    }
  }, 30);
}