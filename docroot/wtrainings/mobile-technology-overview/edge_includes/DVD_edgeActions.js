
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindElementAction(compId,symbolName,"document","compositionReady",function(sym,e){sym.$("animation").css({width:'720px',margin:'0 auto',position:'relative'});});
//Edge binding end
})("stage");
//Edge symbol end:'stage'

//=========================================================

//Edge symbol: 'DVD'
(function(symbolName){})("DVD");
//Edge symbol end:'DVD'

//=========================================================

//Edge symbol: 'DVD_animation'
(function(symbolName){})("DVD_animation");
//Edge symbol end:'DVD_animation'

//=========================================================

//Edge symbol: 'animation'
(function(symbolName){})("animation");
//Edge symbol end:'animation'
})(jQuery,AdobeEdge,"EDGE-50043193");