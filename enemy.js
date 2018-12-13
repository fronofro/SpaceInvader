class Enemy {
    constructor(x, y, s) {
        this.x = x
        this.y = y
        this.size = s
        this.d = 1
        this.speed = 0.5
        this.bottom = true
    }

    show() {
        ellipse(this.x, this.y, this.size)
    }
    move() {
        this.x += this.speed * this.d
    }
    changeD() {
        this.d = -this.d
        //this.y += 3
    }
}