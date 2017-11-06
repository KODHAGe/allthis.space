import React, { Component } from 'react';
import Fire from './Fire';
import firebase from 'firebase';
import firestore from 'firebase/firestore';

import './Stage.css';

import Item from './Item';

class Stage extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = { items: [] };
  }
  componentDidMount() {
    let items = this.state.items;  
    this.db.collection('stage').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      
      this.setState(items);      
    });
  }
  placeLink(event) {
    var clickCoordinates = [event.clientX - 30, event.clientY - 80];
    
    this.db.collection('stage').add({
      name: 'cool',
      storageUrl: 'cooler',
      position: clickCoordinates
    }).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

    let items = this.state.items;
    items.push({'name':'cool', 'storageUrl': 'cooler', 'position': clickCoordinates});
    this.setState(items);
  }
  render() {
    const items = this.state.items.map((item) => (
      <Item
        key={item.name + Date.now()}
        name={item.name}
        positionX={item.position[0]}
        positionY={item.position[1]}
      />
    ));
    return (
      <div className="Stage" onClick={this.placeLink.bind(this)}>
        {items}
      </div>
    );
  }
}

export default Stage;