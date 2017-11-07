import React, { Component } from 'react';
import './Item.css';

import Fire from './Fire';
import firebase from 'firebase';
import firestore from 'firebase/firestore';

class Item extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();    
    this.state = {'id': this.props.id, 'name': this.props.name, 'x': this.props.positionX, 'y': this.props.positionY }
  }
  edit(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  save(event) {
    let content = event.target.textContent;
    let clicked = this.db.collection('stage').doc(this.state.id);
    return clicked.update({
      name: content
    })
    .then(function() {
      console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }
  render() {
    const style = {
      top: this.props.positionY,
      left: this.props.positionX
    }
    return (
      <div id={this.state.id} className='Item' style={style} onClick={this.edit}>
        <h3 contentEditable='true' onInput={this.save.bind(this)}>{this.state.name}</h3>
        <p contentEditable='true' onChange={this.save.bind(this)}>{this.state.id}</p>
        <p contentEditable='true' onChange={this.save.bind(this)}>{this.state.x}</p>
        <p contentEditable='true' onChange={this.save.bind(this)}>{this.state.y}</p>
      </div>
    );
  }
}

export default Item;