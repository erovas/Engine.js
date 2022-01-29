window.Entity = Clazz({

    Extends: GObject,

    Constructor: function(config){
        let that = this;
        that.Super(config);

        //Velocidad actual del GObject
        that._dx = parseFloat(config.dx) || 0;
        that._dy = parseFloat(config.dy) || 0;

        //Velocidad pasada del GObject
        that._odx = that._dx;
        that._ody = that._dy;

        //Velocidad maxima del GObject - Por defecto 5 tiles/segundo
        that._mdx = parseFloat(config.max_dx) || 5;
        that._mdy = parseFloat(config.max_dy) || 5;

        //Velocidad minima del GObject - Por defecto -5 tiles/segundo
        that._ndx = parseFloat(config.min_dx) || 5;
        that._ndy = parseFloat(config.min_dy) || 5;

        //Puntos de colisiones - Por defecto son las 4 esquinas del GObject
        that._cp = config.points || [
                                        //[0, 0,'1-4-5'],           [that._w, 0, '1-2-5'],
                                        /*[0, that._h, '4-3'], */   [that._w, that._h, '3-2']
                                    ];

    },

    /**
     * Pintar los puntos de colisiones en el <canvas>
     * @param {CanvasRenderingContext2D} ctx 
     * @param {String} color 
     */
    drawPoints: function(ctx, color){
        let that = this;
        let currentPoints = that.pos_points;
        let points = that._cp;
        let currentPoint;
        let point;
        let x;
        let y;
        for (let i = 0; i < currentPoints.length; i++) {
            currentPoint = currentPoints[i];
            point = points[i];
            x = point[0] >= that._w? currentPoint[0] - 1: currentPoint[0]; 
            y = point[1] >= that._h? currentPoint[1] - 1: currentPoint[1]; 
            ctx.LineRect(
                Math.round(x),
                Math.round(y), 
                1, 
                1, 
                color
            );
        }
    },

    // Posición actual de los puntos de colisiones
    get pos_points(){
        let that = this;
        let cps = that._cp;
        let out_cps = [];
        let points;

        for (let i = 0; i < cps.length; i++) {
            points = cps[i];
            out_cps.push( [points[0] + that._x, points[1] + that._y] );
        }

        return out_cps;
    },

    //#region Puntos de colisiones

    get points(){
        return this.points;
    },

    set points(v){
        this._cp = v || this._cp;
    },

    //#endregion

    //#region Velocidad maxima

    get max_dx(){
        return this._mdx;
    },

    set max_dx(v){
        this._mdx = parseFloat(v) || this._mdx;
    },

    get max_dy(){
        return this._mdy;
    },

    set max_dy(v){
        this._mdy = parseFloat(v) || this._mdy;
    },

    //#endregion

    //#region Velocidad minima

    get min_dx(){
        return this._ndx;
    },

    set min_dx(v){
        this._ndx = parseFloat(v) || this._ndx;
    },

    get min_dy(){
        return this._ndy;
    },

    set min_dy(v){
        this._ndy = parseFloat(v) || this._ndy;
    },

    //#endregion

    //#region Velocidad actual

    get dx(){
        return this._dx;
    },

    set dx(v){
        //this._dx = parseFloat(v) || this._dx;
        this._dx = v;
    },

    get dy(){
        return this._dy;
    },

    set dy(v){
        //this._dy = parseFloat(v) || this._dy;
        this._dy = v;
    },

    //#endregion

    //#region Velocidad pasada

    get odx(){
        return this._odx;
    },

    set odx(v){
        this._odx = parseFloat(v) || this._odx;
    },

    get ody(){
        return this._ody;
    },

    set ody(v){
        this._ody = parseFloat(v) || this._ody;
    },

    //#endregion

});