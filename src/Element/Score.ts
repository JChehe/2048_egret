class Score extends egret.DisplayObjectContainer{
	private INIT_WIDTH = RoundRect.INIT_WIDTH

	private _bg_color = RoundRect.bg_color
	private _min_Width = RoundRect.min_Width
	private _height = RoundRect.height
	private _radius = RoundRect.radius

	public constructor(
		private _x: number = 0, 
		private _y: number = 0, 
		private _title:string, 
		protected _content: number | string) 
	{
		super()

		this.x = this._x
		this.y = this._y

		this.setContent()

		return this
	}

	private addBg():void {
		let bg: egret.Shape = new egret.Shape()
		bg.name = 'bg'
		bg.graphics.beginFill(this._bg_color)
		bg.graphics.drawRoundRect(0, 0, this._min_Width, this._height, this._radius)
		bg.graphics.endFill()

		this.addChildAt(bg, 0)
	}

	private addTitle():void {
		let title: egret.TextField = new egret.TextField()
		title.name = 'title'
		title.text = this._title
		title.width = this._min_Width

		title.textColor = Main.FONT_COLOR
		title.size = RoundRect.TITLE_SIZE
		title.height = RoundRect.TITLE_HEIGHT
		title.y = RoundRect.TITLE_Y

		title.textAlign = egret.HorizontalAlign.CENTER
		
		this.addChild(title)
	}



	private addContent():void {
		let content: egret.TextField = new egret.TextField()
		content.name = 'content'
		content.text = this._content.toString()
		content.width = this._min_Width

		content.size = RoundRect.CONTENT_SIZE
		content.textColor = RoundRect.CONTENT_COLOR
		content.height = RoundRect.CONTENT_HEIGHT
		content.y = RoundRect.CONTENT_Y

		content.textAlign = egret.HorizontalAlign.CENTER
		content.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.addChild(content)
	}

	private calcPosX(): number {
		return (Main.stageW - this._min_Width
			 - Best.BEST_WIDTH 
			 - RoundRect.SCORE_MARGIN_RIGHT
			 - Main.paddingLeft)
	}

	public setContent(content?:number):void {
		this.removeChildren()

		this._content = content || this._content
		this._min_Width = RoundRect.getWidthByContent(this._content)
		this.x = this._x = this.calcPosX()

		this.addContent()
		this.addTitle()
		this.addBg()
	}

	public restart():void {
		this._content = Main.score = 0
		this.setContent(this._content)
	}
}