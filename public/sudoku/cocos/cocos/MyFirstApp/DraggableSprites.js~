var SPRITE_STATE_GRABBED = 0;
var SPRITE_STATE_UNGRABBED = 1;

var DragabbleSprite = cc.Sprite.extend({
    _state:SPRITE_STATE_UNGRABBED,
    _rect:null,
    rect:function () {
        return cc.rect(-this._rect.size.width/3, -this._rect.size.height/3, this._rect.size.width - this._rect.size.width/3, this._rect.size.height - this._rect.size.height/3);
    },
    initWithTexture:function (spriteTexture) {
        if (this._super(spriteTexture)) {
            this._state = SPRITE_STATE_UNGRABBED;
        }
        if (spriteTexture instanceof cc.Texture2D) {
            var s = spriteTexture.getContentSize();
            this._rect = cc.rect(0, 0, s.width, s.height);
        } else if ((spriteTexture instanceof HTMLImageElement) || (spriteTexture instanceof HTMLCanvasElement)) {
            this._rect = cc.rect(0, 0, spriteTexture.width, spriteTexture.height);
        }
        return true;
    },
    onEnter:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
        this._super();
    },
    onExit:function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        this._super();
    },
    containsTouchLocation:function (touch) {
        var getPoint = touch.getLocation();
        var myRect = this.rect();

        myRect.origin.x += this.getPosition().x;
        myRect.origin.y += this.getPosition().y;
        return cc.Rect.CCRectContainsPoint(myRect, getPoint);//this.convertTouchToNodeSpaceAR(touch));
    },

    onTouchBegan:function (touch, event) {
	var elem = document.getElementById('gameCanvas');
	if (elem && elem.getContext){
	var context = elem.getContext('2d');
	context.fillStyle   = '#00f';
	context.fillRect(this.getPosition().x, this.getPosition().y, 150, 100);
	}
        if (this._state != SPRITE_STATE_UNGRABBED) return false;
        if (!this.containsTouchLocation(touch)) return false;

        this._state = SPRITE_STATE_GRABBED;
        return true;
    },
    onTouchMoved:function (touch, event) {
        var touchPoint = touch.getLocation();
        this.setPosition(cc.p(touchPoint.x, touchPoint.y));
    },
    onTouchEnded:function (touch, event) {
        cc.Assert(this._state == SPRITE_STATE_GRABBED, "Paddle - Unexpected state!");
        this._state = SPRITE_STATE_UNGRABBED;
    },
    touchDelegateRetain:function () {
    },
    touchDelegateRelease:function () {
    }
});
DragabbleSprite.spriteWithTexture = function (spriteTexture) {
    var dsprite = new DragabbleSprite();
    dsprite.initWithTexture(spriteTexture);
    return dsprite;
};
