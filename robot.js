class Postion{
    constructor(x, y){
    this.x = x;
    this.y = y;
    }
}

class Robot{
    constructor(position, icon){
    this.position = position;
    this.icon = icon;
    }
}


class Game{
    constructor(robot, mapWidth){
    this.robot = robot;
    this.mapWidth = mapWidth;
    this.history = [];
    }

    init(){
        robot.position.y = 3;
        robot.position.x = 3;
    }

    onCommandUp(){
        this.history.push(robot.position); 
        var targetPostion = new Postion(robot.position.x, robot.position.y-1);
        this.move(targetPostion);
    }

    onCommandLeft(){
        this.history.push(robot.position); 
        var targetPostion = new Postion(robot.position.x-1, robot.position.y);
        this.move(targetPostion);
    }

    onCommandDown(){
        this.history.push(robot.position); 
        var targetPostion = new Postion(robot.position.x, robot.position.y+1);
        this.move(targetPostion);
    }

    onCommandRight(){
        this.history.push(robot.position); 
        var targetPostion = new Postion(robot.position.x+1, robot.position.y);
        this.move(targetPostion);
    }

    move(targetPostion){
        if(this.validPosition(this.mapWidth, targetPostion.x, targetPostion.y)){            
            robot.position = targetPostion;
        }       
        this.render();
    }

    onCommandBack(){
        var targetPostion = history.pop();
        this.move(targetPostion);
    }

    validPosition(mapWidth,x, y){
        mapWidth = mapWidth;
        if(x >= 0 && x < mapWidth && y >=0 && y < mapWidth){
            return true;
        }else{
            return false;
        }
    }

    render(){
        let mapCells = document.querySelectorAll('.map-cell');
        let robotIndex = robot.position.x + (robot.position.y * this.mapWidth);
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
let robot = new Robot(new Postion(3,3), "R")
let game = new Game(robot, 4);

game.init();
game.render();
