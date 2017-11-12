var expect = require('chai').expect;

describe('Mars Rover Kata', ()=>{
	it('should have a valid module', ()=>{
		var rover = require('./app.js');

		describe('Tests for Rover movement', ()=>{
			it('should increase the y value by one if forward is called while direction = "N"', ()=>{
				rover.forward();
				expect(rover.direction).to.equal('N');
				expect(rover.y).to.equal(11);
			});
		});




	});
});