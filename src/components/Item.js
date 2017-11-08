import React, { Component } from 'react';
import './Item.css';

import Fire from './Fire';
import firebase from 'firebase';
import firestore from 'firebase/firestore';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {'id': this.props.id, 'name': this.props.name, 'content': this.props.content, 'document': this.props.document, 'x': this.props.x, 'y': this.props.y, 'timestamp': this.props.timestamp ? this.props.timestamp.toString() : new Date().toString() };
    console.log(this.state.document);
    this.dbObj = firebase.firestore().collection('stage').doc(this.state.id);    
  }
  componentWillReceiveProps(newprops) {
    this.setState({'id': newprops.id, 'name': newprops.name, 'content': newprops.content, 'x': newprops.x, 'y': newprops.y, 'timestamp': newprops.timestamp ? newprops.timestamp.toString() : new Date().toString() })
  }
  edit(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  save(data, content) {
    this.setState({content: content});
    this.dbObj.update({
      [data]: content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
      console.log("Document successfully updated!");
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
  }
  delete(event) {
    this.dbObj.delete()
    .then(function() { 
      console.log("Document deleted"); 
    })
    .catch(function (error) { 
      console.log("Error: ", error);
    });
  }
  dragstart(event) {
  }
  drag(event) {
    //this.setState({x: event.clientX - 30, y: event.clientY - 160});    
  }
  dragend(event) {
    this.setState({x: event.clientX - 30, y: event.clientY - 160});
    this.dbObj.update({
      position: [event.clientX - 30, event.clientY - 80],
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
      console.log("Document position successfully updated!");
    })
    .catch(function(error) {
      console.error("Error updating document: ", error);
    });
  }
  render() {
    const style = {
      top: this.state.y,
      left: this.state.x
    }
    return (
      <div id={this.state.id} className='Item' style={style} onClick={this.edit} onDragStart={this.dragstart} onDrag={(event) => this.drag(event)} onDragEnd={this.dragend.bind(this)} draggable="true">
        <div className='id'>{this.state.id}</div>
        <div className='timestamp'>{this.state.timestamp}</div>
        <div className='Item-closebutton' onClick={this.delete.bind(this)}>×</div>
        <h3 className='Item-name' contentEditable='true' onInput={(event) => this.save('name', event.target.textContent)} suppressContentEditableWarning>{this.state.name}</h3>
        <img className='Item-image' src={this.state.document} />
        <textarea className='Item-textarea' contentEditable='true' onChange={(event) => this.save('content', event.target.value)} value={this.state.content} suppressContentEditableWarning></textarea>
      </div>
    );
  }
}

export default Item;