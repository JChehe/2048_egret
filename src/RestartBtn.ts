class RestartBtn extends egret.DisplayObjectContainer{
	private BG_COLOR = 0xA3D4DC
	private FONT_COLOR = 0xffffff
	private _width = 119 * 2
	private _height = 40 * 2
	private _radius = 3 * 2
	public constructor(private _x: number, private _y: number, private text:string = 'New Game') {
		super()
		
		this.x = this._x
		this.y = this._y
		
		this.addBg()
		this.addText()

		this.touchEnabled = true
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this, false)
		this.addEventListener(RestartEvent.NAME, this.restartHandle, this)
		return this
	}
	private restartHandle() {
        Main.instance.restart()
        console.log('触发game restart')
    }

	private addBg():void {
		let bg:egret.Shape = new egret.Shape()

		bg.graphics.beginFill(this.BG_COLOR)
		bg.graphics.drawRoundRect(0, 0, this._width, this._height, this._radius)
		bg.graphics.endFill()

		this.addChild(bg)
	}

	private addText():void {
		let btn:egret.TextField = new egret.TextField()
		btn.text = this.text
		btn.size = 15 * 2
		btn.textColor = this.FONT_COLOR
		btn.width = this._width
		btn.height = this._height

		btn.textAlign = egret.HorizontalAlign.CENTER
		btn.verticalAlign = egret.VerticalAlign.MIDDLE

		this.addChild(btn)
	}

	private onTouchTap():void {
		// alert('重新开始游戏')
		console.log(this)
		let restartEvent: RestartEvent = new RestartEvent(RestartEvent.NAME)
		this.dispatchEvent(restartEvent)
	}
}