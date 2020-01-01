function Position(x, y) {
    this.x = x;
    this.y = y;
}

Position.prototype = {
    toIndex: function(mapWidth) {
        return this.x + this.y * mapWidth;
    }
}

function MovingObject(position, icon) {
    this.position = position;
    this.icon = icon;
}

function Game(mapWidth, mapHeight, robot) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.robot = robot;
    this.history = [];

    this.init = function() {
        this.robot.position.y = 0;
    };
    
    this.onCommandUp = function() {
        this.history.push(this.robot.position);
        var targetPosition = new Position(this.robot.position.x, this.robot.position.y - 1);
        this.move(targetPosition);
    };

    this.onCommandRight = function() {
        this.history.push(this.robot.position);
        var targetPosition = new Position(this.robot.position.x + 1, this.robot.position.y);
        this.move(targetPosition);
    };

    this.onCommandDown = function() {
        this.history.push(this.robot.position);
        var targetPosition = new Position(this.robot.position.x, this.robot.position.y+1);
        this.move(targetPosition);
    };

    this.onCommandLeft = function() {
        this.history.push(this.robot.position);
        var targetPosition = new Position(this.robot.position.x-1, this.robot.position.y);
        this.move(targetPosition);
    };

    this.onCommandReset = function() {
        this.history.splice(0,this.history.length);
        this.robot.position.x = 0;
        this.robot.position.y = 0;
        this.render();
    }

    
    
    

    this.onCommandBack = function() {
        this.move(this.history.pop());
    };
    
    this.availablePosition = function(newPosition) {
        if (newPosition.x >= 0 && newPosition.x < this.mapWidth
            && newPosition.y >= 0 && newPosition.y < this.mapHeight
        ) {
            return true;
        } else {
            return false;
        }
    };

    this.move = function(newPosition) {
        if (this.availablePosition(newPosition)) {
            this.robot.position = newPosition;
            // this.state = Object.assign({}, this.state, {robotPosition: newPosition});
            this.render();
            return true;
        } else {
            return false;
        }
    };

    this.render = function() {
        var mapCells = document.querySelectorAll('.map-cell');
        var robotIndex = this.robot.position.toIndex(this.mapWidth);
        mapCells.forEach((aCell, i) => {
            if (i === robotIndex) {
                if((robot.position.x === 11 && robot.position.y === 8)||
                (robot.position.x === 11 && robot.position.y === 6)                
                ){
                    message.innerHTML = "猜猜这是什么日子";
                    aCell.innerHTML = "❤";
                }else if(robot.position.x === 2 && robot.position.y === 1){
                    aCell.innerHTML = "☯";
                    message.innerHTML = "忽然想看你打太极";
                }
                else if(robot.position.x === 0 && robot.position.y === 5){
                    aCell.innerHTML = "囍";
                    message.innerHTML = "想跟你一起贴红双喜";
                }
                else if(robot.position.x === 3 && robot.position.y === 5){
                    aCell.innerHTML = "✈";
                    message.innerHTML = "要陪你过圣诞节";
                }
                else if(robot.position.x === 7 && robot.position.y === 2){
                    aCell.innerHTML = "✈";
                    message.innerHTML = "要参加你的毕业典礼";
                }
                else if(robot.position.x === 4 && robot.position.y === 9){
                    aCell.innerHTML = "✈";
                    message.innerHTML = "要陪你过一个生日";
                }
                else if(robot.position.x === 2 && robot.position.y === 7){
                    aCell.innerHTML = "✈";
                    message.innerHTML = "要和你一起逛街";
                }
                else if(robot.position.x === 5 && robot.position.y === 2){
                    aCell.innerHTML = "✈";
                    message.innerHTML = "要和你一起逛超市";
                }else if(robot.position.x === 2 && robot.position.y === 2){
                    aCell.innerHTML = "☀";
                    message.innerHTML = "天气好热也好想你";
                }
                else if(robot.position.x === 5 && robot.position.y === 10){
                    aCell.innerHTML = "❄";
                    message.innerHTML = "天气冷也好想你";
                }
                else if(robot.position.x === 6 && robot.position.y === 11){
                    aCell.innerHTML = "☹";
                    message.innerHTML = "不开心的时候也想你";
                }
                else if(robot.position.x === 9 && robot.position.y === 3){
                    aCell.innerHTML = "❤";
                    message.innerHTML = "开心的时候也想你";
                }
                else if(robot.position.x === 10 && robot.position.y === 4){
                    aCell.innerHTML = "✉";
                    message.innerHTML = "想给你发消息但是怕打扰你学习的心";
                }
                else if(robot.position.x === 11 && robot.position.y === 5){
                    aCell.innerHTML = "✉";
                    message.innerHTML= "想你想到不想给你发消息的心";
                }
                else if(robot.position.x === 8 && robot.position.y === 8){
                    aCell.innerHTML = "✖";
                    message.innerHTML = "踩到便便了，重头开始找吧~！";
                    this.init();
                }
                else{
                    aCell.innerHTML = "R";
                }                
            } else {
                aCell.innerHTML = "";
            }
        })
    }
}

var robot = new MovingObject(new Position(0, 0), "R");
var game = new Game(12, 12, robot)

game.init();
game.render();