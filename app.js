var Rover = function(x,y,direction){  // Does this need to have the parameter in the form of an array? If so, it would be the same, except the one parameter would be arr, and the parameter would be x = arr[0], y = arr[1], and direction = arr[2].

	var self = {
		x: 10,
		x: 10,
		direction: ‘N’,
	}

	if(x){          // This tests if there are any parameters in the function, and if so, uses them to create the rover object.
		self.x = x;
		self.y = y;
		self.direction = direction;
	}

	return self;
}