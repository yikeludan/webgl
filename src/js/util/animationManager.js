import Tween from "./tween";export  function plusAnimainByLiner(param,callback) {    if(param.isLock){        return;    }    if(param.anValue>=param.end){        param.start = 0;        param.isLock = true;        (callback && typeof(callback) === "function") && callback();    }else {        param.anValue  = Tween.Linear(            param.start,            param.begin,            param.end,            param.during);        param.start++;    }}export  function plusAnimainByCubicEaseOut(param,callback) {    if(param.isLock){        return;    }    if(param.anValue>=param.end){        param.start = 0;        param.isLock = true;        (callback && typeof(callback) === "function") && callback();    }else {        param.anValue  = Tween.Cubic.easeOut(            param.start,            param.begin,            param.end,            param.during);            param.start++;    }}export  function plusAnimainByQuartEaseInOut(param,callback) {    if(param.isLock){        return;    }    if(param.anValue>=param.end){        param.start = 0;        param.isLock = true;        (callback && typeof(callback) === "function") && callback();    }else {        param.anValue  = Tween.Quart.easeInOut(            param.start,            param.begin,            param.end,            param.during);        param.start++;    }}export  function plusAnimainByCubicEaseInOut(param,callback) {    if(param.isLock){        return;    }    if(param.anValue>=param.end){        param.start = 0;        param.isLock = true;        (callback && typeof(callback) === "function") && callback();    }else {        param.anValue  = Tween.Cubic.easeInOut(            param.start,            param.begin,            param.end,            param.during);        param.start++;    }}export  function plusAnimainByQuadEaseOut(param,callback) {    if(param.isLock){        return;    }    if(param.anValue>=param.end){        param.start = 0;        param.isLock = true;        (callback && typeof(callback) === "function") && callback();    }else {        param.anValue  = Tween.Quad.easeOut(            param.start,            param.begin,            param.end,            param.during);        param.start++;    }}export function reduceAnimainByQuartEaseInOut(param,callback) {    if(param.isLock){        return;    }    if(param.anValue<=param.begin){        param.start = 0;        param.isLock = true;        (callback && typeof(callback) === "function") && callback();    }else {            param.anValue  = Tween.Quart.easeInOut(            param.start,            param.begin,            param.end,            param.during);        param.anValue =  param.end -param.anValue;        param.start++;    }}export function reduceAnimainByQuadEaseInOut(param,callback) {    if(param.isLock){        return;    }    if(param.anValue<=param.begin){        param.start = 0;        param.isLock = true;        (callback && typeof(callback) === "function") && callback();    }else {        param.anValue  = Tween.Quad.easeOut(            param.start,            param.begin,            param.end,            param.during);        param.anValue =  param.end -param.anValue;        param.start++;    }}export function reduceAnimainByCubicEaseOut(param,callback) {    if(param.isLock){        return;    }    if(param.anValue<=param.begin){        param.start = 0;        param.isLock = true;        (callback && typeof(callback) === "function") && callback();    }else {        param.anValue  = Tween.Cubic.easeOut(            param.start,            param.begin,            param.end,            param.during);        param.anValue =  param.end -param.anValue;        param.start++;    }}export function moveToVecByTween(param,callback) {    if(param.isLock){        return;    }    if(param.type == 0){        if(param.targetX === param.endX){            param.isLock = true;            (callback && typeof(callback) === "function") && callback();        }    }    if(param.type == 1){        if(param.targetY === param.endY){            param.isLock = true;            (callback && typeof(callback) === "function") && callback();        }    }    if(param.anValue>=param.end){        param.start = 0;        param.anValue = 0;    }else {        param.anValue  = Tween.Quart.easeInOut(            param.start,            param.begin,            param.end,            param.during);        console.log(param.anValue)        param.targetX =  param.startX + (param.endX - param.startX) * param.anValue;        param.targetY =  param.startY + (param.endY - param.startY) * param.anValue;        param.start++;    }}