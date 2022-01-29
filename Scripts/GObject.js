window.GObject = Clazz({

    Constructor: function(config){
        let that = this;

        //Posición actual del GObject
        that._x = parseFloat(config.x) || 0;
        that._y = parseFloat(config.y) || 0;

        //Posición pasada del GObject
        that._ox = that._x;
        that._oy = that._y;

        //Ancho y Alto del GObject
        that._w = parseFloat(config.width) || 16;
        that._h = parseFloat(config.height) || 16;

    },

    /**
     * @param {CanvasRenderingContext2D} ctx 
     * @param {String} color 
     */
    drawEdges: function(ctx, color, width, height){
        let that = this;
        width = (width | 0) || (that._w | 0);
        height = (height | 0) || (that._h | 0);
        
        //Bordes
        ctx.LineRect(
            Math.round(that._x), 
            Math.round(that._y), 
            width, 
            height, 
            color
        );

        //Centro
        ctx.LineRect(
            Math.round(that._x + width * 0.5),
            Math.round(that._y + height * 0.5), 
            1, 
            1, 
            color
        );
    },

    //#region Ancho y Alto

    get width(){
        return this._w;
    },

    set width(v){
        this._w = parseFloat(v) || this._w;
    },

    get height(){
        return this._h;
    },

    set height(v){
        this._h = parseFloat(v) || this._h;
    },

    //#endregion

    //#region Posición actual

    get x(){ 
        return this._x; 
    },

    set x(v){ 
        this._x = parseFloat(v) || this._x; 
    },

    get y(){ 
        return this._y; 
    },

    set y(v){ 
        this._y = parseFloat(v) || this._y; 
    },

    //#endregion

    //#region Posición actual centro

    get cx(){
        return this._x + this._w * 0.5;
    },

    set cx(v){
        this.x = v - this._w * 0.5;
    },

    get cy(){
        return this._y + this._h * 0.5;
    },

    set cy(v){
        this.y = v - this._h * 0.5;
    },

    //#endregion

    //#region Posicion actual superior izquierda

    get ltx(){
        return this._x;
    },

    set ltx(v){
        this.x = v;
    },

    get lty(){ 
        return this._y; 
    },

    set lty(v){ 
        this.y = v; 
    },

    //#endregion

    //#region Posicion actual superior derecha

    get rtx(){
        return this._x + this._w;
    },

    set rtx(v){
        this.x = v - this._w;
    },

    get rty(){ 
        return this._y; 
    },

    set rty(v){ 
        this.y = v; 
    },

    //#endregion

    //#region Posicion actual inferior izquierda

    get lbx(){
        return this._x;
    },

    set lbx(v){
        this.x = v;
    },

    get lby(){ 
        return this._y + this._h; 
    },

    set lby(v){ 
        this.y = v - this._h; 
    },

    //#endregion

    //#region Posicion actual inferior derecha

    get rbx(){
        return this._x + this._w;
    },

    set rbx(v){
        this.x = v - this._w;
    },

    get rby(){ 
        return this._y + this._h; 
    },

    set rby(v){ 
        this.y = v - this._h; 
    },

    //#endregion

    //#region Posición pasada

    get ox(){ 
        return this._ox; 
    },

    set ox(v){ 
        this._ox = parseFloat(v) || this._ox; 
    },

    get oy(){ 
        return this._oy; 
    },

    set oy(v){ 
        this._oy = parseFloat(v) || this._oy; 
    },

    //#endregion

    //#region Posición pasada centro

    get ocx(){
        return this._ox + this._w * 0.5;
    },

    set ocx(v){
        this.ox = v - this._w * 0.5;
    },

    get ocy(){
        return this._oy + this._h * 0.5;
    },

    set ocy(v){
        this.oy = v - this._h * 0.5;
    },

    //#endregion

    //#region Posicion pasada superior izquierda

    get oltx(){
        return this._ox;
    },

    set oltx(v){
        this.ox = v;
    },

    get olty(){ 
        return this._oy; 
    },

    set olty(v){ 
        this.oy = v; 
    },

    //#endregion

    //#region Posicion pasada superior derecha

    get ortx(){
        return this._ox + this._w;
    },

    set ortx(v){
        this.ox = v - this._w;
    },

    get orty(){ 
        return this._oy; 
    },

    set orty(v){ 
        this.oy = v; 
    },

    //#endregion

    //#region Posicion actual inferior izquierda

    get olbx(){
        return this._ox;
    },

    set olbx(v){
        this.ox = v;
    },

    get olby(){ 
        return this._oy + this._h; 
    },

    set olby(v){ 
        this.oy = v - this._h; 
    },

    //#endregion

    //#region Posicion actual inferior derecha

    get orbx(){
        return this._oox + this._w;
    },

    set orbx(v){
        this.ox = v - this._w;
    },

    get orby(){ 
        return this._oy + this._h; 
    },

    set orby(v){ 
        this.oy = v - this._h; 
    },

    //#endregion

});