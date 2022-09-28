import * as PIXI from 'pixi.js'

export default class Webgl{
    constructor() {
        this.app = null;
        this.bunny = null;
        this.test = 1;
        this.bunny1 = null;
        this.that = null;
        this.initStateV5_3_12();
    }

    initStateV654(){
        const app = new PIXI.Application({
            width: 390,
            height: 844,
            antialias: true,
            autoDensity: true,
            backgroundColor: 0x1099bb,
            resolution: devicePixelRatio,
        });
        document.body.appendChild(app.view);
        const bunny = app.stage.addChild(PIXI.Sprite.from('img/img.png'));

        bunny.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

        bunny.anchor.set(0.5, 0.5);
        bunny.scale.set(3);
        bunny.position.set(
            app.renderer.screen.width / 2,
            app.renderer.screen.height / 2,
        );

    }


    initStateV5_3_12(){
        const app = new PIXI.Application({
            width: 390,
            height: 844,
            antialias: true,
            autoDensity: true,
            backgroundColor: 0x1099bb,
            resolution: devicePixelRatio,
        });
        document.body.appendChild(app.view);

        let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        app.stage.addChild(bg);
        const bunny = app.stage.addChild(PIXI.Sprite.from('img/img.png'));
        bg.width = app.screen.width;
        bg.height = app.screen.height;
        bg.tint = "white";
        bg.interactive = true;

      /*  bg.on('mousemove', function(event){
           // console.log('hello');
            if(event.target != bunny){
               // console.log(bunny);
                console.log("没有移动到精灵")
            }else {
                console.log("移动到精灵");
            }

        });*/



        bunny.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

        bunny.anchor.set(0.5, 0.5);
        bunny.scale.set(.5);
        bunny.position.set(
            app.renderer.screen.width / 2,
            app.renderer.screen.height / 2,
        );
        app.stage.interactive = true;
        bunny.interactive = true;
        var that = this;
        var index = 0;
        this.bunny = bunny;
        bunny.on("mousemove",(e)=>{
            that.cl(e);
        })



       /* app.stage.on('click',ee);
        function ee(e){
            console.log(1);
        }*/

    }
    cl(event){
            console.log(this.test)
            console.log(event);
    }

    initStateV521(){
        this.app = new PIXI.Application({
                width: 390,
                height: 844,
                antialias: true,
                autoDensity: true,
                resolution: devicePixelRatio,
                view: document.querySelector('#scene')
            }
        );
        document.body.appendChild(this.app.view);
        this.bunny = this.app.stage.addChild(PIXI.Sprite.from('img/favicon.png'));
        this.bunny1 = this.app.stage.addChild(PIXI.Sprite.from('img/img.png'));
        this.bunny.interactive = true;
        this.app.stage.interactive = true;
        this.app.stage.hitArea = this.app.renderer.screen;

    }

    initClick(){
        //this.bunny.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        console.log("img = "+this.bunny)


        this.bunny.anchor.set(0.5, 0.5);
        this.bunny.scale.set(3);
        this.bunny.position.set(
            this.app.renderer.screen.width / 2,
            this.app.renderer.screen.height / 2,
        );






    /*    this.app.stage.on('click', (e) => {
           console.log(1);
        });*/

        /*this.bunny.on("mousedown",function (e) {
            console.log(e);
        })*/

       /* that.app.stage.on('click', (e) => {
          console.log(1);
        });*/
        /*this.app.renderer.plugins.interaction.on('pointerdown', (event: PIXI.InteractionEvent) => {
            console.log(3)
        })*/
       // this.bunny1.on("mousedown",move);
       // this.app.stage.on("click",down);

       /* function move(event){
            //var pos = event.data.getLocalPosition(that.app.stage);
          /!*  that.bunny.x = pos.x;
            that.bunny.y = pos.y;
            console.log(pos.x,pos.y);*!/
            console.log(event.data.global.x,event.data.global.y);

        }

        function down(event){

            console.log(event.data.global.x,event.data.global.y);
        }*/


    }
    init(){
        const js = PIXI.Texture.from("img/favicon.png");
        this.bunny = new PIXI.Sprite(js);
        this.bunny.anchor.set(0.5);
        this.bunny.x = 40;
        this.bunny.y = 50;
        this.app.stage.addChild(this.bunny);
       /* this.app.ticker.add((delta) => {
            this.bunny.rotation -= 0.01 * delta;
        });*/
    }
    onClick(event){

        console.log(this.x,this.y);
        console.log(event.data.global.x,event.data.global.y);


        var pos = event.data.getLocalPosition(this.app.stage);

    }
}
