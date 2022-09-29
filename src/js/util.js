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
        let vectorMagnitude = null;
        vectorMagnitude.x = x/param;
        vectorMagnitude.y = y/param;
        return vectorMagnitude;
    }


}
export default util
