import * as PIXI from 'pixi.js'

export default class Aram {
    constructor(app,x,y,angel,alpha) {
      this.app = app;
      this.aram = null;
      this.x = x;
      this.y = y;
      this.angel = angel;
      this.radian = 0;
      this.isGift = alpha == 1 ? false : true;
      this.initRadian
      this.roSpeed = 2;
      this.radius = 100;
      this.alpha = alpha;
      this.debugLine = null;
      this.Init();
    }

    Init(){
        let rectangle = new PIXI.Rectangle(800, 535, 60, 35);
    /*    let spImage =  PIXI.Texture.from('img/24.webp');
        let texture = new PIXI.Texture(spImage.baseTexture, rectangle);*/

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
        this.tempCricle()
    }
    gifReplacement(){
        if(this.isGift){
            window.giftReplacement = this.aram;
        }
    }

    KnifeDraw(t){
        if(window.triggerGiftMove){
           // return;
        }
        this.radian =  this.angel * (Math.PI / 180);//角度转弧度
        this.aram.x = window.hero.x + Math.sin(this.radian)* this.radius;
        this.aram.y = window.hero.y + Math.cos(this.radian)* this.radius;
        this.aram.rotation =  - this.radian;
        this.angel += this.roSpeed * t * 1.5;
    }

    tempCricle(){
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(0xDE3249, 1);
        graphics.drawCircle(0, 0, 5);
        graphics.endFill();
        this.app.stage.addChild(graphics);
        this.debugLine = graphics;


    }


    drawDebugLine(){

        if(!this.isGift){
            return;
        }
        this.debugLine.clear();
        this.debugLine.beginFill(0xDE3249, 1);
        this.debugLine.drawCircle(this.aram.x, this.aram.y, 5);
        this.debugLine.endFill();
        this.debugLine.closePath();
    }
    draw(){
        this.app.ticker.add((delta) => {
            this.gifReplacement();
            this.KnifeDraw(delta);
            this.drawDebugLine();
        });
    }
}
