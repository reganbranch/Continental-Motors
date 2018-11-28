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
    $("#hide2").hide();

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
          systemBox.disabled = false;
          systemBox.innerHTML += "<option>Bolts, Nuts, Screws</option>";
          systemBox.innerHTML += "<option>Driving Studs</option>";
          systemBox.innerHTML += "<option>Hose Fitting (“B” Nut)</option>";
          systemBox.innerHTML += "<option>Pipe Plugs</option>";
          systemBox.innerHTML += "<option>Straight Thread Fitting</option>";

        } else {
          console.log(enginechoice);
          $("#hide").show();
          systemBox.disabled = false;
          systemBox.innerHTML += "<option>Crankcase</option>";
          systemBox.innerHTML += "<option>Connecting Rods</option>";
          systemBox.innerHTML += "<option>Gears</option>";
          systemBox.innerHTML += "<option>Miscellaneous Cylinder Hardware </option>";
          systemBox.innerHTML += "<option>Miscellaneous Fasteners</option>";
          systemBox.innerHTML += "<option>Miscellaneous Lubrication System Fasteners</option>";
          systemBox.innerHTML += "<option>Specific Torque Specifications (Non-Lubricated Hardware)</option>";

        }

      });

systemBox.addEventListener("change", function() {
  fastenerBox.innerHTML = "<option value='' selected>Select a Fastener</option>";
  sizeBox.innerHTML = "<option value='' selected>Select a Size</option>";
  torqueBox.value = "";
  var enginechoice = engineBox.value;
  var systemchoice = systemBox.value;
  console.log(enginechoice);
  if (enginechoice == "General") {
    sizeBox.disabled = false;
    db.collection(enginechoice).where("system", "==", systemchoice).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          sizeBox.innerHTML += "<option>" + doc.data().size + "</option>";
        });
  });
  } else {
    fastenerBox.disabled = false;
    db.collection(enginechoice).where("system", "==", systemchoice).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          fastenerBox.innerHTML += "<option>" + doc.data().fastener + "</option>";
        });
  });
  }
});

fastenerBox.addEventListener("change", function() {
  sizeBox.disabled = false;
  sizeBox.innerHTML = "<option value='' selected>Select a Size</option>";
  torqueBox.value = "";
  var enginechoice = engineBox.value;
  var systemchoice = systemBox.value;
  var fastenerchoice = fastenerBox.value;
  db.collection(enginechoice).where("system", "==", systemchoice).where("fastener", "==", fastenerchoice).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        sizeBox.innerHTML += "<option>" + doc.data().size + "</option>";
      });
});
});

sizeBox.addEventListener("change", function() {
  torqueBox.value = "";
});

submitButton.addEventListener("click", function() {
  if (sizeBox.value == "") {
    $("#hide2").show();
  } else {
    $("#hide2").hide();
    var enginechoice = engineBox.value;
    var systemchoice = systemBox.value;
    var fastenerchoice = fastenerBox.value;
    var sizechoice = sizeBox.value;

    if(document.getElementById('outputFT').checked) {
      db.collection(enginechoice).where("system", "==", systemchoice).where("fastener", "==", fastenerchoice).where("size", "==", sizechoice).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
              torqueBox.value = doc.data().torqueFT;
          });
      });
    }else if(document.getElementById('outputIN').checked) {
      db.collection(enginechoice).where("system", "==", systemchoice).where("fastener", "==", fastenerchoice).where("size", "==", sizechoice).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
              torqueBox.value = doc.data().torqueIN;
          });
      });
    }
  }


});

clearButton.addEventListener("click", function() {
  engineBox.value = "";
  systemBox.value = "";
  systemBox.disabled = true;
  fastenerBox.value = "";
  fastenerBox.disabled = true;
  sizeBox.value = "";
  sizeBox.disabled = true;
  torqueBox.value = "";

});
