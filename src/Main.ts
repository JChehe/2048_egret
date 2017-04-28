//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    public static instance: Main
    private loadingView: LoadingUI
    private scorePanel: Score
    private bestPanel: Best
    private restartBtn: RestartBtn
    private gameOverDialog: GameOverDialog
    private gameOther: GameOther
    private game: Game

    static readonly GAME_BG_COLOR:number = 0x8DECD3
    static readonly FONT_COLOR:number = 0x5FB4AE
    static readonly FONT_FAMILY:string = 'PingFang SC'
    static readonly paddingTop:number = 20 * 2
    static readonly paddingLeft:number = 47 * 2

    static stageW:number = 0
    static stageH:number = 0

    static score:number = 0
    static best: number = 0

    static isGameOver = false

    public constructor() {
        super();

        Main.instance = this
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            const DELAY:number = 0
            setTimeout(() => {
                this.stage.removeChild(this.loadingView);
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                this.createGameScene();
            }, DELAY)
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {

        Main.stageW = this.stage.stageWidth
        Main.stageH = this.stage.stageHeight


        this.gameOther = new GameOther()
        this.stage.addChild(this.gameOther)

        this.scorePanel = new Score(199 * 2, Main.paddingTop, 'SCORE', 0);
        this.stage.addChild(this.scorePanel);

        let best = JSON.parse(egret.localStorage.getItem('best'))
        if(best === undefined || best === null) best = 0
        this.bestPanel = new Best(269 * 2, Main.paddingTop, 'BEST', best);
        this.stage.addChild(this.bestPanel);

        this.restartBtn = new RestartBtn(210 * 2, 85 * 2)
        this.stage.addChild(this.restartBtn)
     
        this.game = new Game()
        this.stage.addChild(this.game)

        this.stage.addEventListener(GameOverEvent.NAME, this.gameOverHandle, this)
        if(Main.isGameOver) {
            this.gameOverDialog = new GameOverDialog()
            this.stage.addChild(this.gameOverDialog)
        }
    }

    public restart():void {
        this.scorePanel.restart()
        this.game.restart()
        if(this.gameOverDialog)
            this.gameOverDialog.triggerMaskTap()
        console.log('触发game restart')
    }

    private gameOverHandle():void {
        console.log('Game Over Event')
        if(!this.gameOverDialog) {
            this.gameOverDialog = new GameOverDialog()
            this.stage.addChild(this.gameOverDialog)
        }
    }
    public setGameOverDialogNull():void {
        this.gameOverDialog = null
    }

    public updateScore(increment:number):void {
        Main.score += increment

        if(Main.score > this.bestPanel.getContent()) {
            this.bestPanel.setContent(Main.score)
            egret.localStorage.setItem('best', Main.score.toString())
        }
        this.scorePanel.setContent(Main.score)
    }
}


