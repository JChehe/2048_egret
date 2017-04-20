var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        var _this = _super.call(this) || this;
        _this.restartBtn = new RestartBtn(119 * 2, 423 * 2, '再玩一次');
        _this.x = 0;
        _this.y = 0;
        _this.width = Main.stageW;
        _this.height = Main.stageH;
        _this.addMask();
        _this.addChild(_this.restartBtn);
        _this.addText();
        _this.addCry();
        return _this;
    }
    Dialog.prototype.addMask = function () {
        var mask = new egret.Shape();
        mask.graphics.beginFill(0xffffff, .8);
        mask.graphics.drawRect(0, 0, Main.stageW, Main.stageH);
        mask.graphics.endFill();
        this.touchEnabled = true;
        this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopRestartBtnPropagation, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaskTouchTap, this, false);
        this.addChild(mask);
    };
    Dialog.prototype.stopRestartBtnPropagation = function (event) {
        event.stopPropagation();
    };
    Dialog.prototype.onMaskTouchTap = function (event) {
        // 关闭当前 图层
        // console.log()
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    Dialog.prototype.addText = function () {
        var text = new egret.TextField();
        text.text = 'Game Over';
        text.size = 48 * 2;
        text.textColor = Main.FONT_COLOR;
        text.width = Main.stageW;
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.y = 166 * 2;
        text.rotation = -6;
        this.addChild(text);
    };
    Dialog.prototype.addCry = function () {
        var img = new egret.Bitmap();
        img.texture = RES.getRes('cry_png');
        img.width = 101 * 2;
        img.height = 101 * 2;
        img.y = 226 * 2;
        img.x = 138 * 2;
        this.addChild(img);
    };
    return Dialog;
}(egret.DisplayObjectContainer));
__reflect(Dialog.prototype, "Dialog");
//# sourceMappingURL=Dialog.js.map