import * as PIXI from 'pixi.js'
import util from "./util";
import vector2 from "./util/vector2";

/**
 * 粒子类
 */
export default class Particle {
    constructor(app) {
        this.app = app;
        this.particle = null;
        this.time = 0;
        this.init();
        this.draw();
    }

    init(){
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(0xDE3249, 1);
        graphics.drawCircle(0, 0, 5);
        graphics.endFill();
        this.app.stage.addChild(graphics);
        this.particle = graphics;
    }
    DrawParticle(t){
        this.particle.clear();
        this.particle.beginFill(0xDE3249, 1);
        this.particle.drawCircle(this.particle.position.x, this.particle.position.y, 5);
        this.particle.endFill();
        this.particle.closePath();
    }
    tempBer(t){
        let p0 = {
            x:100,y:400
        }
        let p1 = {
            x:10,y:200
        }
        let p2 = {
            x:200,y:100
        }
        let p3 = {
            x:500,y:600
        }
       let point =  util.calculateBezierPointForCubic(this.time,p0,p1,p2,p3);
       this.particle.position.x = point.x;
       this.particle.position.y = point.y;
       this.time += 0.0005;
    }
    draw(){
        this.app.ticker.add((delta) => {
           this.DrawParticle(delta);
           this.tempBer(delta);
        });
    }

}
