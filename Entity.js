function Entity(x, y, width, height, skin){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.skin = skin;
	this.centerX = 0;
	this.centerY = 0;
	
	this._culcCenterOfEntity();
};

Entity.prototype.draw = function(context){
	if(this.skin){
		context.drawImage(this.skin, this.x, this.y, this.width, this.height);
	}else{
		context.fillStyle = consts.DEFAULT_BLOCK_COLOR;	
		context.fillRect(this.x, this.y, this.width, this.height);
	}
};

Entity.prototype._culcCenterOfEntity = function(){
	this.centerX = this.x + this.width/2;
	this.centerY = this.y + this.height/2;
}


	
