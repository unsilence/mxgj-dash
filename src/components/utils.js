/**
   * 格式化服务端数据
   * @param {*} data
   */
function getFormatData(data) {
  let rst = [];
  if (data) {
    data.forEach(v => {
      !v.father_num && rst.push({ "value": v._id, "label": v.name, "_id": v._id, 'key': v._id });
    })

    data.forEach(v => {
      v.father_num && getParent(v, rst);
    })
    function getParent(item, elems) {
      if (!elems) {
        return;
      }
      elems.forEach(v => {
        if (v._id === item.father_num) {
          v.children ? v.children.push({ "value": item._id, "label": item.name, "_id": item._id, 'key': item._id }) : (v.children = [{ "value": item._id, "label": item.name, "_id": item._id, 'key': item._id }]);
        } else {
          return getParent(item, v.children);
        }
      })
    }
  }
  return rst;
};

exports['getFormatData'] = getFormatData;

/**
 * 获得格式化的颜色数据
 * @param {*} serials
 * @param {*} colors
 */
function getColorSerialFormatData(serials, colors) {
  let rst = [];
  serials.forEach(v => {
    rst.push({ "value": v._id, "label": v.name, "_id": v._id, 'key': v._id });
  })

  colors.forEach(c => {
    getParent(c, rst);
  });
  function getParent(item, elems) {
    elems.forEach(v => {
      if (v._id === item.serial_num) {
        v.children ? v.children.push({ "value": item._id, "label": item.name, "_id": item._id, 'key': item._id }) : (v.children = [{ "value": item._id, "label": item.name, "_id": item._id, 'key': item._id }]);
      }
    })
  };

  return rst;
}
exports['getColorSerialFormatData'] = getColorSerialFormatData;



function getCategoryName(_ids, categoryMap) {
  let cids = [];
  if(_ids && typeof(_ids) == "string"){
    cids.push(_ids);
  }else if(_ids){
    cids = _ids ;
  }
  let cstr = cids.map(v => loop(v)).join('/');
  function loop(_id) {
    if (_id === '' || !_id) {
      return '';
    }
    return categoryMap[_id] ? categoryMap[_id].name : ''
  }
  return cstr;
}

exports['getCategoryName'] = getCategoryName;


function getProductNum(_ids, categoryMap) {
  let cids = [];
  if(_ids && typeof(_ids) == "string"){
    cids.push(_ids);
  }else if(_ids){
    cids = _ids ;
  }
  let cstr = cids.map(v => loop(v)).join('');
  function loop(_id) {
    let cd = '';
    if (_id === '' || !_id) {
      return cd;
    }
    if (categoryMap[_id]) {
        cd = categoryMap[_id].unique_num;
    }
    return cd;
  }
  return cstr;
}

exports['getProductNum'] = getProductNum;

/**
 * 获取组合数据
 * @param {} doubleArrays
 */
function doExchange(doubleArrays) {
  var len = doubleArrays.length
  if (len >= 2) {
    var len1 = doubleArrays[0].length
    var len2 = doubleArrays[1].length
    var newlen = len1 * len2
    var temp = new Array(newlen);
    var index = 0
    for (var i = 0; i < len1; i++) {
      for (var j = 0; j < len2; j++) {
        temp[index] ? temp[index].push(doubleArrays[0][i], doubleArrays[1][j]) : temp[index] = [doubleArrays[0][i], doubleArrays[1][j]]
        index++
      }
    }
    var newArray = new Array(len - 1)
    for (var i = 2; i < len; i++) {
      newArray[i - 1] = doubleArrays[i]
    }
    newArray[0] = temp
    return doExchange(newArray)
  } else {
    return doubleArrays[0]
  }
}

exports['doExchange'] = doExchange;

function keysrt(key, desc) {
  return function (a, b) {
    return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
  }
}

exports['keysrt'] = keysrt;



/* 去掉字符串前后的空格字符方法*/


//供使用者调用
function trim(s){
    return trimRight(trimLeft(s));
}
//去掉左边的空白
function trimLeft(s){
    if(s == null) {
        return "";
    }
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(0)) != -1) {
        var j=0, i = str.length;
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1){
            j++;
        }
        str = str.substring(j, i);
    }
    return str;
}

//去掉右边的空白 www.2cto.com
function trimRight(s){
    if(s == null) return "";
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(str.length-1)) != -1){
        var i = str.length - 1;
        while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){
           i--;
        }
        str = str.substring(0, i+1);
    }
    return str;
}

exports["trim"] = trim;




// 生成图片跟随鼠标移动方法
let points = [];  // 存储点的数组
// let upDataPoints = [];
function imgMove(record,callback){
  console.log(record);
  if(!record) {
    return false;
  }

  let body_ = document.querySelector("body"); // 获取body dom元素
  let img = document.createElement("img"); // 穿件 img 标签
  img.setAttribute("style","width:30px;height:30px;position:absolute;z-index:9999999999;pointer-events:none;"); // 给img 标签添加 样式
  body_.appendChild(img); // 把img 标签添加到body 中
  let addAfterImg = document.getElementById('addAffter');  // 获取 id  为 addAffter 的dom 元素

  var targetY=0, targetX=0 ;
  var point = [];
  // var radio;
  const parentDiv = document.getElementById('addAffterParent'); // 获取 id  为 addAffter的父级元素
  /* 鼠标移动时候改变生产图片移动的方法*/
  function moveHandler (e) {
    img.style.left = e.clientX+"px";
    img.style.top = e.clientY+"px";
    img.src = record.images[0].url;
  }
  /*获取元素的纵坐标*/
function getTop(e){
   var offset=e.y;   
   return offset;
}
/*获取元素的横坐标*/
function getLeft(e){
   var offset=e.offsetLeft;
   if(e.offsetParent!=null){
      offset+=getLeft(e.offsetParent);
   } 
   return offset;
} 

function mouseDownMoveHandler(me) {
  if(me.clientX - targetX >= 0 && me.clientX - targetX <= 200 && me.clientY - targetY >= 0 && me.clientY - targetY <= 200){
    points.forEach(v => {
      if(v.span.childNodes[0].tagName === "INPUT" && v.span.childNodes[0].checked == true){
        v.span.style.left = (me.clientX - targetX) + "px";
        v.span.style.top = (me.clientY - targetY-10) + "px";
      }
    })
  }
}

  function _click (e){
    if(img.parentNode  === body_){
          document.removeEventListener("mousemove",moveHandler,false);
          body_.removeChild(img);
              // let element = document.getElementById('addAffter');
              targetY = getTop(addAfterImg);
              targetX = getLeft(addAfterImg);
              let x = e.clientX;
              let y = e.clientY;
              let _point = document.createElement("span");
              _point.setAttribute("style","position:absolute;left:"+(x-targetX-5)+"px;top:"+(y-targetY-10)+"px;display :block;");
              points = [];
              points.push({prop : record, span : _point});
              callback(points);

    }else{
      document.removeEventListener("click",_click,false);
    }
    }
  parentDiv.addEventListener("mousedown",function(event){
      if(event.target.tagName === "INPUT" && event.target.name === "item" && event.target.checked){
          parentDiv.addEventListener("mousemove",mouseDownMoveHandler,false);
      }
  },false);
  parentDiv.addEventListener("mouseup",function(event){
      parentDiv.removeEventListener("mousemove",mouseDownMoveHandler,false);
  },false);
  document.addEventListener("mousemove",moveHandler,false);
  addAfterImg.addEventListener("click",_click,false);

}

exports["imgMove"] = imgMove;


function initalPoints (points) {
  let parent = document.getElementById('addAffterParent');
  if(parent){
    let parentChild = parent.childNodes;
    if(parentChild.length > 0){
      parentChild.forEach(v => {
        if(v.nodeName !== "IMG"){
          parent.removeChild(v);
        }
      })
    }
  }
  points.forEach(v => {
    let _span = document.createElement("span");
    let _radio = document.createElement("input");
    _radio.type = "radio";
    _span.appendChild(_radio);
    _span.setAttribute("style","position:absolute;left:"+(v.span.position_x)+";top:"+(v.span.position_y)+";display :block;z-index : 1000;")
    if(parent){
      parent.appendChild(_span);
    }
  })
}

exports["initalPoints"] = initalPoints;



/*
  把浮点数保留小数点后两位的处理方法
*/

function timeLayoutHandler (time) {
  var f_x = parseFloat(time); 
   if (isNaN(f_x)){ 
       return '0.00'; 
   } 
    var f_x = Math.round(f_x*100)/100; 
    var s_x = f_x.toString(); 
    var pos_decimal = s_x.indexOf('.'); 
    if (pos_decimal < 0){ 
        pos_decimal = s_x.length; 
        s_x += '.'; 
    } 
    while (s_x.length <= pos_decimal + 2){ 
        s_x += '0'; 
    }
  return s_x;
}
exports["timeLayoutHandler"] = timeLayoutHandler;
