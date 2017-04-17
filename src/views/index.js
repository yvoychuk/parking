import React from "react"

class Index extends React.Component {

  constructor (props) {
    super();
    this.state = {
      parking: props.parking,
      selected: "disabled"
    };
  }

  r_slots () {
    var {parking} = this.props;
    var slots = [];
    for (let i in parking) {
      let slot = parking[i];
      slots.push(
        <div key={"slot-" + i} className="p-slot">
          {"type: " + slot.type},&nbsp;
          {slot.available ? "available" : "not available"}
        </div>
      )
    }
    return slots;
  }

  handlePark () {
    var {parking, selected} = this.state;
    var slotsAvailable = window.parking.getFreeSlots(selected);
    console.log(slotsAvailable)
    var isSet = false;
    if (slotsAvailable.length > 0) {
      parking = parking.map(function (slot) {
        if (! isSet && slot.type === selected) {
          isSet = true;
          slot.available = false;
          slot.usedBy = selected;
          slot.updated = Date.now()
        }
        return slot
      })
    }
    let _that = this;
    this.setState(
      {parking: parking},
      function () {
        localStorage.setItem("parking", JSON.stringify(parking))
      })
  }

  handleChange (e) {
    let value = e.target.value;
    this.setState({selected: value});
  }

  render () {
    return (
      <div className="container">
        <div className="slots">
          <h2>Parking slots</h2>
          {this.r_slots()}
        </div>
        <div className="interface">
          <p>select type</p>
          <select onChange={this.handleChange.bind(this)} selected={this.state.selected} id="type-selector">
            <option value="disabled">disabled</option>
            <option value="all">sedan</option>
            <option value="truck">truck</option>
          </select>
          <button onClick={this.handlePark.bind(this)}>park</button>
        </div>
      </div>)
  }
}

export default Index