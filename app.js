



var Rover = function(x,y,direction){  // Does this need to have the parameter in the form of an array? If so, it would be the same, except the one parameter would be arr, and the parameter would be x = arr[0], y = arr[1], and direction = arr[2].

	var self = {
		x: 10,
		x: 10,
		direction: 'N',
	}

	if(x){          // This tests if there are any parameters in the function, and if so, uses them to create the rover object.
		self.x = x;
		self.y = y;
		self.direction = direction;
	}

	self.forward = function(){
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
	}

	self.backward = function(){
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
	}

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
	}

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
	}




	return self;
}