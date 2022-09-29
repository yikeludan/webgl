import * as PIXI from 'pixi.js'

export default class V2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
    }

    lerp(vector, n) {
        this.x += (vector.x - this.x) * n;
        this.y += (vector.y - this.y) * n;
    }

    distance(vector) {
        let a = this.x - vector.x;
        let b = this.y - vector.y;
        return Math.sqrt(a * a + b * b);
    }

    normal(vector, distance) {
        if (!distance) distance = this.distance(vector);
        return new V2((this.x - vector.x) / distance, (this.y - vector.y) / distance);
    }
}

class Bit {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.root = new V2(x, y);
        this.position = new V2(x, y);
        this.acceleration = new V2();
        this.velocity = new V2();
        this.rotation = Math.random();
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.reset(0, 0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    limit() {
        let dist = this.position.distance(this.root);
        if (dist > 30) {
            let norm = this.position.normal(this.root, dist);
            this.position.x = this.root.x + norm.x * 30;
            this.position.y = this.root.y + norm.y * 30;
        }

        this.sprite.rotation = dist / 30 * this.rotation;
    }

    lerp() {
        // this.position.lerp(this.root, 0.1);
        this.applyForce(new V2((this.root.x - this.position.x) * 0.01, (this.root.y - this.position.y) * 0.01));
    }
}

const loadTextures = () => {
    for (var i = 0; i < 6; i++) {
        PIXI.loader.add(`bit${i}`, `https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/bit${i}@x2.png`);
    }

    PIXI.loader.load(initBits);
}

const initBits = (loader, resources) => {
    if (resources) pixiResources = resources;
    var i = 0;
    for (var y = 3; y < height; y += 36) {
        for (var x = 3; x < width; x += 36) {
            bits[i] = new Bit(new PIXI.Sprite(pixiResources['bit' + (i % 6)].texture), x, y);
            bits[i].sprite.width = 22;
            bits[i].sprite.height = 22;

            stage.addChild(bits[i].sprite);
            i++;
        }
    }
}

const updateBits = () => {
    // loopi++;
    for (var i = 0, l = bits.length; i < l; i++) {
        bits[i].update();

        let dist = bits[i].position.distance(pointerPosition);
        if (dist < 30) {
            bits[i].applyForce(bits[i].position.normal(pointerPosition, dist));
        }
        bits[i].limit();
        bits[i].lerp();
        bits[i].sprite.position.x = bits[i].position.x;
        bits[i].sprite.position.y = bits[i].position.y;
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    updateBits();
    renderer.render(stage);
}

const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.view.style.width = width + 'px';
    renderer.view.style.height = height + 'px';
    renderer.resize(width, height);
    for (var i = bits.length; i--;) {
        stage.removeChild(bits[i].sprite);
        delete bits[i];
    }
    bits = [];
    initBits();
}

const updatePointer = (e) => {
    pointerPosition.x = e.touches ? e.touches[0].pageX : e.pageX;
    pointerPosition.y = e.touches ? e.touches[0].pageY : e.pageY;
}

let width = window.innerWidth;
let height = window.innerHeight;
const renderer = new PIXI.autoDetectRenderer(width, height, {
    transparent: true
});
let bits = [];
let pixiResources;
let pointerPosition = new V2(width / 2, height / 2);

document.body.appendChild(renderer.view);
const stage = new PIXI.Container();
loadTextures();
animate();
window.addEventListener('mousemove', updatePointer);
window.addEventListener('pointermove', updatePointer);
document.addEventListener('touchmove', updatePointer);
window.addEventListener('resize', resize);
