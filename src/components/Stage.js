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
        let data = doc.data();
        data.key = doc.id;
        items.push(data);
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
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      let items = this.state.items;
      items.push({'key:': docRef, 'name':'New note', 'storageUrl': null, 'position': clickCoordinates});
      this.setState(items);
      console.log(this.state);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }
  render() {
    const items = this.state.items.map((item) => (
      <Item
        key={item.key}
        id={item.key}
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