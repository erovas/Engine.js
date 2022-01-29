var GObject = Clazz({

    Constructor: function(config){
        config = config || {};
        
        let that = this;
        let x = parseFloat(config.x) || 0;
        let y = parseFloat(config.y) || 0;

        that.position = {
            x: x,
            y: y,
            ox: x,
            oy: y
        }

        that.size = {
            width: Math.abs(parseInt(config.width)) || 16,
            height: Math.abs(parseInt(config.height)) || 16
        }
    },

    set data(v) {
        
        if(!v) return;

        let position = v.position;
        let size = v.size;
        let key;

        if(position)
            for (key in position)
                this.position[key] = position[key];
        
        if(size)
            for (key in size)
                this.size[key] = size[key];
    },

    get data(){
        let that = this;
        return {
            position: that.position,
            size: that.size
        }
    },

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {String} color 
     */
    drawEdges: function(ctx, color, x, y, width, height, backupColor){
        let that = this;
        x = Math.round(that.position.x);
        y = Math.round(that.position.y);
        width = that.size.width;
        height = that.size.height;
        backupColor = ctx.fillStyle;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, 1);               // ----
        ctx.fillRect(x, y, 1, height);              // |
        ctx.fillRect(x + width - 1, y, 1, height);  //    |
        ctx.fillRect(x, y + height - 1, width, 1);  // ___
        ctx.fillStyle = backupColor;                // Restore original color
    },

    //#region Current position

    get x(){
        return this.position.x;
    },

    set x(v){
        v = parseFloat(v);
        this.position.x = isNaN(v)? this.position.x : v; 
    },

    get y(){
        return this.position.y;
    },

    set y(v){ 
        v = parseFloat(v);
        this.position.y = isNaN(v)? this.position.y : v; 
    },

    //#endregion

    //#region Old position

    get ox(){
        return this.position.ox;
    },

    set ox(v){ 
        v = parseFloat(v);
        this.position.ox = isNaN(v)? this.position.ox : v; 
    },

    get oy(){
        return this.position.oy;
    },

    set oy(v){ 
        v = parseFloat(v);
        this.position.oy = isNaN(v)? this.position.oy : v; 
    },

    //#endregion

    //#region Size

    get width(){
        return this.size.width;
    },

    set width(v){
        this.size.width = Math.abs(parseInt(v)) || this.size.width;
    },

    get height(){
        return this.size.height;
    },

    set height(v){
        this.size.height = Math.abs(parseInt(v)) || this.size.height;
    },

    //#endregion

    //#region Current center position

    get cx(){
        return this.position.x + this.size.width * 0.5;
    },

    set cx(v){
        this.x = v - this.size.width * 0.5;
    },

    get cy(){
        return this.position.y + this.size.height * 0.5;
    },

    set cy(v){
        this.y = v - this.size.height * 0.5;
    },

    //#endregion

    //#region Old center position

    get ocx(){
        return this.position.ox + this.size.width * 0.5;
    },

    set ocx(v){
        this.ox = v - this.size.width * 0.5;
    },

    get ocy(){
        return this.position.oy + this.size.height * 0.5;
    },

    set ocy(v){
        this.oy = v - this.size.height * 0.5;
    },

    //#endregion

});