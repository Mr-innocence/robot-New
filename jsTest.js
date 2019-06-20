class Position{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }

    getUp(){
        return new Position(this.x, this.y-1);
    }

    getDown(){
        return new Position(this.x, this.y+1);
    }

    getLeft(){
        return new Position(this.x-1, this.y);
    }

    getRight(){
        return new Position(this.x+1, this.y);
    }
}

class Map{
    constructor(width,height){
        this.width = width;
        this.height = height;
    }

    validePosition(newPosition){
        console.log(newPosition);
        if(newPosition.x >= 0 && newPosition.x < this.width 
            && newPosition.y >= 0 && newPosition.y < this.height){
                return true;
            }else{
                return false;
            }
    }

    getIndex(x,y){
        return x + 4*y;
    }
}

class Robot{
    constructor(position, icon, map){
        this.position = position;
        this.icon = icon;
        this.map = map;
        this.history = [];
    }

    move(newPosition){
        console.log("newPosition" + newPosition.x + newPosition.y);
        if(this.map.validePosition(newPosition)){
            this.history.push(this.position);
            this.position = newPosition;            
        }
        
    }

    reverse() {
        this.position = this.history.pop();
    }
}

class Game{
    constructor(startPostion){
        this.map = new Map(4,4);
        this.startPostion = startPostion;
        this.robot = new Robot(this.startPostion, "R", this.map);
        
        console.log("start Position" + startPostion.x + startPostion.y);
    }

    init()
    {
        this.robot.move(this.startPostion);
        this.render();
    }
    onCommandUp(){
        this.robot.move(this.robot.position.getUp());
        this.render();
    }

    onCommandRight(){
        this.robot.move(this.robot.position.getRight());
        this.render();
    }

    onCommandDown(){
        this.robot.move(this.robot.position.getDown());
        this.render();
    }

    onCommandLeft(){
        this.robot.move(this.robot.position.getLeft());
        this.render();
    }

    onCommandReset(){
        this.robot.move(this.startPostion);
        this.render();
    }

    onCommandBack() {
        this.robot.reverse();
        this.render();
    }

    

    render(){
        let myCells = document.querySelectorAll('.grid-cell');
        let robotIndex = this.map.getIndex(this.robot.position.x, this.robot.position.y);
        myCells.forEach((aCell, i) => {
            if(i === robotIndex){
                aCell.innerHTML = this.robot.icon;
            }else{
                aCell.innerHTML = "";
            }
        });
    }
}


let game = new Game(new Position(0,3));
game.init();