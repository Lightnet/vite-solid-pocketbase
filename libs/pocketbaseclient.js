/*
  Project Name: vite-solid-pocketbase
  License: MIT
  Created by: Lightnet
*/

// JavaScript SDK
import PocketBase from 'pocketbase';

//const pocketBase = new PocketBase('http://0.0.0.0:8090');
//const pocketBase = new PocketBase('http://localhost:8090');
const pocketBase = new PocketBase('http://127.0.0.1:8090');

export {
  pocketBase
};

export default pocketBase;