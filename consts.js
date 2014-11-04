function inherit(p){
	function f(){};
	f.prototype = p;
	return new f();
}

var consts = {
	XP: 0,
	XM: 1,
	YP: 2,
	YM: 3,
	FPS: 100,
	ENTITY_HEIGHT: 20,
	ENTITY_WIDTH: 20,
	lifes: 7,
	TIMEOUT: "Time out.",
	PRESS_ENTER: "Press enter for start.",
	CATCHED: "Guard cached you.",
	EASY: "easy",
	NORMAL: "normal",
	HARD: "hard",
	LEVEL_DIFFICULTS: "difficults:",
	INSTRUCT1: "Use key combinations. For example, for turn ",
	INSTRUCT2: "on first right turn use right and up arrows",
	FPS_FONT_COLOR: "#00FF00",
	FPS_FONT: "14px tomas",
	MESSAGE_FONT_COLOR: "#000000",
	MESSAGE_FONT: "14px tomas",
	MESSAGE_BACKGROUND_COLOR: "#FFFF33",
	INFO_FONT_COLOR: "#00FF00",
	INFO_FONT: "14px tomas",
	DEFAULT_BLOCK_COLOR: "#000000",
	PLAYER_STEP: 10,
	PLAYER_FRSTEP: 55,
	FPS: 40	
};