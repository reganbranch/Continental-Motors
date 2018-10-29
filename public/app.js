var db = firebase.firestore();

var citiesRef = db.collection("cities");

citiesRef.doc("SF").set({
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });
citiesRef.doc("LA").set({
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
citiesRef.doc("DC").set({
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });
citiesRef.doc("TOK").set({
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] });
citiesRef.doc("BJ").set({
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] });

db.collection("cities").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});


/*
document.addEventListener("DOMContentLoaded", event => {
	
	var app = firebase.app();
	console.log(app)
	const firestore = firebase.firestore();
  const settings = { your settings...  timestampsInSnapshots: true};
  firestore.settings(settings);
	var db = firebase.firestore();
var myPart = db.collection('parts').doc('firstpart');

myPart.onSnapshot(doc => {
	
			const data = doc.data();
			document.write( data.title + '<br>');
			document.write( data.createdAt )
})
	
});

*/


// JavaScript Document
//firebase.firestore().enablePersistence()
//  .catch(function(err) {
//      if (err.code == 'failed-precondition') {
//          // Multiple tabs open, persistence can only be enabled
//          // in one tab at a a time.
//          // ...
//      } else if (err.code == 'unimplemented') {
//          // The current browser does not support all of the
//          // features required to enable persistence
//          // ...
//      }
//  });

		
//db.collection("parts").get().then((querySnapshot) => {
//    querySnapshot.forEach((doc) => {
//        console.log(`${doc.id} => ${doc.data()}`);
//    });
//});