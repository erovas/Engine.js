let CanvasStack = document.querySelector('canvas-stack');

CanvasStack.onmousemove = function(e){
    let coordinates = CanvasStack.getCoordinates(e.pageX, e.pageY);
    XX.textContent = coordinates.Xs;
    YY.textContent = coordinates.Ys;
    XXl.textContent = coordinates.Xr;
    YYl.textContent = coordinates.Yr;
}

let layer_1 = CanvasStack.createLayer();
// alpha: transparencia, desynchronized: ???
let ctx_1 = layer_1.getContext('2d', { alpha: true, desynchronized: false });

ctx_1.imageSmoothingEnabled = false;
ctx_1.mozImageSmoothingEnabled = false;
ctx_1.oImageSmoothingEnabled = false;
ctx_1.webkitImageSmoothingEnabled = false;

let objeto = new GObject({
    x: 0, 
    y: 160, 
    width: 16, 
    height: 16
});



objeto.drawEdges(ctx_1, 'black');
objeto.y = 176;
objeto.drawEdges(ctx_1, 'green');
objeto.y = 192;
objeto.drawEdges(ctx_1, 'red');

//ctx_1.rotate(45 * Math.PI / 180)

let sprites = []

for (let i = 0; i < 16; i++) {
    sprites.push(new Sprite({
        src: 'Images/coinblock_16x16.png',
        //width: 16,    //Default
        //height: 16,   //Default
        columns: 5,
        rows: 4,
        animations: {
            'overworld': [0,1,2,2,1,0],
            'ow-hit': [3,4],
            'underground': [5,6,7,7,6,5],
            'ug-hit': [8,9],
            'castle': [10,11,12,12,11,10],
            'c-hit': [13,14],
            'underwater': [15,16,17,17,16,15],
            'uw-hit': [18,19]
        },
        animation: 'underwater',
        //speed: 60,  //Default
        //fps: ??     //Default automatico => fps = 6 porque la animacion tiene 6 frames
    }));
}


let MarioSprite = new Sprite({
    src: 'Images/Mario/Big-16x32.png',
    width: 16,
    height: 32,
    columns: 16,
    rows: 4,
    animations: {
        'stand-right': [0],
        'stand-left': [16],
        'walk-right': [1,2,3],
        'walk-left': [17,18,19],
        'turn-right': [4],
        'turn-left': [20],
        'jump-right': [5],
        'jump-left': [21],
        'flag-right': [6,7],
        'flag-left': [22,23],
        'swin-right': [8,9,10,11,12,13],
        'swin-left': [24,25,26,27,28,29],
        'down-right': [14],
        'down-left': [30],
        'fire-right': [15],
        'fire-left': [31],
    },
    animation: 'swin-right',
    speed: 60,  //Debe ser la misma que MLX.dev.speed
    fps: 6
});

//console.log(MarioSprite._animations);

let keyboard = new InputKey();
keyboard.init();

let mario = new Player({

    width: 15,
    height: 15,
    y: 96 || 32,
    x: 45 || 32,
    keydown: keyboard.keydown,
    keyup: keyboard.keyup
});

setTimeout(function(){
    MarioSprite.fps = 12;
}, 2000);

setTimeout(function(){
    MarioSprite.fps = 6;
    MarioSprite.animation = "walk-right"
}, 4000);

setTimeout(function(){
    MarioSprite.animation = "walk-left"
    //MarioSprite.speed = 200;
    MarioSprite.flipX = true;
    //MLX.dev.speed = 200;
    //MLX.dev.step = 144;
}, 8000);


MLX.update = function(s){

    //XX.textContent = s;
    //sprite.update();
    sprites.forEach(function(sprite){
        sprite.update();
    });

    MarioSprite.updateReverse();

    mario.update(s/1000);


};
MLX.draw = function(){
    ctx_1.clearRect(0, 0, CanvasStack.width, CanvasStack.height);
    //ctx_1.setTransform(1, 0, 0, 1, 0, 0);
    //ctx_1.rotate(45 * Math.PI / 180)

    let x = 0

    for (let i = 0; i < 8; i++) {
        //sprites[i].angle = 45
        //sprites[i].flipY = true;
        sprites[i].flipX = true;
        sprites[i].draw(ctx_1, x, 0, 16, 16);
        x = x + 16;
    }

    x = 0
    for (let i = 8; i < 16; i++) {
        sprites[i].flipY = true;
        sprites[i].draw(ctx_1, x, 112);
        x = x + 16;
    }

    //ctx_1.fillRect(0,0, 128, 16);
    ctx_1.fillStyle = "yellow";
    ctx_1.fillRect(0,16, 16, 96);
    ctx_1.fillRect(112,16, 16, 96);
    //ctx_1.fillRect(0,1, 128, 16);

    ctx_1.fillRect(48,104, 16, 2);
    ctx_1.fillRect(48,96, 2, 16);
    ctx_1.fillRect(64,96, 16, 2);
    ctx_1.fillRect(80,88, 16, 2);

    ctx_1.fillStyle = "white";


    MarioSprite.draw(ctx_1, 16, 48);
    ctx_1.fillRect(0,96, 16, 16);

    mario.draw(ctx_1);
    mario.drawEdges(ctx_1, 'green')
    mario.drawPoints(ctx_1, 'red')
    

};

MLX.end = function(fps, panic){
    _fps_.textContent = fps | 0;

    if(panic)
        MLX.resetFrameDelta();
}

MLX.start();


//MLX.dev.maxFPS = 60;
//MLX.dev.steps = 60;


let entidad = {}

function actualizar (dt){


    if(entidad.right){
        //Vel_final = Vel_inicial + (Aceleracion * tiempo)
        entidad.dx += entidad.ddx * dt;
    }
    else if(entidad.left){
        //Vel_final = Vel_inicial - (Aceleracion * tiempo)
        entidad.dx -= entidad.ddx * dt;
    }


}