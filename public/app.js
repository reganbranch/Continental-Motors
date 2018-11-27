'use strict';


var db = firebase.firestore();
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


const engineBox = document.querySelector("#engine");
const systemBox = document.querySelector("#system");
const fastenerBox = document.querySelector("#fastener");
const sizeBox = document.querySelector("#size");
const outputFT = document.querySelector("#outputFT");
const outputIN = document.querySelector("#outputIN");
const torqueBox = document.querySelector("#torque");
const submitButton = document.querySelector("#submit");
const clearButton = document.querySelector("#clear");
var GeneralRef = db.collection("General");


    engineBox.addEventListener("change", function() {
        systemBox.innerHTML = "<option value='' selected>Select a System</option>";
        fastenerBox.innerHTML = "<option value='' selected>Select a Fastener</option>";
        sizeBox.innerHTML = "<option value='' selected>Select a Size</option>";
        torqueBox.value = "";
        var enginechoice = engineBox.value;
        console.log(enginechoice);
        if (enginechoice == "General") {
          console.log(enginechoice);
          $("#hide").hide();
          systemBox.disabled = true;
          fastenerBox.disabled = false;
          db.collection(enginechoice).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {

                console.log(doc.id, " => ", doc.data());
                fastenerBox.innerHTML += "<option>" + doc.data().fastener + "</option>";

            });
          });
        } else {
          console.log(enginechoice);
          $("#hide").show();
          systemBox.disabled = false;
          fastenerBox.disabled = true;
          db.collection(enginechoice).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {

                // console.log(doc.id, " => ", doc.data());
                systemBox.innerHTML += "<option>" + doc.data().system + "</option>";

            });
          });

        }

      });



fastenerBox.addEventListener("change", function() {
  sizeBox.disabled = false;
  sizeBox.innerHTML = "<option value='' selected>Select a Size</option>";
  torqueBox.value = "";
  var enginechoice = engineBox.value;
  var fastenerchoice = fastenerBox.value;
  db.collection(enginechoice).where("fastener", "==", fastenerchoice).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        sizeBox.innerHTML += "<option>" + doc.data().size + "</option>";
      });
});
});


submitButton.addEventListener("click", function() {
  var enginechoice = engineBox.value;
  var fastenerchoice = fastenerBox.value;
  var sizechoice = sizeBox.value;
  if(document.getElementById('outputFT').checked) {
    db.collection(enginechoice).where("fastener", "==", fastenerchoice).where("size", "==", sizechoice).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
            torqueBox.value = doc.data().torqueFT;
            console.log(doc.data().torqueFT);
        });
    });
  }else if(document.getElementById('outputIN').checked) {
    db.collection(enginechoice).where("fastener", "==", fastenerchoice).where("size", "==", sizechoice).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
            torqueBox.value = doc.data().torqueIN;
            console.log(doc.data().torqueIN);
        });
    });
  }

});

clearButton.addEventListener("click", function() {
  engineBox.value = "";
  fastenerBox.value = "";
  fastenerBox.disabled = true;
  sizeBox.value = "";
  sizeBox.disabled = true;
  torqueBox.value = "";

});
