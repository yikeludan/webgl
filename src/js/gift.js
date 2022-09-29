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
      this.roSpeed = 3;
      this.radius = 35;
      this.alpha = alpha;
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
        this.aram.anchor.set(0.5,0.5);
        this.aram.scale.set(0.5);
        this.aram.alpha= this.alpha;
        this.app.stage.addChild(this.aram);
        this.draw();


    }

    KnifeDraw(t){

        let angel1 = window.giftReplacement.rotation * 180 / Math.PI
        let angel2 = this.aram.rotation * 180 / Math.PI



        console.log(angel1,angel2)
        if(Math.sin(window.giftReplacement.rotation)
            == Math.sin(this.aram.rotation)
            && this.aram.rotation != 0){
            window.aramLock = true;
        }
        this.radian =  this.angel * (Math.PI / 180);//角度转弧度
        this.aram.x = window.hero.x + Math.sin(this.radian)* this.radius;
        this.aram.y = window.hero.y + Math.cos(this.radian)* this.radius;
        this.aram.rotation =  - this.radian;
        this.angel += this.roSpeed * t * 1.5;
        /*this.radian = -window.giftReplacement.rotation
        this.aram.x = window.hero.x + Math.sin(this.radian)* this.radius;
        this.aram.y = window.hero.y + Math.cos(this.radian)* this.radius;
        this.aram.rotation =  - this.radian;*/
    }

    draw(){
        this.app.ticker.add((delta) => {
            this.KnifeDraw(delta);
        });
    }
}
