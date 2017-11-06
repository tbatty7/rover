var grid = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],        
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],];
var tileSize = 25;

var mapWidth = grid[0].length * tileSize;
var mapHeight = grid.length * tileSize;

var Rover = function(x,y,direction){  // Does this need to have the parameter in the form of an array? If so, it would be the same, except the one parameter would be arr, and the parameter would be x = arr[0], y = arr[1], and direction = arr[2].

	var self = {
		x: 10,
		x: 10,
		direction: 'N',
		};

	if(x){         
		self.x = x;
	}
	if(y){         
		self.y = y;
	}
	if(direction){         
		self.direction = direction;
	}

	self.isCollision = function(){
		var gridX = Math.floor(self.x/tileSize);  // This converts the players x/y into grid tile x/y.
		var gridY = Math.floor(self.y/tileSize);
		return grid[gridY][gridX];  // returns truthy or falsy if the player is in the tile of the grid that a 1 is in.
	};

	self.collisionAvoidance = function(oldX,oldY){
		// grid collision detection
		if (self.isCollision()){
			self.x = oldX;
			self.y = oldY;
			console.log("Obstacle ahead")
		}
	}

	self.directionDetector = function(n,s,e,w){
       if (self.direction === 'N'){
	      n;
		}
       if (self.direction === 'S'){
          s;
		}
       if (self.direction === 'E'){
          e;
		}
       if (self.direction === 'W'){
          w;
		}
	}

	self.mapWrap = function(){
		// Wrap from one edge of grid to another going forward
		if (self.x > mapWidth){  // This is assuming the coordinates of the map start with 0 on the left and 0 on the bottom
			self.x = self.x - mapWidth;
		}
		if (self.x < 0){
			self.x = mapWidth;
		}
		if (self.y > mapHeight){
			self.y = self.y - mapHeight
		}
		if (self.y < 0){
			self.y = mapHeight;
		}

	}

	self.forward = function(){
		var oldX = self.x;
		var oldY = self.y;

		self.directionDetector(self.x++,self.x--,self.y++,self.y--);

		self.mapWrap();

		self.collisionAvoidance(oldX,oldY);
	};

	self.backward = function(){
		var oldX = self.x;
		var oldY = self.y;

		self.directionDetector(self.x--,self.x++,self.y--,self.y++);

		self.mapWrap();

		self.collisionAvoidance(oldX,oldY);

	};

	self.right = function(){

		self.directionDetector(self.direction = 'E', self.direction = 'W', self.direction = 'S', self.direction = 'N');
	};

	self.left = function(){

		self.directionDetector(self.direction = 'W', self.direction = 'E', self.direction = 'N', self.direction = 'S');
	};

	return self;
};

var marsRover = Rover();  // I could put the parameters into here from an html form

// If this was supposed to be displayed on a canvas, it would take a bit longer to set up keydown functions 
// and would require a setInterval() function for framerate and animation.