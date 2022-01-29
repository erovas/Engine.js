var Player = Clazz({

    Extends: Entity,

    Constructor: function(config){
        config = config || {};

        let that = this;
        that.Super(config);

        that.action = {
            up: false,
            right: false,
            down: false,
            left: false
        }

        that.state = {
            jumping: false,
            right: true,
            left: false,
            down: false
        }

        that.sprite = new Sprite({
            src: 'Images/Mario/Big-16x32.png',
            width: 16,
            height: 32,
            columns: 16,
            rows: 4,
            animations: {
                'stand-right': [0],
                'stand-left': [16],
                'walk-right': [1,2,3],
                'walk-left': [17,18,19],
                'turn-right': [4],
                'turn-left': [20],
                'jump-right': [5],
                'jump-left': [21],
                'flag-right': [6,7],
                'flag-left': [22,23],
                'swin-right': [8,9,10,11,12,13],
                'swin-left': [24,25,26,27,28,29],
                'down-right': [14],
                'down-left': [30],
                'fire-right': [15],
                'fire-left': [31],
            },
            animation: 'stand-right',
            speed: 60,  //Debe ser la misma que MLX.dev.speed
            fps: 6
        });

        that.setHitbox(2,8,12,24);
        that.setColliderbox(2,8,12,24);

    },

    update: function(dt){
        let that = this;

        that.sprite.update();

        //that.state.down = false;

        if(that.action.up && !that.state.jumping){
        //if(that.action.up){
            that.vy = -10;
            //that.vy -= 0.2;
            that.state.jumping = true;
        }

        if(that.action.right){
            that.vx += 0.2
            that.state.right = true;
            that.state.left = false;
        }

        if(that.action.down){
            that.vy += 0.2
            that.state.down = true;
            that.setHitbox(2,20,12,12);
            that.setColliderbox(2,20,12,12);
            //that.setColliderbox(0,13,16,19);
        }
        else {
            that.state.down = false;
            that.setHitbox(2,8,12,24);
            that.setColliderbox(2,8,12,24);
            //that.setColliderbox(0,3,16,29);
        }

        if(that.action.left){
            that.vx -= 0.2
            that.state.right = false;
            that.state.left = true;
        }

        that.ox = that.x;
        that.oy = that.y;

        that.vy += 1;
        //that.vy -= 1;

        that.x += that.vx;
        that.y += that.vy;

        that.vx *= 0.9;
        that.vy *= 0.9;

    },

    collideMap: function(map, columns, rows, tileWidth, tileHeight, offset){

        let that = this;
        let size = that.colliderbox;
        let colInit = (that.px / tileWidth ) | 0;
        let colEnd = ((that.px + size.width) / tileHeight) | 0;
        let rowInit = (that.py / tileHeight) | 0;
        let rowEnd = ((that.py + size.height) / tileHeight) | 0;
        let maxIndex = columns * rows - 1;
        let index;
        let values;
        let val;
        let i;

        let currentColumn;
        let currentRow;

        
        //Cabeza
        currentRow = rowInit;

        for (currentColumn = colInit; currentColumn <= colEnd; currentColumn++) {
            index = currentRow * columns + currentColumn;

            if(index > maxIndex || index < 0)
                break;

            values = map[index].split('-')

            for (i = 0; i < values.length; i++) {
                val = values[i];

                if(val == '0')
                    continue;

                if(ColliderTile[val](jugador, currentColumn, currentRow, tileWidth, tileHeight, offset))
                    break;
            }
        }

        //Pies
        currentRow = rowEnd;

        for (currentColumn = colInit; currentColumn <= colEnd; currentColumn++) {
            index = currentRow * columns + currentColumn;

            if(index > maxIndex || index < 0)
                break;

            values = map[index].split('-')

            for (i = 0; i < values.length; i++) {
                val = values[i];

                if(val == '0')
                    continue;

                if(ColliderTile[val](jugador, currentColumn, currentRow, tileWidth, tileHeight, offset))
                    break; //return true
            }
        }

        //lado izquierdo
        currentColumn = colInit;

        for (currentRow = rowInit; currentRow <= rowEnd; currentRow++) {
            index = currentRow * columns + currentColumn;

            if(index > maxIndex || index < 0)
                break;

            values = map[currentRow * columns + currentColumn].split('-')

            for (i = 0; i < values.length; i++) {
                val = values[i];
                
                if(val == '0')
                    continue;

                if(ColliderTile[val](jugador, currentColumn, currentRow, tileWidth, tileHeight, offset))
                    break;
            }
        }

        //lado derecho
        currentColumn = colEnd;

        for (currentRow = rowInit; currentRow <= rowEnd; currentRow++) {
            index = currentRow * columns + currentColumn;

            if(index > maxIndex || index < 0)
                break;
            
            values = map[index].split('-')

            for (i = 0; i < values.length; i++) {
                val = values[i];

                if(val == '0')
                    continue;

                if(ColliderTile[val](jugador, currentColumn, currentRow, tileWidth, tileHeight, offset))
                    break;
            }
        }

        if(that.vy == 0 && !that.action.up){
            that.state.jumping = false;
        }

    },

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    render: function(ctx){

        let that = this;
        let animation;

        if(that.state.jumping){
            animation = that.vy == 0? 'stand':'jump';
        }
        else if(that.state.down){
            animation = 'down';
        }
        else if(Math.abs(that.vx) > 0.25){
            animation = 'walk';
        }
        else {
            animation = 'stand';
        }

        that.sprite.animation = animation + (that.state.right? '-right': '-left');

        that.sprite.draw(ctx, that.x, that.y);

    },

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {String} color 
     */
    draw: function(ctx, color){
        let that = this;
        let backupColor = ctx.fillStyle
        //ctx.clearRect(Math.round(that.ox), Math.round(that.oy), that.width, that.height);
        ctx.fillStyle = color;
        ctx.fillRect(Math.round(that.x), Math.round(that.y), that.width, that.height);
        ctx.fillStyle = backupColor;
    },


});