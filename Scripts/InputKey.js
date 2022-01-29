
window.InputKey = Clazz({

    Constructor: function(keyAction){
        this.keydown = [];
        this.keyup = [];

        this.keyAction = keyAction || {
            "ArrowUp": "up",
            "ArrowDown": "down",
            "ArrowLeft": "left",
            "ArrowRight": "right",
            "KeyZ": "jump",
            "KeyX": "run"
        }
    },

    init: function(){

        let that = this;

        document.onkeydown = function(e){
            let action = that.keyAction[e.code];
            let index = that.keyup.indexOf(action);

            if(action && that.keydown.indexOf(action) === -1){
                that.keydown.unshift(action);   //Agregar el boton a la lista de presionados
                that.keyup.splice(index,1);     //Quitamos el boton de la lista de liberados
            }
                
        }

        document.onkeyup = function(e){
            let action = that.keyAction[e.code];
            let index = that.keydown.indexOf(action);
            if (index > -1){
                that.keydown.splice(index, 1);
                that.keyup.unshift(action);
            }
                
        }

    }

});