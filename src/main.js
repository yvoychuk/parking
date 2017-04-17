import React from "react"
import ReactDOM from "react-dom"
import Utils from "./utils.js"
import Index from "./views/index.js"

const Main = (function (){

  const createStorage = function (config) {
    var parking = [];
    var {available, disabled, truck} = config;
    for (let i = 0; i < available; i++) {
      let type = i < disabled ? "disabled" : ( i < (disabled + truck) ? "truck" : "all");
      let typeID = i < disabled ? 0 : ( i < (disabled + truck) ? 1 : 2);
      parking.push({
        id: Utils.genID(),
        number: i,
        typeID: typeID,
        type: type,
        usedBy: undefined,
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
    },
    getFreeSlots: function (type) {
      var {parking} = getStorage();
      return parking.filter(
        function (slot) {
          if (typeof type === "undefined") {
            return slot.available
          } else {
            return slot.available && slot.type === type
          }
        }).map(
        function (slot) {
          return slot.type + ": " + slot.number
        }
      );
    }
  }

})();

// api
window.parking = Main