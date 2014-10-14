/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var TAG_TILE_MAP = 1;

var TileMapTests = [
    //function(){ return new TileMapTest();}, //not support tga format
    // function(){ return new TileMapEditTest();}, //not support tga format
    function () {
        return new TMXIsoZorder();
    },
];
var tileMapIdx = -1;
function nextTileMapAction() {
    ++tileMapIdx;
    tileMapIdx = tileMapIdx % TileMapTests.length;
    return TileMapTests[tileMapIdx]();
}
function backTileMapAction() {
    --tileMapIdx;
    if (tileMapIdx < 0) {
        tileMapIdx += TileMapTests.length;
    }
    return TileMapTests[tileMapIdx]();
}
function restartTileMapAction() {
    return TileMapTests[tileMapIdx]();
}

// the class inherit from TestScene
// every .Scene each test used must inherit from TestScene,
// make sure the test have the menu item for back to main menu
var TileMapTestScene = TestScene.extend({
    runThisTest:function () {
        tileMapIdx = -1;
        this.addChild(nextTileMapAction());
        cc.Director.getInstance().replaceScene(this);
    }
});

//------------------------------------------------------------------
//
// TileDemo
//
//------------------------------------------------------------------
var TileDemo = cc.Layer.extend({
    ctor:function () {
        this.setTouchEnabled(true);
    },
    title:function () {
        return "No title";
    },
    subtitle:function () {
        return "drag the screen";
    },
    onEnter:function () {

        //this.m_label.setString(this.title().toString());
        //this.m_subtitle.setString(this.subtitle().toString());

        this._super();
        var s = cc.Director.getInstance().getWinSize();
        // add title and subtitle
        var title = this.title();
        var label = cc.LabelTTF.create(title, "Arial", 28);
        this.addChild(label, 1);
        label.setPosition(cc.p(s.width / 2, s.height - 50));

        var strSubtitle = this.subtitle();
        if (strSubtitle) {
            var l = cc.LabelTTF.create(strSubtitle, "Thonburi", 16);
            this.addChild(l, 1);
            l.setPosition(cc.p(s.width / 2, s.height - 80));
        }
    },

    registerWithTouchDispatcher:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },
    onTouchBegan:function (touch, event) {
	console.log(cc.Node.convertToNodeSpace());
        return true;
    },
    onTouchEnded:function (touch, event) {
        this.prevLocation = null;
    },
    onTouchCancelled:function (touch, event) {
    },
    prevLocation:null,
    onTouchMoved:function (touch, event) {
        var touchLocation = touch.getLocation();

        if (!this.prevLocation) {
            this.prevLocation = cc.p(touchLocation.x, touchLocation.y);
            return;
        }
        var node = this.getChildByTag(TAG_TILE_MAP);
        var diff = cc.pSub(touchLocation, this.prevLocation);
        var currentPos = node.getPosition();

        //diff = cc.p(diff.x * node.getScaleX(),diff.y * node.getScaleY());
        var curPos = cc.pAdd(currentPos, diff);
        node.setPosition(curPos);
        this.prevLocation = cc.p(touchLocation.x, touchLocation.y);
    }
});

//------------------------------------------------------------------
//
// TMXIsoZorder
//
//------------------------------------------------------------------
var TMXIsoZorder = TileDemo.extend({
    tamara:null,
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create("iso-test-zorder.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();
        map.setPosition(cc.p(-s.width / 2, 0));

		// below line adds image to canvas
        this.tamara = cc.Sprite.create(s_pathSister1);
        this.house = cc.Sprite.create(s_house);

		// add girl image
        map.addChild(this.tamara, map.getChildren().length);
        var mapWidth = map.getMapSize().width * map.getTileSize().width;
		// add girl image
        map.addChild(this.house, map.getChildren().length);
        
        // set the position of the girl
		this.tamara.setPosition(cc.POINT_PIXELS_TO_POINTS(cc.p(mapWidth / 2, 0)));
        this.tamara.setAnchorPoint(cc.p(0.5, 0));

		// set the girl into motion
        var move = cc.MoveBy.create(10, cc.pMult(cc.p(300, 250), 1 / cc.CONTENT_SCALE_FACTOR()));
        var back = move.reverse();
        var seq = cc.Sequence.create(move, back, null);
        this.tamara.runAction(cc.RepeatForever.create(seq));
		// below function pushes girl behind the trees
        this.schedule(this.repositionSprite);
    },
    title:function () {
        return "TMX Iso Zorder";
    },
    subtitle:function () {
        return "Sprite should hide behind the trees";
    },
    onExit:function () {
        this.unschedule(this.repositionSprite);
        this._super();
    },
    repositionSprite:function (dt) {
        var p = this.tamara.getPosition();
        p = cc.POINT_POINTS_TO_PIXELS(p);
        var map = this.getChildByTag(TAG_TILE_MAP);

        // there are only 4 layers. (grass and 3 trees layers)
        // if tamara < 48, z=4
        // if tamara < 96, z=3
        // if tamara < 144, z=2

        var newZ = 4 - (p.y / 48);
        newZ = parseInt(Math.max(newZ, 0));
        map.reorderChild(this.tamara, newZ);
    }
});

