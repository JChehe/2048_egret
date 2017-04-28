var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Best = (function (_super) {
    __extends(Best, _super);
    function Best(_x, _y, _title, _content) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        var _this = _super.call(this) || this;
        _this._x = _x;
        _this._y = _y;
        _this._title = _title;
        _this._content = _content;
        _this.INIT_WIDTH = RoundRect.INIT_WIDTH;
        _this._bg_color = RoundRect.bg_color;
        _this._min_Width = RoundRect.min_Width;
        _this._height = RoundRect.height;
        _this._radius = RoundRect.radius;
        _this.x = _this._x;
        _this.y = _this._y;
        _this.setContent();
        return _this;
    }
    Best.prototype.addBg = function () {
        var bg = new egret.Shape();
        bg.name = 'bg';
        bg.graphics.beginFill(this._bg_color);
        bg.graphics.drawRoundRect(0, 0, this._min_Width, this._height, this._radius);
        bg.graphics.endFill();
        this.addChildAt(bg, 0);
    };
    Best.prototype.addTitle = function () {
        var title = new egret.TextField();
        title.name = 'title';
        title.text = this._title;
        title.width = this._min_Width;
        title.textColor = Main.FONT_COLOR;
        title.size = RoundRect.TITLE_SIZE;
        title.height = RoundRect.TITLE_HEIGHT;
        title.y = RoundRect.TITLE_Y;
        title.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(title);
    };
    Best.prototype.addContent = function () {
        var content = new egret.TextField();
        content.name = 'content';
        content.text = this._content.toString();
        content.width = this._min_Width;
        content.size = RoundRect.CONTENT_SIZE;
        content.textColor = RoundRect.CONTENT_COLOR;
        content.height = RoundRect.CONTENT_HEIGHT;
        content.y = RoundRect.CONTENT_Y;
        content.textAlign = egret.HorizontalAlign.CENTER;
        content.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(content);
    };
    Best.prototype.calcPosX = function () {
        return (Main.stageW
            - Best.BEST_WIDTH
            - Main.paddingLeft);
    };
    Best.prototype.setContent = function (content) {
        this.removeChildren();
        this._content = content || this._content;
        this._min_Width = Best.BEST_WIDTH = RoundRect.getWidthByContent(this._content);
        this.x = this._x = this.calcPosX();
        this.addContent();
        this.addTitle();
        this.addBg();
    };
    Best.prototype.getContent = function () {
        return this._content;
    };
    return Best;
}(egret.DisplayObjectContainer));
Best.INIT_BEST = egret.localStorage.getItem('best');
Best.BEST_WIDTH = RoundRect.getWidthByContent(Best.INIT_BEST);
__reflect(Best.prototype, "Best");
//# sourceMappingURL=Best.js.map