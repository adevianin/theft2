function Player(x, y, width, height, skin, step, frstep, difficult){
	Entity.call(this, x, y, width, height, skin);
	this.step = step;
	this.frstep = frstep;
	this.difficult = difficult;
	this.lifes = consts.lifes;
	this.timerUp = null;
	this.timerDown = null;
	this.timerLeft = null;
	this.timerRight = null;
	this.lockedMovement = false;
}

Player.prototype = inherit(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
	this._culcCenterOfEntity();
}

Player.prototype.lockMovement = function(){
	this.upUP();//stop move up
	this.upDOWN();//stop move down
	this.upLEFT();//stop move left
	this.upRIGHT();//stop move right
	this.lockedMovement = true;
}

Player.prototype.unlockMovement = function(){
	this.lockedMovement = false;
}

//start move up	when pushed up
Player.prototype.downUP = function(){
	if(this.timerUp == null && !this.lockedMovement){
		if(this.timerDown != null)this.upDOWN();
		var self = this;
		this.timerUp = setInterval(function(){
			if(self.onBeforeMove(self.centerX, self.centerY - self.step)){
				self.y -= self.step;
				self._culcCenterOfEntity();
				self.onMove();	
			}
		}, this.frstep);
	}
}

//start move down		
Player.prototype.downDOWN = function(){
	if(this.timerDown == null && !this.lockedMovement){
		if(this.timerUp!= null)this.upUP();
		var self = this;
		this.timerDown = setInterval(function(){
		if(self.onBeforeMove(self.centerX, self.centerY + self.step)){
			self.y += self.step;
			self._culcCenterOfEntity();
			self.onMove();	
		}
		}, this.frstep);
	}
}

//start move left		
Player.prototype.downLEFT = function(){
	if(this.timerLeft == null && !this.lockedMovement){
		if(this.timerRight != null)this.upRIGHT();
		var self = this;
		this.timerLeft = setInterval(function(){
			if(self.onBeforeMove(self.centerX - self.step, self.centerY)){
				self.x -= self.step;
				self._culcCenterOfEntity();
				self.onMove();		
			}
		}, this.frstep);
	}
}

//start move right		
Player.prototype.downRIGHT = function(){
	if(this.timerRight == null && !this.lockedMovement){
		if(this.timerLeft != null)this.upLEFT();
		var self = this;
		this.timerRight = setInterval(function(){
			if(self.onBeforeMove(self.centerX + self.step, self.centerY)){
				self.x += self.step;
				self._culcCenterOfEntity();
				self.onMove();;		
			}
		}, this.frstep);
	}
}

//stop move up	
Player.prototype.upUP = function(){
	clearInterval(this.timerUp);
	this.timerUp = null;
}

//stop move down		
Player.prototype.upDOWN = function(){
	clearInterval(this.timerDown);
	this.timerDown = null;
}

//stop move left		
Player.prototype.upLEFT = function(){
	clearInterval(this.timerLeft);
	this.timerLeft = null;
}

//stop move right		
Player.prototype.upRIGHT = function(){
	clearInterval(this.timerRight);
	this.timerRight = null;
}

Player.prototype.lostLife = function(){
	this.lifes--;
	if(this.lifes <= 0){
		this.onDead();
	}else{
		this.onLostLife();
	}
}

//event. must check does player can move to x, y
Player.prototype.onBeforeMove = function(x, y){
	return true;
}
//event
Player.prototype.onMove = function(){
	
}
//event
Player.prototype.onDead = function(){

}
//event
Player.prototype.onLostLife = function(){

}

