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
        this.engine = new Engine(this);
        
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
        if(this.robot.position.x === this.map.width-1){
            this.map.width += 1;

        }
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
        this.engine.render();
    }
}

class Engine{
    constructor(state){
        this.state = state;
        this.lastSate = {};
    }

    toDom(){
        let grid_panel = document.createElement("div");
        grid_panel.className += "grid-panel";
        grid_panel.setAttribute("id", "grid-panel");

        for(let y = 0; y < this.state.map.height;y++){
            for(let x = 0; x < this.state.map.width;x++){
                let cell = document.createElement("div");
                cell.className += "grid-cell";
                cell.setAttribute("id", "grid-cell");
                grid_panel.appendChild(cell);

                cell.innerHTML = x;
                
                // if(this.state.robot.position.x === x && this.state.robot.position.y === y){
                //     cell.innerHTML = this.state.robot.icon;
                // }
            }
        }

        for (let i = 0; i < this.state.dump; i++) {
            let aSpan = document.createElement("span");
            aSpan.setAttribute("background-color", "blue");
            grid_panel.appendChild(aSpan);
        }

        return grid_panel;
    }

    stateChanged() {
        if (!this.lastSate.robot) {
            return true;
        } 
        return this.lastSate.robot.position !== this.state.robot.position;
    }

    render() {
        if (!this.stateChanged()) {
            return;
        }

        this.lastSate = {
            ...this.state,
            robot: {...this.state.robot}
        };

        let root = document.getElementById("grid-panel");
        root.replaceWith(this.toDom());
    }



}


let game = new Game(new Position(0,3));
game.init();