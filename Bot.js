function Bot(x, y, width, height, skin, step, frstep, x1, y1, x2, y2){
	Entity.call(this, x, y, width, height, skin);
	this.step = step;
	this.frstep = frstep;
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.started = false;
	this.stepInterval = null;	
}

Bot.prototype = inherit(Entity.prototype);
Bot.prototype.constructor = Bot;

Bot.prototype.startBot = function(){
	if(this.started)return;
	this.started = true;
	this._identifyDirection();
	var self = this;
	this.stepInterval = setInterval(function(){self.doStep();}, this.frstep);
}

Bot.prototype.stopBot = function(){
	this.started = false;
	clearInterval(this.stepInterval);
}
	
Bot.prototype.doStep = function(){
	if(this.direction == consts.XP){
		if(Math.max(this.x1, this.x2) >= this.x + this.step){
			this.x += this.step;
		}else{
			this.direction = consts.XM;
		}
	}else if(this.direction == consts.XM){
		if(Math.min(this.x1, this.x2) <= this.x - this.step){
			this.x -= this.step;
		}else{
			this.direction = consts.XP;
		}
	}else if(this.direction == consts.YP){
		if(Math.max(this.y1, this.y2) >= this.y + this.step){
			this.y += this.step;
		}else{
			this.direction = consts.YM;
		}
	}else if(this.direction == consts.YM){
		if(Math.min(this.y1, this.y2) <= this.y - this.step){
			this.y -= this.step;
		}else{
			this.direction = consts.YP;
		}
	}

	this._culcCenterOfEntity();
	this.onStepped(this.centerX, this.centerY);
};

//event
Bot.prototype.onStepped = function(){
	
}

Bot.prototype._identifyDirection = function(){
	var random = !! Math.round(Math.random());
	if(this.x1 == this.x2){
		this.direction = random ? consts.YP : consts.YM;
	}else if(this.y1 == this.y2){
		this.direction = random ? consts.XP : consts.XM;
	}
};

