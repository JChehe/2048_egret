class Game extends egret.DisplayObjectContainer{
	private _x:number = Main.paddingLeft
	private _y:number = 150 * 2
	private _sideLength: number = 282 * 2
	private _gridAmount:number = 16
	private _gridSpacing:number = 10 * 2
	private _gridRadius:number = 6 * 2
	private _mainBgRadius: number = 8 * 2
	private _row:number = 4
	private _col:number = 4
	private _gridBgColor:number = 0xEEE4DA
	private _mainBgColor:number = 0x92DAF2
	private _gridWidth = (this._sideLength - (this._col + 1) * this._gridSpacing) / this._col
	private _gridHeight = (this._sideLength - (this._row + 1) * this._gridSpacing) / this._row
	private _gridInfo = [
        {
            "num": 2,
            "color": 0x776e65,
            "backgroundColor": 0xeee4da,
            "fontSize": 65
        },
        {
            "num": 4,
            "color": 0x776e65,
            "backgroundColor": 0xede0c8,
            "fontSize": 65
        },
        {
            "num": 8,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf2b179,
            "fontSize": 55
        },
        {
            "num": 16,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf59563,
            "fontSize": 55
        },
        {
            "num": 32,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf67c5f,
            "fontSize": 55
        },
        {
            "num": 64,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf65e3b,
            "fontSize": 55
        },
        {
            "num": 128,
            "color": 0xf9f6f2,
            "backgroundColor": 0xedcf72,
            "fontSize": 45
        },
        {
            "num": 256,
            "color": 0xf9f6f2,
            "backgroundColor": 0xedcc61,
            "fontSize": 45
        },
        {
            "num": 512,
            "color": 0xf9f6f2,
            "backgroundColor": 0xedc850,
            "fontSize": 45
        },
        {
            "num": 1024,
            "color": 0xf9f6f2,
            "backgroundColor": 0xabe358,
            "fontSize": 35
        },
        {
            "num": 2048,
            "color": 0xf9f6f2,
            "backgroundColor": 0x4dd9cf,
            "fontSize": 35
        },
        {
            "num": 4096,
            "color": 0xf9f6f2,
            "backgroundColor": 0xa283f9,
            "fontSize": 35
        },
        {
            "num": 8192,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf98383,
            "fontSize": 35
        }
    ]
	
	public constructor() {
		super()

		this.x = this._x
		this.y = this._y

		this.addMainBg()
		this.addGridBg()
		
		document.addEventListener('keyup', Game.onKeyup, false)

		this.touchEnabled = true
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameTouchBegin, this)
	}

	private addMainBg():void {
		let mainBg: egret.Shape = new egret.Shape()

        mainBg.graphics.beginFill(this._mainBgColor)
        mainBg.graphics.drawRoundRect(0, 0, this._sideLength, this._sideLength, this._mainBgRadius)
        mainBg.$graphics.endFill()
		
        this.addChild(mainBg)
	}

	private addGridBg():void {
		for(let i = 0; i < this._gridAmount; i++) {
			let x = this.getLeftByIndex(i)
			let y = this.getTopByIndex(i)

			let cell:egret.Shape = new egret.Shape()
			cell.graphics.beginFill(this._gridBgColor, 0.35)
			cell.graphics.drawRoundRect(x, y, 
										this._gridWidth, this._gridHeight, 
										this._gridRadius)
			cell.graphics.endFill()

			this.addChild(cell)
		}
	}

	private getRowByIndex(index: number): number {
		return Math.floor(index / this._col)
	}

	private getColByIndex(index: number): number {
		return index % this._row
	}

	private getLeftByIndex(index: number): number {
		let col = this.getColByIndex(index)
		return (col + 1) * this._gridSpacing + col * this._gridWidth
	}

	private getTopByIndex(index: number): number {
		let row = this.getRowByIndex(index)
		return (row + 1) * this._gridSpacing + row * this._gridWidth
	}

	private onGameTouchBegin(event: egret.TouchEvent):void {
		let target = event.currentTarget
		target.touchX = event.stageX
		target.touchY = event.stageY
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGameTouchMove, this)
	}
	private onGameTouchMove(event: egret.TouchEvent):void {
		let target = event.currentTarget
		let deltaX = event.stageX - target.touchX
		let deltaY = event.stageY - target.touchY

		if(Math.abs(deltaX - deltaY) <= 40) {
			// 方向不明确
			return
		}

		if(Math.abs(deltaX) > Math.abs(deltaY)) {
			if(deltaX < 0) {
				// left

			} else {
				// right
			}
		} else {
			if(deltaY < 0) {
				// up

			} else {
				// down
			}
		}
		this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGameTouchMove, this)
	}
	private static onKeyup(event):void {
		let key = event.key
		switch(key) {
			case 'a':
			case 'A':
			case 'ArrowLeft': 
				// left
				break;
			case 'd':
			case 'D':
			case 'ArrowRight':
				// right
				break;
			case 'w':
			case 'W':
			case 'ArrowUp':
				// up
				break;
			case 's':
			case 'S':
			case 'ArrowDown':
				// down
				break;
		}
	}
}