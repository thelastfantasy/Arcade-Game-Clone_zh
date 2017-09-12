// 这是我们的玩家要躲避的敌人 
var Enemy = function (row, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    this.x = -100;
    this.y = (row - 1) * 80 + 60;
    this.speed = speed;

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的

    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -100
    };
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
    this.x = 200;
    this.y = 380;
    this.score = 0;

    var Chars = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
    this.sprite = Chars[Math.floor(Math.random() * 5)];
};

Player.prototype.update = function () {
    this.x = 200;
    this.y = 380;
    this.score = this.score + 10;
    
    allEnemies = [];
    makeEnemies();
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    if (key === 'left') {
        if (this.x > 0) {
            this.x = this.x - 100;
            console.log('left');
        }
    } else if (key === 'right') {
        if (this.x < 400) {
            this.x = this.x + 100;
            console.log('right');
        }
    } else if (key === 'up') {
        if (this.y > 0) {
            this.y = this.y - 80;
            console.log('up');
            console.log(this.y);
        }
    } else if (key === 'down') {
        if (this.y < 380) {
            this.y = this.y + 80;
            console.log('down');
        }
    }
};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 380;
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function makeEnemies () {
    for (var i = 0; i < 6; i++) {
        var row = getRandomNumber(1, 4);
        var speed = getRandomNumber(10, 31) * 10;
        allEnemies[i] = new Enemy(row, speed);
    }
}

var allEnemies = [];
makeEnemies();

var player = new Player();


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});