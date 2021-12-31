(function(document, window){


    var image = new Image;
    image.src = "https://i.stack.imgur.com/C7qq2.png?s=328&g=1";

    //var canvas = document.createElement("canvas");
    var canvas = document.querySelector('canvas-stack');

    canvas.onmousemove = function(e){

        //let coordinates = canvas.getPosition(e.pageX, e.pageY);
        let coordinates = canvas.getCoordinates(e.pageX, e.pageY);
        XX.textContent = coordinates.Xs;
        YY.textContent = coordinates.Ys;
        XXl.textContent = coordinates.Xr;
        YYl.textContent = coordinates.Yr;

    }

    var canvas2 = canvas.createLayer();

    //canvas2.width = 1280;

    //var ctx = canvas.getContext("2d");
    //var ctx = canvas.getCanvas().getContext('2d');
    var ctx = canvas2.getContext('2d');
    var w,h;

    function resize(){ 
        //w = canvas.width = innerWidth; 
        //h = canvas.height = innerHeight;
        w = canvas.width 
        h = canvas.height
    }

    resize();
    window.addEventListener("resize",resize);
    
    function rand(min,max){
        return Math.random() * (max ?(max-min) : min) + (max ? min : 0) 
    }

    function DO(count,callback){ 
        while (count--) { callback(count) } 
    }
    
    const sprites = [];
    
    DO(500,function(){
        sprites.push({
            x : rand(w), 
            y : rand(h),

            xr : 0, 
            yr : 0, // actual position of sprite

            r : rand(Math.PI * 2),      //Angulo de rotacion random
            scale : rand(0.1, 0.25),    //Escala random

            dx : rand(-2,2), 
            dy : rand(-2,2),
            dr : rand(-0.2,0.2),
        });
    });


    function drawImage(image, spr){
        // Horizontal.scale = 1, VerticalSkewing = 0, HorizontalSkewing = 0, Vertical.scale = 1, Horizontal.translation = X, Vertical.translation = Y
        ctx.setTransform(spr.scale, 0, 0, spr.scale, spr.xr, spr.yr); // sets scales and origin
        ctx.rotate(spr.r);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
    }

    function update(){
        var ihM,iwM;
        ctx.setTransform(1,0,0,1,0,0);
        ctx.clearRect(0,0,w,h);
        if(image.complete){
            var iw = image.width;
            var ih = image.height;
            
            for(var i = 0; i < sprites.length; i ++){
                var spr = sprites[i];

                spr.x += spr.dx;
                spr.y += spr.dy;
                spr.r += spr.dr;
                
                iwM = iw * spr.scale * 2 + w;
                ihM = ih * spr.scale * 2 + h;
                
                spr.xr = ((spr.x % iwM) + iwM) % iwM - iw * spr.scale;
                spr.yr = ((spr.y % ihM) + ihM) % ihM - ih * spr.scale;

                drawImage(image,spr);
            }
        }
    }

    //Iniciar
   MLX.draw = update;
   //MLX.update = update;
   MLX.start();


})(document, window);