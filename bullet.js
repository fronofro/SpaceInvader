class Bullet {
    constructor(fighter,d,fbullet,speed) {
      this.x = fighter.x
      this.y = fighter.y+fighter.size/2*d
      this.speed = speed
      this.size = 5
      this.d = d
      this.fbullet = fbullet
    }
  
    show() {
      ellipse(this.x, this.y, this.size)
    }
  
    move() {
      this.y += this.speed * this.d
    }
  
    hit(other) {
      return dist(this.x,this.y,other.x,other.y)<
        this.size/2+other.size/2
    }
  }