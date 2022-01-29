(function(){

    //#region CONSTANTES

    let TILE_HEIGHT = 16;
    let TILE_WIDTH = 16;
    let OFFSET = 0.001;
    let ROWS = 8;
    let COLUMNS = 8;

    //#endregion

    //#region Classe

    window.ColliderMap = Clazz({

        Constructor: function(config){
            let that = this;
            that.tileHeight = (config.tileHeight | 0) || TILE_HEIGHT;
            that.tileWidth = (config.tileWidth | 0) || TILE_WIDTH;
            that.offset = (config.offset | 0) || OFFSET;

            that.gobject = config.gobject;

            that.rows = (config.rows | 0) || ROWS;
            that.columns = (config.columns | 0) || COLUMNS;
            that.map = config.map || [
                                        '0','3','3','3','3','3','3','0',
                                        '2','0','0','0','0','0','0','4',
                                        '2','0','0','0','0','0','0','4',
                                        '2','0','0','0','0','0','0','4',
                                        '2','0','0','0','0','0','0','4',
                                        '2','0','0','0','0','5','0','4',
                                        '2','0','0','5','1','0','0','4',
                                        '0','1','1','1','1','1','1','0'
                                     ];
        },

        collide: function(){
            let that = this;
            handleCollision(
                that.gobject,
                that.map,
                that.rows,
                that.columns,
                that.tileHeight,
                that.tileWidth,
                that.offset
            );
        },

        Static: {

            handleCollision: function(gobject, map, rows, columns, tileHeight, tileWidth, offset){
                handleCollision(
                    gobject, 
                    map, 
                    (rows | 0) || ROWS, 
                    (columns | 0) || COLUMNS, 
                    (tileHeight | 0) || TILE_HEIGHT, 
                    (tileWidth | 0) || TILE_WIDTH,
                    (offset | 0) || OFFSET
                );
            }

        }



    });

    //#endregion

    //#region Funciones

    /**
     * 
     * @param {GObject} gobject 
     * @param {Array} map 
     * @param {Number} rows 
     * @param {Number} columns 
     * @param {Number} tileHeight 
     * @param {Number} tileWidth 
     */
    function handleCollision(gobject, map, rows, columns, tileHeight, tileWidth, offset){

    }

    /**
     * 
     * @param {GObjetc} gobject 
     * @param {Number} row 
     * @param {Number} y_offset 
     */
    function collideTop(gobject, row, y_offset){
        
        let top = row * TILE_HEIGHT + y_offset;

        if (gobject.y + gobject.height > top && gobject.oy + gobject.height <= top) {
            //gobject.jumping = false;
            gobject.dy = 0;
            gobject.y = top - gobject.height - OFFSET;
            return true;
        } 
        
        return false;
    }

    /**
     * 
     * @param {GObject} gobject 
     * @param {Number} column 
     * @param {Number} x_offset 
     * @returns 
     */
    function collideRight(gobject, column, x_offset){

        let right = column * TILE_WIDTH + TILE_WIDTH - x_offset;

        if (gobject.x < right && gobject.ox >= right) {

            gobject.dx = 0;
            gobject.x = right;
  
            return true;
        } 
        
        return false;
    }

    /**
     * 
     * @param {GObjetc} gobject 
     * @param {Number} row 
     * @param {Number} y_offset 
     */
    function collideBottom(gobject, row, y_offset){
        
        let bottom = row * TILE_HEIGHT + TILE_HEIGHT - y_offset;

        if (gobject.y < bottom && gobject.oy >= bottom) {

            gobject.dy = 0;
            gobject.y = bottom + OFFSET;
  
            return true;
        } 
        
        return false;
    }

    /**
     * 
     * @param {GObject} gobject 
     * @param {Number} column 
     * @param {Number} x_offset 
     * @returns 
     */
    function collideLeft(gobject, column, x_offset){

        let left = column * TILE_WIDTH + x_offset;

        if (gobject.x + gobject.width > left && gobject.ox + gobject.width <= left) {

            gobject.dx = 0;
            gobject.x = left - gobject.width - OFFSET;
  
            return true;
        }
        
        return false;
    }

    //#endregion

    let Colliders = {

        //#region Enteros Flat
        
        1: function(gobject, column, row){
            return collideTop(gobject, row, 0);
        },

        2: function(gobject, column, row){
            return collideRight(gobject, column, 0);
        },

        3: function(gobject, column, row){
            return collideBottom(gobject, row, 0);
        },

        4: function(gobject, column, row){
            return collideLeft(gobject, column, 0);
        },

        5: function(gobject, column, row){
            return collideTop(gobject, row, TILE_HEIGHT * 0.5);
        },

        6: function(gobject, column, row){
            return collideLeft(gobject, column, TILE_WIDTH * 0.5);
        },

        7: function(gobject, column, row){
            return collideBottom(gobject, row, TILE_HEIGHT * 0.5);
        },

        8: function(gobject, column, row){
            return collideLeft(gobject, column, TILE_WIDTH * 0.5);
        },

        //#endregion

        //#region 1/4 superior izquierda Flat

        A1: function(gobject, column, row){
            if (gobject.x + gobject.width < column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideTop(gobject, row, 0);
        },

        A2: function(gobject, column, row){
            if (gobject.y + gobject.height < row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideRight(gobject, column, TILE_WIDTH * 0.5);
        },

        A3: function(gobject, column, row){
            if (gobject.x + gobject.width < column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideBottom(gobject, row, TILE_HEIGHT * 0.5);
        },

        A4: function(gobject, column, row){
            if (gobject.y + gobject.height < row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideLeft(gobject, column, 0);
        },

        A5: function(gobject, column, row){
            if (gobject.x + gobject.width < column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideTop(gobject, row, TILE_HEIGHT * 0.25);
        },

        A6: function(gobject, column, row){
            if (gobject.y + gobject.height < row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideRight(gobject, column, TILE_WIDTH * 0.25);
        },

        A7: function(gobject, column, row){
            if (gobject.x + gobject.width < column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideBottom(gobject, row, TILE_HEIGHT * 0.25);
        },

        A8: function(gobject, column, row){
            if (gobject.y + gobject.height <  row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideLeft(gobject, column, TILE_WIDTH * 0.25);
        },

        //#endregion

        //#region 1/4 Superior derecha Flat

        B1: function(gobject, column, row){
            if (gobject.x + gobject.width > column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideTop(gobject, row, 0);
        },

        B2: function(gobject, column, row){
            if (gobject.y + gobject.height < row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideRight(gobject, column, 0);
        },

        B3: function(gobject, column, row){
            if (gobject.x + gobject.width > column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideBottom(gobject, row, TILE_HEIGHT * 0.5);
        },

        B4: function(gobject, column, row){
            if (gobject.y + gobject.height < row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideLeft(gobject, column, TILE_WIDTH * 0.5);
        },

        B5: function(gobject, column, row){
            if (gobject.x + gobject.width > column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideTop(gobject, row, TILE_HEIGHT * 0.25);
        },

        B6: function(gobject, column, row){
            if (gobject.y + gobject.height < row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideRight(gobject, column, TILE_WIDTH * 0.25);
        },

        B7: function(gobject, column, row){
            if (gobject.x + gobject.width > column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideBottom(gobject, row, TILE_HEIGHT * 0.75);
        },

        B8: function(gobject, column, row){
            if (gobject.y + gobject.height >  row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideLeft(gobject, column, TILE_WIDTH * 0.75);
        },

        //#endregion

        //#region  1/4 Inferior izquierda Flat

        C1: function(gobject, column, row){
            if (gobject.x + gobject.width < column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideTop(gobject, row, TILE_HEIGHT * 0.5);
        },

        C2: function(gobject, column, row){
            if (gobject.y + gobject.height > row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideRight(gobject, column, TILE_WIDTH * 0.5);
        },

        C3: function(gobject, column, row){
            if (gobject.x + gobject.width < column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideBottom(gobject, row, 0);
        },

        C4: function(gobject, column, row){
            if (gobject.y + gobject.height > row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideLeft(gobject, column, 0);
        },

        C5: function(gobject, column, row){
            if (gobject.x + gobject.width < column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideTop(gobject, row, TILE_HEIGHT * 0.75);
        },

        C6: function(gobject, column, row){
            if (gobject.y + gobject.height > row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideRight(gobject, column, TILE_WIDTH * 0.75);
        },

        C7: function(gobject, column, row){
            if (gobject.x + gobject.width < column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideBottom(gobject, row, TILE_HEIGHT * 0.25);
        },

        C8: function(gobject, column, row){
            if (gobject.y + gobject.height > row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideLeft(gobject, column, TILE_WIDTH * 0.25);
        },

        //#endregion

        //#region 1/4 Inferior derecha Flat

        D1: function(gobject, column, row){
            if (gobject.x + gobject.width > column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideTop(gobject, row, TILE_HEIGHT * 0.5);
        },

        D2: function(gobject, column, row){
            if (gobject.y + gobject.height > row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideRight(gobject, column, 0);
        },

        D3: function(gobject, column, row){
            if (gobject.x + gobject.width > column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideBottom(gobject, row, 0);
        },

        D4: function(gobject, column, row){
            if (gobject.y + gobject.height > row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideLeft(gobject, column, TILE_WIDTH * 0.5);
        },

        D5: function(gobject, column, row){
            if (gobject.x + gobject.width > column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideTop(gobject, row, TILE_HEIGHT * 0.75);
        },

        D6: function(gobject, column, row){
            if (gobject.y + gobject.height > row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideRight(gobject, column, TILE_WIDTH * 0.25);
        },

        D7: function(gobject, column, row){
            if (gobject.x + gobject.width > column * TILE_WIDTH + TILE_WIDTH * 0.5)
                return collideBottom(gobject, row, TILE_HEIGHT * 0.25);
        },

        D8: function(gobject, column, row){
            if (gobject.y + gobject.height > row * TILE_HEIGHT + TILE_HEIGHT * 0.5)
                return collideLeft(gobject, column, TILE_WIDTH * 0.75);
        },

        //#endregion

        //============================================================//

        //#region Enteros

        //#endregion
    }

})();