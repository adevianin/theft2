var imgLoader = {
	images: {},
	imgCount: 0,
	imgLoaded: 0,
	load: function(){
		var imgNames = ["guard","player","dolar","finish","masonry","clock","heart","menu","grid"]; 
		this.imgCount = imgNames.length;
		for(var i=0; i < this.imgCount; i++){
			this.images[imgNames[i]] = new Image();
			var self = this;
			this.images[imgNames[i]].onload = function(){self.onImgLoad();};
			this.images[imgNames[i]].src = "pic/"+imgNames[i]+".png";
		}
	},
	
	onImgLoad: function(){
		this.imgLoaded++;
		if(this.imgCount == this.imgLoaded){
			this.allImgLoaded();
		}
	},
	
	getImg: function(name){
		return this.images[name];
	},
	
	allImgLoaded: function(){
		
	},
	
	deleteLoadedNames: function(imgNames){
		for(var i=0; i<imgNames.length; i++){
			if(imgNames[i] in this.images){
				imgNames.splice(i, 1);
			}
		}
	}
}




