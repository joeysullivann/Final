import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
 	// code to run on server at startup
	Cars = new Mongo.Collection('cars');
});

Meteor.methods({
  'searchForCars': function (makeSearch, modelSearch, yearSearch, colorSearch) {
	var searchResult = Cars.find({$and: [{make: makeSearch}, {model:modelSearch}, {year:yearSearch}, {color:colorSearch}]}).fetch();
	// console.log("found: ", searchResult);
	if (searchResult.length > 0) {
		return searchResult;
	}
	searchResult = Cars.find({$or: [{make: makeSearch}, {model:modelSearch}, {year:yearSearch}, {color:colorSearch}]}).fetch();
	return searchResult;
  }
});

Meteor.methods({
  'addNewCar': function (makeAdd, modelAdd, yearAdd, colorAdd) {
	Cars.insert({make:makeAdd, model:modelAdd, year:yearAdd, color:colorAdd});
	// console.log("added: ", makeAdd, modelAdd, yearAdd, colorAdd);
    return 0;
  }
});