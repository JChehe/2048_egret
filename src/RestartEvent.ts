class RestartEvent extends egret.Event{
	public static NAME:string = '重新开始'
	public constructor(type: string, bubbles:boolean=false, cancelable: boolean=false) {
		super(type, bubbles, cancelable)
	}
}