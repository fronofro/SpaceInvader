var enemies = []
var bullets = []
var ebullets = []
var fighter
var switcheroo = false

function setup() {
    createCanvas(800, 600);
    for (var i = 0; i < 14; i++) {
        enemies.push(new Enemy(40 + 50 * i, 40, 40))
    }
    for (var i = 0; i < 14; i++) {
        enemies.push(new Enemy(40 + 50 * i, 100, 40))
    }
    for (var i = 0; i < 14; i++) {
        enemies.push(new Enemy(40 + 50 * i, 160, 40))
    }
    fighter = new Fighter()
}

function draw() {
    background(220);
    //fighter display and movement
    fighter.show()
    fighter.move()

    if (switcheroo == true){
        for (var em = 0; em < enemies.length; em++) {
            enemies[em].changeD()
        }
        switcheroo = false
    }

    for (var e = 0; e < enemies.length; e++) {
        //Check against all other enemies to see if any with the same X have a less y
        enemies[e].bottom = true
        for (var other = 0; other < enemies.length; other++) {
            if (enemies[e].x == enemies[other].x) {
                if (enemies[e].y < enemies[other].y) {
                    enemies[e].bottom = false
                }
            }
        }

        //create random firing from enemies
        var r = floor(random(0, 50 * enemies.length))
        if (r < enemies.length && enemies[r].bottom) {
            var bullet = new Bullet(enemies[r], 1, false, 1.5)
            bullets.push(bullet)
        }

        //show and move enemies
        enemies[e].show()
        enemies[e].move()

        if (enemies[e].x < 20 || enemies[e].x > width - 20) {
            switcheroo = true
        }
    }

    //Bullet movement
    for (var i = bullets.length - 1; i >= 0; i--) {
        bullets[i].show()
        bullets[i].move()

        //Enemy bullets kill fighter
        if (bullets[i].hit(fighter)) {
            if (bullets[i].fbullet == false) {
                fighter.gameover()
            }
        }

        //Remove Bullets that go off screen
        if (bullets[i].y < 0 || bullets[i].y > height) {
            bullets.splice([i], 1)
        }

        //Fighter bullets hitting enemies
        if (bullets.length > 0) {
            for (var j = enemies.length - 1; j >= 0; j--) {
                if (bullets[i].hit(enemies[j])) {
                    if (bullets[i].fbullet == true) {

                        //Remove bullet Remove Enemy
                        bullets.splice([i], 1)
                        enemies.splice([j], 1)

                        //increase speed whn enemy dies
                        for (var es of enemies) {
                            es.speed += 0.5
                        }
                    }
                }
            }
        }
    }
    if (enemies.length == 0 && !fighter.dead &&
        bullets.length == 0) {
        textSize(32)
        text("YOU WIN", width / 3, height / 2)
    }
    if (fighter.dead) {
        textSize(32)
        text("YOU LOSE", width / 3, height / 2)
    }
}

function keyPressed() {
    if (key === ' ' && !fighter.dead) {
        var bullet = new Bullet(fighter, -1, true, 2.5)
        bullets.push(bullet)
    }
}

function BiggerElements(val) {
    return function (evalue, index, array) {
        return (evalue >= val);
    };
}

function SmallerElements(val) {
    return function (evalue, index, array) {
        return (evalue <= val);
    };
}
