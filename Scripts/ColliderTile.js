var ColliderTile = (function(){

    return {

        1: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideTop(entity, row, tileHeight, 0, offset);
        },

        2: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideRight(entity, column, tileWidth, 0);
        },

        3: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideBottom(entity, row, tileHeight, 0, offset);
        },

        4: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideLeft(entity, column, tileWidth, 0, offset);
        },

        5: function(entity, column, row, tileWidth, tileHeight, offset){
            return this[1](entity, column, row, tileWidth, tileHeight, offset) ||
                this[2](entity, column, row, tileWidth, tileHeight, offset) ||
                this[3](entity, column, row, tileWidth, tileHeight, offset) ||
                this[4](entity, column, row, tileWidth, tileHeight, offset)
        },

        //================================================================== Half

        6: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideTop(entity, row, tileHeight, tileHeight * 0.5, offset);
        },

        7: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideRight(entity, column, tileWidth, tileWidth * 0.5);
        },

        8: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideBottom(entity, row, tileHeight, tileHeight * 0.5, offset);
        },

        9: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideLeft(entity, column, tileWidth, tileWidth * 0.5, offset);
        },

        10: function(entity, column, row, tileWidth, tileHeight, offset){
            return this[6](entity, column, row, tileWidth, tileHeight, offset) ||
            this[7](entity, column, row, tileWidth, tileHeight, offset) ||
            this[8](entity, column, row, tileWidth, tileHeight, offset) ||
            this[9](entity, column, row, tileWidth, tileHeight, offset)
        }, 

        //================================================================== left edge top 1/4

        A1: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.px < column * tileWidth + tileWidth * 0.5)
                return collideTop(entity, row, tileHeight, 0, offset);
            
            return false;
        },

        A2: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.py < row * tileHeight + tileHeight * 0.5)
                return collideRight(entity, column, tileWidth, tileWidth * 0.5);

            return false;
        },

        A3: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.px < column * tileWidth + tileWidth * 0.5)
                return collideBottom(entity, row, tileHeight, tileHeight * 0.5, offset);

            return false;
        },

        A4: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.py < row * tileHeight + tileHeight * 0.5)
                return collideLeft(entity, column, tileWidth, 0, offset);

            return false;
        },

        A5: function(entity, column, row, tileWidth, tileHeight, offset){
            return this.A1(entity, column, row, tileWidth, tileHeight, offset) ||
                this.A2(entity, column, row, tileWidth, tileHeight, offset) ||
                this.A3(entity, column, row, tileWidth, tileHeight, offset) ||
                this.A4(entity, column, row, tileWidth, tileHeight, offset)
        },

        //==================================================================  right edge top 1/4

        A6: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.px + entity.colliderbox.width > column * tileWidth + tileWidth * 0.5)
                return collideTop(entity, row, tileHeight, 0, offset);
            
            return false;
        },

        A7: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.py < row * tileHeight + tileHeight * 0.5)
                return collideRight(entity, column, tileWidth, 0);

            return false;
        },

        A8: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.px + entity.colliderbox.width > column * tileWidth + tileWidth * 0.5)
                return collideBottom(entity, row, tileHeight, tileHeight * 0.5, offset);

            return false;
        },

        A9: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.py < row * tileHeight + tileHeight * 0.5)
                return collideLeft(entity, column, tileWidth, tileWidth * 0.5, offset);

            return false;
        },

        A10: function(entity, column, row, tileWidth, tileHeight, offset){
            return this.A6(entity, column, row, tileWidth, tileHeight, offset) ||
                this.A7(entity, column, row, tileWidth, tileHeight, offset) ||
                this.A8(entity, column, row, tileWidth, tileHeight, offset) ||
                this.A9(entity, column, row, tileWidth, tileHeight, offset)
        },

        //================================================================== left edge bottom 1/4

        B1: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.px < column * tileWidth + tileWidth * 0.5)
                return collideTop(entity, row, tileHeight, tileHeight * 0.5, offset);

            return false;
        },

        B2: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.py + entity.colliderbox.height > row * tileHeight + tileHeight * 0.5)
                return collideRight(entity, column, tileWidth, tileWidth * 0.5);

            return false;
        },

        B3: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.px < column * tileWidth + tileWidth * 0.5)
                return collideBottom(entity, row, tileHeight, 0, offset);

            return false;
        },

        B4: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.py + entity.colliderbox.height > row * tileHeight + tileHeight * 0.5)
                return collideLeft(entity, column, tileWidth, 0, offset);

            return false;
        },

        B5: function(entity, column, row, tileWidth, tileHeight, offset){
            return this.B1(entity, column, row, tileWidth, tileHeight, offset) ||
                this.B2(entity, column, row, tileWidth, tileHeight, offset) ||
                this.B3(entity, column, row, tileWidth, tileHeight, offset) ||
                this.B4(entity, column, row, tileWidth, tileHeight, offset)
        },

        //==================================================================  right edge bottom 1/4

        B6: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.px + entity.colliderbox.width > column * tileWidth + tileWidth * 0.5)
                return collideTop(entity, row, tileHeight, tileHeight * 0.5, offset);
            
            return false;
        },

        B7: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.py + entity.colliderbox.height > row * tileHeight + tileHeight * 0.5)
                return collideRight(entity, column, tileWidth, 0);

            return false;
        },

        B8: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.px + entity.colliderbox.width > column * tileWidth + tileWidth * 0.5)
                return collideBottom(entity, row, tileHeight, 0, offset);

            return false;
        },

        B9: function(entity, column, row, tileWidth, tileHeight, offset){
            if (entity.py + entity.colliderbox.height > row * tileHeight + tileHeight * 0.5)
                return collideLeft(entity, column, tileWidth, tileWidth * 0.5, offset);

            return false;
        },

        B10: function(entity, column, row, tileWidth, tileHeight, offset){
            return this.B6(entity, column, row, tileWidth, tileHeight, offset) ||
                this.B7(entity, column, row, tileWidth, tileHeight, offset) ||
                this.B8(entity, column, row, tileWidth, tileHeight, offset) ||
                this.B9(entity, column, row, tileWidth, tileHeight, offset)
        },

        //================================================================== Ramp 

        11: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideSlopeTop(entity, column, row, tileWidth, tileHeight, -1, tileHeight, offset);
        },

        12: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideSlopeTop(entity, column, row, tileWidth, tileHeight, 1, 0, offset);
        },

        13: function(entity, column, row, tileWidth, tileHeight, offset){
            //return collideSlopeBottom(entity, column, row, tileWidth, tileHeight, 1, 0, offset);
        },

        14: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideSlopeBottom(entity, column, row, tileWidth, tileHeight, -1, tileHeight, offset);
        },

        15: function(entity, column, row, tileWidth, tileHeight, offset){
            return this[11](entity, column, row, tileWidth, tileHeight, offset) ||
                this[12](entity, column, row, tileWidth, tileHeight, offset) ||
                this[13](entity, column, row, tileWidth, tileHeight, offset) ||
                this[14](entity, column, row, tileWidth, tileHeight, offset)
        }, 

        //================================================================== Half ramp

        16: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideSlopeTop(entity, column, row, tileWidth, tileHeight, -0.5, tileHeight, offset);

        },

        17: function(entity, column, row, tileWidth, tileHeight, offset){
            return collideSlopeTop(entity, column, row, tileWidth, tileHeight, 0.5, tileHeight * 0.5, offset);
        },

        18: function(entity, column, row, tileWidth, tileHeight, offset){
            
        },

        19: function(entity, column, row, tileWidth, tileHeight, offset){
            
        },

        20: function(entity, column, row, tileWidth, tileHeight, offset){
            return this[16](entity, column, row, tileWidth, tileHeight, offset) ||
                this[17](entity, column, row, tileWidth, tileHeight, offset) ||
                this[18](entity, column, row, tileWidth, tileHeight, offset) ||
                this[19](entity, column, row, tileWidth, tileHeight, offset)
        }, 

        //==================================================================

    }

    //#region Colisiones basicas

    /**
     * 
     * @param {Entity} entity 
     * @param {Number} row 
     * @param {Number} tileHeight 
     * @param {Number} y_offset 
     * @param {Number} offset 
     * @returns 
     */
    function collideTop(entity, row, tileHeight, y_offset, offset){
        
        let top = row * tileHeight + y_offset;
        let height = entity.colliderbox.height;

        if (entity.py + height > top && entity.opy + height <= top){
            entity.vy = 0;
            entity.py = top - height - offset;
            return true;
        }

        return false;
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Number} column 
     * @param {Number} tileWidth 
     * @param {Number} x_offset 
     * @returns 
     */
    function collideRight(entity, column, tileWidth, x_offset){
        
        let right = column * tileWidth + tileWidth - x_offset;
        
        if (entity.px < right && entity.opx >= right){
            entity.vx = 0;
            entity.px = right;
            return true;
        }

        return false;
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Number} row 
     * @param {Number} tileHeight 
     * @param {Number} y_offset 
     * @param {Number} offset 
     * @returns 
     */
    function collideBottom(entity, row, tileHeight, y_offset, offset){
        
        let bottom = row * tileHeight + tileHeight - y_offset;

        if (entity.py < bottom && entity.opy >= bottom){
            entity.vy = 0;
            entity.py = bottom + offset;
            return true;
        }

        return false;
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Number} column 
     * @param {Number} tileWidth 
     * @param {Number} x_offset 
     * @param {Number} offset 
     * @returns 
     */
    function collideLeft(entity, column, tileWidth, x_offset, offset){
        
        let left = column * tileWidth + x_offset;
        let width = entity.colliderbox.width;

        if (entity.px + width > left && entity.opx + width <= left){
            entity.vx = 0;
            entity.px = left - width - offset;
            return true;
        }

        return false;
    }

    //#endregion

    //#region Colisiones complejas

    function collideSlopeTop2(entity, column, row, tileWidth, tileHeight, offset) {

        // colisioncentro = entity.px + entity.colliderbox.width * 0.5 - column * tileWidth;
        let current_x = entity.px + entity.colliderbox.width - column * tileWidth;

        // top =   M * X         + B
        let top = -1 * current_x + tileWidth + row * tileHeight;

        if (current_x > tileWidth) {
            entity.vy = 0;
            entity.py = row * tileHeight - entity.colliderbox.height - offset;

        } 
        else if (entity.py + entity.colliderbox.height > top) {
            entity.vy = 0;
            entity.py = top - entity.colliderbox.height - offset;
        }

    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Number} column 
     * @param {Number} row 
     * @param {Number} tileWidth 
     * @param {Number} tileHeight 
     * @param {Number} slope 
     * @param {Number} y_offset 
     * @param {Number} offset 
     * @returns 
     */
    function collideSlopeTop(entity, column, row, tileWidth, tileHeight, slope, y_offset, offset) {

        // tile { x: origin_x, y: origin_y }
        let origin_x = column * tileWidth;
        let origin_y = row * tileHeight + y_offset;

        // Posición actual lado inferior derecho : izquierdo de la Entity relativo al Tile evaluado
        let current_x = (slope < 0) ? entity.px + entity.colliderbox.width - origin_x : entity.px - origin_x;
        let current_y = entity.py + entity.colliderbox.height - origin_y;
        
        // Posición anterior lado inferior derecho : izquierdo de la Entity relativo al Tile evaluado
        let old_x = (slope < 0) ? entity.opx + entity.colliderbox.width - origin_x : entity.opx - origin_x;
        let old_y = entity.opy + entity.colliderbox.height - origin_y;
        
        //  current_cross_product =        Ux * Vy    - Uy          * Vx
        let current_cross_product = current_x * slope - current_y;// * 1;  // -1 <= slope <= 1
        let old_cross_product     = old_x * slope - old_y;

        //XX.textContent = current_cross_product;
        //YY.textContent = old_cross_product;

        let top = (slope < 0) ? row * tileHeight + tileHeight + y_offset * slope : row * tileHeight + y_offset;

        //XXl.textContent = top
        //YYl.textContent = entity.py + entity.colliderbox.height

        if ((current_x < 0 || current_x > tileWidth) && 
            (entity.py + entity.colliderbox.height > top && entity.opy + entity.colliderbox.height <= top || current_cross_product < 1 && old_cross_product > -1)) {

            entity.vy = 0;
            entity.py = top - entity.colliderbox.height - offset;

            return true;
        }
        else if (current_cross_product < 1 && old_cross_product > -1) {

            //XX.textContent = current_cross_product;
            //YY.textContent = old_cross_product;

            entity.vy = 0;
            entity.py = row * tileHeight + slope * current_x + y_offset - entity.colliderbox.height - offset;

            return true;
        }
        
        return false;
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Number} column 
     * @param {Number} row 
     * @param {Number} tileWidth 
     * @param {Number} tileHeight 
     * @param {Number} slope 
     * @param {Number} y_offset 
     * @param {Number} offset 
     */
    function collideSlopeBottom(entity, column, row, tileWidth, tileHeight, slope, y_offset, offset) {

        // tile { x: origin_x, y: origin_y }
        let origin_x = column * tileWidth;
        let origin_y = row * tileHeight;

        // Posición actual lado superior derecho : izquierdo de la Entity relativo al Tile evaluado
        let current_x = (slope < 0) ? entity.px + entity.colliderbox.width - origin_x : entity.px - origin_x;
        let current_y = entity.py - origin_y;

        // Posición anterior lado inferior derecho : izquierdo de la Entity relativo al Tile evaluado
        let old_x = (slope < 0) ? entity.opx + entity.colliderbox.width - origin_x : entity.opx - origin_x;
        let old_y = entity.opy - origin_y;

        //  current_cross_product =        Ux * Vy    - Uy          * Vx
        let current_cross_product = current_x * slope + current_y;// * 1;  // -1 <= slope <= 1
        let old_cross_product     = old_x * slope + old_y;

        //XX.textContent = current_cross_product;
        //YY.textContent = old_cross_product;

        //let bottom = (slope < 0) ? row * tileHeight + tileHeight - y_offset * slope : row * tileHeight + y_offset;
        let bottom = (slope < 0) ? row * tileHeight - y_offset * slope : row * tileHeight + tileHeight + y_offset;

        //XXl.textContent = current_cross_product
        //YYl.textContent = old_cross_product
        

        if ((current_x < 0 || current_x > tileWidth) && 
            (entity.py < bottom && entity.opy >= bottom || current_cross_product < 1 && old_cross_product > -1)) {

            entity.vy = 0;
            entity.py = bottom + offset;

            return true;
        }

        //else if(1){
        else if (current_cross_product < 1 && old_cross_product > -1) {
        //else if (current_cross_product > 1 && old_cross_product < -1) {

            entity.vy = 0;
            //entity.py = row * tileHeight + slope * current_x + y_offset - entity.colliderbox.height - offset;
            entity.py = row * tileHeight + tileHeight - slope * current_x - y_offset + offset;
            //YYl.textContent = entity.py
            return true;
        }
        
        return false;
    }


    //#endregion


})();