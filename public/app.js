'use strict';


var db = firebase.firestore();
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


const engineBox = document.querySelector("#engine");
const fastenerBox = document.querySelector("#fastener");
const sizeBox = document.querySelector("#size");
const torqueBox = document.querySelector("#torque");
const clearButton = document.querySelector("#clear");
var GeneralRef = db.collection("General");


db.collection("general").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        // engineBox.innerHTML += "<option>" + doc.dat().size + "</option>";
        // fastenerBox.innerHTML += "<option>" + doc.data().fastener + "</option>";

    });
});

engineBox.addEventListener("change", function() {
  fastenerBox.disabled = false;
  var enginechoice = engineBox.value;
  db.collection(enginechoice).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          // engineBox.innerHTML += "<option>" + doc.dat().size + "</option>";
          fastenerBox.innerHTML += "<option>" + doc.data().fastener + "</option>";

      });
  });
  //run query to get
  console.log(enginechoice);
});

fastenerBox.addEventListener("change", function() {
  sizeBox.disabled = false;
  var fastenerchoice = fastenerBox.value;
  db.collection(enginechoice).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        // engineBox.innerHTML += "<option>" + doc.dat().size + "</option>";
        sizeBox.innerHTML += "<option>" + doc.data().size + "</option>";
      });
});
});

clearButton.addEventListener("click", function() {
  engineBox.value = "";
  fastenerBox.value = "";
  fastenerBox.disabled = true;
  sizeBox.value = "";
  sizeBox.disabled = true;
});

// var TSIORef = db.collection("TSIO-550K");
// var queryfast1 = TSIORef.where("fastener", "==", true);
// var queryfast2 = GeneralRef.where("fastener", "==", true);
// console.log(queryfast1);
// var select = document.getElementById("fastener");
//
// for(var i = 0; i < queryfast1.length; i++) {
//     var opt = queryfast1[i];
//     var el = document.createElement("queryfast1");
//     el.textContent = opt;
//     el.value = opt;
//     select.appendChild(el);
// };


// myPost.onSnapshot(doc => {
//   const data = doc.data();
//   console.log(data)
// })



// load.addEventListener("click", function() {
//   GeneralRef.get().then(function (doc) {
//     if (doc && doc.exists) {
//       const myData = doc.data();
//       output.innerText = myData.Size;
//     }
//   }).catch(function (error) {
//     console.log("Got an error: ", error);
//   });
// });

// var GeneralRef = db.collection("General").doc('BNS2');
// GeneralRef.doc("SF").set({
//     name: "San Francisco", state: "CA", country: "USA",
//     capital: false, population: 860000,
//     regions: ["west_coast", "norcal"] });



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
