class RoundRect{
	public static bg_color = 0xA3D4DC
	public static min_Width = 60 * 2
	public static INIT_WIDTH = 60 * 2
	public static height = 55 * 2
	public static radius = 3 * 2
	public static SCORE_MARGIN_RIGHT = 10
	public static TITLE_SIZE = 12 * 2
	public static TITLE_HEIGHT = 17 * 2
	public static CONTENT_HEIGHT = 36 * 2
	public static CONTENT_SIZE = 25 * 2
	public static CONTENT_COLOR = 0xffffff
	public static TITLE_Y = 6 * 2
	public static CONTENT_Y = 18 * 2


	public static getWidthByContent(content) {
		let len = content.toString().length
		return len > 4 ? 32 * len : RoundRect.INIT_WIDTH
	}
}