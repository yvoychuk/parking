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

  handlePark () {
    var {parking, selected} = this.state;
    var slotsAvailable = window.parking.getFreeSlots(selected);
    var isSet = false;
    if (slotsAvailable.length > 0) {
      parking = parking.map(function (slot) {
        if (! isSet && (slot.type === selected) && slot.available) {
          isSet = true;
          slot.available = false;
          slot.usedBy = selected;
          slot.updated = Date.now();
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
            <select onChange={this.handleChange.bind(this)} selected={this.state.selected}>
              <option value="disabled">disabled</option>
              <option value="sedan">sedan</option>
              <option value="truck">truck</option>
            </select>
            <button onClick={this.handlePark.bind(this)}>park</button>
          </div>
          <div>
            <p>Remove car</p>
            <select selected={this.state.selected}>
              <option value="disabled">disabled</option>
              <option value="sedan">sedan</option>
              <option value="truck">truck</option>
            </select>
            <button>remove</button>
          </div>
        </div>
      </div>)
  }
}

export default Index