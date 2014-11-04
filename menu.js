var menu = {
	selectedDufficult : 1,
		
	draw: function(context){
		//draw background
		context.drawImage(imgLoader.getImg("menu"), 0, 0, context.canvas.width, context.canvas.height);
		
		//draw selector
		context.fillStyle = "#FFFF33";
		context.fillRect(140,240+35*this.selectedDufficult, 15, 15);
		
		//draw difficult levels
		context.textBaseline = "top";
		context.fillStyle = "#000000";
		context.font = "30px tomas"
		context.fillText(consts.LEVEL_DIFFICULTS, 130, 195);
		context.fillText(consts.EASY, 170, 230);
		context.fillText(consts.NORMAL, 170, 265);
		context.fillText(consts.HARD, 170, 300);
		
		context.font = "11px tomas"
		context.fillText(consts.INSTRUCT1, 40, 355);
		context.fillText(consts.INSTRUCT2, 40, 366);
	},
	
	//does when pressed down
	downDOWN: function(){
		if(this.selectedDufficult + 1 <= 2)
			this.selectedDufficult++;
	},
	
	//does when pressed up
	downUP: function(){
		if(this.selectedDufficult - 1 >= 0)
			this.selectedDufficult--;
	},
	
	//does when pressed enter
	downENTER: function(){// start Game
		var player = new Player(0, 0,consts.ENTITY_WIDTH, consts.ENTITY_HEIGHT,imgLoader.getImg("player"), consts.PLAYER_STEP, consts.PLAYER_FRSTEP, this.selectedDufficult);
		
		keyBoardControl.clearListeners();		
		keyBoardControl.addListener(player);
		keyBoardControl.addListener(world);

		frapsManager.setObject(world);
		
		world.startLevel(0, player);		
	}

}