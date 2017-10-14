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

	if(x){          // This tests if there are any parameters in the function, and if so, uses them to create the rover object.
		self.x = x;
		self.y = y;
		self.direction = direction;
	}

	self.isCollision = function(){
		var gridX = Math.floor(self.x/tileSize);  // This converts the players x/y into grid tile x/y.
		var gridY = Math.floor(self.y/tileSize);
		return self.collGrid[gridY][gridX];  // returns truthy or falsy if the player is in the tile of the grid that a 1 is in.
	};

	self.collisionAvoidance = function(oldX,oldY){
		// grid collision detection
		if (self.isCollision()){
			self.x = oldX;
			self.y = oldY;
			console.log("Obstacle ahead")
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
       if (self.direction === 'N'){
	      self.x++;
		}
       if (self.direction === 'S'){
          self.x--;
		}
       if (self.direction === 'E'){
          self.y++;
		}
       if (self.direction === 'W'){
          self.y--;
		}

	self.mapWrap();

	self.collisionAvoidance(oldX,oldY);
	};

	self.backward = function(){
		var oldX = self.x;
		var oldY = self.y;

       if (self.direction === 'N'){
	      self.x--;
		}
       if (self.direction === 'S'){
          self.x++;
		}
       if (self.direction === 'E'){
          self.y--;
		}
       if (self.direction === 'W'){
          self.y++;
		}

	self.mapWrap();

	self.collisionAvoidance(oldX,oldY);

	};

	self.right = function(){
		if (self.direction === 'N'){
			self.direction = 'E';
		}
		if (self.direction === 'E'){
			self.direction = 'S';
		}
		if (self.direction === 'S'){
			self.direction = 'W';
		}
		if (self.direction === 'W'){
			self.direction = 'N';
		}
	};

	self.left = function(){
		if (self.direction === 'N'){
			self.direction = 'W';
		}
		if (self.direction === 'W'){
			self.direction = 'S';
		}
		if (self.direction === 'S'){
			self.direction = 'E';
		}
		if (self.direction === 'E'){
			self.direction = 'N';
		}
	};

	return self;
};

var marsRover = Rover();  // I could put the parameters into here from an html form

// If this was supposed to be displayed on a canvas, it would take a bit longer to set up keydown functions 
// and would require a setInterval() function for framerate.