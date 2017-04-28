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
        _this._two_probability = 0.9;
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
        _this._gridsDisplayContainer = new egret.DisplayObjectContainer();
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
        _this._addGridAmount = 2;
        _this._grids = [];
        Game.instance = _this;
        _this.x = _this._x;
        _this.y = _this._y;
        _this.addMainBg();
        _this.addGridBg();
        document.addEventListener('keyup', Game.onKeyup, false);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGameTouchBegin, _this);
        _this.initGrids();
        /* test data
        this._grids = [
            [4,2,2,0],
            [2,2,4,0],
            [2,0,2,2],
            [2,2,2,2]
        ]	*/
        _this.addGrids();
        _this.addChild(_this._gridsDisplayContainer);
        _this.drawGrids();
        return _this;
        // this.addEventListener(egret.Event.ENTER_FRAME, (evt: egret.Event) => {
        // }, this)
    }
    Game.prototype.restart = function () {
        console.log('game restart');
        Main.isGameOver = false;
        this.initGrids();
        this._gridsDisplayContainer.removeChildren();
        this.addGrids();
        this.drawGrids();
    };
    Game.prototype.initGrids = function () {
        // 初始所有格子为 0，即不显示
        var index = 1;
        for (var i = 0; i < this._row; i++) {
            this._grids[i] = [];
            for (var j = 0; j < this._col; j++) {
                this._grids[i][j] = 0;
            }
        }
    };
    Game.prototype.drawGrid = function (row, col, num) {
        var inOneDimensionalArrIndex = row * this._col + col;
        var left = this.getLeftByIndex(inOneDimensionalArrIndex);
        var top = this.getTopByIndex(inOneDimensionalArrIndex);
        var gridInfo = this.getGridInfoByNum(num);
        var grid = new egret.Sprite;
        grid.name = "grid-" + row + "-" + col;
        grid.x = left;
        grid.y = top;
        grid.graphics.beginFill(gridInfo.backgroundColor, 1);
        grid.graphics.drawRoundRect(0, 0, this._gridWidth, this._gridWidth, this._gridRadius);
        grid.graphics.endFill();
        var content = new egret.TextField();
        content.text = num;
        content.width = this._gridWidth;
        content.height = this._gridHeight;
        content.size = gridInfo.fontSize;
        content.textColor = gridInfo.color;
        content.textAlign = egret.HorizontalAlign.CENTER;
        content.verticalAlign = egret.VerticalAlign.MIDDLE;
        grid.addChild(content);
        this._gridsDisplayContainer.addChild(grid);
    };
    Game.prototype.moveToLeft = function () {
        console.log('left');
        var isMove = false, // include merge and move
        _grids = this._grids, mergeTags = {}, increaseScore = 0;
        for (var r = 0; r < this._row; r++) {
            for (var c = 1; c < this._col; c++) {
                console.log('_grids[' + r + '][' + (c - 1) + ']', _grids[r][c - 1]);
                if (_grids[r][c] === 0)
                    continue;
                if (_grids[r][c - 1] === 0) {
                    _grids[r][c - 1] = _grids[r][c];
                    _grids[r][c] = 0;
                    c = 0;
                    isMove = true;
                }
                else if (_grids[r][c - 1] === _grids[r][c] && !(mergeTags['' + r + (c - 1)] || mergeTags['' + r + c])) {
                    increaseScore = _grids[r][c - 1] *= 2;
                    _grids[r][c] = 0;
                    mergeTags['' + r + (c - 1)] = true;
                    c = 0;
                    isMove = true;
                }
            }
        }
        console.log('mergeTags', mergeTags);
        mergeTags = null;
        this.afterMoving(isMove, increaseScore);
    };
    Game.prototype.moveToRight = function () {
        console.log('right');
        var isMove = false, // include merge and move
        _grids = this._grids, mergeTags = {}, increaseScore = 0;
        for (var r = 0; r < this._row; r++) {
            for (var c = this._col - 2; c >= 0; c--) {
                if (_grids[r][c] === 0)
                    continue;
                // console.log('_grids[' + r + ']['+ (c + 1) +']', _grids[r][c + 1])
                if (_grids[r][c + 1] === 0) {
                    _grids[r][c + 1] = _grids[r][c];
                    _grids[r][c] = 0;
                    c = this._col - 1;
                    isMove = true;
                }
                else if (_grids[r][c + 1] === _grids[r][c] && !(mergeTags['' + r + (c + 1)] || mergeTags['' + r + c])) {
                    increaseScore = _grids[r][c + 1] *= 2;
                    _grids[r][c] = 0;
                    mergeTags['' + r + (c + 1)] = true;
                    c = this._col - 1;
                    isMove = true;
                }
            }
        }
        mergeTags = null;
        this.afterMoving(isMove, increaseScore);
    };
    Game.prototype.moveUp = function () {
        console.log('up');
        var isMove = false, // include merge and move
        _grids = this._grids, mergeTags = {}, increaseScore = 0;
        for (var c = 0; c < this._col; c++) {
            for (var r = 1; r < this._row; r++) {
                // console.log('_grids[' + (r - 1) + ']['+ c +']', _grids[r - 1][c])
                if (_grids[r][c] === 0)
                    continue;
                if (_grids[r - 1][c] === 0) {
                    _grids[r - 1][c] = _grids[r][c];
                    _grids[r][c] = 0;
                    r = 0;
                    isMove = true;
                }
                else if (_grids[r - 1][c] === _grids[r][c] && !(mergeTags['' + (r - 1) + c] || mergeTags['' + r + c])) {
                    increaseScore = _grids[r - 1][c] *= 2;
                    _grids[r][c] = 0;
                    mergeTags['' + (r - 1) + c] = true;
                    r = 0;
                    isMove = true;
                }
            }
        }
        console.log('mergeTags', mergeTags);
        mergeTags = null;
        this.afterMoving(isMove, increaseScore);
    };
    Game.prototype.moveDown = function () {
        console.log('down');
        var isMove = false, // include merge and move
        _grids = this._grids, mergeTags = {}, increaseScore = 0;
        for (var c = 0; c < this._col; c++) {
            for (var r = this._row - 2; r >= 0; r--) {
                // console.log('_grids[' + (r + 1) + ']['+ c +']', _grids[r + 1][c])
                if (_grids[r][c] === 0)
                    continue;
                if (_grids[r + 1][c] === 0) {
                    _grids[r + 1][c] = _grids[r][c];
                    _grids[r][c] = 0;
                    r = this._row - 1;
                    isMove = true;
                }
                else if (_grids[r + 1][c] === _grids[r][c] && !(mergeTags['' + (r + 1) + c] || mergeTags['' + r + c])) {
                    increaseScore = _grids[r + 1][c] *= 2;
                    _grids[r][c] = 0;
                    mergeTags['' + (r + 1) + c] = true;
                    r = this._row - 1;
                    isMove = true;
                }
            }
        }
        console.log('mergeTags', mergeTags);
        mergeTags = null;
        this.afterMoving(isMove, increaseScore);
    };
    Game.prototype.afterMoving = function (isMove, increaseScore) {
        if (increaseScore === void 0) { increaseScore = 0; }
        if (!this.checkGameOver()) {
            if (isMove) {
                this.updateScore(increaseScore);
                this.addGrids();
                console.log('isMove');
                this.drawGrids();
            }
        }
        else {
            this.gameOverHandle();
        }
    };
    Game.prototype.getGridInfoByNum = function (targetNum) {
        var resultItem;
        this._gridInfo.forEach(function (item) {
            if (item.num === targetNum) {
                resultItem = item;
            }
        });
        // 找不到就返回最后一个
        return resultItem || this._gridInfo[this._gridInfo.length - 1];
    };
    Game.prototype.checkGameOver = function () {
        var _grids = this._grids, isGameOver = true;
        for (var i = 0; i < this._row; i++) {
            for (var j = 0; j < this._col; j++) {
                var curGrid = _grids[i][j];
                if (curGrid === 0
                    || (i > 0 && curGrid === _grids[i - 1][j])
                    || (j > 0 && curGrid === _grids[i][j - 1])
                    || (i < this._col - 1 && curGrid === _grids[i + 1][j])
                    || (j > this._row - 1 && curGrid === _grids[i][j + 1])) {
                    isGameOver = false;
                    break;
                }
            }
            if (!isGameOver)
                break;
        }
        return isGameOver;
    };
    Game.prototype.updateScore = function (increment) {
        Main.instance.updateScore(increment);
    };
    Game.prototype.gameOverHandle = function () {
        var _this = this;
        console.log('isGameOver');
        Main.isGameOver = true;
        var gameOverEvent = new GameOverEvent(GameOverEvent.NAME);
        setTimeout(function () {
            _this.stage.dispatchEvent(gameOverEvent);
        }, 400);
    };
    // 根据剩余空格数添加 2个 以下的数字
    Game.prototype.addGrids = function () {
        // 找出所有为0的格子
        var emptyGrids = [];
        for (var i = 0; i < this._row; i++) {
            for (var j = 0; j < this._col; j++) {
                if (this._grids[i][j] === 0) {
                    emptyGrids.push({
                        x: i,
                        y: j
                    });
                }
            }
        }
        // 判断空格还有几个，若 >= 2，则添加两个，否则添加剩余数量的格子
        var needAddGridsAmount = Math.min(this._addGridAmount, emptyGrids.length);
        var finalNeedToAddGridsCoord = [];
        // 随机抽取空格 grid（个数<=2）
        for (var i = 0; i < needAddGridsAmount; i++) {
            var index = this.getRandomInt(0, emptyGrids.length - 1);
            finalNeedToAddGridsCoord.push(emptyGrids[index]);
            emptyGrids.splice(index, 1);
        }
        // 为先前抽取的空格子随机填入 2 或 4
        for (var i = 0; i < finalNeedToAddGridsCoord.length; i++) {
            var x = finalNeedToAddGridsCoord[i].x;
            var y = finalNeedToAddGridsCoord[i].y;
            this._grids[x][y] = this.getNewNumber();
        }
    };
    // 若 gird 不为 0，则绘制
    Game.prototype.drawGrids = function () {
        // 先删全部
        this._gridsDisplayContainer.removeChildren();
        // 绘制非空格子
        for (var i = 0; i < this._row; i++) {
            for (var j = 0; j < this._col; j++) {
                if (this._grids[i][j] !== 0) {
                    this.drawGrid(i, j, this._grids[i][j]);
                }
            }
        }
    };
    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    Game.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Game.prototype.getNewNumber = function () {
        var probability = Math.random();
        return probability < this._two_probability ? 2 : 4;
    };
    Game.prototype.addMainBg = function () {
        var mainBg = new egret.Shape();
        mainBg.graphics.beginFill(this._mainBgColor);
        mainBg.graphics.drawRoundRect(0, 0, this._sideLength, this._sideLength, this._mainBgRadius);
        mainBg.$graphics.endFill();
        this.addChild(mainBg);
    };
    Game.prototype.addGridBg = function () {
        for (var i = 0; i < this._gridAmount; i++) {
            var left = this.getLeftByIndex(i);
            var top_1 = this.getTopByIndex(i);
            var cell = new egret.Shape();
            cell.graphics.beginFill(this._gridBgColor, 0.35);
            cell.graphics.drawRoundRect(left, top_1, this._gridWidth, this._gridHeight, this._gridRadius);
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
        if (Main.isGameOver)
            return;
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
                // left
                this.moveToLeft();
            }
            else {
                // right
                this.moveToRight();
            }
        }
        else {
            if (deltaY < 0) {
                // up
                this.moveUp();
            }
            else {
                // down
                this.moveDown();
            }
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGameTouchMove, this);
    };
    Game.onKeyup = function (event) {
        if (Main.isGameOver)
            return;
        var key = event.key;
        switch (key) {
            case 'a':
            case 'A':
            case 'ArrowLeft':
                // left
                Game.instance.moveToLeft();
                break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                // right
                Game.instance.moveToRight();
                break;
            case 'w':
            case 'W':
            case 'ArrowUp':
                // up
                Game.instance.moveUp();
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                // down
                Game.instance.moveDown();
                break;
        }
    };
    return Game;
}(egret.DisplayObjectContainer));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map