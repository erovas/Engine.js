window.Utils = (function(){

    return {

        Round: Round,
        Floor: Floor,
    };


    function Round(n){
        return (((n + 0.5) << 1) >> 1);
    }

    function Floor(n){
        return n | 0;
    }


})();