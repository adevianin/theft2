var keyBoardControl = {
	listeners: new Array(),
	
	addListener: function(listener){
		this.listeners.push(listener);
	},
	
	clearListeners: function(){
		this.listeners = new Array();
	},
	
	keyDown: function(event){
		key = event.keyCode;
		if(key == 38){
			keyBoardControl.callForAllListeners("downUP");
		}else if(key == 40){
			keyBoardControl.callForAllListeners("downDOWN");
		}else if(key == 37){
			keyBoardControl.callForAllListeners("downLEFT");
		}else if(key == 39){
			keyBoardControl.callForAllListeners("downRIGHT");
		}else if(key == 13){
			keyBoardControl.callForAllListeners("downENTER");
		}
	},
	
	keyUp: function(event){
		key = event.keyCode;
		if(key == 38){
			keyBoardControl.callForAllListeners("upUP");
		}else if(key == 40){
			keyBoardControl.callForAllListeners("upDOWN");
		}else if(key == 37){
			keyBoardControl.callForAllListeners("upLEFT");
		}else if(key == 39){
			keyBoardControl.callForAllListeners("upRIGHT");
		}
	},
	
	callForAllListeners: function(funcName){
		//mekes copy of listeners
		var currentListeners = new Array();
		for(var i=0;i<this.listeners.length; i++){
			currentListeners.push(this.listeners[i]);
		}
		
		//uses copy for calling events
		for(var i=0;i<currentListeners.length;i++){
			var listener = currentListeners[i]; 
			if(funcName in listener && typeof listener[funcName] == "function"){
				listener[funcName]();
			}
		}
	}
}