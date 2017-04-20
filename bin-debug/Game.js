var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this._x = Main.paddingLeft;
        _this._y = 150 * 2;
        _this._sideLength = 282 * 2;
        _this._gridAmount = 16;
        _this._gridSpacing = 10 * 2;
        _this._gridRadius = 6 * 2;
        _this._mainBgRadius = 8 * 2;
        _this._row = 4;
        _this._col = 4;
        _this._gridBgColor = 0xEEE4DA;
        _this._mainBgColor = 0x92DAF2;
        _this._gridWidth = (_this._sideLength - (_this._col + 1) * _this._gridSpacing) / _this._col;
        _this._gridHeight = (_this._sideLength - (_this._row + 1) * _this._gridSpacing) / _this._row;
        _this._gridInfo = [
            {
                "num": 2,
                "color": 0x776e65,
                "backgroundColor": 0xeee4da,
                "fontSize": 65
            },
            {
                "num": 4,
                "color": 0x776e65,
                "backgroundColor": 0xede0c8,
                "fontSize": 65
            },
            {
                "num": 8,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf2b179,
                "fontSize": 55
            },
            {
                "num": 16,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf59563,
                "fontSize": 55
            },
            {
                "num": 32,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf67c5f,
                "fontSize": 55
            },
            {
                "num": 64,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf65e3b,
                "fontSize": 55
            },
            {
                "num": 128,
                "color": 0xf9f6f2,
                "backgroundColor": 0xedcf72,
                "fontSize": 45
            },
            {
                "num": 256,
                "color": 0xf9f6f2,
                "backgroundColor": 0xedcc61,
                "fontSize": 45
            },
            {
                "num": 512,
                "color": 0xf9f6f2,
                "backgroundColor": 0xedc850,
                "fontSize": 45
            },
            {
                "num": 1024,
                "color": 0xf9f6f2,
                "backgroundColor": 0xabe358,
                "fontSize": 35
            },
            {
                "num": 2048,
                "color": 0xf9f6f2,
                "backgroundColor": 0x4dd9cf,
                "fontSize": 35
            },
            {
                "num": 4096,
                "color": 0xf9f6f2,
                "backgroundColor": 0xa283f9,
                "fontSize": 35
            },
            {
                "num": 8192,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf98383,
                "fontSize": 35
            }
        ];
        _this.x = _this._x;
        _this.y = _this._y;
        _this.addMainBg();
        _this.addGridBg();
        document.addEventListener('keyup', Game.onKeyup, false);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGameTouchBegin, _this);
        return _this;
    }
    Game.prototype.addMainBg = function () {
        var mainBg = new egret.Shape();
        mainBg.graphics.beginFill(this._mainBgColor);
        mainBg.graphics.drawRoundRect(0, 0, this._sideLength, this._sideLength, this._mainBgRadius);
        mainBg.$graphics.endFill();
        this.addChild(mainBg);
    };
    Game.prototype.addGridBg = function () {
        for (var i = 0; i < this._gridAmount; i++) {
            var x = this.getLeftByIndex(i);
            var y = this.getTopByIndex(i);
            var cell = new egret.Shape();
            cell.graphics.beginFill(this._gridBgColor, 0.35);
            cell.graphics.drawRoundRect(x, y, this._gridWidth, this._gridHeight, this._gridRadius);
            cell.graphics.endFill();
            this.addChild(cell);
        }
    };
    Game.prototype.getRowByIndex = function (index) {
        return Math.floor(index / this._col);
    };
    Game.prototype.getColByIndex = function (index) {
        return index % this._row;
    };
    Game.prototype.getLeftByIndex = function (index) {
        var col = this.getColByIndex(index);
        return (col + 1) * this._gridSpacing + col * this._gridWidth;
    };
    Game.prototype.getTopByIndex = function (index) {
        var row = this.getRowByIndex(index);
        return (row + 1) * this._gridSpacing + row * this._gridWidth;
    };
    Game.prototype.onGameTouchBegin = function (event) {
        var target = event.currentTarget;
        target.touchX = event.stageX;
        target.touchY = event.stageY;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGameTouchMove, this);
    };
    Game.prototype.onGameTouchMove = function (event) {
        var target = event.currentTarget;
        var deltaX = event.stageX - target.touchX;
        var deltaY = event.stageY - target.touchY;
        if (Math.abs(deltaX - deltaY) <= 40) {
            // 方向不明确
            return;
        }
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) {
            }
            else {
            }
        }
        else {
            if (deltaY < 0) {
            }
            else {
            }
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGameTouchMove, this);
    };
    Game.onKeyup = function (event) {
        var key = event.key;
        switch (key) {
            case 'a':
            case 'A':
            case 'ArrowLeft':
                // left
                break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                // right
                break;
            case 'w':
            case 'W':
            case 'ArrowUp':
                // up
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                // down
                break;
        }
    };
    return Game;
}(egret.DisplayObjectContainer));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map