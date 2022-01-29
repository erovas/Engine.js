window.ColliderMap = (function(){

    //#region CONSTANTES

    let TILE_HEIGHT = 16;
    let TILE_WIDTH = 16;
    let OFFSET = 0.001;
    let ROWS = 8;
    let COLUMNS = 8;

    //#endregion

    //#region Diccionario de colisiones

    let Colliders = {

        //#region Enteros Flat

        1: function(entity, point, column, row, tileWidth, tileHeight, offset){
            return collideTop(entity, point, row, tileHeight, offset, 0);
        },

        2: function(entity, point, column, row, tileWidth, tileHeight, offset){
            return collideRight(entity, point, column, tileWidth, 0);
        },

        3: function(entity, point, column, row, tileWidth, tileHeight, offset){
            return collideBottom(entity, point, row, tileHeight, offset, 0);
        },

        4: function(entity, point, column, row, tileWidth, tileHeight, offset){
            return collideLeft(entity, point, column, tileWidth, offset, 0);
        },

        5: function(entity, point, column, row, tileWidth, tileHeight, offset){
            return collideTop(entity, point, row, tileHeight, offset, tileHeight * 0.5);
        },

        6: function(entity, point, column, row, tileWidth, tileHeight, offset){
            return collideRight(entity, point, column, tileWidth, tileWidth * 0.5);
        },

        7: function(entity, point, column, row, tileWidth, tileHeight, offset){
            return collideBottom(entity, point, row, tileHeight, offset, tileHeight * 0.5);
        },

        8: function(entity, point, column, row, tileWidth, tileHeight, offset){
            return collideLeft(entity, point, column, tileWidth, offset, tileWidth * 0.5);
        },

        //#endregion

    }

    //#endregion

    //#region Classe

    return Clazz({

        Constructor: function(config){
            let that = this;
            config = config || {};
            that._w = (config.tileWidth | 0) || TILE_WIDTH;
            that._h = (config.tileHeight | 0) || TILE_HEIGHT;

            that._c = (config.columns | 0) || COLUMNS;
            that._r = (config.rows | 0) || ROWS;
            
            that._o = (config.offset | 0) || OFFSET;
            that._m = config.map || [
                                        '0','3','3','3','3','3','3','0',
                                        '2','0','0','0','0','0','0','4',
                                        '2','0','0','0','0','0','0','4',
                                        '2','0','0','0','0','0','0','4',
                                        '2','0','0','0','0','0','0','4',
                                        '2','0','0','0','0','5','0','4',
                                        '2','0','0','5-4','1','0','0','4',
                                        '0','1','1','1','1','1','1','0'
                                     ];
        },

        //#region Offset

        get offset(){
            return this._o;
        },

        set offset(v){
            this._o = (v | 0) || this._o;
        },

        //#endregion

        //#region Map

        get map(){
            return this._m;
        },

        set map(v){
            this._m = v || this._m;
        },

        //#endregion

        //#region Tile size

        get tileWidth(){
            return this._w;
        },

        set tileWidth(v){
            this._w = (v | 0) || this._w;
        },

        get tileHeight(){
            return this._h;
        },

        set tileHeight(v){
            this._h = (v | 0) || this._h;
        },

        //#endregion

        //#region Map size

        get columns(){
            return this._c;
        },

        set columns(v){
            this._c = (v | 0) || this._c;
        },

        get rows(){
            return this._r;
        },

        set rows(v){
            this._r = (v | 0) || this._r;
        },

        //#endregion

        /**
         * 
         * @param {Entity} entity 
         */
        Collide: function(entity){
            let that = this;
            handleCollision(
                entity,
                that._m,
                that._c,
                that._r,
                that._w,
                that._h,
                that._o
            );
        },

        Static: {
            Collide: function(entity, map, columns, rows, tileWidth, tileHeight, offset){
                handleCollision(
                    entity,
                    map,
                    (columns | 0) || COLUMNS,
                    (rows | 0) || ROWS,
                    (tileWidth | 0) || TILE_WIDTH,
                    (tileHeight | 0) || TILE_HEIGHT,
                    (offset | 0) || OFFSET
                );
            }
        }

    });

    //#endregion

    //#region Manejador de colisiones

    /**
     * 
     * @param {Entity} entity 
     * @param {Array} map 
     * @param {Number} rows 
     * @param {Number} columns 
     * @param {Number} tileWidth 
     * @param {Number} tileHeight 
     * @param {Number} offset 
     */
    function handleCollision(entity, map, columns, rows, tileWidth, tileHeight, offset){
        
        //La entidad está inmovil ¡¡Probar!!
        if (entity.dx === 0 && entity.dy === 0)
            return;

        //Obtenemos todos los puntos de colision de la Entidad (jugador, NPC, goomba, etc)
        let points = entity.pos_points;
        
        let i = 0;
        let j = 0;
        
        let currentColumn;  //Columna en el que está ubicado el punto de colisión en el mapa
        let currentRow;     //Fila en el que está ubicado el punto de colisión en el mapa
        let currentPoint;   //Punto de colisión que se va a evaluar
        let values;         //Valor de la celda donde el punto de colisión está
        let val;
        
        for (i = 0; i < points.length; i++) {
            currentPoint = points[i];
            currentColumn = (currentPoint[0] / tileWidth) | 0;
            currentRow = (currentPoint[1] / tileHeight) | 0;
            values = map[currentRow * columns + currentColumn].split('-');

            const avoid__ = entity._cp[i][2].split('-');

            for (j = 0; j < avoid__.length; j++) {
                const index = values.indexOf(avoid__[j]);
                if (index > -1) {
                    values.splice(index, 1);
                }
            }

            for (j = 0; j < values.length; j++) {
                val = values[j];
                //console.log(values);
                if(val != '0')
                    Colliders[val](entity, currentPoint, currentColumn, currentRow, tileWidth, tileHeight, offset);
            }

        }
    }

    //#endregion

    //#region Funciones de colisiones

    /**
     * 
     * @param {Entity} entity 
     * @param {Array} point 
     * @param {Number} row 
     * @param {Number} tileHeight 
     * @param {Number} offset 
     * @param {Number} y_offset 
     * @returns 
     */
    function collideTop(entity, point, row, tileHeight, offset, y_offset){
        let top = row * tileHeight + y_offset;
        let py = point[1];
        let opy = py - entity.y + entity.oy;

        if (py > top && opy <= top){
            entity.dy = 0;
            entity.y = top - (py - entity.y) - offset;
            return true;
        }

        return false;
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Array} point 
     * @param {Number} column 
     * @param {Number} tileWidth 
     * @param {Number} x_offset 
     */
    function collideRight(entity, point, column, tileWidth, x_offset){
        let right = column * tileWidth + tileWidth - x_offset;
        let px = point[0];
        let opx = px - entity.x + entity.ox;
        
        if (px < right && opx >= right){
            entity.dx = 0;
            entity.x = right - (px - entity.x);
            return true;
        }

        return false;
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Array} point 
     * @param {Number} row 
     * @param {Number} tileHeight 
     * @param {Number} offset 
     * @param {Number} y_offset 
     * @returns 
     */
    function collideBottom(entity, point, row, tileHeight, offset, y_offset){
        let bottom = row * tileHeight + tileHeight - y_offset;
        let py = point[1];
        let opy = py - entity.y + entity.oy;

        if (py < bottom && opy >= bottom){
            entity.dy = 0;
            entity.y = bottom - (py - entity.y) + offset;
            return true;
        }

        return false;
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Array} point 
     * @param {Number} column 
     * @param {Number} tileWidth 
     * @param {Number} offset 
     * @param {Number} x_offset 
     * @returns 
     */
    function collideLeft(entity, point, column, tileWidth, offset, x_offset){
        let left = column * tileWidth + x_offset;
        let px = point[0];
        let opx = px - entity.x + entity.ox;

        if (px > left && opx <= left){
            entity.dx = 0;
            entity.x = left - (px - entity.x) - offset;
            return true;
        }

        return false;
    }

    //#endregion

})();