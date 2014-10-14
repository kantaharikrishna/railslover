var list = ["Aces", "Twos", "Threes", "Fours", "Fives", "Sixes", "Bonus", "3 of a kind", "4 of a kind", "Full House", "Small Straight", "Long Stright", "Yahtzee", "Chance", "Yahtzee Bonus", "TOTAL"];

var description = ["Every face with a 1 count as 1 point, others count as 0", "Every face with a 2 count as 2 point, others count as 0", "Every face with a 3 count as 3 point, others count as 0",
    "Every face with a 4 count as 4 point, others count as 0", "Every face with a 5 count as 5 point, others count as 0", "Every face with a 6 count as 6 point, others count as 0",
    "If the sum of six rows above this one is equal or greater than 40, you gain 30 points", "If at least 3 dice show the same face, you score sum of all dice",
    "If at least 4 dice show the same face, you score sum of all dice", "A three of a kind and a pair give you 25 points", "Four sequential values (ex: 1-2-3-4) give you 30 points",
    "Five sequential values (ex: 1-2-3-4-5) give you 40 points", "If five dice show same face, you gain 50 points", "Any combination, you score the sum of all dice",
    "Every yahtzee after the first one give you 100 points, and you can use the combination in another row", "Your current total score"];
var YahtLayer = cc.Layer.extend({
    menu:null,
    count:null,
    menu1:null,
    trailMenu:null,
    totalTempValue:null,
    bonusTempValue:null,
    yahtzeeBonusValue:null,

    ctor:function () {

        this.setTouchEnabled(true);
        this.count = 0;
        this.aceValue = null;
        this.twoValue = null;
        this.threeValue = null;
        this.fourValue = null;
        this.fiveValue = null;
        this.sixValue = null;
        this.flag = 0;
        this.rollsStatus = 3;
        this.sec = 0;
        this.min = 0;
       // var bg=cc.Sprite.create(s_bg);
        //bg.setPosition(cc.p(400,400));
       // this.addChild(bg);

        this.schedule(function () {
            this.sec++;
            if (Math.floor(this.sec / 60) == 60) {
                this.sec = 0;
                this.min++;
            }
            this.removeChildByTag(YahtLayer.TAG_TIME_LABEL);
            this.time = cc.LabelTTF.create("Time spent: " + this.min + ":" + Math.floor(this.sec / 60) + " sec", 'times new roman', 30);
            this.time.setPosition(cc.p(810, 100));
            this.addChild(this.time, 0, YahtLayer.TAG_TIME_LABEL);
            if (Math.floor(this.sec / 60)) {

            }
            if(this.count == 3){
                this.dice1._state=0;
                this.dice2._state=0;
                this.dice3._state=0;
                this.dice4._state=0;
                this.dice5._state=0;
            }


        });
        this.hintLabel=cc.LabelTTF.create("Click on the label for hint",'times new roman',15);
        this.hintLabel.setColor(cc.c3b(150,0,150));
        this.hintLabel.setPosition(cc.p(150,650));


        //getting the high score from cookie......and then adding that to layer based on some conditions
        var highscore = this.getCookie("highscore");
        if (!highscore) {
            this.highScore = cc.LabelTTF.create("High score: 0", 'times new roman', 25);
        }
        else {
            this.highScore = cc.LabelTTF.create("High score: " + highscore, 'times new roman', 25);
        }

        //array of dice values
        this.items = [this.firstDiceCount, this.secondDiceCount, this.thirdDiceCount, this.fourthDiceCount, this.fifthDiceCount];

        this.rollsLeftLabel = cc.LabelTTF.create("Rolls left:" + this.rollsStatus, 'times new roman', 20);


        this.trailMenu = cc.Menu.create();
        //creation of bucket, creation of roll sprite and adding that to the bucket. Adding the bucket to the trailMenu

        this.trail = Yaht.createItem(s_bucket);
        this.trail.setRotation(320);


        this.roll = cc.Sprite.create(s_roll);
        this.roll.setPosition(cc.p(100, 90));
        this.trail.addChild(this.roll,0,YahtLayer.TAG_ROLL);
        this.roll.setRotation(-25);

        this.reRoll=cc.Sprite.create(s_reroll);
        this.reRoll.setPosition(cc.p(100, 90));
        this.trail.addChild(this.reRoll,0,YahtLayer.TAG_REROLL);
        this.reRoll.setRotation(-25);

        this.trail.initWithCallback(this, this.trailCall);
        this.trailMenu.addChild(this.trail);

        //creating a menu and adding the label names and setting UserData for respective labels.
        this.menu1 = cc.Menu.create();
        for (i = 0; i < list.length; i++) {
            label = cc.LabelTTF.create(list[i], 'arial', 20);
            labelItem = cc.MenuItemLabel.create(label, this, this.descriptionCall);
            labelItem.setUserData(description[i]);

            this.menu1.addChild(labelItem);

        }

        this.menu1.setEnabled(true);
        this.menu = cc.Menu.create();

        //creation of menu items and setting up them with the respective callbacks.
        this.aces = Yaht.createItem(s_score);
        this.aces.initWithCallback(this, this.aceCall);

        this.twos = Yaht.createItem(s_score);
        this.twos.initWithCallback(this, this.twoCall);

        this.threes = Yaht.createItem(s_score);
        this.threes.initWithCallback(this, this.threeCall);

        this.fours = Yaht.createItem(s_score);
        this.fours.initWithCallback(this, this.fourCall);

        this.fives = Yaht.createItem(s_score);
        this.fives.initWithCallback(this, this.fiveCall);

        this.sixes = Yaht.createItem(s_score);
        this.sixes.initWithCallback(this, this.sixCall);

        this.bonus = Yaht.createItem(s_score);
        this.bonus.initWithCallback(this, this.bonusCall);

        this.threeOfAKind = Yaht.createItem(s_score);
        this.threeOfAKind.initWithCallback(this, this.threeOfKindCall);

        this.fourOfAKind = Yaht.createItem(s_score);
        this.fourOfAKind.initWithCallback(this, this.fourOfAKindCall);

        this.fullHouse = Yaht.createItem(s_score);
        this.fullHouse.initWithCallback(this, this.fullHouseCall);

        this.smallStraight = Yaht.createItem(s_score);
        this.smallStraight.initWithCallback(this, this.smallStraightCall);

        this.longStraight = Yaht.createItem(s_score);
        this.longStraight.initWithCallback(this, this.longStraightCall);

        this.yahtzee = Yaht.createItem(s_score);
        this.yahtzee.initWithCallback(this, this.yahtzeeCall);

        this.chance = Yaht.createItem(s_score);
        this.chance.initWithCallback(this, this.chanceCall);

        this.yahtzeeBonus = Yaht.createItem(s_score);
        this.yahtzeeBonus.initWithCallback(this, this.yahtzeeBonusCall);

        this.total = Yaht.createItem(s_score);
        this.total.initWithCallback(this, this.totalCall);


        this.menu.addChild(this.aces, 0, YahtLayer.TAG_ACE);
        this.menu.addChild(this.twos, 0, YahtLayer.TAG_TWO);
        this.menu.addChild(this.threes, 0, YahtLayer.TAG_THREE);
        this.menu.addChild(this.fours, 0, YahtLayer.TAG_FOUR);
        this.menu.addChild(this.fives, 0, YahtLayer.TAG_FIVE);
        this.menu.addChild(this.sixes, 0, YahtLayer.TAG_SIX);

        this.bonusCountLabel = cc.LabelTTF.create("0", 'arial', 25);
        this.bonusCountLabel.setColor(cc.c3b(0, 150, 255));
        this.bonusCountLabel.setPosition(cc.p(YahtLayer.labelValuePositionX, YahtLayer.labelValuePositionY));
        this.bonus.addChild(this.bonusCountLabel, 0, YahtLayer.TAG_BONUS_VALUE_LABEL);

        this.menu.addChild(this.bonus);
        this.menu.addChild(this.threeOfAKind, 0, YahtLayer.TAG_THREE_OF_SAME_KIND);
        this.menu.addChild(this.fourOfAKind, 0, YahtLayer.TAG_FOUR_OF_A_KIND);
        this.menu.addChild(this.fullHouse, 0, YahtLayer.TAG_FULL_HOUSE);
        this.menu.addChild(this.smallStraight, 0, YahtLayer.TAG_SMALL_STRAIGHT);
        this.menu.addChild(this.longStraight, 0, YahtLayer.TAG_LONG_STRAIGHT);
        this.menu.addChild(this.yahtzee, 0, YahtLayer.TAG_YAHTZEE);
        this.menu.addChild(this.chance, 0, YahtLayer.TAG_CHANCE);

        this.yahtzeeBonusLabel = cc.LabelTTF.create("0", 'arial', 25);
        this.yahtzeeBonusLabel.setColor(cc.c3b(0, 150, 255));
        this.yahtzeeBonusLabel.setPosition(cc.p(YahtLayer.labelValuePositionX, YahtLayer.labelValuePositionY));
        this.yahtzeeBonus.addChild(this.yahtzeeBonusLabel, 0, YahtLayer.TAG_YAHTZEE_BONUS_LABEL);

        this.menu.addChild(this.yahtzeeBonus);

        this.temp = cc.LabelTTF.create("0", 'arial', 25);
        this.temp.setColor(cc.c3b(255, 0, 0));
        this.temp.setPosition(cc.p(YahtLayer.labelValuePositionX, YahtLayer.labelValuePositionY));
        this.total.addChild(this.temp, 0, YahtLayer.TAG_TOTAL_VALUE_LABEL);
        this.menu.addChild(this.total);
        this.menu.alignItemsVerticallyWithPadding(10);
        this.menu1.alignItemsVerticallyWithPadding(17);
        this.menu1.setPositionX(140);
        this.menu1.setPositionY(319);
        this.menu.setPositionY(319);
        this.trailMenu.setPosition(cc.p(700, 650));
        this.menu.setEnabled(false);
        this.rollsLeftLabel.setPosition(cc.p(730, 500));
        this.addChild(this.rollsLeftLabel, 0, YahtLayer.TAG_ROLLS_LEFT_LABEL);
        this.highScore.setPosition(cc.p(800, 200));
        this.titleLabel = cc.LabelTTF.create("Yahtzee@Hari", 'glaser', 30);
        this.titleLabel.setColor(cc.c3b(100, 0, 255));
        this.titleLabel.setPosition(cc.p(90, 800));
        this.time = cc.LabelTTF.create("Time spent: " + this.min + ":" + this.sec + " sec", 'times new roman', 30);
        this.time.setPosition(cc.p(810, 100));
        var buttonNewGame = Yaht.createItem(s_newgame);
        buttonNewGame.setScale(0.3);
        buttonNewGame.initWithCallback(this,this.MainMenuCallback);


        var menuNewGame = cc.Menu.create(buttonNewGame, null);
        menuNewGame.setPosition(cc.p(800,50));

        //setInterval(function(){alert("Hello")},3000);
        //var screen=cc.Director.getInstance().getWinSize();

        //this.setPosition(cc.p(screen.width /2,screen.height/2));



        this.addChild(this.menu1);
        this.addChild(this.menu);
        this.addChild(this.trailMenu, 3);
        this.addChild(this.highScore);
        this.addChild(this.titleLabel);
        this.addChild(this.time, 0, YahtLayer.TAG_TIME_LABEL);
        this.addChild(this.hintLabel);
        this.addChild(menuNewGame);
        //console.log(this.trailMenu.getPosition());
        if(this.count == 0){
            this.trail.getChildByTag(YahtLayer.TAG_REROLL).setVisible(false);
        }


    },
    onEnter:function () {
        this._super();

    },
    MainMenuCallback:function () {
        var scene = cc.Scene.create();
        var layer = new YahtLayer();
        scene.addChild(layer);
        cc.Director.getInstance().replaceScene(scene);
    },

    onTouchesBegan:function (touches, event) {
        if (!this.isMouseDown) {

            this._beginPos = touches[0].getLocation().y;
        }
        this.isMouseDown = true;

    },

    onTouchesMoved:function (touches, event) {
        //  console.log(this.dice5.getPosition());
        if (this.isMouseDown) {
            var touchLocation = touches[0].getLocation().y;
            var nMoveY = touchLocation - this._beginPos;



        }
    },

    onTouchesEnded:function () {
        this.trail.setPosition(cc.p(0,0));
        if(this.dice1 && this.dice2 && this.dice3 && this.dice4 && this.dice5)
        {

        if((800<this.dice1.getPositionX() &&this.dice1.getPositionX()<950 && 550<this.dice1.getPositionY() && this.dice1.getPositionY()<850 )){

            this.dice1.setPosition(cc.p(870,630));
        }
        if((800<this.dice2.getPositionX() &&this.dice2.getPositionX()<950 && 550<this.dice2.getPositionY() && this.dice2.getPositionY()<850 )){

            this.dice2.setPosition(cc.p(870,630));
        }
        if((800<this.dice3.getPositionX() &&this.dice3.getPositionX()<950 && 550<this.dice3.getPositionY() && this.dice3.getPositionY()<850 )){

            this.dice3.setPosition(cc.p(870,630));
        }
        if((800<this.dice4.getPositionX() &&this.dice4.getPositionX()<950 && 550<this.dice4.getPositionY() && this.dice4.getPositionY()<850 )){

            this.dice4.setPosition(cc.p(870,630));
        }
        if((800<this.dice5.getPositionX() &&this.dice5.getPositionX()<950 && 550<this.dice5.getPositionY() && this.dice5.getPositionY()<850 )){

            this.dice5.setPosition(cc.p(870,630));
        }





        if(!(820<this.dice1.getPositionX() &&this.dice1.getPositionX()<900 && 550<this.dice1.getPositionY() && this.dice1.getPositionY()<850 )){

            this.dice1.setPosition(cc.p(200,730));
        }

        if(!(820<this.dice2.getPositionX() &&this.dice2.getPositionX()<900 && 550<this.dice2.getPositionY() && this.dice2.getPositionY()<850 )){

            this.dice2.setPosition(cc.p(270,730));
        }
        if(!(820<this.dice3.getPositionX() &&this.dice3.getPositionX()<900 && 550<this.dice3.getPositionY() && this.dice3.getPositionY()<850 )){

            this.dice3.setPosition(cc.p(340,730));
        }
        if(!(820<this.dice4.getPositionX() &&this.dice4.getPositionX()<900 && 550<this.dice4.getPositionY() && this.dice4.getPositionY()<850 )){

            this.dice4.setPosition(cc.p(410,730));
        }
        if(!(820<this.dice5.getPositionX() &&this.dice5.getPositionX()<900 && 550<this.dice5.getPositionY() && this.dice5.getPositionY()<850 )){

            this.dice5.setPosition(cc.p(480,730));
        }
        }
        this.isMouseDown = false;
    },

    //checking that all the values have been filled or not?
    fillCheck:function () {
        if (this.aceValue >= 0 && this.twoValue >= 0 && this.threeValue >= 0 && this.fourValue >= 0 && this.fiveValue >= 0 && this.sixValue >= 0 && this.threeOfAKindValue >= 0 && this.fourOfAKindValue >= 0 && this.fullHouseValue >= 0 && this.smallStraightValue >= 0 && this.longStraightValue >= 0 && this.yahtzeeValue >= 0 && this.chanceValue >= 0) {


            var multiplexlayer = this._parent;
            var resultLayer = multiplexlayer._layers[1];
            var username = this.getCookieForUsername("username");
            this.checkCookie();
            var highsc = this.getCookie("highscore");

            /*   if(this.getCookie("highscore") > this.totalTempValue)
             {
             var highsc=this.getCookie("highscore");
             }
             else
             {
             var highsc=this.totalTempValue;
             }*/
            gameOverLabel = cc.LabelTTF.create("Hello " + username + "..........Game Over", 'arial', 40);
            scoreLabel = cc.LabelTTF.create("Your score is: " + this.totalTempValue, 'arial', 40);
            highsco = cc.LabelTTF.create("High score is: " + highsc, 'arial', 40);

            gameOverLabel.setPosition(cc.p(400, 400));
            scoreLabel.setPosition(cc.p(400, 350));
            highsco.setPosition(cc.p(400, 300));
            function sleep(milliseconds) {
                var start = new Date().getTime();
                for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds) {
                        break;
                    }
                }
            }

            resultLayer.addChild(gameOverLabel);
            resultLayer.addChild(scoreLabel);
            resultLayer.addChild(highsco);

            sleep(500);

            this._parent.switchTo(1);
        }

    },

    rollrerollCheck:function(){
        if(this.count == 0){
            this.trail.getChildByTag(YahtLayer.TAG_REROLL).setVisible(false);
            this.trail.getChildByTag(YahtLayer.TAG_ROLL).setVisible(true);
        }
        if(this.count == 1 || this.count == 2){
            this.trail.getChildByTag(YahtLayer.TAG_REROLL).setVisible(true);
            this.trail.getChildByTag(YahtLayer.TAG_ROLL).setVisible(false);
        }
    },
    getCookieForUsername:function (c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    },

    getCookie:function (c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    },

    setCookie:function (c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    },

    checkCookie:function () {
        var highscore = getCookie("highscore");
        if (highscore != null && highscore != "") {
            if (highscore < this.totalTempValue) {
                setCookie("highscore", this.totalTempValue, 365);
            }
            // alert("Welcome again " + highscore);
        }
        else {
            highscore = this.totalTempValue;
            if (highscore != null && highscore != "") {
                setCookie("highscore", highscore, 365);
            }
        }
    },

    //getting the UserData when clicked on label
    descriptionCall:function (sender) {

        alert(sender.getUserData());
    },

    //getting of how many rolls remaining
    rollsLeftLabelUpdate:function () {
        this.rollsStatus = 3;
        this.removeChildByTag(YahtLayer.TAG_ROLLS_LEFT_LABEL);
        this.rollsLeftLabel = cc.LabelTTF.create("Rolls left:" + this.rollsStatus, 'times new roman', 20);
        this.rollsLeftLabel.setPosition(cc.p(730, 500));
        this.addChild(this.rollsLeftLabel, 0, YahtLayer.TAG_ROLLS_LEFT_LABEL);
    },

    //clearing of dice from the layer
    diceRemoval:function () {
        this.removeChildByTag(YahtLayer.TAG_DICE1);
        this.removeChildByTag(YahtLayer.TAG_DICE2);
        this.removeChildByTag(YahtLayer.TAG_DICE3);
        this.removeChildByTag(YahtLayer.TAG_DICE4);
        this.removeChildByTag(YahtLayer.TAG_DICE5);
    },

    //bonus calculation
    bonusCalculation:function () {
        this.bonusSum = 0;
        this.bonusSum = this.aceValue + this.twoValue + this.threeValue + this.fourValue + this.fiveValue + this.sixValue;
        if (this.bonusSum >= 20) {
            this.bonus.removeChildByTag(YahtLayer.TAG_BONUS_VALUE_LABEL);
            this.bonusTempValue = 30;
            this.bonusValueLabel = cc.LabelTTF.create(this.bonusTempValue, 'arial', 25);
            this.bonusValueLabel.setColor(cc.c3b(0, 150, 255));
            this.bonusValueLabel.setPosition(cc.p(YahtLayer.labelValuePositionX, YahtLayer.labelValuePositionY));
            this.bonus.addChild(this.bonusValueLabel, 0, YahtLayer.TAG_BONUS_VALUE_LABEL);

        }


    },

    //calculating the dice values
    diceValueCalculation:function (menuItem, valuelabeltag, menuItemTag, conditionValue) {


        this.items = [this.firstDiceCount, this.secondDiceCount, this.thirdDiceCount, this.fourthDiceCount, this.fifthDiceCount];
        this.value = 0;

        for (i = 0; i < 5; i++) {

            if (this.items[i] == conditionValue) {
                this.value = this.value + this.items[i];
            }
        }
        valuelabel = cc.LabelTTF.create(this.value, 'arial', 25);
        valuelabel.setColor(cc.c3b(255, 150, 0));
        valuelabel.setPosition(cc.p(YahtLayer.labelValuePositionX, YahtLayer.labelValuePositionY));
        menuItem.addChild(valuelabel, 0, valuelabeltag);

        this.menu.getChildByTag(menuItemTag).setEnabled(false);
        this.menu.setEnabled(false);


        this.count = 0;

        this.rollsLeftLabelUpdate();


        this.removeChildByTag(YahtLayer.TAG_DICE1);
        this.removeChildByTag(YahtLayer.TAG_DICE2);
        this.removeChildByTag(YahtLayer.TAG_DICE3);
        this.removeChildByTag(YahtLayer.TAG_DICE4);
        this.removeChildByTag(YahtLayer.TAG_DICE5);
    },

    //label value updation
    labelValueUpdation:function (label, value, menuItem, labelTag, menuItemTag) {
        label = cc.LabelTTF.create(value, 'arial', 25);
        label.setColor(cc.c3b(255, 150, 0));
        label.setPosition(cc.p(YahtLayer.labelValuePositionX, YahtLayer.labelValuePositionY));
        menuItem.addChild(label, 0, labelTag);
        this.menu.getChildByTag(menuItemTag).setEnabled(false);
        this.menu.setEnabled(false);


        this.count = 0;
        this.rollsLeftLabelUpdate();
        this.diceRemoval();
        this.bonusCalculation();
        this.totalCalculation(value, this.bonusTempValue);
        this.fillCheck();

    },
    //total calculation
    totalCalculation:function (diceValue, bonusValue) {

        this.total.removeChildByTag(YahtLayer.TAG_TOTAL_VALUE_LABEL);
        this.totalTempValue = this.totalTempValue + diceValue;
        if (bonusValue) {
            if (!this.flag) {
                this.totalTempValue = this.totalTempValue + bonusValue;
                this.flag = this.flag + 1;
            }
        }
        this.temp = cc.LabelTTF.create(this.totalTempValue, 'arial', 25);
        this.temp.setColor(cc.c3b(255, 0, 0));
        this.temp.setPosition(cc.p(YahtLayer.labelValuePositionX, YahtLayer.labelValuePositionY));
        this.total.addChild(this.temp, 0, YahtLayer.TAG_TOTAL_VALUE_LABEL);

    },
    //ace callback
    aceCall:function () {
        this.aceValue = 0;

        this.diceValueCalculation(this.aces, YahtLayer.TAG_ACE_VALUE_LABEL, YahtLayer.TAG_ACE, 1);

        this.aceValue = this.value;
        this.bonusCalculation();
        this.totalCalculation(this.value, this.bonusTempValue);
        this.fillCheck();
        this.rollrerollCheck();


    },

    //two callback
    twoCall:function () {

        this.twoValue = 0;

        this.diceValueCalculation(this.twos, YahtLayer.TAG_TWO_VALUE_LABEL, YahtLayer.TAG_TWO, 2);
        this.twoValue = this.value;

        this.bonusCalculation();
        this.totalCalculation(this.value, this.bonusTempValue);
        this.fillCheck();
        this.rollrerollCheck();
    },

    //three callback
    threeCall:function () {
        this.threeValue = 0;


        this.diceValueCalculation(this.threes, YahtLayer.TAG_THREE_VALUE_LABEL, YahtLayer.TAG_THREE, 3);
        this.threeValue = this.value;


        this.bonusCalculation();
        this.totalCalculation(this.value, this.bonusTempValue);
        this.fillCheck();
        this.rollrerollCheck();

    },

    //four callback
    fourCall:function () {
        this.fourValue = 0;
        this.diceValueCalculation(this.fours, YahtLayer.TAG_FOUR_VALUE_LABEL, YahtLayer.TAG_FOUR, 4);
        this.fourValue = this.value;
        this.bonusCalculation();
        this.totalCalculation(this.value, this.bonusTempValue);
        this.fillCheck();
        this.rollrerollCheck();
    },

    //five callback
    fiveCall:function () {
        this.fiveValue = 0;
        this.diceValueCalculation(this.fives, YahtLayer.TAG_FIVE_VALUE_LABEL, YahtLayer.TAG_FIVE, 5);
        this.fiveValue = this.value;
        this.bonusCalculation();
        this.totalCalculation(this.value, this.bonusTempValue);
        this.fillCheck();
        this.rollrerollCheck();
    },

    //six callback
    sixCall:function () {
        this.sixValue = 0;
        this.diceValueCalculation(this.sixes, YahtLayer.TAG_SIX_VALUE_LABEL, YahtLayer.TAG_SIX, 6);
        this.sixValue = this.value;
        this.bonusCalculation();
        this.totalCalculation(this.value, this.bonusTempValue);
        this.fillCheck();
        this.rollrerollCheck();
    },
    bonusCall:function () {


    },

    //three of a kind callback
    threeOfKindCall:function () {
        this.items = [this.firstDiceCount, this.secondDiceCount, this.thirdDiceCount, this.fourthDiceCount, this.fifthDiceCount];
        this.threeOfAKindValue = 0;
        outer:
            for (i = 0; i < 5; i++) {
                this.number = 0;
                for (j = 0; j < 5; j++) {

                    if (this.items[i] == this.items[j]) {
                        this.number++;
                        if (this.number == 3) {
                            this.threeOfAKindValue = this.items[0] + this.items[1] + this.items[2] + this.items[3] + this.items[4];

                            break outer;
                        }


                    }
                }
            }

        this.labelValueUpdation(this.threeOfAKindValueLabel, this.threeOfAKindValue, this.threeOfAKind, YahtLayer.TAG_THREE_OF_SAME_KIND_LABEL, YahtLayer.TAG_THREE_OF_SAME_KIND);
        this.rollrerollCheck();

    },

    //four of a kind callback
    fourOfAKindCall:function () {
        this.items = [this.firstDiceCount, this.secondDiceCount, this.thirdDiceCount, this.fourthDiceCount, this.fifthDiceCount];
        this.fourOfAKindValue = 0;
        outer:
            for (i = 0; i < 5; i++) {
                this.number = 0;
                for (j = 0; j < 5; j++) {

                    if (this.items[i] == this.items[j]) {
                        this.number++;
                        if (this.number == 4) {
                            this.fourOfAKindValue = this.items[0] + this.items[1] + this.items[2] + this.items[3] + this.items[4];

                            break outer;
                        }


                    }
                }
            }

        this.labelValueUpdation(this.fourOfAKindValueLabel, this.fourOfAKindValue, this.fourOfAKind, YahtLayer.TAG_FOUR_OF_A_KIND_LABEL, YahtLayer.TAG_FOUR_OF_A_KIND);
        this.rollrerollCheck();

    },

    //full-house call back
    fullHouseCall:function () {
        this.items = [this.firstDiceCount, this.secondDiceCount, this.thirdDiceCount, this.fourthDiceCount, this.fifthDiceCount];

        this.fullHouseValue = 0;
        this.currentValue = 0;
        this.fg1 = 0;
        this.fg2 = 0;
        outer1:
            for (i = 0; i < 5; i++) {
                this.number = 0;
                for (j = 0; j < 5; j++) {

                    if (this.items[i] == this.items[j]) {
                        this.number++;
                        if (this.number == 3) {

                            this.currentValue = this.items[i];
                            this.fg1 = 1;
                            break outer1;
                        }


                    }
                }
            }
        outer2:
            if (this.currentValue) {
                for (i = 0; i < 5; i++) {
                    this.number = 0;
                    for (j = 0; j < 5; j++) {

                        if (this.items[i] == this.items[j] && this.items[i] != this.currentValue) {
                            this.number++;
                            if (this.number == 2) {

                                this.fg2 = 1;
                                break outer2;
                            }


                        }
                    }
                }
            }
        if (this.fg1 && this.fg2) {
            this.fullHouseValue = 25;
        }


        this.labelValueUpdation(this.fullHouseValueLabel, this.fullHouseValue, this.fullHouse, YahtLayer.TAG_FULL_HOUSE_LABEL, YahtLayer.TAG_FULL_HOUSE);
        this.rollrerollCheck();

    },

    //small straight callback
    smallStraightCall:function () {
        this.items = [this.firstDiceCount, this.secondDiceCount, this.thirdDiceCount, this.fourthDiceCount, this.fifthDiceCount];
        this.sortedItems = this.items.sort();

        Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === v) return true;
            }
            return false;
        };

        Array.prototype.unique = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
                if (!arr.contains(this[i])) {
                    arr.push(this[i]);
                }
            }
            return arr;
        }

        this.sortedUniqueItems = this.sortedItems.unique();
        this.smCount = 0;
        this.smallStraightValue = 0;

        loop:
            for (i = 0; i < this.sortedUniqueItems.length - 1; i++) {

                if ((this.sortedUniqueItems[i + 1] - this.sortedUniqueItems[i]) == 1) {

                    this.smCount++;
                    if (this.smCount == 3) {
                        this.smallStraightValue = 30;
                        break loop;
                    }
                }
                else {
                    this.smCount = 0;
                }
            }

        this.labelValueUpdation(this.smallStraightValueLabe, this.smallStraightValue, this.smallStraight, YahtLayer.TAG_SMALL_STRAIGHT_LABEL, YahtLayer.TAG_SMALL_STRAIGHT);
        this.rollrerollCheck();

    },

    //long straight callback
    longStraightCall:function () {

        this.items = [this.firstDiceCount, this.secondDiceCount, this.thirdDiceCount, this.fourthDiceCount, this.fifthDiceCount];
        this.sortedItems = this.items.sort();

        Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == v) return true;
            }
            return false;
        };

        Array.prototype.unique = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
                if (!arr.contains(this[i])) {
                    arr.push(this[i]);
                }
            }
            return arr;
        }

        this.sortedUniqueItems = this.sortedItems.unique();
        this.smCount = 0;
        this.longStraightValue = 0;

        loop:
            for (i = 0; i < this.sortedUniqueItems.length - 1; i++) {

                if ((this.sortedUniqueItems[i + 1] - this.sortedUniqueItems[i]) == 1) {

                    this.smCount++;
                    if (this.smCount == 4) {
                        this.longStraightValue = 40;
                        break loop;
                    }
                }
                else {
                    this.smCount = 0;
                }
            }

        this.labelValueUpdation(this.longStraightValueLabel, this.longStraightValue, this.longStraight, YahtLayer.TAG_LONG_STRAIGHT_LABEL, YahtLayer.TAG_LONG_STRAIGHT);
        this.rollrerollCheck();

    },

    //yahtzee callback
    yahtzeeCall:function () {
        this.yahtzeeCount = 0;
        this.items = [this.firstDiceCount, this.secondDiceCount, this.thirdDiceCount, this.fourthDiceCount, this.fifthDiceCount];
        this.yahtzeeValue = 0;
        outer:
            for (i = 0; i < 5; i++) {
                this.number = 0;
                for (j = 0; j < 5; j++) {

                    if (this.items[i] == this.items[j]) {
                        this.number++;
                        if (this.number == 5) {
                            this.yahtzeeValue = 50;

                            break outer;
                        }


                    }
                }
            }

        this.labelValueUpdation(this.yahtzeeValueLabel, this.yahtzeeValue, this.yahtzee, YahtLayer.TAG_YAHTZEE_LABEL, YahtLayer.TAG_YAHTZEE);


        if (this.yahtzeeValue == 50) {
            this.yahtzeeCount++;
        }
        this.rollrerollCheck();
    },

    //chance callback
    chanceCall:function () {
        this.items = [this.firstDiceCount, this.secondDiceCount, this.thirdDiceCount, this.fourthDiceCount, this.fifthDiceCount];
        this.chanceValue = this.firstDiceCount + this.secondDiceCount + this.thirdDiceCount + this.fourthDiceCount + this.fifthDiceCount;


        this.labelValueUpdation(this.chanceValueLabel, this.chanceValue, this.chance, YahtLayer.TAG_CHANCE_LABEL, YahtLayer.TAG_CHANCE);
        this.rollrerollCheck();

    },
    yahtzeeBonusCall:function () {

    },
    totalCall:function () {

    },

    //trail callback
    trailCall:function () {
        this.menu.setEnabled(true);


        if (this.count == 1 || this.count == 2) {
           // this.diceRemoval();
            this.trail.getChildByTag(YahtLayer.TAG_REROLL).setVisible(true);
            this.trail.getChildByTag(YahtLayer.TAG_ROLL).setVisible(false);

        }
        condi:
        for(i=1;i<=1;i++){
        if (this.count == 0) {
            this.trail.getChildByTag(YahtLayer.TAG_REROLL).setVisible(false);
            this.trail.getChildByTag(YahtLayer.TAG_ROLL).setVisible(true);
            var seq = cc.Sequence.create(
                cc.MoveBy.create(0.1, cc.p(30, 0)),
                cc.MoveBy.create(0.1, cc.p(-30, 0)),
                null);
            var rep = cc.Repeat.create(seq, 1);

            this.trail.runAction(rep);
this.trail.setPosition(cc.p(0,0));
            var seq1 = cc.Sequence.create(

                cc.MoveBy.create(0.2, cc.p(-435, 80)),
                null);
            var rep1 = cc.Repeat.create(seq1, 1);

            var seq2 = cc.Sequence.create(

                cc.MoveBy.create(0.2, cc.p(-365, 80)),
                null);
            var rep2 = cc.Repeat.create(seq2, 1);

            var seq3 = cc.Sequence.create(

                cc.MoveBy.create(0.2, cc.p(-295, 80)),
                null);
            var rep3 = cc.Repeat.create(seq3, 1);


            var seq4 = cc.Sequence.create(

                cc.MoveBy.create(0.2, cc.p(-225, 80)),
                null);
            var rep4 = cc.Repeat.create(seq4, 1);

            var seq5 = cc.Sequence.create(

                cc.MoveBy.create(0.2, cc.p(-155, 80)),
                null);
            var rep5 = cc.Repeat.create(seq5, 1);


            this.diceImage = cc.TextureCache.getInstance().addImage(s_dice);
            var firstRandom = 60 * Math.floor(6 * Math.random());
            this.dice1=YahtDraggable.yahtDraggableWithTexture(this.diceImage,firstRandom);
            this.dice1.setPosition(cc.p(650, 650));
            this.dice1.runAction(rep1);
            this.firstDiceCount = firstRandom / 60 + 1;

            this.addChild(this.dice1, 0, YahtLayer.TAG_DICE1);


            var secondRandom = 60 * Math.floor(6 * Math.random());
            this.dice2=YahtDraggable.yahtDraggableWithTexture(this.diceImage,secondRandom);
            this.dice2.setPosition(cc.p(650, 650));
            this.dice2.runAction(rep2);
            this.secondDiceCount = secondRandom / 60 + 1;
            this.addChild(this.dice2, 0, YahtLayer.TAG_DICE2);


            var thirdRandom = 60 * Math.floor(6 * Math.random());
            this.dice3=YahtDraggable.yahtDraggableWithTexture(this.diceImage,thirdRandom);
            this.dice3.setPosition(cc.p(650, 650));
            this.dice3.runAction(rep3);
            this.thirdDiceCount = thirdRandom / 60 + 1;
            this.addChild(this.dice3, 0, YahtLayer.TAG_DICE3);


            var fourthRandom = 60 * Math.floor(6 * Math.random());
            this.dice4=YahtDraggable.yahtDraggableWithTexture(this.diceImage,fourthRandom);
            this.dice4.setPosition(cc.p(650, 650));
            this.dice4.runAction(rep4);
            this.fourthDiceCount = fourthRandom / 60 + 1;
            this.addChild(this.dice4, 0, YahtLayer.TAG_DICE4);


            var fifthRandom = 60 * Math.floor(6 * Math.random());
            this.dice5=YahtDraggable.yahtDraggableWithTexture(this.diceImage,fifthRandom);
            this.dice5.setPosition(cc.p(650, 650));
            this.dice5.runAction(rep5);
            this.fifthDiceCount = fifthRandom / 60 + 1;
            this.addChild(this.dice5, 0, YahtLayer.TAG_DICE5);

            this.removeChildByTag(YahtLayer.TAG_ROLLS_LEFT_LABEL);
            this.rollsStatus--;
            this.rollsLeftLabel = cc.LabelTTF.create("Rolls left:" + this.rollsStatus, 'times new roman', 20);
            this.rollsLeftLabel.setPosition(cc.p(730, 500));
            this.addChild(this.rollsLeftLabel, 0, YahtLayer.TAG_ROLLS_LEFT_LABEL);

            this.count = this.count + 1;
            break condi;

        }
        if (this.count == 1 || this.count == 2) {
            var seq = cc.Sequence.create(
                cc.MoveBy.create(0.1, cc.p(30, 0)),
                cc.MoveBy.create(0.1, cc.p(-30, 0)),
                null);
            var rep = cc.Repeat.create(seq, 1);

            this.trail.runAction(rep);
            this.trail.setPosition(cc.p(0,0));
            var seq1 = cc.Sequence.create(

                cc.MoveBy.create(0.2, cc.p(20, 0)),
                null);
            var rep1 = cc.Repeat.create(seq1, 1);

            var seq2 = cc.Sequence.create(

                cc.MoveBy.create(0.2, cc.p(20, 0)),
                null);
            var rep2 = cc.Repeat.create(seq2, 1);

            var seq3 = cc.Sequence.create(

                cc.MoveBy.create(0.2, cc.p(20, 0)),
                null);
            var rep3 = cc.Repeat.create(seq3, 1);


            var seq4 = cc.Sequence.create(

                cc.MoveBy.create(0.2, cc.p(20, 0)),
                null);
            var rep4 = cc.Repeat.create(seq4, 1);

            var seq5 = cc.Sequence.create(

                cc.MoveBy.create(1, cc.p(20, 0)),
                null);
            var rep5 = cc.Repeat.create(seq5, 1);


            this.diceImage = cc.TextureCache.getInstance().addImage(s_dice);
            console.log(this.dice1.getPositionX());
            if(650<this.dice1.getPosition().x &&this.dice1.getPosition().x<950 && 500<this.dice1.getPosition().y &&this.dice1.getPosition().y<850){
                this.removeChildByTag(YahtLayer.TAG_DICE1);
            var firstRandom = 60 * Math.floor(6 * Math.random());
            this.dice1=YahtDraggable.yahtDraggableWithTexture(this.diceImage,firstRandom);
            this.dice1.setPosition(cc.p(200, 730));
           // this.dice1.runAction(rep1);
            this.firstDiceCount = firstRandom / 60 + 1;

            this.addChild(this.dice1, 0, YahtLayer.TAG_DICE1);
                this.flag1=1;
            }
            if(700<this.dice2.getPosition().x &&this.dice2.getPosition().x<950 && 550<this.dice2.getPosition().y &&this.dice2.getPosition().y<850){
                this.removeChildByTag(YahtLayer.TAG_DICE2);
            var secondRandom = 60 * Math.floor(6 * Math.random());
            this.dice2=YahtDraggable.yahtDraggableWithTexture(this.diceImage,secondRandom);
            this.dice2.setPosition(cc.p(270, 730));
            //this.dice2.runAction(rep2);
            this.secondDiceCount = secondRandom / 60 + 1;
            this.addChild(this.dice2, 0, YahtLayer.TAG_DICE2);
                this.flag2=1;
            }
            if(700<this.dice3.getPosition().x &&this.dice3.getPosition().x<950 && 550<this.dice3.getPosition().y &&this.dice3.getPosition().y<850){
                this.removeChildByTag(YahtLayer.TAG_DICE3);
            var thirdRandom = 60 * Math.floor(6 * Math.random());
            this.dice3=YahtDraggable.yahtDraggableWithTexture(this.diceImage,thirdRandom);
            this.dice3.setPosition(cc.p(340, 730));
           // this.dice3.runAction(rep3);
            this.thirdDiceCount = thirdRandom / 60 + 1;
            this.addChild(this.dice3, 0, YahtLayer.TAG_DICE3);
                this.flag3=1;
            }
            if(700<this.dice4.getPosition().x &&this.dice4.getPosition().x<950 && 550<this.dice4.getPosition().y &&this.dice4.getPosition().y<850){
                this.removeChildByTag(YahtLayer.TAG_DICE4);
            var fourthRandom = 60 * Math.floor(6 * Math.random());
            this.dice4=YahtDraggable.yahtDraggableWithTexture(this.diceImage,fourthRandom);
            this.dice4.setPosition(cc.p(410, 730));
           // this.dice4.runAction(rep4);
            this.fourthDiceCount = fourthRandom / 60 + 1;
            this.addChild(this.dice4, 0, YahtLayer.TAG_DICE4);
                this.flag4=1;
            }
            if(700<this.dice5.getPosition().x &&this.dice5.getPosition().x<950 && 550<this.dice5.getPosition().y &&this.dice5.getPosition().y<850){
                this.removeChildByTag(YahtLayer.TAG_DICE5);
            var fifthRandom = 60 * Math.floor(6 * Math.random());
            this.dice5=YahtDraggable.yahtDraggableWithTexture(this.diceImage,fifthRandom);
            this.dice5.setPosition(cc.p(480, 730));
            //this.dice5.runAction(rep5);
            this.fifthDiceCount = fifthRandom / 60 + 1;
            this.addChild(this.dice5, 0, YahtLayer.TAG_DICE5);

                this.flag5=1;
            }



            if (this.yahtzeeCount >= 1) {
                this.items = [this.firstDiceCount, this.secondDiceCount, this.thirdDiceCount, this.fourthDiceCount, this.fifthDiceCount];
                outer:
                    for (i = 0; i < 5; i++) {
                        this.number = 0;
                        for (j = 0; j < 5; j++) {

                            if (this.items[i] == this.items[j]) {
                                this.number++;
                                if (this.number == 5) {


                                    break outer;
                                }


                            }
                        }
                    }
                if (this.number == 5) {
                    this.yahtzeeBonus.removeChildByTag(YahtLayer.TAG_YAHTZEE_BONUS_LABEL);
                    this.yahtzeeBonusValue += 100;
                    this.yahtzeeBonusLbl = cc.LabelTTF.create(this.yahtzeeBonusValue, 'arial', 25);
                    this.yahtzeeBonusLbl.setColor(cc.c3b(0, 150, 255));
                    this.yahtzeeBonusLbl.setPosition(cc.p(YahtLayer.labelValuePositionX, YahtLayer.labelValuePositionY));
                    this.yahtzeeBonus.addChild(this.yahtzeeBonusLbl, 0, YahtLayer.TAG_YAHTZEE_BONUS_LABEL);
                    this.totalCalculation(100, this.bonusTempValue);

                }

            }
            if(this.flag1 ||  this.flag2 ||  this.flag3 ||  this.flag4 ||  this.flag5)
            {
                this.count = this.count + 1;
                this.flag1=0;
                this.flag2=0;
                this.flag3=0;
                this.flag4=0;
                this.flag5=0;
                this.removeChildByTag(YahtLayer.TAG_ROLLS_LEFT_LABEL);
                this.rollsStatus--;
                this.rollsLeftLabel = cc.LabelTTF.create("Rolls left:" + this.rollsStatus, 'times new roman', 20);
                this.rollsLeftLabel.setPosition(cc.p(730, 500));
                this.addChild(this.rollsLeftLabel, 0, YahtLayer.TAG_ROLLS_LEFT_LABEL);

            }

            break condi;
        }
        }


        this.rollrerollCheck();

    }

});
YahtLayer.labelValuePositionX = 85;
YahtLayer.labelValuePositionY = 10;
YahtLayer.TAG_ACE_VALUE_LABEL = "aceValueLabel";
YahtLayer.TAG_TWO_VALUE_LABEL = "twoValueLabel";
YahtLayer.TAG_THREE_VALUE_LABEL = "threeValueLabel";
YahtLayer.TAG_FOUR_VALUE_LABEL = "fourValueLabel";
YahtLayer.TAG_FIVE_VALUE_LABEL = "fiveValueLabel";
YahtLayer.TAG_SIX_VALUE_LABEL = "sixValueLabel";
YahtLayer.TAG_THREE_OF_SAME_KIND_LABEL = "threeOfSameKindLabel";
YahtLayer.TAG_FOUR_OF_A_KIND_LABEL = "fourOfAKindLabel";
YahtLayer.TAG_FULL_HOUSE_LABEL = "fullHouseLabel";
YahtLayer.TAG_SMALL_STRAIGHT_LABEL = "smallStraightLabel";
YahtLayer.TAG_LONG_STRAIGHT_LABEL = "longStraightLabel";
YahtLayer.TAG_YAHTZEE_LABEL = "yahtzeeLabel";
YahtLayer.TAG_CHANCE_LABEL = "chanceLabel";
YahtLayer.TAG_YAHTZEE_BONUS_LABEL = "yahtzeeBonusLabel";

YahtLayer.TAG_TOTAL_VALUE_LABEL = "totalValueLabel";
YahtLayer.TAG_BONUS_VALUE_LABEL = "bonusValueLabel";

YahtLayer.TAG_ROLLS_LEFT_LABEL = "rollsLeft";

YahtLayer.TAG_ACE = "ace";
YahtLayer.TAG_TWO = "two";
YahtLayer.TAG_THREE = "three";
YahtLayer.TAG_FOUR = "four";
YahtLayer.TAG_FIVE = "five";
YahtLayer.TAG_SIX = "six";
YahtLayer.TAG_THREE_OF_SAME_KIND = "threeOfSameKind";
YahtLayer.TAG_FOUR_OF_A_KIND = "fourOfAKind";
YahtLayer.TAG_FULL_HOUSE = "fullHouse";
YahtLayer.TAG_SMALL_STRAIGHT = "smallStraight";
YahtLayer.TAG_LONG_STRAIGHT = "longStraight";
YahtLayer.TAG_YAHTZEE = "yahtzee";
YahtLayer.TAG_CHANCE = "chance";
YahtLayer.TAG_YAHTZEE_BONUS = "yahtzeeBonus";
YahtLayer.TAG_DICE1 = "dice1";
YahtLayer.TAG_DICE2 = "dice2";
YahtLayer.TAG_DICE3 = "dice3";
YahtLayer.TAG_DICE4 = "dice4";
YahtLayer.TAG_DICE5 = "dice5";
YahtLayer.TAG_TIME_LABEL = "timeLabel";
YahtLayer.TAG_ROLL="roll";
YahtLayer.TAG_REROLL="reroll";

//ResultLayer creation
var ResultLayer = cc.Layer.extend({

    ctor:function () {

        this.setTouchEnabled(true);


    },
    onEnter:function () {
        this._super();

    }

});

//scene creation
var YahtScene = TestScene.extend({
    ctor:function () {

        var yahtLayer = new YahtLayer();
        var resultLayer = new ResultLayer();

        var layer = cc.LayerMultiplex.create(yahtLayer, resultLayer, null);
        this.addChild(layer, 0);
        cc.Director.getInstance().replaceScene(this);
    }
});
