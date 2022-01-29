var Entity = Clazz({

    Extends: GObject,

    Constructor: function(config){
        config = config || {};

        let that = this;

        that.Super(config);

        that.velocity = {
            x: parseFloat(config.x) || 0,
            y: parseFloat(config.y) || 0,
        }

        //Position relative to Entity bounds
        that.hitbox = config.hitbox || new GObject({
            x: that.x,
            y: that.y,
            width: that.width,
            height: that.height
        });

        // Collision points - Default edges GObject
        that.points = config.points ||  {
            top:    [ [0,0],            [that.width,0]           ], // Head collision
            right:  [ [that.width,0],   [that.width,that.height] ], // Righ collision
            bottom: [ [0,that.height],  [that.width,that.height] ], // Feet collision 
            left:   [ [0,0],            [0,that.height]          ]  // Left collision
        }

        //Current position of collision points, reusable object
        that._currentPoints = JSON.parse(JSON.stringify(that.points));

    },

    get currentPoints(){
        let that = this;
        let pointsSource;
        let pointsTarget;
        let ps;
        let pt;
        let i;
        let key;

        for (key in that.points){
            pointsSource = that.points[key];
            pointsTarget = that._currentPoints[key];
            for (i = 0; i < pointsSource.length; i++) {
                ps = pointsSource[i];
                pt = pointsTarget[i];
                pt[0] = ps[0] + that.position.x;
                pt[1] = ps[1] + that.position.y
            }
        }

        return that._currentPoints;
    },

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {String} color 
     */
    drawPoints: function(ctx, color){
        let that = this;
        let backupColor = ctx.fillStyle;
        let currentPoints = that.currentPoints;
        let points = that.points;
        let width = that.size.width * 0.5;
        let height = that.size.height * 0.5;
        let pointsSource;
        let pointsTarget;
        let ps;
        let pt;
        let x;
        let y;
        let i;
        let key;

        ctx.fillStyle = color;

        for (key in currentPoints){
            pointsSource = currentPoints[key];
            pointsTarget = points[key];
            for (i = 0; i < pointsSource.length; i++) {
                ps = pointsSource[i];
                pt = pointsTarget[i]
                x = Math.round( pt[0] > width? ps[0] - 1 : ps[0] );
                y = Math.round( pt[1] > height? ps[1] - 1 : ps[1] );
                ctx.fillRect(x,y,1,1);
                //ctx.fillRect(Math.round(ps[0]),Math.round(ps[1]),1,1);
            }
        }

        ctx.fillStyle = backupColor;
    },

    set dataEntity(v) {
        let that = this;
        let velocity = v.velocity;
        let points = v.points;
        let currentPoints = v._currentPoints;
        let pointsSource;
        let pointsTarget;
        let ps;
        let pt;
        let i;
        let key;

        that.data = v;

        if(velocity)
            for (key in velocity)
                that.velocity[key] = velocity[key];

        if(points)
            for (key in points){
                pointsSource = points[key];
                pointsTarget = that.points[key];
                for (i = 0; i < pointsSource.length; i++) {
                    ps = pointsSource[i]; 
                    pt = pointsTarget[i];
                    pt[0] = ps[0]; // x
                    pt[1] = ps[1]; // y
                }
            }
        
        if(currentPoints)
            for (key in currentPoints){
                pointsSource = currentPoints[key];
                pointsTarget = that._currentPoints[key];
                for (i = 0; i < pointsSource.length; i++) {
                    ps = pointsSource[i]; 
                    pt = pointsTarget[i];
                    pt[0] = ps[0]; // x
                    pt[1] = ps[1]; // y
                }
            }
    },

    get dataEntity(){
        let that = this;
        let out = that.data;
        out.velocity= that.velocity;
        out.size = that.size;
        out.points = that.points;
        out._currentPoints = out._currentPoints;
        return out;
    },

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

});