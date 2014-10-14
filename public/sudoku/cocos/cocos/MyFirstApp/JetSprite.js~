var text = cc.TextureCache.getInstance().addImage("images/progress.png");
var JetSprite = cc.Sprite.extend({
    	_x:150,
    	_y:300,
    //_oldLoc:null,
    _flag:0,
    ctor:function(){
        	this.initWithTexture(text, cc.rect(0,0,0,0), null);
		//this.initWithFile("images/jet.png");
		//var lab1=cc.LabelTTF.create("Hrmjsi","Arial",30);
		//lab.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		//lab.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		//lab1.setPosition(new cc.Point(100,200));
		//this.addChild(lab1);
		//var lab2=cc.LabelTTF.create("Suraj","Arial",30);
		//lab2.setPosition(new cc.Point(200,100));
		//this.addChild(lab2);
    },
    update:function(){
        this.setPosition(new cc.Point(this._x,this._y));
    },
    onTouchStart: function (touches) {
        'use strict';
        var point;
	
        point = new cc.Point(touches.x, touches.y);
        var rect = this.getBoundingBox();
        if (cc.Rect.CCRectContainsPoint(rect, point) === true) {
		if(this._flag == 0){
			this._flag = 1;
			//this._oldLoc = touches;
		}
		return true;
        }
	else{
		return false;
	}
    },
    onTouchMove: function (touches) {
        'use strict';
	if(this._flag == 1){
		//this._x1 = touches.x;
		//this._y1 = touches.y;
		var diff_x = Math.ceil(touches.x - this._x);// + (touches.x - this._oldLoc.x);
		var diff_y = Math.ceil(touches.y - this._y);// + (touches.y - this._oldLoc.y);
		//var translation = cc.pSub(touches,this._oldLoc);
		//console.log(translation);
		//var newPos = cc.pAdd(this.getPosition(),translation);
		//this.setPosition(newPos);
		//this._x = newPos.x;
		//this._y = newPos.y;
		var mod_x = diff_x%32;
		var mod_y = diff_y%16;
		if(Math.abs(diff_x) > 32){
			this._x = this._x + diff_x;
		}
		if(Math.abs(diff_y) > 16){
			this._y = this._y + diff_y;
		}
	}
    },
    onTouchEnd: function (touches) {
        'use strict';
	this._flag = 0;
	this._oldLoc = null;
    },
    handleKey:function(e)
    {
        if(e === cc.KEY.left)
            this._x--;
        else if(e === cc.KEY.right)
            this._x++;
	else if(e === cc.KEY.up)
            this._y++;
        else if(e === cc.KEY.down)
            this._y--;
    }
});
