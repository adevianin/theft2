var world = {
	player: null,
	bots: null,
	blocks: null,
	dolars: null,
	finish: null,
	staticEntitys: null,//massive with pixels of drawed entities, which don't move(means dont refresh every frap)
	level: 0,//current level
	time: 0,//time which remained
	specEntity: null,
	timer: null,
	message: "",
	
	startLevel: function(number, player){
		if(!this.player){
			this.setPlayer(player);
		}
		this.staticEntitys = null;
		this.level = number;
		this.bots = this.createBots(levels[number].bots[this.player.difficult]);
		this.blocks = this.createBlocks(levels[number].blocks);
		this.dolars = this.createDolars(levels[number].dolars[this.player.difficult]);
		this.finish = this.createFinish(levels[number].finish);
		this.time = levels[number].time[this.player.difficult];
		this.player.setPosition(levels[number].playerStart[0], levels[number].playerStart[1]);	
		if("specEntity" in levels[number]){
			var seinf = levels[number].specEntity;
			this.specEntity = new Entity(seinf[0], seinf[1], seinf[2], seinf[3], imgLoader.getImg(seinf[4]));
		}
				
		//sets event on bots
		var self = this;
		var checkCollisionWithBot = function(botCenterX, botCenterY){self.checkPlayersCollisionsWithBot(botCenterX, botCenterY);};		
		for(var i = 0; i<this.bots.length; i++){
			this.bots[i].onStepped = checkCollisionWithBot;
		}	
		
		//this shows message then starts bots and timer, after hide message, in method hideMessage
		this.showMessage(consts.PRESS_ENTER);
	},
	
	stopCurLevel: function(){
		this.stopBots();
		this.stopTimer();
	},
	
	setPlayer: function(player){
		this.player = player;
		//sets event on player
		var self = this;
		player.onBeforeMove = function(x,y){return self.canMoveTo(x,y);}
		player.onMove = function(){self.checkEntityCollision();};
		player.onDead = function(){self.restartGame();}
		player.onLostLife = function(){self.restartLevel();}
	},
	
	draw: function(context){
		context.textBaseline = "top";
			
		if(this.staticEntitys == null){
			//draw static elements
			context.fillStyle = "#404040";
			context.fillRect(400, 0, context.canvas.width, context.canvas.height);
			
			context.drawImage(imgLoader.getImg("masonry"), 0, 0, 400, 400);
			
			context.drawImage(imgLoader.getImg("heart"), 405, 5, 20, 20);
			context.drawImage(imgLoader.getImg("clock"), 405, 30, 20, 20);
			
			for(var i=0; i<this.blocks.length; i++){
				this.blocks[i].draw(context);
			}
			
			context.fillStyle = consts.INFO_FONT_COLOR;
			context.font = consts.INFO_FONT;
			context.fillText("level: "+(this.level+1), context.canvas.width/2-50, 3);
			
			//gets static elements in rgb massive 
			this.staticEntitys = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
		}else{
			//puts static elements on screen 
			context.putImageData(this.staticEntitys, 0, 0);
		}
	
		//draw bots
		for(var i = 0; i < this.bots.length; i++){
			this.bots[i].draw(context);
		}
		
		//draw dolars
		for(var i=0; i<this.dolars.length; i++){
			this.dolars[i].draw(context);
		}
		
		//draw finish
		this.finish.draw(context);
		
		//draw player
		this.player.draw(context);
		
		//draw special entity
		if(this.specEntity){
			this.specEntity.draw(context);
		}
		
		
		context.fillStyle = consts.INFO_FONT_COLOR;
		context.font = consts.INFO_FONT;
		//draw time
		context.fillText(this.time,432,32);
		
		//draw lifes count
		context.fillText(this.player.lifes,432,7);
		
		//draw message
		if(this.message){
			var width = context.measureText(this.message).width + 40;
			var height = 30;
			var x = context.canvas.width/2-width/2-30;
			var y = context.canvas.height/2-height/2;
			
			context.fillStyle = consts.MESSAGE_BACKGROUND_COLOR;
			context.fillRect(x, y, width, height);
			
			context.strokeStyle = "#000000";
			context.strokeRect(x, y, width, height);
			
			context.font = consts.MESSAGE_FONT;
			context.fillStyle = consts.MESSAGE_FONT_COLOR;			
			context.fillText(this.message,x+20,y+5);
		}
	},
	
	showMessage: function(text, callback){
		this.stopTimer();
		this.stopBots();
		this.player.lockMovement();
		this.message = text; // will be drawed during next redrawing(in method draw)	
		this.callback = callback;		
	},
	
	hideMessage: function(){
		if(this.message){
			this.startBots();
			this.startTimer();
			this.player.unlockMovement();
			this.message="";
			if(typeof this.callback == "function"){
				this.callback();
			}
		}
	},
	
	//does, when pushed enter
	downENTER: function(){
		this.hideMessage();
	},
	
	restartLevel: function(){
		this.stopCurLevel();
		this.startLevel(this.level);
	},
	
	nextLevel: function(){
		this.stopCurLevel();
		this.startLevel(this.level+1);
	},
	
	restartGame: function(){
		this.stopCurLevel();
		this.player.lifes = consts.lifes;
		this.startLevel(0);
	},
		
	startTimer: function(){
		var self = this;
		this.timer = setInterval(function(){
			self.time--;
			if(self.time<=0){
				self.stopTimer();
				self.stopBots();
				self.showMessage(consts.TIMEOUT, function(){self.player.lostLife();});
			}
		},1000);
	},
	
	stopTimer: function(){
		clearInterval(this.timer);
	},
	
	startBots: function(){
		for(var i = 0; i < this.bots.length; i++){
			this.bots[i].startBot();
		}
	},
	
	stopBots: function(){
		for(var i = 0; i < this.bots.length; i++){
			this.bots[i].stopBot();
		}
	},
	
	canMoveTo: function(x, y){
		for(var i=0; i<this.blocks.length; i++){
			var block = this.blocks[i]; 
			var deadDistanceToBlock = consts.ENTITY_HEIGHT/2;
			var xlt = block.x - deadDistanceToBlock;
			var ylt = block.y - deadDistanceToBlock;
			var xrb = block.x + block.width + deadDistanceToBlock;
			var yrb = block.y + block.height + deadDistanceToBlock;
			if(x>xlt && x<xrb && y>ylt && y<yrb){
				return false;
			}
		}
		return true;
	},
	
	checkEntityCollision: function(){
		this.checkPlayersCollisionsWithBots();
		this.checkPlayersCollisionsWithDolars();
		this.checkPlayersCollisionWithFinish();
	},
	
	checkPlayersCollisionsWithBots: function(){
		for(var i = 0; i < this.bots.length; i++){
			if(this.checkCollision(this.player.centerX, this.player.centerY, this.bots[i].centerX, this.bots[i].centerY)){
				var self = this;
				this.showMessage(consts.CATCHED,function(){self.player.lostLife();});								
			}
		}
	},
	
	checkPlayersCollisionsWithBot: function(botCenterX, botCenterY){
		if(this.checkCollision(this.player.centerX, this.player.centerY, botCenterX, botCenterY)){
				var self = this;
				this.showMessage(consts.CATCHED,function(){self.player.lostLife();});								
		}
	},
	
	checkPlayersCollisionsWithDolars: function(){
		for(var i=0; i<this.dolars.length; i++){
			if(this.checkCollision(this.player.centerX, this.player.centerY, this.dolars[i].centerX, this.dolars[i].centerY)){
				this.dolars.splice(i,1);
			}
		}
	},
	
	checkPlayersCollisionWithFinish: function(){
		if(this.checkCollision(this.player.centerX, this.player.centerY, this.finish.centerX, this.finish.centerY)){
			if(this.dolars.length==0){
				this.nextLevel();
			}
		}
	},
	
	checkCollision: function(centerX, centerY, centerX2, centerY2){
		var distance = Math.sqrt(Math.pow(centerX-centerX2,2) + Math.pow(centerY-centerY2,2));
		return (distance < consts.ENTITY_HEIGHT ? true : false);
	},
	
	createBots: function(botsInf){
		var bots = new Array();
		for(var i=0;i<botsInf.length;i++){
			var inf = botsInf[i];
			bots.push(new Bot(inf[0], inf[1], consts.ENTITY_WIDTH, consts.ENTITY_HEIGHT, imgLoader.getImg("guard"), inf[2], inf[3], inf[4], inf[5], inf[6], inf[7]));
		}
		return bots;
	},
	
	createBlocks: function(blocksInf){
		var blocks = new Array();
		for(var i=0;i<blocksInf.length; i++){
			var inf = blocksInf[i];
			blocks.push(new Entity(inf[0], inf[1], inf[2], inf[3]));
		}
		return blocks;
	},
	
	createDolars: function(dolarsInf){
		var dolars = new Array();
		for(var i=0; i<dolarsInf.length; i++){
			var inf = dolarsInf[i];
			dolars.push(new Entity(inf[0], inf[1], consts.ENTITY_WIDTH, consts.ENTITY_HEIGHT, imgLoader.getImg("dolar")));
		}
		return dolars;
	},
	
	createFinish: function(finishInf){
		return new Entity(finishInf[0], finishInf[1], consts.ENTITY_WIDTH, consts.ENTITY_HEIGHT, imgLoader.getImg("finish"));
	}

}

