var MySudoku = cc.LayerColor.extend(
{
	_grid:null,
	init:function(){
	        this._super();
	        var size = cc.Director.getInstance().getWinSize();
	        this.initWithColor(new cc.Color4B(255,255,255,255));
		this._grid = new Grid();
		this._grid.setPosition(new cc.Point(size.width/2,size.height/1.74));
		this.addChild(this._grid);
		var menu = new NumberMenu();
		menu.setPosition(new cc.Point(size.width/2,50));
		this.addChild(menu);
		this.setTouchEnabled(true);
		this.setKeyboardEnabled(true);
		this.schedule(this.update);
		layer = this;
	},
	update:function(dt){
		
	},
	onTouchesBegan:function (pTouch,pEvent){
		//handling mouse click pressed event
		this._grid.onTouchStart(pTouch[0].getLocation());
	},
	onTouchesEnded:function (pTouch,pEvent){
		//handling mouse click release event
	},
	onTouchesMoved:function(pTouch,pEvent){
		//handling mouse drag event
	},
	onKeyUp:function(e){
		
	},
	onKeyDown:function(e){
		if((e>=49 && e<=57) || (e>=97 && e<=105)){
			//for numericals
			if(selectedCell != null){
				if(e>=97){
					e -= 48;
				}
				addLetterToCell(String.fromCharCode(e));
				checkCompletion();
			}
		}
		else if(e == 8 || e == 46){
			//for delete and backspace
			removeLetterFromCell();
		}
	},
}
);
var layer;
var MySudokuScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MySudoku();
        layer.init();
        this.addChild(layer);
    }
});
