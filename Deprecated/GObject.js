/**
 * Classe basica que representa un objeto en el escenario
 * Copyright (c) 2022, Emanuel Rojas Vásquez
 */
window.GObject = Clazz({
    
    Constructor: function(config) {
        let that = this;

        //#region Variaciones

        //Posicion actual del GObject
        that.x = config.x || 0;
        that.y = config.y || 0;

        //Posición anterior del GObject
        that.ox = that.x;
        that.oy = that.y;

        //Velocidad actual del GObject
        that.dx = config.dx || 0;
        that.dy = config.dy || 0;

        //Velocidad anterior del GObject
        that.odx = config.dx;
        that.ody = config.dy;

        //#endregion

        //#region CONSTANTES

        //Posición maxima del GObject
        that.mx = that.mx || Infinity;
        that.my = that.my || Infinity;

        //Posición minima del GObject
        that.nx = that.nx || -Infinity;
        that.ny = that.ny || -Infinity;

        //Velocidad maxima del GObject
        that.mdx = config.mdx || 4; //4 tiles/segundo donde 1 tile = block.width
        that.mdy = config.mdy || 4; //4 tiles/segundo donde 1 tile = block.height

        //Velocidad minima del GObject
        that.ndx = config.mdx || -4;        //4 tiles/segundo donde 1 tile = block.width
        that.ndy = config.mdy || -Infinity; //Como es velocidad de salto mejo no limitarla

        //Aceleración del GObject
        that.ddx = config.ddx || 0;
        that.ddy = config.ddy || 0;

        //#endregion

        //Ancho y alto del GObject
        that.width = config.width;
        that.height = config.height;
    },

    //#region posición actual centro del GObject

    get cx(){
        return this.x + this.width / 2;
    },

    set cx(value){
        this.x = value - this.width / 2;
    },

    get cy(){
        return this.y + this.height / 2;
    },

    set cy(value){
        this.y = value - this.height / 2;
    },

    //#endregion

    //#region posición anterior centro del GObject

    get ocx(){
        return this.ox + this.width / 2;
    },

    set ocx(value){
        this.ox = value - this.width / 2;
    },

    get ocy(){
        return this.oy + this.height / 2;
    },

    set ocy(value){
        this.oy = value - this.height / 2;
    },

    //#endregion

    //#region posición actual esquinas del GObject

    //Izquierda
    get lx(){
        return this.x;
    },

    //Derecha
    get rx(){
        return this.x + this.width;
    },

    //Top
    get ty(){
        return this.y;
    },

    //Bottom
    get by(){
        return this.y + this.height;
    },

    set by(value){
        this.y = value - this.height;
    },

    //#endregion

    //#region posición anterior esquinas del GObject

    //Izquierda
    get olx(){
        return this.ox;
    },

    //Derecha
    get orx(){
        return this.ox + this.width;
    },

    //Top
    get oty(){
        return this.oy;
    },

    //Bottom
    get oby(){
        return this.oy + this.height;
    },

    //#endregion

    /**
     * @param {CanvasRenderingContext2D} ctx 
     * @param {String} color 
     */
    draw: function(ctx, color){
        let that = this;
        ctx.LineRect(that.x | 0, that.y | 0, that.width | 0, that.height | 0, color);
        ctx.LineRect(that.cx | 0, that.cy | 0, 1, 1, color);
    }

});