import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

 Cars = new Mongo.Collection('cars');
Template.cars.helpers({
  'cars' : function(){
    return Cars.find();
  }
})
Template.addCars.events({
    'submit form': function(event){
	    event.preventDefault();
	    var carMake = $('[name="carMake"]').val();
	    var carModel = $('[name="carModel"]').val();
	    var carYear = $('[name="carYear"]').val();
	    var carColor = $('[name="carColor"]').val();
	    Cars.insert({
	        make: carMake,
	        model: carModel,
	        year: carYear,
	        color: carColor
    });
	}
});