var expect = require('chai').expect;

describe('Mars Rover Kata', ()=>{
	it('should have a valid module', ()=>{
		var rover = require('./app.js');

		describe('Tests for Rover movement', ()=>{
			it('should increase the y value by one if forward is called while direction = "N"', ()=>{
				expect(rover.y).to.equal(10);
				rover.forward();
				expect(rover.direction).to.equal('N');
				expect(rover.y).to.equal(11);
			});
			
			it('isCollision() should return 1 when y=175 and x=150', ()=>{
				rover.y = 175;
				rover.x = 150;
				expect(rover.isCollision()).to.equal(1);
			});
			
			it('isCollision() should return 0 when y=175 and x=149', ()=>{
				rover.y = 175;
				rover.x = 149;
				expect(rover.isCollision()).to.equal(0);
			});
			
			it('collisionAvoidance() should return previous coords when isColliison() is truthy', ()=>{
				rover.y = 175;
				rover.x = 150;
				rover.collisionAvoidance(10,10);
				expect(rover.x).to.equal(10);
			});
			
			it('should not move forward if there is an obstacle as indicated by grid.', ()=>{
				rover.y = 175;
				rover.x = 149;
				rover.right();
				expect(rover.direction).to.equal('E');
				rover.forward();
				expect(rover.x).to.equal(149);
			});
			
			it('should wrap to other side of map when extending beyond the edge of the map', ()=>{
				rover.y = 175;
				rover.x = 500;
				rover.direction = 'E';
				rover.mapWrap();
				expect(rover.x).to.equal(0);
				rover.y = 0;
				rover.mapWrap();
				expect(rover.y).to.equal(500);
			});

		});




	});
});