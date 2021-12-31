/**
 * Classe basica que representa un Sprite
 */
window.Sprite = Clazz({
    
    Constructor: function(config) {
        let that = this;
        
        that.img = new Image();
        that.img.src = config.src;

        that.width = config.width;
        that.height = config.height;

        that.animations = config.animations
        that.animation = config.animation || 'default'
        that.fps = config.fps || 60;

        that._index = 0;    //Indice del frame
        that._count = 0;    //Acumulador para saltar al siguiente indice

        that._maxFps = that.animations[that.animation].length - 1; //Cantidad de frames de la animación - 1
        //that._maxCount = that.fps / (that._maxFps + 1);             //Maximo valor del acumulador
    },

    get frame(){
        return this.animations[this._animation][this._index];
    },

    get fps(){
        return this._fps;
    },

    set fps(value){
        let that = this;
        that._fps = value;
        that._maxCount = value / (that._maxFps + 1);
    },

    get animation(){
        return this._animation;
    },

    set animation(key){

        let that = this;

        if(that.animation === key)
            return;

        that._animation = key;
        that._index = 0;
        that._count = 0;
        that.fps = that.fps;
        that._maxFps = that.animations[key].length - 1;
        //that._maxCount = that.fps / (that._maxFps + 1);
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

        if(that._index > that._maxFps)
            that._index = 0;
    },

    /**
     * Dibuja el frame actual en el contexto
     * @param {CanvasRenderingContext2D} ctx Contexto 2D canvas
     * @param {Number} x Posición en X del frame en el canvas
     * @param {Number} y Posición en Y del frame en el canvas
     * @param {Number} width Ancho final del frame
     * @param {Number} height Alto final del frame
     */
    draw: function(ctx, x, y, width, height){
        let that = this;
        let frame = that.frame;

        ctx.drawImage(
            that.img,                               //Imagen fuente
            frame[0], frame[1],                     //Posición desde donde se va a cortar el frame
            that.width, that.height,                //Ancho y Alto del frame a recortar
            x, y,                                   //Posición en el canvas donde se va a dibujar el frame
            width || that.width, height || that.height     //Ancho y Alto del frame a dibujar
        );
    }
});