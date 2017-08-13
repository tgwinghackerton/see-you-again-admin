import * as firebase from 'firebase'

//firebase
const config = require("./../../secret/fb-config.json");
let fb = firebase.initializeApp(config);

export default fb;

