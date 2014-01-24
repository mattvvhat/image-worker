// Simple webworker to 
//
//
//

self.onmessage = init;

function init (ev) {
  var pixels = ev.data;
  pixels = new Uint8Array(pixels);
  console.log(pixels.length);
  self.close();
};
