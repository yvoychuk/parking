import React from "react"

class Index extends React.Component {

  constructor (props) {
    super();
    this.state = {
      parking: props.parking,
      itemToAdd: "disabled",
      itemToRemove: "disabled"
    };
  }

  r_slots () {
    var {parking} = this.props;
    var slots = [];
    for (let i in parking) {
      let slot = parking[i];
      slots.push(
        <div key={"slot-" + i} className="p-slot">
          {"number: " + slot.number},&nbsp;
          {"type: " + slot.type},&nbsp;
          {
            slot.available ?
            <span className="text success">available</span>
            :
            <span className="text danger">{"not available, used by:"  + slot.usedBy}</span>}
        </div>
      )
    }
    return slots;
  }

  addItem () {
    var {parking, itemToAdd} = this.state;
    var slotsAvailable = window.parking.getFreeSlots(itemToAdd);
    var isSet = false;
    if (slotsAvailable.length > 0) {
      parking = parking.map(function (slot) {
        if (! isSet && (slot.type === itemToAdd) && slot.available) {
          isSet = true;
          slot.available = false;
          slot.usedBy = itemToAdd;
          slot.updated = Date.now();
        }
        return slot;
      })
    }
    this.setState(
      {parking: parking},
      function () {
        localStorage.setItem("parking", JSON.stringify(parking))
      }
    )
  }

  selectItemToAdd (e) {
    let value = e.target.value;
    this.setState({itemToAdd: value});
  }

  removeItem () {
    var {parking, itemToRemove} = this.state;
    var slots = parking.filter(function (slot) {
      return slot.usedBy === itemToRemove;
    });
    slots = slots.map(
      function (slot, index) {
        if (index === (slots.length - 1)) {
          slot.available = true;
          slot.usedBy = "";
          slot.updated = Date.now();
        };
        return slot;
      }
    )
    Object.assign(parking, slots);
    this.setState(
      {parking: parking},
      function () {
        localStorage.setItem("parking", JSON.stringify(parking))
      }
    )
  }

  selectItemToRemove (e) {
    let value = e.target.value;
    this.setState({itemToRemove: value});
  }

  render () {
    return (
      <div className="container">
        <div className="col-12">
          <h1>Parking</h1>
        </div>
        <div className="col-6 slots">
          <h2>Parking slots</h2>
          {this.r_slots()}
        </div>
        <div className="col-6 interface">
          <div>
            <p>Park new car</p>
            <select onChange={this.selectItemToAdd.bind(this)} selected={this.state.selected}>
              <option value="disabled">disabled</option>
              <option value="sedan">sedan</option>
              <option value="truck">truck</option>
            </select>
            <button onClick={this.addItem.bind(this)}>park</button>
          </div>
          <div>
            <p>Remove car</p>
            <select onChange={this.selectItemToRemove.bind(this)} selected={this.state.selected}>
              <option value="disabled">disabled</option>
              <option value="sedan">sedan</option>
              <option value="truck">truck</option>
            </select>
            <button onClick={this.removeItem.bind(this)}>remove</button>
          </div>
        </div>
      </div>)
  }
}

export default Index