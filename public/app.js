console.log("connected to app");

const output = document.querySelector("#output");

var db = firebase.firestore();
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

var GeneralRef = db.collection("General").doc('BNS2');
// myPost.onSnapshot(doc => {
//   const data = doc.data();
//   console.log(data)
// })
// GeneralRef.doc("SF").set({
//     name: "San Francisco", state: "CA", country: "USA",
//     capital: false, population: 860000,
//     regions: ["west_coast", "norcal"] });


load.addEventListener("click", function() {
  GeneralRef.get().then(function (doc) {
    if (doc && doc.exists) {
      const myData = doc.data();
      output.innerText = myData.Size;
    }
  }).catch(function (error) {
    console.log("Got an error: ", error);
  });
});


// db.collection("General").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//         output.innerText = doc.data();
//     });
// });


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
