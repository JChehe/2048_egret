var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoundRect = (function (_super) {
    __extends(RoundRect, _super);
    function RoundRect(_x, _y, _title, _content) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        var _this = _super.call(this) || this;
        _this._x = _x;
        _this._y = _y;
        _this._title = _title;
        _this._content = _content;
        _this._bg_color = 0xA3D4DC;
        _this._min_Width = 60 * 2;
        _this._height = 55 * 2;
        _this._radius = 3 * 2;
        _this.init();
        return _this;
    }
    RoundRect.prototype.init = function () {
        this.x = this._x;
        this.y = this._y;
        this.addBg();
        this.addTitle();
        this.addContent();
    };
    RoundRect.prototype.addBg = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(this._bg_color);
        bg.graphics.drawRoundRect(0, 0, this._min_Width, this._height, this._radius);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    RoundRect.prototype.addTitle = function () {
        var title = new egret.TextField();
        title.text = this._title;
        title.size = 12 * 2;
        title.textColor = Main.FONT_COLOR;
        title.width = this._min_Width;
        title.height = 17 * 2;
        title.y = 6 * 2;
        title.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(title);
    };
    RoundRect.prototype.addContent = function () {
        var content = new egret.TextField();
        content.name = 'content';
        content.text = this._content.toString();
        content.size = 25 * 2;
        content.textColor = 0xffffff;
        content.width = Math.max(content.measuredWidth, this._min_Width);
        content.height = 36 * 2;
        content.y = 18 * 2;
        content.textAlign = egret.HorizontalAlign.CENTER;
        content.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(content);
    };
    RoundRect.prototype.restart = function () {
        console.log('被触发啦');
        this._content = 0;
        this.removeChild(this.getChildByName('content'));
        this.addContent();
    };
    return RoundRect;
}(egret.DisplayObjectContainer));
__reflect(RoundRect.prototype, "RoundRect");
//# sourceMappingURL=RoundRect.js.map