import * as PIXI from 'pixi.js'
import Aram from "./aram";
import util from "./util";
import Gift from "./gift";
import Particle from "./particle";
import Particle1 from "./particle1";
export default class MoveVec {
    constructor() {
        this.app = null;
        this.bg = null;
        this.bunny = null;
        this.flag = false;
        this.x = null;
        this.y = null;
        this.vx = 0;
        this.vy = 0;
        this.ro = 0;
        this.speed = 5;
        this.roSpeed = 5;
        this.radius = 140;
        this.arrow = null;
        this.spImg = null;
        this.angle = 0;
        this.radian = 0;
        this.bounceSpring = 0.05;
        this.tilingSprite = null;
        this.count = 0;
        this.rr = 0;
        this.sp = {
            w:0,
            h:0
        }
        this.vectorMagnitude ={
            x:0,
            y:0
        }
        this.initLoad();
    }


    /**
     * 生成单位向量
     * @param x
     * @param y
     * @constructor
     */
    CuVectorMagnitude(x,y){
        let param=Math.sqrt(Math.pow(x,2)
            +Math.pow(y,2));
        this.vectorMagnitude.x = x/param;
        this.vectorMagnitude.y = y/param;
    }


    initLoad(){
        this.app = new PIXI.Application({
            antialias: true,
            autoDensity: true,
            width: 720,
            height: 1280,
            backgroundColor: 0x1099bb,
            view: document.querySelector('#scene'),
            resolution: window.devicePixelRatio || 1
        })
        document.body.appendChild(this.app.view);
        this.bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.bg.width = this.app.screen.width;
        this.bg.height = this.app.screen.height;
        this.bg.tint = "white";
        this.bg.interactive = true;
        this.app.stage.addChild(this.bg);


        this.bunny = this.app.stage.addChild(PIXI.Sprite.from('img/4.png'));
        this.bunny.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this.bunny.anchor.set(0.5, 0.5);
        this.bunny.scale.set(.5);
        this.bunny.position.set(
            this.app.renderer.screen.width / 2,
            this.app.renderer.screen.height / 2,
        );





        this.app.stage.interactive = true;
        this.bunny.interactive = true;
        window.hero = this.bunny;

        let particle = new Particle1(this.app);
        this.getAramList();
        this.mouseMoveSp();
        this.draw();

    }

    getAramList(){
        let tempAngel = 0;
        let tempLength = 5;
        let bisection = parseInt(360/tempLength);
        for(let i = 0;i < tempLength ;i++){
            let aram = new Aram(this.app,
                50,
                50,tempAngel,
                i == 1 ? 0: 1);
            tempAngel += bisection;
        }
        let gift = new Gift(this.app,50,50,0,1);
    }




     isMoble(){
        return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }


    mouseMoveSp(){
        let eventSystemOne = null;
        let eventSystemTwo = null;
        let eventSystemThree = null;
        if(!this.isMoble()){
            eventSystemOne = "mousedown"
            eventSystemTwo = "mousemove"
            eventSystemThree = "mouseup"
        }else {
            eventSystemOne = "touchstart"
            eventSystemTwo = "touchmove"
            eventSystemThree = "touchend"
        }
        this.app.stage.on(eventSystemOne, (e) => {
            if(e.target != this.bunny){
                console.log("抓到精灵")
            }
            this.flag = true
            this.x = e.data.global.x;
            this.y = e.data.global.y;
            window.particleStartVecX = e.data.global.x;
            window.particleStartVecY = e.data.global.y;

            console.log("winx = "+window.particleStartVecX);
            console.log("winy = "+window.particleStartVecY);


        })
        this.app.stage.on(eventSystemTwo,(e)=>{
            if(!this.flag){
                return;
            }
            let dx = e.data.global.x - this.bunny.x;
            let dy = e.data.global.y - this.bunny.y;
            this.ro = Math.atan2(dy,dx);
            this.CuVectorMagnitude(dx,dy);
            this.vx = this.vectorMagnitude.x;
            this.vy = this.vectorMagnitude.y;
            this.x = e.data.global.x;
            this.y = e.data.global.y;
            let hd = Math.PI / 180 * 90 ;
            this.ro+=hd;


        })
        this.app.stage.on(eventSystemThree,(e)=>{
            console.log("鼠标抬起")
            this.flag = false;
            this.vx = 0;
            this.vy = 0;
        })



    }

    KnifeDraw(t){
        this.radian = this.angle * (Math.PI / 180);//角度转弧度
        this.arrow.x = this.bunny.x + Math.sin(this.radian)* this.radius;
        this.arrow.y = this.bunny.y + Math.cos(this.radian)* this.radius;
        this.arrow.rotation =  - this.radian;
        this.angle += this.roSpeed * t * 1.5;
    }


    HeroDraw(t){
        //正弦公式 + 余弦公式
        let scale_w = 1 + Math.sin(this.rr * 0.1) * this.bounceSpring * 1.5  ;
        let scale_h = 1 + Math.cos(this.rr * 0.1) * this.bounceSpring / 3 ;
        let sc_w = 0.5 + Math.sin(this.count) * 0.04;
        let sc_h = 0.5 + Math.cos(this.count) * 0.04;
        this.bunny.scale.x = sc_w;
        this.bunny.scale.y = sc_h;
        this.bunny.x += this.vx * t * this.speed ;
        this.bunny.y += this.vy * t * this.speed ;
        this.bunny.rotation = this.ro;
        this.rr+= this.speed * t;
        this.count += 0.1;

    }

    draw(){
        this.app.ticker.add((delta) => {
            this.HeroDraw(delta);
           // this.KnifeDraw(delta);
        });
    }
}
