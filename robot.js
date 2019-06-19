function Position(x, y) {
    this.x = x;
    this.y = y;
}

Position.prototype = {
    toIndex: function (mapWidth) {
        return this.x + this.y * mapWidth;
    }
}

function Robot(position, icon)
{
    this.position = position;
    this.icon = icon;
}

function Game(mapWidth, mapHeight, robot)
{
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.robot = robot;

    this.init = function()
    {
        this.robot.position.y = 3;
        this.robot.position.x = 1;
    };

    this.onCommandUp = function()
    {
        var targetPostion = new Position(this.robot.position.x, this.robot.position.y-1);
        this.move(targetPostion);
        
    };

    this.onCommandRight = function()
    {
        var targetPostion = new Position(this.robot.position.x + 1, this.robot.position.y);
        this.move(targetPostion);
        
    };

    this.onCommandDown = function()
    {
        var targetPostion = new Position(this.robot.position.x, this.robot.position.y + 1);
        this.move(targetPostion);
        
    };

    this.onCommandLeft = function()
    {
        var targetPostion = new Position(this.robot.position.x - 1, this.robot.position.y);
        this.move(targetPostion);
        
    };

    this.onCommandReset = function()
    {
        var targetPostion = new Position(0,0);
        this.move(targetPostion);
    }

    this.render = function() {
        var mapCells = document.querySelectorAll('.grid-cell');
        var robotIndex = this.robot.position.toIndex(this.mapWidth);
        for (var i = 0; i < mapCells.length; i++) {
            if (i === robotIndex) {
                mapCells[i].innerHTML = 'R';
            } else {
                mapCells[i].innerHTML = '';
            }
        }
    };

    this.avaiablePosition = function(newPosition)
    {
        if(newPosition.x >= 0 && newPosition.x < mapWidth
            && newPosition.y >= 0 && newPosition.y < mapHeight)
        {
            return true;
        }           
        else
        {
            return false;
        }
    };

    this.move = function(newPostion)
    {
        if(this.avaiablePosition(newPostion))
        {
            this.robot.position = newPostion;
            this.render();
        }
    }
}




var initP = new Position(0,0);
var robot = new Robot(initP,"R");
var game = new Game(4,4,robot);

game.init();
game.render();