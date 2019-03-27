/*global feathers, io */
/*eslint-env browser*/

import { HeaderComponent } from './components.js';

customElements.define('app-header', HeaderComponent);

// const socket = io();
const client = feathers();
const socket = io.connect();

socket.on('connect', _io => {
  console.log('connected', socket.id);

  window.localStorage.setItem('socket', socket.id);
});

socket.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    // the disconnection was initiated by the server, you need to reconnect manually
    window.localStorage.removeItem('socket');
  }
  // else the socket will automatically try to reconnect
});

client.configure(feathers.socketio(socket));
// Use localStorage to store our login token
client.configure(feathers.authentication({
  storage: window.localStorage
}));

let tempData = {};


// setInterval(() => {
//   socket.on('get', 'temp', 0, (err, res) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     tempData = res;
//     console.log(tempData);


//   });
// }, 1000);

class CardComponent extends HTMLElement {
  constructor() {
    super();
    
    let template = document.getElementById('my-card');
    let templateContent = template.content;
    
    this.attachShadow({mode: 'open'}).appendChild(templateContent.cloneNode(true));
  }
}

customElements.define('my-card', CardComponent);