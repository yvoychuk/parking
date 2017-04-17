import React from "react"

class Index extends React.Component {

  constructor () {
    super();
    this.state = {
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
    console.log(this.state.selected)
  }

  handleChange (e) {
    let value = e.target.value;
    console.log()
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
            <option value="sedan">sedan</option>
            <option value="truck">truck</option>
          </select>
          <button onClick={this.handlePark.bind(this)}>park</button>
        </div>
      </div>)
  }
}

export default Index