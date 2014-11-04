var frapsManager = {
	redrawInterval: null,
	culcFPSInterval: null,
	started: false,
	lastRedrawTime: null,
	FPS: 0, //actual value frames per seconds. refreshes every 1000 millisec	
	tbfr: null, //actual time between frame redraw
	context: null,//context where will be draw
	object: null,//object, wich will be draw
	showFPS: false,
	timeBetweenRedrawing: null,


	init: function (context, object, needCountFPS, showFPS){
		this.context = context;
		this.object = object;
		this.showFPS = showFPS;
		this.timeBetweenRedrawing = 1000/(needCountFPS ? needCountFPS : 20);// frame will try to update every this.timeBetweenRedrawing miliseconds
	},
	
	setObject: function(object){
		this.object = object;
	},

	start: function(){
		if(this.started) return;
		this.started = true;
		var self = this;
		this.redrawInterval = setInterval(function(){self.redraw();}, this.timeBetweenRedrawing);
		this.culcFPSInterval = setInterval(function(){self.culcFPS();}, 1000);
	},

/*	stop: function(){
		this.started = false;
		clearInterval(this.redrawInterval);
		clearInterval(this.culcFPSInterval);
	},
*/
	redraw: function(){
		this.clearScreen();
		this.object.draw(this.context);	
		if(this.showFPS){
			this.drawFPS();
			this.culcTbfr(); 
		}	
	},

	clearScreen: function(){
		var canvas = this.context.canvas;
		this.context.clearRect(0, 0, canvas.width, canvas.height);
	},

	//culculates time between frame redrawing in milliseconds (does not work if time will be bigger then 999 milliseconds)
	culcTbfr: function(){
		var now = Date.now();
		this.tbfr = now - this.lastRedrawTime;
		this.lastRedrawTime = now;
	},

	culcFPS: function(){
		this.FPS = 1000/this.tbfr;
	},

	drawFPS: function(){
		this.context.textBaseline = "top";
		this.context.font = consts.FPS_FONT;
		this.context.fillStyle = consts.FPS_FONT_COLOR;
		this.context.fillText("FPS: "+Math.round(this.FPS), this.context.canvas.width - 55, this.context.canvas.height - 20);
	}

}


