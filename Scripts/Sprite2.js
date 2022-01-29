/**
 * Classe basica que representa un Sprite
 * Copyright (c) 2022, Emanuel Rojas Vásquez
 */
var Sprite = Clazz({
    
    Constructor: function(config) {
        let that = this;

        //Array unidimensional que contiene los indices de los frames de una imagen grid
        let animations = config.animations;

        //Cantidad de columnas y filas que tiene el grid de la imagen
        let columns = config.columns;
        let rows = config.rows;

        let framesIndexes;
        let frameIndex;
        let key;
        let i;
        let X;
        let Y;
        
        //Guardar la imagen grid
        that._img = new Image();
        that._img.src = config.src;

        //Ancho y alto del frame
        that._width = config.width || 16;
        that._height = config.height || 16;

        //Cantidad de actualizaciones por segundo
        that._maxUpdates = config.speed || 60;

        //Cantidad de frames por segundo
        that._fps = config.fps;

        //Indice actual del frame de una animación
        that._index = 0;

        //Indice maximo que se puede llegar
        that._maxIndex = 0;

        //Acumulador para cambiar de index alcanzado un valor maximo
        that._Count = 0;

        //Cantidad maxima del acumulador para cambiar de index
        that._maxCount = 0;

        //Nombre de la animación actual
        that._animation = '';

        //Mirroring
        that._flipH = config.flipX || 1;
        that._flipV = config.flipY || 1;

        //Rotación
        that._angle = config.angle || 0;

        //Para guardar las animaciones definitivas
        that._animations = Object.create(null);

        //Generar las animaciones definitivas
        for (key in animations) {
        
            let framesPositions = [];

            // "default": [ 0, 1, 2, ... ]
            framesIndexes = animations[key];
            
            for (i = 0; i < framesIndexes.length; i++) {
                frameIndex = framesIndexes[i];
                X = (frameIndex % columns);
                Y = ( ( frameIndex / columns ) % rows ) | 0;
                framesPositions.push([(X * that.width) + X + 1, (Y * that.height) + Y + 1]);
            }

            // Para un width: 16 y un height: 16
            // "default": [ [1,1], [18,1], [35,1], ... ]
            that._animations[key] = framesPositions;
        }

        //Truquillo establecer e iniciar el Sprite class
        that.animation = config.animation || key;

    },


    _reset: function(){
        let that = this;

        that._index = 0;
        that._maxIndex = that._animations[that._animation].length - 1;
        that._count = 0;
        that._maxCount = (that._maxUpdates / that.fps) | 0;
    },

    get img(){
        return this._img;
    },

    get width(){
        return this._width;
    },

    get height(){
        return this._height;
    },

    get speed(){
        return this._maxUpdates;
    },

    set speed(value){
        this._maxUpdates = value? value | 0 : 1;
        this._reset();
    },

    get fps(){
        let that = this;

        if(typeof that._fps != 'number')
            return (that._maxUpdates / (that._maxIndex + 1)) | 0;

        return that._fps;
    },

    set fps(value){
        this._fps = value? value | 0 : 1;
        this._reset();
    },

    get animation(){
        return this._animation;
    },

    set animation(value){

        let that = this;

        if(that._animation === value)
            return;

        that._animation = value;
        that._reset();
    },

    get angle(){
        return this._angle;
    },

    set angle(value){
        this._angle = value | 0;
    },

    get flipX(){
        return !this._flipH;
    },

    set flipX(value){
        this._flipH = value? -1 : 1;
    },

    get flipY(){
        return !this._flipV;
    },

    set flipY(value){
        this._flipV = value? -1 : 1;
    },

    /**
     * Actualiza el frame del Sprite
     */
    update: function(){
        let that = this;
        that._count++;

        if(that._count < that._maxCount)
            return;

        that._count = 0;
        that._index++;

        if(that._index > that._maxIndex)
            that._index = 0;
    },

    /**
     * Actualiza el frame del Sprite en reversa
     */
     updateReverse: function(){
        let that = this;
        that._count++;

        if(that._count < that._maxCount)
            return;

        that._count = 0;
        that._index--;

        if(that._index < 0)
            that._index = that._maxIndex;
    },

    /**
     * Dibuja el frame actual en el contexto
     * @param {CanvasRenderingContext2D} ctx Contexto 2D canvas
     * @param {Number} x Posición en X del frame en el canvas
     * @param {Number} y Posición en Y del frame en el canvas
     * @param {Number} width Ancho final del frame [opcional]
     * @param {Number} height Alto final del frame [opcional]
     */
    draw: function(ctx, x, y, width, height){
        let that = this;
        let frame = that._animations[that._animation][that._index];
        let doTransform = that._flipH == -1 || that._flipV == -1 || that._angle != 0;
        
        width = (width | 0) || that._width;
        height = (height | 0) || that._height

        if(doTransform){
            let nx = (width / 2) | 0;
            let ny = (height / 2) | 0;
            ctx.setTransform(
                that._flipH,    //Horizontal scaling. A value of 1 results in no scaling.
                0,              //Vertical skewing. Default 0
                0,              //Horizontal skewing. Default 0
                that._flipV,    //Vertical scaling. A value of 1 results in no scaling.
                x + nx,         //Horizontal translation (moving).
                y + ny          //Vertical translation (moving).
            );
            ctx.rotate(that._angle * Math.PI / 180);
            x = - nx;
            y = - ny;
        }

        ctx.drawImage(
            that._img,                  //Imagen fuente
            frame[0], frame[1],         //Posición desde donde se va a cortar el frame
            that._width, that._height,  //Ancho y Alto del frame a recortar
            x, y,                       //Posición en el canvas donde se va a dibujar el frame
            width, height               //Ancho y Alto del frame a dibujar
        );

        if(doTransform)
            ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
});