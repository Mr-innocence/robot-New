function Postion(x, y){
    this.x = x;
    this.y = y;
}

function Robot(position, icon){
    this.position = position;
    this.icon = icon;

}


function Game(robot, mapWidth){
    this.robot = robot;
    this.mapWidth = mapWidth;
    this.history = [];
    this.init = function(){
        this.robot.position.y = 3;
        this.robot.position.x = 3;
    }

    this.onCommandUp = function(){
        this.history.push(this.robot.position); 
        var targetPostion = new Postion(this.robot.position.x, this.robot.position.y-1);
        this.move(targetPostion);
    }

    this.onCommandLeft = function(){
        this.history.push(this.robot.position); 
        var targetPostion = new Postion(this.robot.position.x-1, this.robot.position.y);
        this.move(targetPostion);
    }

    this.onCommandDown = function(){
        this.history.push(this.robot.position); 
        var targetPostion = new Postion(this.robot.position.x, this.robot.position.y+1);
        this.move(targetPostion);
    }

    this.onCommandRight = function(){
        this.history.push(this.robot.position); 
        var targetPostion = new Postion(this.robot.position.x+1, this.robot.position.y);
        this.move(targetPostion);
    }

    this.move = function(targetPostion){
        if(this.validPosition(this.mapWidth, targetPostion.x, targetPostion.y)){            
            this.robot.position = targetPostion;
        }       
        this.render();
    }

    this.onCommandBack= function(){
        var targetPostion = this.history.pop();
        this.move(targetPostion);
    }

    this.validPosition = function(mapWidth,x, y){
        this.mapWidth = mapWidth;
        if(x >= 0 && x < mapWidth && y >=0 && y < mapWidth){
            return true;
        }else{
            return false;
        }
    }

    this.render = function(){
        mapCells = document.querySelectorAll('.map-cell');
        var robotIndex = this.robot.position.x + (this.robot.position.y * this.mapWidth);
        console.log(robotIndex);
        mapCells.forEach((aCell, i) =>{
            if(i === robotIndex){
                aCell.innerHTML = 'R';
            }else{
                aCell.innerHTML = ""; 
            }
        })
    }
}
var robot = new Robot(new Postion(3,3), "R")
var game = new Game(robot, 4);

game.init();
game.render();
