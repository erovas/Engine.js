window.Player = (function(){

    //#region CONSTANTES

    //#endregion

    //#region Classe

    return Clazz({

        Extends: Entity,

        Constructor: function(config){
            let that = this;
            that.Super(config);

            that._g = parseFloat(config.gravity) || 10; // Default 10 Tiles/segundo^2

            that._j = true;    //Estado de salto
            
            that._kd = config.keydown || [];
            that._ku = config.keyup || [];
            
            that.collider = new ColliderMap();
        },

        update: function(dt){
            let that = this;
            let input = that._kd[0]

            //if (input == 'up' && !that.isJumping){
            if (input == 'up'){
                //that._j = true;
                that.dy = -10;
                //that.dy -= 0.2;
            }

            if (input == 'down'){
                that._j = true;
                //that.dy = -10;
                that.dy += 0.2;
            }

            if(input == 'left'){
                that.dx -= 0.2
            }

            if(input == 'right'){
                that.dx += 0.2
            }

            that.ox = that.x;
            that.oy = that.y;

            //that.dy += 1;

            that.x += that.dx;
            that.y += that.dy;

            that.dx *= 0.9;
            that.dy *= 0.9;

            that.collider.Collide(that);

            //console.log(that.dx)

            //if(that.dy == 0)
                //that._j = false;
        },

        /**
         * 
         * @param {CanvasRenderingContext2D} ctx 
         */
        draw: function(ctx){
            let that = this;
            ctx.fillStyle = "blue";
            ctx.fillRect(Math.round(that.x), Math.round(that.y), that.width, that.height);
        },

        get isJumping(){
            return this._j;
        },

        get gravity(){
            return this._g;
        },

        set gravity(v){
            this._g = parseFloat(v) || this._g;
        }

    });

    //#endregion

    //#region Funciones



    //#endregion

})();