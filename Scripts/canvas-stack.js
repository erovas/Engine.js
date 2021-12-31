/**
 * ES5customElement que ganera capas de <canvas> para diferentes lienzos
 * Copyright (c) 2022, Emanuel Rojas Vásquez
 */
(function(document){

    let COMPONENT_NAME = 'canvas-stack';
    let OBSERVED_ATTRIBUTES = ['width', 'height', 'rendering'];
    let PROTOTYPE = Element.prototype;
    let NATIVE_APPENDCHILD = PROTOTYPE.appendChild;
    let NATIVE_REMOVECHILD = PROTOTYPE.removeChild;
    let INTERFACE = HTMLCanvasElement;
    let NATIVE_WIDTH = getDescriptor(INTERFACE, OBSERVED_ATTRIBUTES[0]);
    let NATIVE_HEIGHT = getDescriptor(INTERFACE, OBSERVED_ATTRIBUTES[1]);
    let MSJ = 'This canvas no exist';

    let _layers = '-';
    let _render = '-a';

    let canvas_stack = {

        Extends: HTMLElement,

        Constructor: function(){
            this[_layers] = [_createCanvas(711, 400)];
        },

        set width(value){
            value = parseInt(value);

            if(isNaN(value) || value < 1)
                return;

            let that = this;

            for (let i = 0; i < that[_layers].length; i++)
                NATIVE_WIDTH.set.call(that[_layers][i], value);
        },

        get width(){
            return parseInt(NATIVE_WIDTH.get.call(this[_layers][0]));
        },

        set height(value){
            value = parseInt(value);

            if(isNaN(value) || value < 1)
                return;

            let that = this;

            for (let i = 0; i < that[_layers].length; i++)
                NATIVE_HEIGHT.set.call(that[_layers][i], value);
        },

        get height(){
            return parseInt(NATIVE_HEIGHT.get.call(this[_layers][0]));
        },

        set rendering(value){
            value = value + '';

            for (let i = 0; i < this[_layers].length; i++) 
                this[_layers][i].className = value;
        },

        get rendering(){
            return this[_layers][0].className;
        },

        getCoordinates: function(pageX, pageY){
            return _getCoordinates(pageX, pageY, this);
        },

        getCanvas: function(layer){
            layer = parseInt(layer);

            if(isNaN(layer) || layer < 1)
                return this[_layers][0];

            return this[_layers][layer];
        },

        createLayer: function(){
            let that = this;
            //Se crea el <canvas>
            let canvas = _createCanvas(that.width, that.height, that.rendering, that[_layers].length);

            //Se agrega el <canvas> al array
            that[_layers].push(canvas);

            //Se agrega el <canvas> al DOM
            NATIVE_APPENDCHILD.call(that, canvas);

            return canvas;
        },

        removeLayer: function(layer){
            layer = parseInt(layer);

            let that = this;

            if(isNaN(layer) || layer < 1 || layer > that[_layers].length - 1)
                return false;

            let canvas = that[_layers][layer];
            
            //Se elimina el <canvas> del array
            that[_layers].splice(layer, 1);

            //Se elimina el <canvas> del DOM
            NATIVE_REMOVECHILD.call(that, canvas);

            //Se reestablece el z-index de los <canvas>
            for (let i = 0; i < that[_layers].length; i++)
                that[_layers][i].style.zIndex = i;

            return true;
        },

        append: FN,
        appendChild: FN,
        removeChild: FN,
        insertBefore: FN,

        Static: {
            get observedAttributes(){
                return OBSERVED_ATTRIBUTES;
            }
        },

        connectedCallback: function(){
            let that = this;

            if(that[_render])
                return;

            that[_render] = true;

            for (let i = 0; i < that[_layers].length; i++)
                NATIVE_APPENDCHILD.call(that, that[_layers][i]);
        },

        attributeChangedCallback: function(name, oldValue, newValue){
            
            if(oldValue == newValue)
                return;

            this[name] = newValue;
        },
    }

    //Registrar componente
    ES5customElements.define(COMPONENT_NAME, canvas_stack);

    CanvasRenderingContext2D.prototype.LineRect = function(px, py, width, height, color){
        let that = this;
        that.fillStyle = color;
        that.fillRect(px, py, width, 1);
        that.fillRect(px, py, 1, height);
        that.fillRect(px + width, py, 1, height);
        that.fillRect(px, py + height, width + 1, 1);
    }

    CanvasRenderingContext2D.prototype.circle = function(x, y, r, fillStyle) {
        this.beginPath();
        this.arc(x, y, r, 0, 2 * Math.PI, false);
        if (fillStyle) 
            this.fillStyle = fillStyle;
        
        this.fill();
    }

    function _createCanvas(width, height, clazz, zIndex){
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.className = clazz || 'auto';

        canvas.style.margin = 0;
        canvas.style.padding = 0;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        canvas.style.boxSizing = 'border-box';
        //canvas.style.background = 'none transparent';
        canvas.remove = FN;
        canvas.append = FN;
        canvas.appendChild = FN;
        canvas.insertBefore = FN;

        //Para evitar que algun <canvas> sea mas grande o pequeño que el resto
        Object.defineProperties(canvas, {

            width: {
                get: function(){
                    return this.parentElement? this.parentElement.width: alert(MSJ);
                },
    
                set: function(value){
                    if(this.parentElement)
                        this.parentElement.width = value;
                    else
                        alert(MSJ);
                }
            },

            height: {
                get: function(){
                    return this.parentElement? this.parentElement.height: alert(MSJ);
                },
    
                set: function(value){
                    if(this.parentElement)
                        this.parentElement.height = value;
                    else
                        alert(MSJ);
                }
            }
            
        });

        if(zIndex){
            canvas.style.position = 'absolute';
            canvas.style.zIndex = zIndex;
            canvas.style.top = 0;
            canvas.style.left = 0;
        }

        return canvas;
    }

    /**
     * 
     * @param {Number} pageX 
     * @param {Number} pageY 
     * @param {Element} that 
     * @returns 
     */
    function _getCoordinates(pageX, pageY, that){

        let angleScale = getAngleRotationAndScale(that);
        let alpha = angleScale.rotation;
        let deg = radiansToDegrees(alpha);
        let rect = that.getBoundingClientRect();
        let Xp;
        let Yp;

        let Size = getComputedStyle(that);

        let SizeWidth = parseInt(Size.width) * angleScale.scaleX;
        let SizeHeight = parseInt(Size.height) * angleScale.scaleY;

        let left = rect.left + pageXOffset;
        let right = rect.right + pageXOffset;
        let top = rect.top + pageYOffset;
        let bottom = rect.bottom + pageYOffset;

        let XoffsetByHeight = SizeHeight * Math.sin(alpha);

        if(deg === 0 || deg === 360){
            pageX = pageX - left;
            pageY = pageY - top;
        }
        else if(deg === 90){
            pageX = pageY - top;
            pageY = right - pageX;
        }
        else if(deg === 180){
            pageX = right - pageX;
            pageY = bottom - pageY;
        }
        else if(deg === 270){
            pageX = bottom - pageY;
            pageY = pageX - left;
        }
        else if(deg < 90){
            Xp = pageX - (left + XoffsetByHeight);
            Yp = pageY - top;
            pageX = _calculateX(Xp, Yp, alpha);
            pageY = _calculateY(Xp, Yp, alpha);
        }

        else if(deg < 180){
            Xp = pageX - (right - XoffsetByHeight);
            Yp = pageY - top;
            pageX = _calculateX(Xp, Yp, alpha);
            pageY = _calculateY(Xp, Yp, alpha);
            pageY += SizeHeight;
        }
        else if(deg < 270){
            Xp = pageX - (right + XoffsetByHeight);
            Yp = pageY - bottom;
            pageX = _calculateX(Xp, Yp, alpha);
            pageY = _calculateY(Xp, Yp, alpha);
        }
        else { // deg < 360
            Xp = pageX - (left - XoffsetByHeight);
            Yp = pageY - bottom;
            pageX = _calculateX(Xp, Yp, alpha);
            pageY = _calculateY(Xp, Yp, alpha);
            pageY += SizeHeight;
        }

        return {
            Xs: pageX,
            Ys: pageY,
            Xr: (pageX * that.width) / SizeWidth,
            Yr: (pageY * that.height) / SizeHeight
        }
    }

    function _calculateX(Xp, Yp, alpha){
        return Xp * Math.cos(alpha) + Yp * Math.sin(alpha);
    }

    function _calculateY(Xp, Yp, alpha){
        return - Xp * Math.sin(alpha) + Yp * Math.cos(alpha);
    }

    //#region Funciones utiles

    /**
     * 
     * @param {Element} element 
     * @returns 
     */
    function getAngleRotationAndScale(element){
        let matrix = getComputedStyle(element).transform;

        if(matrix === 'none')
            matrix = '(1, 0, 0, 1, 0, 0)';

        matrix = matrix.split('(')[1];
        matrix = matrix.split(')')[0];
        matrix = matrix.split(',');

        return {
            rotation: Math.atan2(matrix[1], matrix[0]),
            scaleX: Math.sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]),
            scaleY: Math.sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3])
        }
    }

    /**
     * 
     * @param {Number} value 
     * @returns 
     */
    function radiansToDegrees(value){

        if(value < 0)
            value += 2 * Math.PI

        return Math.round(value * (180 / Math.PI) );
    }

    function FN(){ 
        //Do nothing 
    }

    function getDescriptor(Interface, prototypeName){
        return Object.getOwnPropertyDescriptor(Interface.prototype, prototypeName);
    }

    //#endregion

})(document);