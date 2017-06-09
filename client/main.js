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
    			var makeFound = JSON.stringify(res[0]['Make']);
    			var modelFound = JSON.stringify(res[0]['Model']);
    			var yearFound = JSON.stringify(res[0]['Year']);
    			var colorFound = JSON.stringify(res[0]['Color']);
    			var imageFound = res[0]['Image'];
    			Session.set('cars', [{make:makeFound, model:modelFound, year:yearFound, color:colorFound, image:imageFound}]);

    			//set remaining result
    			var sessionData = Session.get('cars');
    			for (var i = res.length - 1; i >= 1; i--) {
    				var makeFound = JSON.stringify(res[i]['Make']);
	    			var modelFound = JSON.stringify(res[i]['Model']);
	    			var yearFound = JSON.stringify(res[i]['Year']);
	    			var colorFound = JSON.stringify(res[i]['Color']);
					var imageFound = res[i]['Image'];
    				sessionData.push({
						make: makeFound,
						model: modelFound,
						year: yearFound,
						color: colorFound,
						image: imageFound
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
Template.body.created = function(){
	Meteor.call('allCars', function(err,res){ 
		if (res.length > 0) {
			//set initial result
			var makeFound = JSON.stringify(res[0]['Make']);
			var modelFound = JSON.stringify(res[0]['Model']);
			var yearFound = JSON.stringify(res[0]['Year']);
			var colorFound = JSON.stringify(res[0]['Color']);
			var imageFound = res[0]['Image'];
			Session.set('cars', [{make:makeFound, model:modelFound, year:yearFound, color:colorFound, image:imageFound}]);

			//set remaining result
			var sessionData = Session.get('cars');
			for (var i = res.length - 1; i >= 1; i--) {
				var makeFound = JSON.stringify(res[i]['Make']);
    			var modelFound = JSON.stringify(res[i]['Model']);
    			var yearFound = JSON.stringify(res[i]['Year']);
    			var colorFound = JSON.stringify(res[i]['Color']);
				var imageFound = res[i]['Image'];
    			sessionData.push({
					make: makeFound,
					model: modelFound,
					year: yearFound,
					color: colorFound,
					image: imageFound
				});
			}
			Session.set('cars', sessionData);
		}
	});
}