import * as PIXI from 'pixi.js'

export default class Aram {
    constructor(app,x,y,angel) {
      this.app = app;
      this.aram = null;
      this.x = x;
      this.y = y;
      this.angel = angel;
      this.radian = 0;
      this.initRadian
      this.roSpeed = 5;
      this.radius = 100;
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
        this.aram.x = window.hero.x + Math.sin(0)* this.radius;
        this.aram.y = window.hero.y + Math.cos(0)* this.radius;
        this.aram.rotation = this.initRadian;
        this.aram.anchor.set(0.5,0.5);
        this.aram.scale.set(0.5);
        this.app.stage.addChild(this.aram);
        this.draw();

       /* const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFEEB77, 1);
        graphics.beginFill(0x650A5A);
        graphics.drawRect(this.aram.width/2, this.aram.height/2, this.aram.width, this.aram.height);
        graphics.endFill();
        this.app.stage.addChild(graphics);*/
      /*  this.app.ticker.add((delta) => {
           this.radian = this.angel * (Math.PI / 180);//角度转弧度
           this.aram.rotation =  - this.radian;
           this.angel += 1;
           console.log("hero = "+window.hero.x,window.hero.y);
        });*/
    }

    KnifeDraw(t){
        this.radian =  this.angel * (Math.PI / 180);//角度转弧度
        this.aram.x = window.hero.x + Math.sin(this.radian)* this.radius;
        this.aram.y = window.hero.y + Math.cos(this.radian)* this.radius;
        this.aram.rotation =  - this.radian;
        this.angel += this.roSpeed * t * .3;
    }

    draw(){
        this.app.ticker.add((delta) => {
         //   this.KnifeDraw(delta);
        });
    }
}
