class Fighter {
	constructor(){
  	this.x = width/2
    this.y = height -20
    this.size = 20
    this.dead = false
  }
	show(){
  	ellipse(this.x,this.y,this.size)
  }
  move(){
  	if(keyIsDown(RIGHT_ARROW)&&this.x<width-this.size/2){
    	this.x+=5
    }
    if(keyIsDown(LEFT_ARROW)&&this.x>0+this.size/2){
    	this.x-=5
    }
  }
  gameover(){
  	this.size=0
    this.dead = true
  }
}