var app = (function(){
	var Q = function(querry){return document.querySelector(querry);};
	var Qs = function(querry){return document.querySelectorAll(querry);};
	var SE = function(item){return item.parentNode.removeChild(item);};
	var NE = function(tag, id, clas){
		var item = document.createElement(tag);
		if(id){item.setAttribute('id',id);}
		if(clas){item.className=clas;}
		return item;
	};
	var Ap = function(Parent, Child){Parent.appendChild(Child);};
	var Pr = function(Parent, Child){Parent.insertBefore(Child,Parent.firstChild);};
	var St = function(item, styles){
		var camelCase = function(string){
				return string.replace(/^-ms-/, "ms-" ).replace(/-([\da-z])/gi, function(all, letter){
						return letter.toUpperCase();
					});
			};
			for(prop in styles){
				try{item.style[camelCase(prop)]=styles[prop];}catch(e){}
			}		
	};

	var wait = function(fnEnd, refrech, msg){
		affiche('wait', msg)
		if(!fnEnd()){
			setTimeout(wait, refrech, fnEnd, refrech, msg);
		} else {
			cache('wait')		
		}
	};

	var progress = function(fnProgress, refrech, msg, max){
		var prog = fnProgress()
		affiche('progress', msg, prog, max)
		if(prog < max){
			setTimeout(progress, refrech, fnProgress, refrech, msg, max);
		} else {
			cache('progress')		
		}
	};

	var affiche = function(type, msg, progress, max){
		var doc = document,
			body = doc.body,
			elem;
		if(!Q('#Widget'+type)){
			elem = creerElement(type);
		} else {
			elem = Q('#Widget'+type)
		}
		oMsg = Q('#Widget'+type+' .message')
		oMsg.innerText = msg;
		if(type=='progress'){
			progressBar(progress*100/max);
		}
	};

	var cache = function(type){
		if(Q('#Widget'+type)){
			setTimeout(supprimeElement, 4000, type);
		}
	};

	var creerElement = function(type){
		var doc = document,
			body = doc.body,
			gfi = NE('div','Widget'+type,'gfi'),
			popup = NE('div',null,'popup'),
			msg = NE ('p',null,'message');
		St(gfi, {
			'position':'absolute',
			'width':'100%',
			'height':'100%',
			'top':0,
			'background-color':'#888',
			'background-color':'rgba(0,0,0,0.66)',
			'z-Index':999999999
		});
		St(popup, {
			'position':'absolute',
			'left':'50%',
			'top':'50%',
			'width':'300px',
			'margin-left':'-150px',
			'background-color':'#bbf',
			'border':'solid #028 2px',
			'border-radius':'7px',
			'padding':'7px'
		})
		St(msg, {
			'color':'#eee',
			'text-shadow':'1px 1px 3px #000',
			'font-family':'sans-serif',
			'font-size':'20px'
		})
		Ap(popup, msg);
		switch(type){
			case 'wait':			
				break;
			case 'progress':
					var over = NE('div',null,'overlay'),
						prog = NE('div',null,'bar');
					Ap(popup, prog);
					Ap(popup, over);
					St(over,{
						'position':'relative',
						'background-color':'rgba(255,255,255,0.1)',
						'-webkit-box-shadow':'inset 2px 2px 4px 0 #FFFFFF',
						'box-shadow':'inset 2px 2px 4px 0 #FFFFFF',
						'margin-left':'10px',
						'margin-right':'10px',
						'height':'20px',
						'border':'solid #aaa 1px',
						'border-radius':'10px'					
					})
					St(prog,{
						'position':'absolute',
						'background-color':'#0f0',
						'-webkit-box-shadow':'inset 2px 2px 4px 0 #FFFFFF',
						'box-shadow':'inset 2px 2px 4px 0 #FFFFFF',
						'margin':'5px 15px',
						'height':'12px',
						'border-radius':'5px'				
					})
				break;
		}
		Ap(gfi, popup);
		Ap(body, gfi);
	};

	var progressBar = function(pct){
		var over = Q('#Widgetprogress div.overlay'),
			bar = Q('#Widgetprogress div.bar');
		max = (over.clientWidth)-10;
		St(bar, {
			'width' : (max * pct / 100) + 'px'
		})
	};

	var supprimeElement = function(type){
		SE(Q('#Widget'+type));
	};

	return {
		'wait': wait,
		'progress': progress
	};
	
})()

