import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
Cars = new Mongo.Collection('cars');
Cars.insert({make:"toyota", model:"corolla", year:"2015", color:"white"});

