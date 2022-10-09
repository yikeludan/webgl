const util = {
    random (min,max) {
        return Math.random()*(max-min)+min
    },
    randomInt(min,max){
        return parseInt(Math.random()*(max-min)+min);
    },

    randByMoreParam(max, min, _int) {
        var max = (max === 0 || max) ? max : 1,
            min = min || 0,
            gen = min + (max - min) * Math.random();
        return (_int) ? Math.round(gen) : gen;
    },
    cuVectorMagnitude(x,y){
        let param=Math.sqrt(Math.pow(x,2)
            +Math.pow(y,2));
        let vectorMagnitude = {x:0,y:0};
        vectorMagnitude.x = x/param;
        vectorMagnitude.y = y/param;
        return vectorMagnitude;
    },

    cuVectorMagnitudeV2(x,y){
        let param=Math.sqrt(Math.pow(x,2)
            +Math.pow(y,2));
        let vec2 = {x:0,y:0}
        vec2.x = x/param;
        vec2.y = y/param;
        return vec2;
    },



    lerp(a,b,t){//缓动函数
        if (t <= 0){
            return a;
        } else if(t >= 1){
            return b;
        }
        return a + (b - a) * t;
    },
    lerpLoop(a,b,t,speed){
        if (t <= 0){
            return a;
        } else if(t >= 1){
            return b;
        }
        let res = a + (b - a) * t
        t += t * speed * 0.01;
        return res;
    },
    switchDeg(vec1,vec2){
        let diff_x = vec2.x - vec1.x,
            diff_y = vec2.y - vec1.y;
        //返回角度,不是弧度
        return 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
    }


}
export default util
