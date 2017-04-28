// 游戏名字、口号、游戏背景、玩法、版权

class GameOther extends egret.DisplayObjectContainer {
	public constructor() {
		super()
		this.addGameBg()
		this.addGameName()
		this.addGameSlogan()
		this.addHowToPlay()
		this.addCopyRight()
		return this
	}

	private addGameName():void {
        let gameName: egret.TextField = new egret.TextField()
        gameName.text = '2048'
        gameName.size = 28 * 2
        gameName.textColor = Main.FONT_COLOR
        gameName.fontFamily = Main.FONT_FAMILY
        gameName.bold = true
        gameName.height = 40 * 2
        gameName.verticalAlign = egret.VerticalAlign.BOTTOM;
        gameName.x = Main.paddingLeft
        gameName.y = Main.paddingTop

        this.addChild(gameName)
    }

	private addGameBg():void {
        let rect:egret.Shape = new egret.Shape()
        rect.graphics.beginFill(Main.GAME_BG_COLOR)
        rect.graphics.drawRect(0, 0, Main.stageW, Main.stageH)
        rect.graphics.endFill()
        this.addChild(rect)
    }

	private addGameSlogan():void {
        let gameSlogan: egret.TextField = new egret.TextField()
        gameSlogan.text = '叠加数字，以最快速度达到2048吧！'
        gameSlogan.size = 12 * 2
        gameSlogan.width = 132 * 2
        gameSlogan.lineSpacing = 5 * 2
        gameSlogan.textColor = Main.FONT_COLOR
        gameSlogan.fontFamily = Main.FONT_FAMILY
        gameSlogan.x = Main.paddingLeft
        gameSlogan.y = 88 * 2

        this.addChild(gameSlogan)
    }

	private addHowToPlay():void {
        let p1:egret.TextField = new egret.TextField()
        let p2:egret.TextField = new egret.TextField()

        p1.text = '玩法：使用方向键/滑动的方式去移动砖块，当两块数值相同的方块发生碰撞，将会合成一块。'
        p2.text = 'PS：方向键可以是↑↓←→ 或 WSAD。'

        p1.x = p2.x = Main.paddingLeft

        p1.y = 463 * 2
        p2.y = 507 * 2

        p1.size = p2.size = 12 * 2
        p1.lineSpacing = p2.lineSpacing = 5 * 2
        p1.textColor = p2.textColor = Main.FONT_COLOR

        p1.width = p2.width = Main.stageW - Main.paddingLeft * 2

        this.addChild(p1)
        this.addChild(p2)
    }

    private addCopyRight():void {
        let copyright:egret.TextField = new egret.TextField()

        /*copyright.textFlow = new Array<egret.ITextElement>(
            { text: 'Designed & Developed by'},
            { text: 'J.c', style: { href: 'event: text event triggered' }}
        )*/

        copyright.textFlow = new egret.HtmlTextParser().parser("Designed & Developed by <u><a href = 'https://github.com/JChehe'>J.c</a></u>");
        
        copyright.touchEnabled = true
        copyright.addEventListener(egret.TextEvent.LINK, (evt: egret.TextEvent) => {
            console.log(evt.text)
            window.open('https://github.com/JChehe')
        }, this)
        
        copyright.width = Main.stageW
        copyright.textAlign = egret.HorizontalAlign.CENTER
        copyright.size = 12 * 2
        copyright.textColor = Main.FONT_COLOR
        copyright.y = Main.stageH - 28 * 2


        this.addChild(copyright)
    }
}