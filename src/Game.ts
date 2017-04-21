interface Coord {
	x: number,
	y: number
}

interface GridInfo {
	num: number,
	color: number, 
	backgroundColor: number, 
	fontSize: number
}

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
	private _girds:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
	private _gridInfo: GridInfo[] = [
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

	private _addGridAmount:number = 2
	private grids: number[][] = []
	public constructor() {
		super()
		

		this.x = this._x
		this.y = this._y

		this.addMainBg()
		this.addGridBg()
		
		document.addEventListener('keyup', Game.onKeyup, false)

		this.touchEnabled = true
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameTouchBegin, this)

		this.initGrids()
		this.addGrids()
		this.addChild(this._girds)

		this.addEventListener(egret.Event.ENTER_FRAME, (evt: egret.Event) => {
			for(let i = 0; i < this._row; i++) {
				for(let j = 0; j < this._col; j++) {
					if(this.grids[i][j] !== 0) {
						this.drawGrid(i, j, this.grids[i][j])
					}
				}
			}
		}, this)
	}

	public restart():void {

		this.initGrids()
		this._girds.removeChildren()
		this.addGrids()

	}
	private initGrids():void {
		// 初始所有格子为 0，即不显示
		for(var i = 0; i < this._row; i++) {
			this.grids[i] = []
			for(var j = 0; j < this._col; j++) {
				this.grids[i][j] = 0
			}
		}
	}
 	private drawGrid(row, col, num):void {
		let inOneDimensionalArrIndex: number = row * this._col + col
		let left: number = this.getLeftByIndex(inOneDimensionalArrIndex)
		let top: number  = this.getTopByIndex(inOneDimensionalArrIndex)
		let gridInfo: GridInfo = this.getGridInfoByNum(num)

		let grid:egret.Sprite = new egret.Sprite
		grid.name = `grid-${row}-${col}`

		grid.x = left
		grid.y = top

		grid.graphics.beginFill(gridInfo.backgroundColor, 1)
		grid.graphics.drawRoundRect(0, 0, this._gridWidth, this._gridWidth, this._gridRadius)
		grid.graphics.endFill()

		let content:egret.TextField = new egret.TextField()
		content.text = num
		content.width = this._gridWidth
		content.height = this._gridHeight
		content.size = gridInfo.fontSize
		content.textColor = gridInfo.color
		content.textAlign = egret.HorizontalAlign.CENTER
		content.verticalAlign = egret.VerticalAlign.MIDDLE
		
		grid.addChild(content)
		this._girds.addChild(grid)
	}

	private getGridInfoByNum(targetNum:number): GridInfo {
		let resultItem: GridInfo
		this._gridInfo.forEach((item) => {
			if(item.num === targetNum) {
				resultItem = item
			}
		})

		// 找不到就返回最后一个
		return resultItem || this._gridInfo[this._gridInfo.length - 1]
	}
	private addGrids():void {
		// 找出所有为0的格子
		let emptyGrids: (Coord)[] = []
		for(let i = 0; i < this._row; i++) {
			for(let j = 0; j < this._col; j++) {
				if(this.grids[i][j] === 0) {
					emptyGrids.push({
						x: i,
						y: j
					})
				}
			}
		}

		// 判断空格还有几个，若 >= 2，则添加两个，否则添加剩余数量的格子
		let needAddGridsAmount: number = Math.min(this._addGridAmount, emptyGrids.length)
		let finalNeedToAddGridsCoord: (Coord)[] = []
		
		for(let i = 0; i < needAddGridsAmount; i++) {
			let index = this.getRandomInt(0, emptyGrids.length - 1)
			finalNeedToAddGridsCoord.push(emptyGrids[index])

			emptyGrids.splice(index, 1)
		}

		for(let i = 0; i < finalNeedToAddGridsCoord.length; i++) {
			let x: number = finalNeedToAddGridsCoord[i].x
			let y: number = finalNeedToAddGridsCoord[i].y
			this.grids[x][y] = this.getNewNumber()
		}

	}
	
	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	private getRandomInt(min:number, max:number):number {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	private getNewNumber():number {
		let probability:number = Math.random()
		return probability < 0.8 ? 2 : 4
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
			let left: number = this.getLeftByIndex(i)
			let top: number = this.getTopByIndex(i)

			let cell:egret.Shape = new egret.Shape()
			cell.graphics.beginFill(this._gridBgColor, 0.35)
			cell.graphics.drawRoundRect(left, top, 
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
		let col: number = this.getColByIndex(index)
		return (col + 1) * this._gridSpacing + col * this._gridWidth
	}

	private getTopByIndex(index: number): number {
		let row: number = this.getRowByIndex(index)
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
		let deltaX: number = event.stageX - target.touchX
		let deltaY: number = event.stageY - target.touchY

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
		let key: string = event.key
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