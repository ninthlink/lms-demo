var qedgepieces = [
	{ i: false /*left intentionally blank*/},
	{
		i: '30503229',
		j: 'SixTechnologies_Mobile_edgePreload',
		s: [],
		t: ['Default Timeline'],
	},
	{
		i: '15320788',
		j: 'Elite_spaceship_Mobile_edgePreload',
		s: ['spaceship2'],
		t: [],
	},
	{
		i: '58030357',
		j: 'Elite_Battery_Mobile_edgePreload',
		s: ['Person2'],
		t: ['Default Timeline'],
	},
	{
		i: '50043193',
		j: 'DVD_edgePreload',
		s: ['animation'],
		t: [],
	},
	{
		i: '15758297',
		j: 'Cars_edgePreload',
		s: [],
		t: ['Default Timeline'],
	},
	{ i: false /*left intentionally blank*/}
];
var qload = function(qsc) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "edge_includes/"+ qsc +".js"; 
	document.getElementsByTagName("head")[0].appendChild(script);
}
jQuery(function($) {
	// qualcommreveal
	$('.content-container').qualcommreveal({
	  targets: '.stagewrapper',
	  scrollspeed: 0,
	  waitTime: 2000,
	});
	$.subscribe('qualcommreveal/reveal-start', function(event, elem, counter) {
		if ( qedgepieces[counter]['i'] ) {
			var cmpid = "EDGE-"+ qedgepieces[counter]['i'];
			//console.log('** reveal START : '+ cmpid);
			AdobeEdge.launchComposition(cmpid);
			// and reset
			var stg = AdobeEdge.getComposition(cmpid).getStage();
			stg.seek(0);
			for ( var o in qedgepieces[counter]['s'] ) {
				try {
					stg.getSymbol(qedgepieces[counter]['s'][o]).stop(0);
				} catch(err) {
				// whatever
				}
			}
		}
	});
	$.subscribe('qualcommreveal/reveal-finish', function(event, elem, counter) {
		if ( qedgepieces[counter]['i'] ) {
			var cmpid = "EDGE-"+ qedgepieces[counter]['i'];
			//console.log('** reveal finish : '+ cmpid);
			// and play
			var stg = AdobeEdge.getComposition(cmpid).getStage();
			for ( var p in qedgepieces[counter]['t'] ) {
				try {
					stg.playTimeline(qedgepieces[counter]['t'][p]);
				} catch(err) {
				// whatever
				}
			}
			for ( var o in qedgepieces[counter]['s'] ) {
				try {
					stg.getSymbol(qedgepieces[counter]['s'][o]).play();
				} catch(err) {
				// whatever
				}
			}
		}
	});
});