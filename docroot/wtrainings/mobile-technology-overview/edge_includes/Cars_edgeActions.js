
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",30000,function(sym,e){sym.play("Cars");});
//Edge binding end
})("stage");
//Edge symbol end:'stage'

//=========================================================

//Edge symbol: 'CarsGo'
(function(symbolName){})("CarsGo");
//Edge symbol end:'CarsGo'
})(jQuery,AdobeEdge,"EDGE-15758297");