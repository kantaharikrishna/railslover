var tag=null;
var w=0, h=0;
var MyFirstApp = cc.LayerColor.extend(
{   	_jetSprite1:null,
	_jetSprite2:null,
	_emitter:null,
    init:function(){
        this._super();
        this.initWithColor(new cc.Color4B(0,0,0,255));
        var size = cc.Director.getInstance().getWinSize();
        this.setTouchEnabled(true);
	//console.log(cc.TextureCache.getInstance());
	//cc.TextureCache.getInstance().addImage(filepath);
	//console.log(cc.unzipBase64AsArray('H4sIAAAAAAAAAO3NMQ0AAAwDoB71r7kulh1ggAQAAOCPOs/OAa5m6+4QDgAA', 4));
	this.setKeyboardEnabled(true);
	this._jetSprite1 = new JetSprite();
	//this._jetSprite2 = new JetSprite();
	/*var callbckForever = cc.CallFunc.create(this, this.callMe);
	var seq = cc.Sequence.create(cc.DelayTime.create(1),callbckForever);
	var repF = cc.RepeatForever.create(seq);
	repF._tag = 'rep';
	this.runAction(repF);*/
	var prog = cc.ProgressFromTo.create(0,0, 100);
	this._jetSprite2 = cc.ProgressTimer.create(cc.Sprite.create("images/progress.png"));
	this._jetSprite2.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        //    Setup for a bar starting from the left since the midpoint is 0 for the x
        this._jetSprite2.setMidpoint(cc.p(0, 0));
        //    Setup for a horizontal bar since the bar change rate is 0 for y meaning no vertical change
        this._jetSprite2.setBarChangeRate(cc.p(1, 0));
	this._jetSprite2.setPosition(new cc.Point(300,300));
	this.addChild(this._jetSprite2);
	this._jetSprite2.runAction(prog);
	//this.dec();
	//this._jetSprite1._x=450;
	//this._jetSprite1._y=300;
        //this._jetSprite1.scheduleUpdate();
        //this._jetSprite2.scheduleUpdate();
        //this.schedule(this.update);
    },
    update:function(dt){
	
    },
	dec:function(from, to){
		var prog = cc.ProgressFromTo.create(2,from,to);
		console.log(prog);
		this._jetSprite2.runAction(prog);
	},
    callMe:function(){
		this._jetSprite1.setAnchorPoint(new cc.Point(0,0));
		/*if( Object.prototype.toString.call( this._jetSprite1._children ) === '[object Array]' ) {
		    	this._jetSprite1.removeChild('tooltip',false);
			console.log(this._jetSprite1._children);
		}
		var tooltip = new cc.Sprite.create("images/tooltip.png");
		tooltip.setPosition(new cc.Point(90,150));
		tooltip._tag = 'tooltip';
		this._jetSprite1.addChild(tooltip);*/
		//this._jetSprite1.setTextureRect(cc.rect(0,0,0,0), false, this._jetSprite1.getContentSize());
		if(w<180){
			this._jetSprite1.setTextureRect(cc.rect(0,0,w,28), false, this._jetSprite1.getContentSize());
		}
		else{
			this.stopActionByTag('rep');
		}
		w+=5;
    },
    onTouchesBegan:function (pTouch,pEvent){	
        var ifhit1 = this._jetSprite1.onTouchStart(pTouch[0].getLocation());
        var ifhit2 = this._jetSprite2.onTouchStart(pTouch[0].getLocation());
	for(var i=0; i<this._children.length; i++){
		this._children[i].stopAllActions();
		this._children[i].setColor(new cc.Color3B(255, 255, 255));
		if(this._children[i]._tag == 'currency'){
			this.removeChildByTag('currency', false);
		}
	}
	var size = cc.Director.getInstance().getWinSize();
	var act1 = cc.TintTo.create(1, 125, 125, 125);
	var act2 = cc.TintTo.create(1, 255, 255, 255);
	var coinImg = cc.Sprite.create('floater_food_icon.png');
	var coinAmt = cc.LabelTTF.create("+500","Arial",30);
	coinImg.addChild(coinAmt);
	coinImg._tag = 'currency';
	coinAmt.setPosition(new cc.Point(65,18));
	var zoom = cc.ScaleTo.create(1.5, 1.3, 1.3);
	var fadeIn = cc.FadeIn.create(0.5);
	var fadeOut = cc.FadeOut.create(1.5);
	var move = cc.MoveBy.create(0.5, new cc.Point(0,100));
	var spawn = cc.Spawn.create(fadeIn, move, zoom, fadeOut);
	var easeIn = cc.EaseExponentialOut.create(spawn, 1);
	//var seq = cc.Sequence.create(spawn, fadeOut);
	//var moveEaseIn = cc.EaseBounceIn.create(spawn);
	if(ifhit1){
		coinImg.setPosition(new cc.Point(this._jetSprite1.getPositionX()-40,this._jetSprite1.getPositionY()-20));
		this.addChild(coinImg);
		this._jetSprite1.runAction(cc.RepeatForever.create(cc.Sequence.create(act1, act2)));
	}
	else if(ifhit2){
		/*coinImg.setPosition(new cc.Point(this._jetSprite2.getPositionX()-40,this._jetSprite2.getPositionY()-20));
		this._jetSprite2.runAction(cc.RepeatForever.create(cc.Sequence.create(act1, act2)));
		this.addChild(coinImg);*/
	}
	coinImg.runAction(spawn);
    },
    onTouchesEnded:function (pTouch,pEvent){
        this._jetSprite1.onTouchEnd(pTouch[0].getLocation());
	//this._jetSprite2.onTouchEnd(pTouch[0].getLocation());
	//console.log(this._jetSprite1.convertToNodeSpace(pTouch[0].getLocation()));
    },
    onTouchesMoved:function(pTouch,pEvent){
        this._jetSprite1.onTouchMove(pTouch[0].getLocation());
        //this._jetSprite2.onTouchMove(pTouch[0].getLocation());
    },
    onKeyUp:function(e){
    },
    onKeyDown:function(e){
	this._jetSprite1.handleKey(e);
    },
    setEmitterPosition:function () {
        var s = cc.Director.getInstance().getWinSize();
        this._emitter.setPosition(cc.p(s.width / 2, s.height / 2));
    }
});

var MyFirstAppScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MyFirstApp();
        layer.init();
        this.addChild(layer);
	layer.dec(100,0);
    }
})
