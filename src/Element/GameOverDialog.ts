class GameOverDialog extends egret.DisplayObjectContainer{

	private restartBtn: RestartBtn = new RestartBtn(127 * 2, 423 * 2, '再玩一次')
	private maskDisplayObject: egret.Shape
	public constructor() {
		super()
		this.x = 0
		this.y = 0
		this.width = Main.stageW
		this.height = Main.stageH
		this.addMask()
		this.addChild(this.restartBtn)
		this.addText()
		this.addCry()
	}
	public triggerMaskTap():void {
		this.dispatchEventWith(egret.TouchEvent.TOUCH_TAP)
	}
	private addMask():void {
		let mask:egret.Shape = new egret.Shape()
		this.maskDisplayObject = mask
		// mask.name = 'mask'
		mask.graphics.beginFill(0xffffff, .8)
		mask.graphics.drawRect(0, 0, Main.stageW, Main.stageH)
		mask.graphics.endFill()

		this.touchEnabled = true
		// 取消冒泡
		this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopRestartBtnPropagation, this)
		// 事件只能绑定在 显示容器 上
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaskTouchTap, this, false)
		this.addChild(mask)
	}
	private stopRestartBtnPropagation(event: egret.TouchEvent):void {
		event.stopPropagation()
	}
	private onMaskTouchTap(event: egret.TouchEvent): void {
		// 关闭当前 图层
		console.log('mask 被触发啦')
		if(this.parent) {
			this.parent.removeChild(this)
			// removeChild 并不会
			Main.instance.setGameOverDialogNull()
		}
	}

	private addText():void {
		let text: egret.TextField = new egret.TextField()

		text.text = 'Game Over !'
		text.size = 48 * 2
		text.textColor = Main.FONT_COLOR
		text.width = Main.stageW
		text.textAlign = egret.HorizontalAlign.CENTER
		text.y = 166 * 2
		text.rotation = -6

		this.addChild(text)
	}

	private addCry():void {
		let img: egret.Bitmap = new egret.Bitmap()
		img.texture = RES.getRes('cry_png')
		img.width = 101 * 2
		img.height = 101 * 2
		img.y = 226 * 2
		img.x = 138 * 2
		this.addChild(img)

	}

}