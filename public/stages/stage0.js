function initializeStage() {
	stageN = 0;
	var text = new PIXI.Text('Welcome to NotTouhou',{fontFamily : 'sans-serif', fontSize: 25, fill : '#FFFFFF'});
	text.x = app.renderer.width / 2 - 160;
	text.y = app.renderer.height / 2;
	var textTwo = new PIXI.Text('Use the WASD or arrow\nkeys to move,',{fontFamily : 'sans-serif', fontSize: 25, fill : '#FFFFFF'});
	textTwo.x = app.renderer.width / 2 - 140;
	textTwo.y = app.renderer.height / 2;
	var textThree = new PIXI.Text('Press Z to shoot, Hold\nShift+Z to focus fire.',{fontFamily : 'sans-serif', fontSize: 25, fill : '#FFFFFF'});
	textThree.x = app.renderer.width / 2 - 140;
	textThree.y = app.renderer.height / 2;
	var textFour = new PIXI.Text('That is all! Hit the\nCampaign Button to\ngo back! Have fun!',{fontFamily : 'sans-serif', fontSize: 25, fill : '#FFFFFF'});
	textFour.x = app.renderer.width / 2 - 140;
	textFour.y = app.renderer.height / 2;


	master.addEvent(0, (_) => {
		app.stage.addChild(text);
		return REMOVE_EVENT;
	});
	app.stage.addChild(text);
	master.addEvent(4000, (_) => {
		app.stage.removeChild(text);
		return REMOVE_EVENT;
	});
	master.addEvent(4000, (_) => {
		app.stage.addChild(textTwo);
		return REMOVE_EVENT;
	});

	master.addEvent(8000, (_) => {
		app.stage.removeChild(textTwo);
		return REMOVE_EVENT;
	});

	master.addEvent(8000, (_) => {
		app.stage.addChild(textThree);
		return REMOVE_EVENT;
	});

	master.addEvent(12000, (_) => {
		app.stage.removeChild(textThree);
		return REMOVE_EVENT;
	});

	master.addEvent(12000, (_) => {
		app.stage.addChild(textFour);
		return REMOVE_EVENT;
	});
	
	master.addEvent(16000, (_) => {
		app.stage.removeChild(textFour);
		return REMOVE_EVENT;
	});

	master.fragment(10000);
}