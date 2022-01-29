var TileSet = Clazz({

    Constructor: function(config){

        let that = this;

        that._img = new Image();
        that._img.src = config.src || '';

        that._name = config.name || 'TileSet';

        that._columns = config.columns | 0 || 4;
        that._rows = config.rows | 0 || 4;

        that._width = config.width | 0 || 16;
        that._height = config.height | 0 || 16;

    },

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Number} index 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Object} options 
     */
    drawTile: function(ctx, index, x, y, options){
        
        options = options || {};
        options.flipH = options.flipH? -1 : 1;
        options.flipV = options.flipV? -1 : 1;
        options.angle = options.angle | 0;
        
        index = index | 0;
        x = x | 0 || 0;
        y = y | 0 || 0;

        let that = this;
        let px = index % that._columns;
        let py = ( (index / that._columns) % that._rows ) | 0;
        let doTransform = options.flipH === -1 || options.flipV === -1 || options.angle !== 0;

        options.width = options.width | 0 || that._width;
        options.height = options.height | 0 || that._height;

        px = px * that._width + px + 1;
        py = py * that._height + py + 1;

        if(doTransform){
            let nx = (options.width / 2) | 0;
            let ny = (options.height / 2) | 0;
            ctx.setTransform(
                options.flipH,  //Horizontal scaling. A value of 1 results in no scaling.
                0,              //Vertical skewing. Default 0
                0,              //Horizontal skewing. Default 0
                options.flipV,  //Vertical scaling. A value of 1 results in no scaling.
                x + nx,         //Horizontal translation (moving).
                y + ny          //Vertical translation (moving).
            );
            ctx.rotate(options.angle * Math.PI / 180);
            x = - nx;
            y = - ny;
        }

        ctx.drawImage(
            that._img,                      //Imagen fuente
            px, py,                         //Posición desde donde se va a cortar el frame
            that._width, that._height,      //Ancho y Alto del frame a recortar
            x, y,                           //Posición en el canvas donde se va a dibujar el frame
            options.width, options.height   //Ancho y Alto del frame a dibujar
        );

        if(doTransform)
            ctx.setTransform(1, 0, 0, 1, 0, 0);
    },

    get name(){
        return this._name;
    },

    set name(v){
        this._name = v || this._name;
    },

    get columns(){
        return this._columns;
    },

    set columns(v){
        this._columns = v | 0 || this._columns;
    },

    get rows(){
        return this._rows;
    },

    set rows(v){
        this._rows = v | 0 || this._rows;
    },

    get width(){
        return this._width;
    },

    set width(v){
        this._width = v | 0 || this._width;
    },

    get height(){
        return this._height;
    },

    set height(v){
        this._height = v | 0 || this._height;
    },

});