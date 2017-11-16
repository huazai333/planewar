

//游戏引擎
//游戏加载
//创建我的飞机
//创建敌机
//控制碰撞检测
//监听键盘
var gameEngine = {
	
	//属性
	ele: null,
	
	allBullets: [], //页面上显示的所有子弹
	allEnemys: [], //页面上显示的所有敌机
	
	totalScore: 0, //总分数
	
	//方法
	//init
	init: function(){
		this.ele = document.getElementById("main");
		return this;
	},
	
	//游戏开始
	start: function(){
		console.log("游戏开始");

		this.loading(function(){
			console.log("游戏加载完毕！");
			console.log("进入游戏主界面");
			
			//创建我的飞机
			myPlane.init().move();
			myPlane.fire(); //发射子弹
			
			//监听键盘
			gameEngine.listenKeybord();
			
			//创建敌机
			gameEngine.createEnemy();
			
			//碰撞检测
			gameEngine.crash();
			
			//移动背景图
			gameEngine.moveBackground();
		});
		
		
	},
	
	//加载游戏
	loading: function(callback){
		
		//logo
		var logo = document.createElement("div");
		gameEngine.ele.appendChild(logo);
		logo.className = "logo";
		
		//load
		var load = document.createElement("div");
		gameEngine.ele.appendChild(load);
		load.className = "load";
		
		//动画
		var imgs = ["images2/loading1.png", "images2/loading2.png", "images2/loading3.png"];
		var i = 0;
		var timer = setInterval(function(){
			if (i >= 5){
				clearInterval(timer);
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				
				//回调
				if (callback) callback();
				
			}
			else {
				load.style.backgroundImage = "url("+ imgs[++i%3] +")";
			}
		}, 500);
	
	},
	
	//监听键盘
	listenKeybord: function(){
		
		var xspeed = 0;
		var yspeed = 0;
		
		window.onkeydown = function(e){
			e = e || event;
			
			if (e.keyCode == 37) { //左
				xspeed = -10;
			}
			else if (e.keyCode == 39) { //右
				xspeed = 10;
			}
			else if (e.keyCode == 38) { //上
				yspeed = -10;
			}
			else if (e.keyCode == 40) { //下
				yspeed = 10;
			}
		}
		window.onkeyup = function(e){
			e = e || event;
			
			if (e.keyCode == 37 || e.keyCode == 39 ) { //左右
				xspeed = 0;
			}
			else if (e.keyCode == 38 || e.keyCode == 40) { //上下
				yspeed = 0;
			}
		}
		
		setInterval(function(){
			var x = myPlane.ele.offsetLeft + xspeed;
			if (x < 0) x = 0;
			if (x > gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth) {
				x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
			}
			
			myPlane.ele.style.left = x + "px";
			myPlane.ele.style.top = myPlane.ele.offsetTop + yspeed + "px";
		}, 30);	
		
	},
	
	//创建敌机
	createEnemy: function(){
		
		//创建大型飞机
		setInterval(function(){
			var flag = Math.random()>0.6 ? true : false;
			if (flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Large);
				enemy.init().move();
			}
		}, 6000);
		
		
		//创建中型飞机
		setInterval(function(){
			var flag = Math.random()>0.5 ? true : false;
			if (flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Middle);
				enemy.init().move();
			}
		}, 2000);
		
		//创建小型飞机
		setInterval(function(){
			var flag = Math.random()>0.3 ? true : false;
			if (flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Small);
				enemy.init().move();
			}
		}, 1000);
	},
	
	//碰撞检测
	crash: function(){
		
		var timer = setInterval(function(){
			
			for (var i=0; i<gameEngine.allEnemys.length; i++) { //遍历所有敌机
				
				for (var j=0; j<gameEngine.allBullets.length; j++) { //遍历所有子弹
					
					if ( isCrash(gameEngine.allEnemys[i].ele, gameEngine.allBullets[j].ele) ) {
						//console.log("碰撞了");
						
						//让子弹爆炸并消失
						gameEngine.allBullets[j].boom();
						gameEngine.allBullets.splice(j, 1);
						
						//让敌机受到一点伤害
						gameEngine.allEnemys[i].hurt();
					}
					
				}
				
				//判断敌机和我的飞机是否发生碰撞
				if ( isCrash(gameEngine.allEnemys[i].ele, myPlane.ele) ){
					//console.log("Game Over!");
					
					clearInterval(timer);
					
					//我的飞机发生爆炸
					myPlane.boom(function(){
						
						
						//
						var myName = prompt("请留下您的大名， 您当前的分数是:"+gameEngine.totalScore + "");

						ajax({
							type: "post",
							url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
							data: {name: myName, score: gameEngine.totalScore},
							
							success: function(data){
								console.log("提交成功: " + data);
								//进入排行榜
								location.href = "03_rand.html";
							}
						})
						
						
						
					});
					
					break;
				}
				
			}
			
		}, 30);
		
	},
	
	//移动背景图
	moveBackground: function(){
		var y = 0;
		setInterval(function(){
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
		}, 30);
		
	}
}








