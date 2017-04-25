class GameOverEvent extends egret.Event{
	public static NAME:string = '游戏结束'
	public constructor(type: string, bubbles:boolean=false, cancelable: boolean=false) {
		super(type, bubbles, cancelable)
	}
}