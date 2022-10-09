import * as PIXI from 'pixi.js'
import util from "./util";
import aramJsonParam from "./util/jsonParam";
import vector2 from "./util/vector2";
export default class Gift {
    constructor(app,x,y,angel,alpha) {
      this.app = app;
      this.aram = null;
      this.x = x;
      this.y = y;
      this.angel = angel;
      this.radian = 0;
      this.initRadian
      this.roSpeed =3;
      this.radius = 35;
      this.alpha = alpha;
      this.debugLine = null;
      this.verticalRradian = null;
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
        this.aram.anchor.set(0.5,0.5);//0 , 0.5
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


    /**
     * 弧度 = 角度 * Math.PI / 180
       角度 = 弧度 * 180 / Math.PI
     * @param t
     * @zhoubo
     */
    TransitionRoation(t){
        if(!window.triggerGiftSwitch){
            return;
        }

        let gift_init_deg = this.aram.rotation * 180 / Math.PI
        let alpha_aram_init_deg = window.giftReplacement.rotation * 180 / Math.PI
        gift_init_deg = Math.floor(gift_init_deg);
        alpha_aram_init_deg = Math.floor(alpha_aram_init_deg);
        if(Math.abs(alpha_aram_init_deg) > 360 ){
            alpha_aram_init_deg = -(Math.abs(alpha_aram_init_deg) - 360);
        }
        aramJsonParam.tranRoationParam.a =   gift_init_deg;
        aramJsonParam.tranRoationParam.b =   alpha_aram_init_deg;
        aramJsonParam.tranRoationParam.res = util.lerp(aramJsonParam.tranRoationParam.a,
            aramJsonParam.tranRoationParam.b,
            aramJsonParam.tranRoationParam.t);
        let rad = aramJsonParam.tranRoationParam.res * Math.PI / 180
        aramJsonParam.tranRoationParam.t += this.roSpeed * t * 0.01;
        this.aram.rotation = rad;
    }

    CoincidenceGiftVec2(t){
        if(!window.triggerGiftMove){
            return;
        }
        let dis = vector2.distance(window.giftReplacement,this.aram);
        console.log("dis = "+dis);
        if(Math.abs(this.aram.x) - Math.abs(window.giftReplacement.x) <=10
            && Math.abs(this.aram.y) - Math.abs(window.giftReplacement.y) <=10 ){
           // console.log("彻底重合");
            window.triggerGiftMove = true;
            this.aram.alpha = 0;
            window.giftReplacement.alpha = 1;
            this.debugLine.alpha = 0;
            window.globalLock = true;
            return;
        }
        //console.log("开始重合")
        let dx = window.giftReplacement.x - this.aram.x;
        let dy = window.giftReplacement.y - this.aram.y;
        let unitVector = this.CuVectorMagnitude(dx,dy);//化作单位向量

        let res = util.lerp(aramJsonParam.trangiftSpeedParam.a,
            aramJsonParam.trangiftSpeedParam.b,
            aramJsonParam.trangiftSpeedParam.t);
        this.aram.x += unitVector.x * t * res  ;
        this.aram.y += unitVector.y * t * res  ;
        aramJsonParam.trangiftSpeedParam.t += this.roSpeed * t * 0.002;
    }


    KnifeDraw1(t){
        if(window.aramLock){
            return;
        }
        console.log("开始计算")
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
            window.triggerGiftSwitch = true;
            window.triggerGiftMove = true;
        }

    }

    KnifeMove(t){
        if(window.triggerGiftMove){
            return;
        }
        console.log("开始跑")
        this.verticalRradian =  - 90 * (Math.PI / 180);//多给一个弧度让武器呈现90度角
        this.radian  =  this.angel * (Math.PI / 180);//角度转弧度
        this.aram.x = window.hero.x + Math.sin(this.radian)* this.radius;
        this.aram.y = window.hero.y + Math.cos(this.radian)* this.radius;
        this.aram.rotation =  -this.radian - this.verticalRradian;
        this.angel += this.roSpeed * t * 1.5;
    }


    KnifeDraw2(t){
        /*if(window.aramLock){
            return;
        }*/
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
            //  window.aramLock = true;
            //  window.triggerGiftSwitch = true;
            this.aram.anchor.set(0.5,0.5);//0 , 0.5
        }
        this.verticalRradian =  - 90 * (Math.PI / 180);//多给一个弧度让武器呈现90度角
        if(window.triggerGiftSwitch){
            this.verticalRradian = 0;
            // this.angel = this.aram.rotation * Math.PI / 180;
        }
        this.radian =  this.angel * (Math.PI / 180);//角度转弧度

        this.aram.x = window.hero.x + Math.sin(this.radian)* this.radius;
        this.aram.y = window.hero.y + Math.cos(this.radian)* this.radius;
        this.aram.rotation =  -this.radian - this.verticalRradian;
        this.angel += this.roSpeed * t * 1.5;
    }

    DrawDebugLine(){

        this.debugLine.clear();
        this.debugLine.beginFill(0xDE3249, 1);
        this.debugLine.drawCircle(this.aram.x, this.aram.y, 5);
        this.debugLine.endFill();
        this.debugLine.closePath();
    }

    draw(){
        this.app.ticker.add((delta) => {
            this.KnifeMove(delta);
            this.KnifeDraw1(delta);
            this.DrawDebugLine();
            this.TransitionRoation(delta);
            this.CoincidenceGiftVec2(delta);
        });
    }
}
