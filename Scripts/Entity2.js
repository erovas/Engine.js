var Entity = Clazz({

    Extends: GObject,

    Constructor: function(config){
        config = config || {};

        let that = this;

        that.Super(config);

        that.velocity = {
            x: parseFloat(config.vx) || 0,
            y: parseFloat(config.vy) || 0,
        }

        //Position relative to Entity bounds
        that.hitbox = config.hitbox || {
            x: 0,
            y: 0,
            width: that.width,
            height: that.height
        };

        //Position relative to Entity bounds
        that.colliderbox = config.colliderbox || {
            x: 0,
            y: 0,
            width: that.width,
            height: that.height
        };

        that._hitbox = new GObject(that.hitbox);
        that._colliderbox = new GObject(that.colliderbox);

        that.x = that.x;
        that.y = that.y;
    },

    setHitbox: function(x, y, width, height){
        let that = this;
        width = width | 0 || that.hitbox.width;
        height = height | 0 || that.hitbox.height;

        that.hitbox.x = x;
        that.hitbox.y = y;
        that.hitbox.width = that._hitbox.size.width = width;
        that.hitbox.height = that._hitbox.size.height = height;

        that.x = that.x;
    },

    setColliderbox: function(x, y, width, height){
        let that = this;
        width = width | 0 || that.colliderbox.width;
        height = height | 0 || that.colliderbox.height;

        that.colliderbox.x = x;
        that.colliderbox.y = y;
        that.colliderbox.width = that._colliderbox.size.width = width;
        that.colliderbox.height = that._colliderbox.size.height = height;

        that.x = that.x;
    },

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {String} color  
     */
    drawHitbox: function(ctx, color){
        this._hitbox.drawEdges(ctx, color);
    },

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {String} color  
     */
    drawColliderbox: function(ctx, color){
        this._colliderbox.drawEdges(ctx, color);
    },

    //#region Current position collider box

    get px(){
        return this._colliderbox.position.x;
    },

    set px(v){
        this.x = v - this.colliderbox.x;
    },

    get py(){
        return this._colliderbox.position.y;
    },

    set py(v){
        this.y = v - this.colliderbox.y;
    },

    //#endregion

    //#region Old position collider box

    get opx(){
        return this._colliderbox.position.ox;
    },

    set opx(v){
        this.ox = v - this.colliderbox.ox;
    },

    get opy(){
        return this._colliderbox.position.oy;
    },

    set opy(v){
        this.oy = v - this.colliderbox.oy;
    },

    //#endregion

    //#region Current position

    get x(){
        return this.position.x;
    },

    set x(v){
        v = parseFloat(v);
        if(isNaN(v)) return;

        //Update Entity, colliderbox and hitbox current position
        this.position.x = v;
        this._hitbox.position.x = v + this.hitbox.x;
        this._colliderbox.position.x = v + this.colliderbox.x;
    },

    get y(){
        return this.position.y;
    },

    set y(v){
        v = parseFloat(v);
        if(isNaN(v)) return;

        //Update Entity, colliderbox and hitbox current position
        this.position.y = v;
        this._hitbox.position.y = v + this.hitbox.y;
        this._colliderbox.position.y = v + this.colliderbox.y;
    },

    //#endregion

    //#region Old position

    get ox(){
        return this.position.ox;
    },

    set ox(v){ 
        v = parseFloat(v);
        if(isNaN(v)) return;

        //Update Entity, collider and hitbox old position
        this.position.ox = v;
        this._hitbox.position.ox = v + this.hitbox.x;
        this._colliderbox.position.ox = v + this.colliderbox.x;
    },

    get oy(){
        return this.position.oy;
    },

    set oy(v){
        v = parseFloat(v);
        if(isNaN(v)) return;

        //Update Entity, collider and hitbox old position
        this.position.oy = v;
        this._hitbox.position.oy = v + this.hitbox.y;
        this._colliderbox.position.oy = v + this.colliderbox.y;
    },

    //#endregion

    set data(v) {

        if(!v) return;

        let that = this;
        let position = v.position;
        let size = v.size;
        let velocity = v.velocity;
        let hitbox = v.hitbox;
        let colliderbox = v.colliderbox;
        let key;

        if(position)
            for (key in position)
                that.position[key] = position[key];
        
        if(size)
            for (key in size)
                that.size[key] = size[key];

        if(velocity)
            for (key in velocity)
                that.velocity[key] = velocity[key];

        if(hitbox)
            for (key in hitbox)
                that.hitbox[key] = hitbox[key];

        if(colliderbox)
            for (key in colliderbox)
                that.colliderbox[key] = colliderbox[key];

        that._hitbox.data = v._hitbox;
        that._colliderbox.data = v._colliderbox;
    },

    get data(){
        let that = this;

        return {
            position: that.position,
            size: that.size,
            velocity: that.velocity,
            hitbox: that.hitbox,
            colliderbox: that.colliderbox,
            _hitbox: that._hitbox.data,
            _colliderbox: that._colliderbox.data
        };
    },

    //#region Current velocity

    get vx(){
        return this.velocity.x;
    },

    set vx(v){
        v = parseFloat(v);
        this.velocity.x = isNaN(v)? this.velocity.x : v; 
    },

    get vy(){
        return this.velocity.y;
    },

    set vy(v){
        v = parseFloat(v);
        this.velocity.y = isNaN(v)? this.velocity.y : v; 
    },

    //#endregion

});