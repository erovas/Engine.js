(function(){

    window.Player = Clazz({

        Extends: GObject,

        Constructor: function(config){
            let that = this;

            that.Super(config);

            //Variable de estado si esta saltando
            that.jumping = false;
            that.dead = false;

            //that.gravity = config.gravity || 10; //10 tiles/segundo^2
            that.gravity = 160;
            that._gravity = 160;

            that.keydown = config.keydown || [];
            that.keyup = config.keyup || [];

            //that.salto = 4 * 16;

            that._dy = 143.10835056;
            that._dy = 144;

            //that.y = 100
            that._dt = 0;
        },

        update: function(dt){

            let that = this;

            //console.log(that)

            //console.log(that.keyHolder[0])

            if(that._dt > 0)
                that._dt += dt;

            if(that.keydown[0] == 'up' && !that.jumping){
                that.dy = -that._dy;
                that._gravity = that.gravity;
                that._dt = 0;
                that.jumping = true;
                that._dt = dt;
            }

            if(that.jumping && that.keyup[0] == 'up' && that._dt < 0.1 && that._dt != 0 && that.dy < 0){
                that._dt = 0;
                that.dy *= 0.5;
            }
                

            that.oy = that.y

            //that.y += (0.5 * that._gravity * dt * dt) + (that.dy * dt);

            //if(that._gravity != 0){
                //that.by = (224 + 0.5 * that._gravity * that._dt * that._dt + that.dy * that._dt) | 0;

                //that.by += (0.5 * that._gravity * dt * dt + that.dy * dt) | 0;
            //}

            
            
            that.dy = that.dy + that._gravity * dt;
            that.by = that.by + that.dy * dt;
            
            //XX.textContent = that.dy || XX.textContent;
            XX.textContent = that._dt || XX.textContent;
            

            //console.log(that.y)

            if(that.by > 224){
                that.by = 224;
                that.dy = 0;
                that._gravity = 0;
                that.jumping = false;
                that._dt = 0;
            }

            
            //console.log(that.y)
        },

        /**
         * 
         * @param {CanvasRenderingContext2D} ctx 
         */
        draw2: function(ctx){
            ctx.clearRect(this.ox | 0, this.oy | 0, this.width, this.height);
            this.draw(ctx, 'yellow');
        }

    });


})();