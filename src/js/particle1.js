import * as PIXI from 'pixi.js'
import util from "./util";
import vector2 from "./util/vector2";

/**
 * 粒子类
 */
export default class Particle1 {
    constructor(app) {
        this.app = app;
        this.particle = null;
        this.time = 0;
        this.x = this.app.stage.width/1.5;
        this.y = this.app.stage.height/1.5;
        this.gravity = .01
        this.particleList = [];
        this.particleObjList = [];
        this.allStop = true;
        this.length = 20;
        this.colorList = null;
        this.r = 3;
        this.stopLength = 0
        this.endX = 1;
        this.endY = 1
        this.init();
        this.init160XColor();
        this.initParam();
        this.draw();
    }

    init160XColor(){
        this.colorList = ["0xFF00CC","0xFF0000","0x993300","0x66FF33","0x6699FF",
            "0x0099FF","0xFFFF00","0x99FFFF","0x333300","0x0066FF",
            "0x996600","0x9900FF","0xFFCCCC","0xCC6699","0x999933",
            "0x3333FF","0x330066","0x006699","0x006600","0x00CC00"];

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

    initOneParticle(){
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(0xDE3249, 1);
        graphics.drawCircle(0, 0, this.r);
        graphics.endFill();
        this.app.stage.addChild(graphics);
        return  graphics;
    }


    initParam (){
        for(let i = 0;i<this.length;i++){
            let vx = Math.random() * 10 - 5;
            let vy = Math.random() * 10 - 5;
            let r = util.randByMoreParam(20, 2, 1);
            let hue = util.randByMoreParam(90, 0, 1);
            let cx1 = util.randByMoreParam(this.app.stage.width, 2, 1);
            let cy1 = util.randByMoreParam(this.app.stage.height, 2, 1);
            let cx2 = util.randByMoreParam(this.app.stage.width, 2, 1);
            let cy2 = util.randByMoreParam(this.app.stage.height, 2, 1);
            let tSpeed = 0.015
            let particle = this.initOneParticle();
            console.log("particle = "+particle)
            let par = {
                x:this.x,
                y:this.y,
                vx:vx,
                vy:vy,
                hue:hue,
                r:r, op:1, time:0, gx:0, gy:0,
                t:0, cx1:cx1, cy1:cy1, cx2:cx2,
                cy2:cy2,tSpeed:tSpeed,gravity:this.gravity,particle:particle
            }
            let obj = {
                obj:particle
            }
            this.particleList.push(par);
        }
    }
    drawParticleList(t){
        for(let i =0;i<this.particleList.length;i++){
            if(this.particleList[i].time>0.1){
                if(this.particleList[i].gx<=1){
                    this.stopLength+=1;
                    continue;
                }
                this.particleList[i].vx = 0;
                this.particleList[i].vy = 0;
                this.particleList[i].gx = this.particleList[i].x
                this.particleList[i].gy = this.particleList[i].y
                let temp = 1 - this.particleList[i].t;
                this.particleList[i].gx = this.particleList[i].x * temp * temp * temp + 3 * this.particleList[i].cx1 * this.particleList[i].t * temp * temp + 3 * this.particleList[i].cx2 * this.particleList[i].t * this.particleList[i].t * temp + this.endX * this.particleList[i].t * this.particleList[i].t * this.particleList[i].t;
                this.particleList[i].gy = this.particleList[i].y * temp * temp * temp + 3 * this.particleList[i].cy1 * this.particleList[i].t * temp * temp + 3 * this.particleList[i].cy2 * this.particleList[i].t * this.particleList[i].t * temp + this.endY * this.particleList[i].t * this.particleList[i].t * this.particleList[i].t;
                this.particleList[i].t+= this.particleList[i].tSpeed
            }else {
                this.particleList[i].gx = this.particleList[i].x
                this.particleList[i].gy = this.particleList[i].y
                this.particleList[i].time+=0.015
            }

            this.particleList[i].particle.clear();
            this.particleList[i].particle.beginFill(this.colorList[i], 1);
            this.particleList[i].particle.drawCircle(this.particleList[i].gx, this.particleList[i].gy, this.r);
            this.particleList[i].particle.endFill();
            this.particleList[i].particle.closePath();



            this.particleList[i].x+=this.particleList[i].vx;
            this.particleList[i].y+=this.particleList[i].vy;
            this.particleList[i].vy+=this.particleList[i].gravity;
            this.particleList[i].hue-=0.5;
        }
    }



    DrawParticle(t){
        this.particle.clear();
        this.particle.beginFill(0x7CFC00, 1);
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
         //  this.tempBer(delta);
          this.drawParticleList(delta);
        });
    }

}
