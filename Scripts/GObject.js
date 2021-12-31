/**
 * Classe basica que representa un objeto en el escenario
 * Copyright (c) 2022, Emanuel Rojas Vásquez
 */
window.GObject = Clazz({
    
    Constructor: function(config) {
        let that = this;

        //Posicion en el lienzo
        that.x = config.x || 0;
        that.y = config.y || 0;

        //Ancho y alto del objeto
        that.width = config.width;
        that.height = config.height;
    },

    //#region Coordenadas centro del GObject

    get cx(){
        return (this.x + this.width / 2) | 0;
    },

    set cx(value){
        this.x = (value - this.width / 2) | 0;
    },

    get cy(){
        return (this.y + this.height / 2) | 0;
    },

    set cy(value){
        this.y = (value - this.height / 2) | 0;
    },

    //#endregion

    /**
     * @param {CanvasRenderingContext2D} ctx 
     * @param {String} color 
     */
    draw: function(ctx, color){
        let that = this;
        ctx.LineRect(that.x, that.y, that.width, that.height, color);
        ctx.LineRect(that.cx, that.cy, 0, 0, color);
    }

});