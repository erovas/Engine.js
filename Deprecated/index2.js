let CanvasStack = document.querySelector('canvas-stack');

CanvasStack.onmousemove = function(e){
    let coordinates = CanvasStack.getCoordinates(e.pageX, e.pageY);
    XX.textContent = coordinates.Xs;
    YY.textContent = coordinates.Ys;
    XXl.textContent = coordinates.Xr;
    YYl.textContent = coordinates.Yr;
}

/**
 * @type {HTMLCanvasElement}
 */
let layer_0 = CanvasStack.getCanvas(); //Capa 0
let ctx = layer_0.getContext('2d');

ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.oImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;

let jugador = new Player({

    points: {
        top:    [ [8,4] ], // Head collision
        right:  [ [14,8] ], // Righ collision
        bottom: [ [8,12] ], // Feet collision 
        left:   [ [2,8] ]  // Left collision
    }
    
});

let keyboard = new InputKey();
keyboard.init();

const OFFSET = 0.001;

MLX.update = function(step){

    step = step * 0.001; // step / 1000    
    jugador.update(step, keyboard.keydown[0]);

    let currentPoints = jugador.currentPoints;
    let top = currentPoints.top;
    let right = currentPoints.right;
    let bottom = currentPoints.bottom;
    let left = currentPoints.left;
    let i;
    let point;
    let px;
    let py;
    let x = jugador.x;
    let y = jugador.y;

    //Colision con la parte superior del canvas
    for (i = 0; i < top.length; i++) {
        point = top[i]; // [x,y]
        px = point[0];
        py = point[1];

        if(py < 0){
            jugador.vy = 0;
            jugador.y = 0 - (py - y);
            break;
        }
    }

    //Colision con la parte derecha del canvas
    for (i = 0; i < right.length; i++) {
        point = right[i]; // [x,y]
        px = point[0];
        py = point[1];

        if(px > layer_0.width){
            jugador.vx = 0;
            jugador.x = layer_0.width - (px - x)// + OFFSET
            break;
        }
    }

    //Colision con la parte inferior del canvas
    for (i = 0; i < bottom.length; i++) {
        point = bottom[i]; // [x,y]
        px = point[0];
        py = point[1];

        if(py > layer_0.height){
            jugador.vy = 0;
            jugador.y = layer_0.height - (py - y)// + OFFSET
            break;
        }
    }

    //Colision con la parte izquierda del canvas
    for (i = 0; i < left.length; i++) {
        point = left[i]; // [x,y]
        px = point[0];
        py = point[1];

        if(px < 0){
            jugador.vx = 0;
            jugador.x = 0 - (px - x)// + OFFSET
            break;
        }
    }

};

MLX.draw = function(){
    ctx.clearRect(0,0,layer_0.width,layer_0.height);
    jugador.draw(ctx, 'yellow');
    jugador.drawPoints(ctx, 'red');
}

MLX.end = function(fps, panic){
    _fps_.textContent = fps | 0;

    if(panic)
        MLX.resetFrameDelta();
}

MLX.start();