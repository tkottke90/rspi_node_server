/*global feathers, io */
/*eslint-env browser*/

import { HeaderComponent, CardComponent } from './components.js';

customElements.define('app-header', HeaderComponent);
customElements.define('app-card', CardComponent);

// const socket = io();
const client = feathers();
const socket = io.connect('192.168.1.26');

let tempData = {};

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

socket.on('temp update', (data) => {
  // console.log(data);
  const msTimestamp = `${new Date(data.timestamp).valueOf()}`;
  tempData[msTimestamp] = data;

  console.table(tempData);
});

client.configure(feathers.socketio(socket));
// Use localStorage to store our login token
client.configure(feathers.authentication({
  storage: window.localStorage
}));