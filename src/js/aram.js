import * as PIXI from 'pixi.js'

export default class Aram {
    constructor(app,x,y,angel) {
      this.app = app;
      this.aram = null;
      this.x = x;
      this.y = y;
      this.angel = angel;
      this.radian = null;
      this.init();
    }

    init(){
        let rectangle = new PIXI.Rectangle(600, 485, 75, 45);
        let spImage =  PIXI.Texture.from('img/24.webp');
        let texture = new PIXI.Texture(spImage.baseTexture, rectangle);
        this.aram = new PIXI.Sprite(texture);
        this.aram.x = this.x;
        this.aram.y = this.y;
        this.radian = this.angel * (Math.PI / 180);//角度转弧度
        this.aram.rotation = this.radian;
        this.aram.anchor.set(0.5,0.5);
        this.aram.scale.set(1);

        this.app.stage.addChild(this.aram);

        const graphics = new PIXI.Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(0xDE3249, 1);
        graphics.drawCircle(this.aram.width/2, this.aram.height/2, 5);
        graphics.endFill();
        this.app.stage.addChild(graphics);
    }
}
