//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.GAME_BG_COLOR = 0x8DECD3;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        var _this = this;
        if (event.groupName == "preload") {
            var DELAY = 0;
            setTimeout(function () {
                _this.stage.removeChild(_this.loadingView);
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, _this.onResourceLoadComplete, _this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, _this.onResourceLoadError, _this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, _this.onResourceProgress, _this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, _this.onItemLoadError, _this);
                _this.createGameScene();
            }, DELAY);
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        this.init();
    };
    Main.prototype.init = function () {
        Main.stageW = this.stage.stageWidth;
        Main.stageH = this.stage.stageHeight;
        // 按照游戏的层级关系进行添加元素，否则会盖住
        this.setGameBg();
        this.addGameName();
        this.addGameSlogan();
        this.scorePanel = new RoundRect(199 * 2, Main.paddingTop, 'SCORE', 0);
        this.stage.addChild(this.scorePanel);
        this.scorePanel = new RoundRect(269 * 2, Main.paddingTop, 'BEST', 0);
        this.stage.addChild(this.scorePanel);
        this.restartBtn = new RestartBtn(210 * 2, 85 * 2);
        this.stage.addChild(this.restartBtn);
        this.addMainBg();
        this.addHowToPlay();
        this.addCopyRight();
    };
    Main.prototype.setGameBg = function () {
        var rect = new egret.Shape();
        rect.graphics.beginFill(this.GAME_BG_COLOR);
        rect.graphics.drawRect(0, 0, Main.stageW, Main.stageH);
        rect.graphics.endFill();
        this.addChild(rect);
    };
    Main.prototype.addGameName = function () {
        var gameName = new egret.TextField();
        gameName.text = '2048';
        gameName.size = 28 * 2;
        gameName.textColor = Main.FONT_COLOR;
        gameName.fontFamily = Main.FONT_FAMILY;
        gameName.bold = true;
        gameName.height = 40 * 2;
        gameName.verticalAlign = egret.VerticalAlign.BOTTOM;
        gameName.x = Main.paddingLeft;
        gameName.y = Main.paddingTop;
        this.addChild(gameName);
    };
    Main.prototype.addGameSlogan = function () {
        var gameSlogan = new egret.TextField();
        gameSlogan.text = '叠加数字，以最快速度达到2048吧！';
        gameSlogan.size = 12 * 2;
        gameSlogan.width = 132 * 2;
        gameSlogan.textColor = Main.FONT_COLOR;
        gameSlogan.fontFamily = Main.FONT_FAMILY;
        gameSlogan.x = Main.paddingLeft;
        gameSlogan.y = 88 * 2;
        this.addChild(gameSlogan);
    };
    Main.prototype.addMainBg = function () {
        var roundRect = new egret.Shape();
        roundRect.graphics.beginFill(0x92DAF2);
        roundRect.graphics.drawRoundRect(Main.paddingLeft, 150 * 2, 282 * 2, 282 * 2, 8 * 2);
        roundRect.$graphics.endFill();
        this.addChild(roundRect);
    };
    Main.prototype.addHowToPlay = function () {
        var p1 = new egret.TextField();
        var p2 = new egret.TextField();
        p1.text = '玩法：使用方向键/滑动的方式去移动砖块，当两块数值相同的方块发生碰撞，将会合成一块。';
        p2.text = 'PS：方向键可以是↑↓←→ 或 WSAD。';
        p1.x = p2.x = Main.paddingLeft;
        p1.y = 463 * 2;
        p2.y = 507 * 2;
        p1.size = p2.size = 12 * 2;
        p1.lineSpacing = p2.lineSpacing = 5 * 2;
        p1.textColor = p2.textColor = Main.FONT_COLOR;
        p1.width = p2.width = Main.stageW - Main.paddingLeft * 2;
        this.addChild(p1);
        this.addChild(p2);
    };
    Main.prototype.addCopyRight = function () {
        var copyright = new egret.TextField();
        /*copyright.textFlow = new Array<egret.ITextElement>(
            { text: 'Designed & Developed by'},
            { text: 'J.c', style: { href: 'event: text event triggered' }}
        )*/
        copyright.textFlow = new egret.HtmlTextParser().parser("Designed & Developed by <u><a href = 'https://github.com/JChehe'>J.c</a></u>");
        copyright.touchEnabled = true;
        copyright.addEventListener(egret.TextEvent.LINK, function (evt) {
            console.log(evt.text);
            window.open('https://github.com/JChehe');
        }, this);
        copyright.width = Main.stageW;
        copyright.textAlign = egret.HorizontalAlign.CENTER;
        copyright.size = 12 * 2;
        copyright.textColor = Main.FONT_COLOR;
        copyright.y = Main.stageH - 28 * 2;
        this.addChild(copyright);
    };
    return Main;
}(egret.DisplayObjectContainer));
Main.FONT_COLOR = 0x5FB4AE;
Main.FONT_FAMILY = 'PingFang SC';
Main.stageW = 0;
Main.stageH = 0;
Main.paddingTop = 20 * 2;
Main.paddingLeft = 47 * 2;
Main.score = 0;
Main.best = 0;
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map