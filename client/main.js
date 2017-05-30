import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Session.setDefault('cars', [{
	make: 'toyota', 
	model:'corolla', 
	year:'2015', 
	color:'white'
}]);

Template.body.helpers({
	cars: function (){
		return Session.get('cars');
	},
	test: function (){
		return Session.get('test');
	}

});

Template.searchCars.events({
	'submit #searchCars': function (){
		event.preventDefault();
		var make = event.target.makeSearch.value;
		var model = event.target.modelSearch.value;
		var year = event.target.yearSearch.value;
		var color = event.target.colorSearch.value;

		event.target.makeSearch.value = '';
		event.target.modelSearch.value = '';
		event.target.yearSearch.value = '';
		event.target.colorSearch.value = '';

    	Meteor.call('searchForCars', make, model, year, color, function(err,res){ 
    		if (res.length > 0) {
    			//set initial result
    			var makeFound = JSON.stringify(res[0]['make']);
    			var modelFound = JSON.stringify(res[0]['model']);
    			var yearFound = JSON.stringify(res[0]['year']);
    			var colorFound = JSON.stringify(res[0]['color']);
    			Session.set('cars', [{make:makeFound, model:modelFound, year:yearFound, color:colorFound}]);

    			//set remaining result
    			var sessionData = Session.get('cars');
    			for (var i = res.length - 1; i >= 1; i--) {
    				var makeFound = JSON.stringify(res[i]['make']);
	    			var modelFound = JSON.stringify(res[i]['model']);
	    			var yearFound = JSON.stringify(res[i]['year']);
	    			var colorFound = JSON.stringify(res[i]['color']);
					sessionData.push({
						make: makeFound,
						model: modelFound,
						year: yearFound,
						color: colorFound
					});
    			}
    			Session.set('cars', sessionData);
    		}
    	});
		return false;
	}
});

Template.addCars.events({
	'submit #addCars': function (){
		event.preventDefault();
		var sessionData = Session.get("cars");
		var make = event.target.make.value;
		var model = event.target.model.value;
		var year = event.target.year.value;
		var color = event.target.color.value;

		event.target.make.value = '';
		event.target.model.value = '';
		event.target.year.value = '';
		event.target.color.value = '';

		Meteor.call('addNewCar', make, model, year, color, function(){});
		return false;
	}
});