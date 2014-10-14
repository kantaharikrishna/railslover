var selectedCell = null;

var Grid = cc.Sprite.extend({
	ctor:function(){
		var grid_texture = cc.TextureCache.getInstance().addImage('images/big_square_new.gif');
		this.initWithTexture(grid_texture);
		this.drawGrid();
		this.fillGrid();
	},
	draw:function(){
		this._super();
		var s = this._rect.size;
		cc.renderContext.lineWidth = "7";

		cc.renderContext.strokeStyle = "rgba(175,175,175,1)";
		for(var i=1; i<9; i++){
			if(i%3 == 0)
				continue;
			cc.drawingUtil.drawLine(cc.p(-(s.width/2), -(s.height/2)+((s.height/9)*i)), cc.p((s.width/2), -(s.height/2)+((s.height/9)*i)));
		}
		for(var i=1; i<9; i++){
			if(i%3 == 0)
				continue;
			cc.drawingUtil.drawLine(cc.p(-(s.width/2)+((s.width/9)*i), (s.height/2)), cc.p(-(s.width/2)+((s.width/9)*i), -(s.height/2)));
		}

		cc.renderContext.strokeStyle = "rgba(0,0,0,1)";
		cc.drawingUtil.drawLine(cc.p(-(s.width/2), -(s.height/2)), cc.p((s.width/2), -(s.height/2)));
		cc.drawingUtil.drawLine(cc.p(-(s.width/2), -(s.height/3)/2), cc.p((s.width/2), -(s.height/3)/2));
		cc.drawingUtil.drawLine(cc.p(-(s.width/2), (s.height/3)/2), cc.p((s.width/2), (s.height/3)/2));
		cc.drawingUtil.drawLine(cc.p(-(s.width/2), (s.height/2)), cc.p((s.width/2), (s.height/2)));

		cc.drawingUtil.drawLine(cc.p(-(s.width/2), (s.height/2)), cc.p(-(s.width/2), -(s.height/2)));
		cc.drawingUtil.drawLine(cc.p(-(s.width/3)/2, (s.height/2)), cc.p(-(s.width/3)/2, -(s.height/2)));
		cc.drawingUtil.drawLine(cc.p((s.width/3)/2, (s.height/2)), cc.p((s.width/3)/2, -(s.height/2)));
		cc.drawingUtil.drawLine(cc.p((s.width/2), (s.height/2)), cc.p((s.width/2), -(s.height/2)));
	},
	update:function(){
	},
	onTouchStart: function (touches) {
		'use strict';
		var point;
		point = new cc.Point(touches.x, touches.y);
		var rect = this.getBoundingBox();
		if (cc.Rect.CCRectContainsPoint(rect, point) === true) {
			//mouse click inside grid
			var tag = this.getCellTagUnderTouch(this.convertToNodeSpace(point));
			var valAt = thePuzzle.getVal(Number(tag.split(',')[1]), Number(tag.split(',')[0]));
			var children = this.getChildren();
			if(!valAt){
				for(var i=0; i<children.length; i++){
					if(Number(children[i].getColor().r) != 200){
						//don't change color of cells which already are red.
						children[i].setColor(new cc.Color3B(255,255,255));
					}
				}
				if(Number(this.getChildByTag(tag).getColor().r) != 200){
					this.getChildByTag(tag).setColor(new cc.Color3B(175,175,175));
				}
				selectedCell = this.getChildByTag(tag);
			}
		}
	},
	onTouchMove: function (touches) {
		'use strict';
	},
	onTouchEnd: function (touches) {
		'use strict';
	},
	handleKey:function(e)
	{
	},
	drawGrid:function(){
		var small_squares_texture = cc.TextureCache.getInstance().addImage('images/small_square_new.png');
		for(var i=0; i<9;i++){
			for(var j=0; j<9; j++){
				var small_squares = cc.Sprite.createWithTexture(small_squares_texture);
				small_squares.setPosition(new cc.Point((j*64)+32,(i*64)+32));
				this.addChild(small_squares,0,j+','+i);
			}
		}
	},
	getCellTagUnderTouch:function(touch){
		var point = new cc.Point(touch.x, touch.y);
		var gridSize = this._rect.size;
		var gridx = Math.floor(point.x/(gridSize.width/9));
		var gridy = Math.floor(point.y/(gridSize.height/9));
		return gridx+','+gridy;
	},
	fillGrid:function(){
		thePuzzle = new Sudoku();
		thePuzzle.level = 0;
		// initialize each cell.
		for(var i = 0; i < 9; i++) {
			for(var j = 0; j < 9; j++) {
				var cell = this.getChildByTag(i+','+j);
				if(thePuzzle.getVal(i, j) != 0){
					var label = cc.LabelTTF.create(thePuzzle.getVal(i, j),  'Arial', 28, cc.size(32,16), cc.TEXT_ALIGNMENT_LEFT);
					label.setColor(new cc.Color3B(0,0,0));
					label.setPosition(new cc.Point(40,40));
					cell.addChild(label,0,'label');
				}
			}
		}
		grid = this;
		thePuzzle.done = function() {
			// update the board with the new puzzle data.
			for(var i = 0; i < 9; i++) {
				for(var j = 0; j < 9; j++) {
					var cell = grid.getChildByTag(j+','+i);
					if(thePuzzle.getVal(i, j) != 0) {
						var label = cc.LabelTTF.create(thePuzzle.getVal(i, j),  'Arial', 28, cc.size(32,16), cc.TEXT_ALIGNMENT_LEFT);
						label.setColor(new cc.Color3B(0,0,0));
						label.setPosition(new cc.Point(40,40));
						cell.addChild(label,0,'label');
					}
				}
			}
		};
		// generate the new puzzle.
		thePuzzle.newGame();
		/*for(var i=0; i<9; i++){
			var str='';
			for(var j=0; j<9; j++){
				str+=thePuzzle.getVal(i,j);
			}
			//console.log(str);
		}*/
	},
	solve: function(){
		thePuzzle.solveGame();
		for(var i = 0; i < 9; i++) {
			for(var j = 0; j < 9; j++) {
				var cell = grid.getChildByTag(j+','+i);
				var label = cc.LabelTTF.create(thePuzzle.getVal(i, j),  'Arial', 28, cc.size(32,16), cc.TEXT_ALIGNMENT_LEFT);
				label.setColor(new cc.Color3B(0,0,0));
				label.setPosition(new cc.Point(40,40));
				cell.addChild(label,0,'label');
			}
		}
	}
});
var grid, thePuzzle;
