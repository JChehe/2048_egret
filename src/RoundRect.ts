class RoundRect extends egret.DisplayObjectContainer{
	private _bg_color = 0xA3D4DC
	private _min_Width = 60 * 2
	private _height = 55 * 2
	private _radius = 3 * 2

	public constructor(
		private _x: number = 0, 
		private _y: number = 0, 
		private _title:string, 
		private _content: number | string) 
	{
		super()
		this.init()

		return this
	}

	private init() {

		this.x = this._x
		this.y = this._y
		this.addBg()
		this.addTitle()
		this.addContent()
	}

	private addBg():void {
		let bg: egret.Shape = new egret.Shape()

		bg.graphics.beginFill(this._bg_color)
		bg.graphics.drawRoundRect(0, 0, this._min_Width, this._height, this._radius)
		bg.graphics.endFill()

		this.addChild(bg)
	}

	private addTitle():void {
		let title: egret.TextField = new egret.TextField()
		title.text = this._title
		title.size = 12 * 2
		title.textColor = Main.FONT_COLOR
		title.width = this._min_Width
		title.height = 17 * 2
		title.y = 4 * 2
		title.textAlign = egret.HorizontalAlign.CENTER
		
		this.addChild(title)
	}

	private addContent():void {
		let content: egret.TextField = new egret.TextField()
		content.text = this._content.toString()
		content.size = 25 * 2
		content.textColor = 0xffffff
		content.width = Math.max(content.measuredWidth, this._min_Width)
		content.height = 36 * 2
		content.y = 18 * 2
		content.textAlign = egret.HorizontalAlign.CENTER
		content.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.addChild(content)
	}

}