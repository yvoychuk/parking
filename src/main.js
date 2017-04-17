import React from "react"
import ReactDOM from "react-dom"
import Utils from "./utils.js"
import Index from "./views/index.js"

const Main = (function (){

  const createStorage = function (config) {
    var parking = [];
    var {placesAvailable, forInv, forTrucks} = config;
    for (let i = 0; i < placesAvailable; i++) {
      parking.push({
        id: Utils.genID(),
        type: i < forInv ? "A" : ( i < (forInv + forTrucks) ? "B" : "C"),
        available: true,
        created: Date.now(),
        updated: null
      })
    };
    localStorage.setItem("parking", JSON.stringify(parking))
  }

  const getStorage = function () {
    var storage = {
      parking: JSON.parse(localStorage.getItem("parking"))
    };
    return storage;
  }

  const run = function (config) {
    createStorage(config);
    var storage = getStorage();
    ReactDOM.render(<Index parking={storage.parking} />, document.getElementById("main"));
  }

  return {
    run: function (config) {
      run(config);
    }

  }

})();

// api
window.parking = Main