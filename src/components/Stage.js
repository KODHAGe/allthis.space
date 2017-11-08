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
    this.storage = firebase.storage();
    this.state = { items: [] };
  }
  componentDidMount() {
    console.log('didmount');
    this.db.collection('stage').onSnapshot((snapshot) => {
      console.log('Received update');
      let items = [];      
      snapshot.forEach((doc) => {
        let data = doc.data();
        data.key = doc.id;
        items.push(data);
      });
      this.setState({items: items});
      console.log(this.state);
    });
  }
  placeLink(event) {
    this.db.collection('stage').add({
      name: 'New note',
      content: 'Write down ur luvly thoughts',
      storageUrl: null,
      position: [event.clientX - 30, event.clientY - 80],
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }
  drag(event) {
    event.preventDefault();
    console.log(event)
  }
  dragover(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  dragend(event) {
    event.preventDefault();  
    console.log('dragend');  
    console.log(event)
  }
  drop(event) {
    event.preventDefault();
    console.log(this);
    let file = event.dataTransfer.files[0];    
    if(file && file.type.indexOf('image') == 0){
      let storageRef = this.storage.ref();
      let position = [event.clientX - 30, event.clientY - 80];
      let itemRef = storageRef.child(file.name);
      let reader = new FileReader();
      reader.onload = (e) => {
        itemRef.put(file).then((snapshot) => {
          console.log('Upload successful')
          itemRef.getDownloadURL().then((url) => {
            this.db.collection('stage').add({
              name: file.name,
              content: 'Write down ur luvly thoughts',
              storageUrl: url,
              position: position,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });
          })
        })
      }
      reader.readAsDataURL(file);
    }
  }
  render() {
    console.log('render fired');
    const items = this.state.items.map((item) => (
      <Item
        key={item.key}
        id={item.key}
        document={item.storageUrl}
        timestamp={item.timestamp}
        name={item.name}
        content={item.content}
        x={item.position[0]}
        y={item.position[1]}
      />
    ));
    return (
      <div className="Stage" onClick={this.placeLink.bind(this)} onDrop={(event) => this.drop(event)} onDrag={(event) => this.drag(event)} onDragOver={(event) => this.dragover(event)}onDragEnd={(event) => this.dragend(event)}>
        {items}
      </div>
    );
  }
}

export default Stage;