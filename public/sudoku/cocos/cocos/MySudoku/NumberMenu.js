var button_texture = cc.TextureCache.getInstance().addImage('images/blank.gif');

var NormalButton = cc.Sprite.extend({
	ctor:function(letter){
		this.initWithTexture(button_texture);
		this.setColor(new cc.Color3B(175,175,175));
		var label = cc.LabelTTF.create(letter,  'Arial', 28, cc.size(32,16), cc.TEXT_ALIGNMENT_LEFT);
		label.setColor(new cc.Color3B(0,0,0));
		label.setPosition(new cc.Point(40,40));
		this.addChild(label,0,'label');
	}
});

var SelectedButton = cc.Sprite.extend({
	ctor:function(letter){
		this.initWithTexture(button_texture);
		this.setColor(new cc.Color3B(255,255,255));
		var label = cc.LabelTTF.create(letter,  'Arial', 28, cc.size(32,16), cc.TEXT_ALIGNMENT_LEFT);
		label.setColor(new cc.Color3B(0,0,0));
		label.setPosition(new cc.Point(40,40));
		this.addChild(label,0,'label');
	}
});

var NumberMenuItems = cc.MenuItemSprite.extend({
	_normalBtn:null,
	_selectedBtn:null,
	ctor:function(letter){
		this._normalBtn = new NormalButton(letter);
		this._selectedBtn = new SelectedButton(letter);
		this.initWithNormalSprite(this._normalBtn, this._selectedBtn);
		this.initWithCallback(this, this.menuCallBck);
	},
	menuCallBck:function(sender){
		if(selectedCell != null){
			addLetterToCell(this._normalBtn.getChildByTag('label').getString()[0]);
		}
	}
});

var NumberMenu = cc.Menu.extend({
	ctor:function(){
		var menuArray = [];
		for(var i=1; i<10; i++){
			menuArray.push(new NumberMenuItems(i));
		}
		this.initWithArray(menuArray);
		this.alignItemsHorizontally();
	}
});
