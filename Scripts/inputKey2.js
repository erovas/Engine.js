
var InputKey = Clazz({

    Constructor: function(config){

        this.keydown = config.keydown || {};
        this.keyup = config.keyup || {};
    },

    init: function(){

        let that = this;

        document.onkeydown = function(e){
            if(that.keydown[e.code])
                that.keydown[e.code]();
        }

        document.onkeyup = function(e){
            if(that.keyup[e.code])
                that.keyup[e.code]();
        }
    }

});