

//子弹
class Bullet extends Base{
	
	//属性
	constructor(){
		super();
		this.ele = null;
	}
	
	//方法
	init(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		
		//将当前添加的子弹对象加入到数组gameEngine.allBullets中
		gameEngine.allBullets.push(this);
		//console.log(gameEngine.allBullets);
		
		this.ele.className = "bullet";
		this.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2 +1 + "px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
		
		return this;
	}
	
	//移动
	move(){
		
		let that = this;
		this.timer = setInterval(()=>{
			
			if (that.ele.offsetTop < -18) {
				clearInterval(this.timer);
				gameEngine.ele.removeChild(this.ele);
				
				//将当前子弹从数组gameEngine.allBullets中移除
				let index = gameEngine.allBullets.indexOf(that);
				gameEngine.allBullets.splice(index, 1);
				
				return;
			}
			that.ele.style.top = that.ele.offsetTop - 14 + "px";
			
		}, 30);
		
	}
	
	//爆炸
	boom(){
		//停止移动
		clearInterval(this.timer);
		
		this.ele.className = "bullet-die";
		
		//解构赋值
		//let [a,b] = [1,2];
		
		//var obj = {c:1,d:2}
		//let {c,d} = obj;
		//let c=obj.c, d=obj.d;
		
		//动画
		const dieImgs = ["images2/die1.png", "images2/die2.png"];

		let that = this;
		let i = 0;
		
		//let that=this, i=0;
		//let [that, i] = [this, 0];
		
		let dieTimer = setInterval(()=>{
			if (i >= 1){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(that.ele);
			}
			else {
				//that.ele.style.backgroundImage = "url(" + dieImgs[++i] + ")";
				that.ele.style.backgroundImage = `url(${dieImgs[++i]})`; //模板字符串
			}
		}, 200);
		
	}
	
}











