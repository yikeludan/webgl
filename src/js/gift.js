import * as PIXI from 'pixi.js'
import util from "./util";
export default class Gift {
    constructor(app,x,y,angel,alpha) {
      this.app = app;
      this.aram = null;
      this.x = x;
      this.y = y;
      this.angel = angel;
      this.radian = 0;
      this.initRadian
      this.roSpeed = 2;
      this.radius = 35;
      this.alpha = alpha;
      this.debugLine = null;
      this.anParam = {
          a:0,
          b:360,
          t:0.01,
          initT:0.01
      }
      this.Init();
    }

    Init(){

        let spImage =  PIXI.Texture.from('img/5.png');
        let texture = new PIXI.Texture(spImage.baseTexture);
        this.aram = new PIXI.Sprite(texture);
        this.initRadian = this.angel * (Math.PI / 180);//角度转弧度
        this.aram.x = window.hero.x + Math.sin(this.initRadian)* this.radius;
        this.aram.y = window.hero.y + Math.cos(this.initRadian)* this.radius;
        this.aram.rotation = this.initRadian;
        this.aram.anchor.set(0,0.5);//0 , 0.5
        this.aram.scale.set(0.5);
        this.aram.alpha= this.alpha;
        this.app.stage.addChild(this.aram);
        this.draw();
        this.tempCricle()

    }

    tempCricle(){
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(0xDE3249, 1);
        graphics.drawCircle(0, 0, 10);
        graphics.endFill();
        this.app.stage.addChild(graphics);
        this.debugLine = graphics;

    }

    KnifeDraw(t){
        if(Math.sin(window.giftReplacement.rotation)
            == Math.sin(this.aram.rotation)
            && this.aram.rotation != 0){
           // window.aramLock = true;
        }
        this.radian =  this.angel * (Math.PI / 180);//角度转弧度
        this.aram.x = window.hero.x + Math.sin(this.radian)* this.radius;
        this.aram.y = window.hero.y + Math.cos(this.radian)* this.radius;
        this.aram.rotation =  - this.radian;

       /* let res = util.lerp(this.anParam.a,
            this.anParam.b,
            this.anParam.t);
        this.angel = res;
        if(res == this.anParam.b){
            this.anParam.t = this.anParam.initT;
        }
        this.anParam.t += this.roSpeed * t * 0.01;*/


        this.angel += this.roSpeed * t * 1.5;

    }

    CuVectorMagnitude(x,y){
        let param=Math.sqrt(Math.pow(x,2)
            +Math.pow(y,2));

        let vec2 = {x:0,y:0}
        vec2.x = x/param;
        vec2.y = y/param;
        return vec2;
    }


    TransitionRoation(){

    }


    KnifeDraw1(t){
        let apAramX = window.giftReplacement.x - window.hero.x;
        let apAramY = window.giftReplacement.y - window.hero.y;
        let vec = this.CuVectorMagnitude(apAramX,apAramY);
        let a = vec.y / vec.x;
        let giftX = this.aram.x - window.hero.x;
        let giftY = this.aram.y - window.hero.y;
        let vec1 = this.CuVectorMagnitude(giftX,giftY);//化为单位向量
        let b = vec1.y / vec1.x;
        let tan1 = Math.atan2(giftY,giftX);
        let tan2 = Math.atan2(apAramY,apAramX);
        if(Math.floor(tan1)
            == Math.floor(tan2)){//判断正切值是否相等来判断武器是否重合
            console.log("停住了")
            window.aramLock = true;
            this.aram.anchor.set(0.5,0.5);//0 , 0.5

          //  this.aram.rotation = window.giftReplacement.rotation;
            console.log("f = "+window.giftReplacement.rotation)
           // return;
        }else {
            let verticalRradian =  - 90 * (Math.PI / 180);//多给一个弧度让武器呈现90度角
            this.radian =  this.angel * (Math.PI / 180);//角度转弧度
            this.aram.x = window.hero.x + Math.sin(this.radian)* this.radius;
            this.aram.y = window.hero.y + Math.cos(this.radian)* this.radius;
            this.aram.rotation =  - this.radian - verticalRradian;
            this.angel += this.roSpeed * t * 1.5;
        }


    }

    drawDebugLine(){
        this.debugLine.clear();
        this.debugLine.beginFill(0xDE3249, 1);
        this.debugLine.drawCircle(this.aram.x, this.aram.y, 5);
        this.debugLine.endFill();
        this.debugLine.closePath();
    }

    draw(){
        this.app.ticker.add((delta) => {
            if(window.aramLock){
                return;
            }
            this.KnifeDraw1(delta);
            this.drawDebugLine();
        });
    }
}
