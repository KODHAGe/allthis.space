import firebase from 'firebase'
import config from '../config/firebase-config.js'

var fire = firebase.initializeApp(config);
export default fire;