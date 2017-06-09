import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
 	// code to run on server at startup
 	Cars = new Mongo.Collection('cars');
 	Cars.remove({});
 	if (Cars.find().count() <= 0){
 		console.log("Database empty!. Adding default cars to database.")
 		toInsert = [
{
Make: "Volkswagen",
Model: "Golf GTI",
Year: "2016",
Color: "White",
Image: "https://s-media-cache-ak0.pinimg.com/originals/fc/a9/46/fca9464fa561e0cec061e479dcf604da.jpg"
},
{
Make: "BMW",
Model: "Z4M Roadster",
Year: "2006",
Color: "Black",
Image: "http://www.automobilesreview.com/gallery/hamann-bmw-z4-m-roadster/hamann-bmw-z4-m-roadster-16.jpg"
},
{
Make: "Mercedes",
Model: "C63 AMG",
Year: "2015",
Color: "Red",
Image: "https://i.ytimg.com/vi/jI20Elfu_Vs/maxresdefault.jpg"
},
{
Make: "Ford",
Model: "Fiesta ST",
Year: "2014",
Color: "Blue",
Image: "http://st.automobilemag.com/uploads/sites/11/2014/06/2014-ford-fiesta-st-front-three-quarters-02.jpg"
},
{
Make: 'Honda',
Model: "S2000",
Year: "2004",
Color: "Grey",
Image: "https://static.cargurus.com/images/site/2010/08/27/03/57/2004_honda_s2000_base-pic-6423605051460864556.jpeg"
},
{
Make: "Honda",
Model: "Civic",
Year: "2014",
Color: "Grey",
Image: "http://images.dealer.com/ddc/vehicles/2015/Honda/Civic/Sedan/trim_EX_639c3b/color/Modern%20Steel%20Metallic-GY-74%2C78%2C79-640-en_US.jpg"
},
{
Make: "Toyota",
Model: "Supra",
Year: "1998",
Color: "Red",
Image: "http://blog.ebayimg.com/motors/blog/wp-content/uploads/2015/04/1995_toyota_supra_turbo_red_3-586x400-740x480.jpg"
},
{
Make: "BMW",
Model: "M3",
Year: "2008",
Color: "White",
Image: "http://www.zercustoms.com/news/images/BMW/th1/2008-HR-BMW-M3-Coupe-3.jpg"
},
{
Make: "Audi" ,
Model: "A6",
Year: "2017",
Color: "Grey",
Image: "http://images.caricos.com/a/audi/2015_audi_a6/images/1920x1080/2015_audi_a6_27_1920x1080.jpg"
},
{
Make: "Volvo",
Model: "S60",
Year: "2017",
Color: "Grey",
Image: "http://pictures.dealer.com/v/volvoofdallasvcna/1983/1272f383e5ea775e97ab9e78eb96a91bx.jpg"
},
{
Make: "Range Rover",
Model: "Velar",
Year: "2018",
Color: "Grey",
Image: "https://preview2.netcarshow.com/Land_Rover-Range_Rover_Velar-2018-1600-03.jpg"
},
{
Make: "Honda",
Model: "Accord",
Year: "2013",
Color: "Red",
Image: "https://media.ed.edmunds-media.com/honda/accord/2013/oem/2013_honda_accord_coupe_ex-l-v6_fq_oem_1_1280.jpg"
},
{
Make: "Audi",
Model: "A4",
Year: "2017",
Color: "Blue",
Image: "http://st.motortrend.com/uploads/sites/5/2015/09/2017-Audi-A4-front-side-view-red-doors-1024x680.jpg"
},
{
Make: "Volkswagen",
Model: "Jetta",
Year: "2008",
Color: "White",
Image: "http://images.gtcarlot.com/pictures/25333257.jpg"
},
{
Make: "Ford",
Model: "Fusion",
Year: "2003",
Color: "Red",
Image: "http://media.caranddriver.com/images/05q4/267357/ford-fusion-photo-9044-s-429x262.jpg"
},
{
Make: "Toyota",
Model: "Prius",
Year: "2005",
Color: "Blue",
Image: "http://autopazar.co.uk/media/8740/Used_Toyota_Prius_1_5_Vvti_T_Spirit_Hatchback_Blue_2005_Hybrid_for_Sale_in_UK.jpg"
},
{
Make: "Jaguar",
Model: "XF",
Year: "2013",
Color: "Black",
Image: "http://www.canadianautoreview.ca/images/car_photos/2013-Jaguar-XF-3.0L-AWD/normal/2013-jaguar-xf-awd-front-side-1.JPG"
},
{
Make: "Lexus",
Model: "IS250",
Year: "2008",
Color: "White",
Image: "http://images.nysportscars.com/pictures/53817124.jpg"
},
{
Make: "Mazda",
Model: "RX8",
Year: "2011",
Color: "Red",
Image: "http://wallpaper.imcphoto.net/vehicle-wallpapers/japanese-sports-cars/mazda-rx8/2011-rx8-wallpaper.jpg"
}
		]
		for(var i=0; i<toInsert.length; i++){
	 		Cars.insert(toInsert[i]);
	 	}
 	} else{
 		console.log("Database found and not empty!")
 		console.log(Cars.find().fetch()[0]["Make"])
 	}
});

Meteor.methods({
  'searchForCars': function (makeSearch, modelSearch, yearSearch, colorSearch) {
	var searchResult = Cars.find({$and: [{Make: makeSearch}, {Model:modelSearch}, {Year:yearSearch}, {Color:colorSearch}]}).fetch();
	// console.log("found: ", searchResult);
	if (searchResult.length > 0) {
		return searchResult;
	}
	searchResult = Cars.find({$or: [{Make: makeSearch}, {Model:modelSearch}, {Year:yearSearch}, {Color:colorSearch}]}).fetch();
	return searchResult;
  }
});

Meteor.methods({
  'addNewCar': function (makeAdd, modelAdd, yearAdd, colorAdd) {
	Cars.insert({Make:makeAdd, Model:modelAdd, Year:yearAdd, Color:colorAdd});
	// console.log("added: ", makeAdd, modelAdd, yearAdd, colorAdd);
    return 0;
  }
});

Meteor.methods({
  'allCars': function () {
	return Cars.find().fetch();
  }
});