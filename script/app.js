var wait = function(fnEnd, refrech, msg){
	if(!fnEnd()){
		affiche('wait', msg)
		setTimeout('wait', refrech, fnEnd, refrech, msg);
	} else {
		cache('wait')		
	}
};

var progress = function(fnProgress, refrech, msg, max){
	var prog = fnProgress()
	if(prog < max){
		affiche('progress', msg, prog, max)
		setTimeout('progress', refrech, fnProgress, refrech, msg, max);
	} else {
		cache('wait')		
	}
};

var affiche = function(type, msg, progress, max){
	var doc = document,
		body = doc.body,
		Q = function(querry){return doc.querySelector(querry);},
		elem;
	if(!Q('#Widget'+type)){
		elem = creerElement(type);
	} else {
		elem = Q('#Widget'+type)
	}
};

var cache = function(type){
	var Q = function(querry){return document.querySelector(querry);},
		elem;
	if(Q('#Widget'+type)){
		setTimeout('supprimeElement', 4000, type);
	}
};

var creerElement = function(type){
	
	switch(type){
		case 'wait':
			break;
		case 'progress':
			break;
	}
}

var supprimeElement = function(type){

}