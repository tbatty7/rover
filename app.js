
// The grid is the map where the rover can travel.  It is an array of tiles or squares on which
// the rover can travel.  Each cell has one of two values:
// 				0 - you can travel on it
// 				1 - there is an obstacle and the rover cannot enter it.

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

// tileSize is the size of each square, or tile, in the grid.  It is set to 25 pixels.
// Here we define variables to aid in mapping cells to their graphic areas.
// (Graphic implementation remains future)
var tileSize = 25;

var mapWidth = grid[0].length * tileSize;
var mapHeight = grid.length * tileSize;


var Rover = function(x,y,direction){  

// The x and y values represent the pixels on the map, not the indexes of the grid.
	var self = {
		x: 10,
		y: 10,
		direction: 'N',
		};

// If the caller provides values for x, y, & direction, here we assign them; otherwise, we leave the defaults we set above.
// Code validation takes place here to make sure x and y fall within the map and the direction is N, S, E or W.
	if(x > 0 && x < 500){         
		self.x = x;
	}
	if(y > 0 && x < 500){         
		self.y = y;
	}
	if((direction === 'N' || direction === 'S') || (direction === 'E' || direction === 'W')){         
		self.direction = direction;
	}

// IsCollision returns true if the rover's current position in grid[] is an obstacle, false otherwise.
// Before calling isCollision, the caller should (tentatively) move the rover to the cell to be tested.
// and if isCollision returns truthy, the caller should return the rover to its previous location.
// since the intended cell contains an obstacle, and the rover cannot go there.  self.x and self.y
//  represent the pixels where the rover is at, and that is converted to the tilesize of the grid.
	self.isCollision = function(){
		var gridX = Math.floor(self.x/tileSize);  // This converts the players x/y into grid tile x/y.
		var gridY = Math.floor(self.y/tileSize);
		return grid[gridY][gridX];  
	};

// collisionAvoidance: to be invoked after the caller has performed a move by calling forward() or
// backward().  If that move's destination is illegal, collisionAvoidance will return the rover to it'
// previous cell, which the caller supplies as formal parameters, and will output an error message;
// If legal, no action is taken by collisionAvoidance.
	self.collisionAvoidance = function(oldX,oldY){
		// grid collision detection
		if (self.isCollision()){
			self.x = oldX;
			self.y = oldY;
			console.log("Obstacle ahead")
		}
	};

// move: returns to the caller one of 4 movements, depending on whether the rover is facing N, S, E or W.
// The caller must supply which directions can be detected, the forward position is represented by the 
// parameter names, the backward position is the opposite.  For example, if 'N' is supplied for the n
// parameter, then if the rover is facing 'N' (north), then the rovers y position is increased.
	self.move = function(n,s,e,w){
       if (self.direction === n){
	      self.y++;
		}
       if (self.direction === s){
          self.y--;
		}
       if (self.direction === e){
          self.x++;
		}
       if (self.direction === w){
          self.x--;
		}
	};

//rotate: returns a new direction in the form of the parameter that is passed, which should be N, S, E or W.
// To turn right, you would pass 'E' as the first parameter, so if the direction is 'N' it will be changed
// to 'E'.  to turn left, you would put 'W' as the first parameter.  The parameters are set to represent 
// rotating right, with rotating left being the opposite directions.
	self.rotate = function(e,w,s,n){
       if (self.direction === 'N'){
	      e;
		}
       if (self.direction === 'S'){
          w;
		}
       if (self.direction === 'E'){
          s;
		}
       if (self.direction === 'W'){
          n;
		}
	};

// mapWrap: to be invoked when the caller has moved the rover to a new location and confirmed the move
// via collisionAvoidance.  If the user has travelled off a map edge, mapWrap will move the rover to the
// corresponding wrap-around location on the opposite side of the map.
// This is assuming the coordinates of the map start with 0 on the left and 0 on the bottom
	self.mapWrap = function(){
		if (self.x >= mapWidth){  
			self.x = self.x - mapWidth;
		}
		if (self.x <= 0){
			self.x = mapWidth;
		}
		if (self.y >= mapHeight){
			self.y = self.y - mapHeight
		}
		if (self.y <= 0){
			self.y = mapHeight;
		}
	};

// forward: move the rover one cell in the direction it is facing.  
// If the rover moves off the edge of the map, wrap to the opposite side.
// If the move results in a collision, revert to previous coordinates, and output an error message.
	self.forward = function(){
		var oldX = self.x;
		var oldY = self.y;

		self.move('N','S','E','W');

		self.mapWrap();

		self.collisionAvoidance(oldX,oldY);
	};

// backward: move the rover one cell in the direction opposite to the direction it is facing.  
// If the rover moves off the edge of the map, wrap to the opposite side.
// If the move results in a collision, revert to previous coordinates, and output an error message.
	self.backward = function(){
		var oldX = self.x;
		var oldY = self.y;

		self.move('S','N','W','E');

		self.mapWrap();

		self.collisionAvoidance(oldX,oldY);

	};

// right: Rotate rover 90 degrees clockwise.
	self.right = function(){

		self.direction = self.rotate('E', 'W', 'S', 'N');
	};

// left: Rotate rover 90 degress counterclockwise.
	self.left = function(){

		self.direction = self.rotate('W', 'E', 'N', 'S');
	};

	return self;
};

var marsRover = Rover();  // I could put the parameters into here from an html form

// If this was supposed to be displayed on a canvas, it would take a bit longer to set up keydown functions 
// and would require a setInterval() function for framerate and animation.


module.exports = Rover();