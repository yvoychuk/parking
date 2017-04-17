import React from "react"

class Index extends React.Component {

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

  render () {
    return (<div className="p-slots">
      {this.r_slots()}
    </div>)
  }
}

export default Index