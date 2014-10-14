var Yaht = cc.MenuItemSprite.extend({
    initItems:function (navigationButton) {
        var navigationBtn = cc.Sprite.create(navigationButton);
        this.setNormalImage(navigationBtn);
    }


});
Yaht.createItem = function (navigationButton) {
    var _pedia = new Yaht();
    _pedia.initItems(navigationButton);
    return _pedia;
}