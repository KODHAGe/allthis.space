import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const style = {
      top: this.props.positionY,
      left: this.props.positionX
    }
    return (
      <div className="Item" style={style}>
        <h3>{this.props.name}</h3>
        <p>{this.props.positionX}</p>
        <p>{this.props.positionY}</p>
      </div>
    );
  }
}

export default Item;