import Utils from "./utils.js"

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
    var parking = localStorage.getItem("parking");
    console.log(JSON.parse(parking)[0])
  }

  const run = function (config) {
    createStorage(config);
    getStorage()
  }

  return {
    run: function (config) {
      run(config);
    }

  }

})();

// api
window.parking = Main