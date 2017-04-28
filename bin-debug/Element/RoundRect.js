var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoundRect = (function () {
    function RoundRect() {
    }
    RoundRect.getWidthByContent = function (content) {
        var len = content.toString().length;
        return len > 4 ? 32 * len : RoundRect.INIT_WIDTH;
    };
    return RoundRect;
}());
RoundRect.bg_color = 0xA3D4DC;
RoundRect.min_Width = 60 * 2;
RoundRect.INIT_WIDTH = 60 * 2;
RoundRect.height = 55 * 2;
RoundRect.radius = 3 * 2;
RoundRect.SCORE_MARGIN_RIGHT = 10;
RoundRect.TITLE_SIZE = 12 * 2;
RoundRect.TITLE_HEIGHT = 17 * 2;
RoundRect.CONTENT_HEIGHT = 36 * 2;
RoundRect.CONTENT_SIZE = 25 * 2;
RoundRect.CONTENT_COLOR = 0xffffff;
RoundRect.TITLE_Y = 6 * 2;
RoundRect.CONTENT_Y = 18 * 2;
__reflect(RoundRect.prototype, "RoundRect");
//# sourceMappingURL=RoundRect.js.map