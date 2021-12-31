if(!!document.documentMode){ //IE
    
    //Polyfill for <template>, you can find it in https://github.com/erovas/template-tag-polyfill.js
    Import.JS('https://erovas.github.io/template-tag-polyfill.js/template-tag-polyfill');

    //Polyfill for Event(), you can find it in https://github.com/erovas/Event-constructor-polyfill.js
    Import.JS('https://erovas.github.io/Event-constructor-polyfill.js/Event-constructor-polyfill');

    //Polyfill for Element.closest(), you can find it in https://developer.mozilla.org/es/docs/Web/API/Element/closest
    Import.JS('https://erovas.github.io/useful-JavaScript-functions-/closest-Polyfill');

}

//IE and EDGE Legacy
if(!!window.StyleMedia){

    //Polyfill for customElements, you can find it in https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs
    Import.JS('https://erovas.github.io/useful-JavaScript-functions-/customElements-Polyfill');

    // Polyfill for isConnected - Modified from https://gist.github.com/eligrey/f109a6d0bf4efe3461201c3d7b745e8f
    Import.JS('https://erovas.github.io/useful-JavaScript-functions-/isConnected-Polyfill');

}