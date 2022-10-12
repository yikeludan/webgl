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
    },
    /**
     *
     * 三阶贝塞尔曲线
     * B(t) = P0 * (1-t)^3 + 3 * P1 * t * (1-t)^2 + 3 * P2 * t^2 * (1-t) + P3 * t^3, t ∈ [0,1]
     * @param t
     * @param p0
     * @param p1
     * @param p2
     * @param p3
     * @returns {*}
     */
    calculateBezierPointForCubic(t, p0, p1, p2, p3){
        let point = {x:0,y:0};
        let temp = 1 - t;
        point.x = p0.x * temp * temp * temp + 3 * p1.x * t * temp * temp + 3 * p2.x * t * t * temp + p3.x * t * t * t;
        point.y = p0.y * temp * temp * temp + 3 * p1.y * t * temp * temp + 3 * p2.y * t * t * temp + p3.y * t * t * t;
        return point;
    }


}
export default util
