// Simple webworker to 
//
//
//

self.onmessage = init;

var pixels;

function init (ev) {
  pixels = new Uint8Array(ev.data);

  // ...
  iterate();

  console.log(pixels.length);

  //
  self.postMessage(pixels.buffer, [ pixels.buffer ]);

  // Wrap it up
  self.close();
};

function iterate () {
  for (var i=0; i < pixels.length; i+=4) {
    var g = 0.21 * pixels[i];
    g += 0.72 * pixels[i+1];
    g += 0.07 * pixels[i+2];
    // pixels[i] = pixels[i+1] = pixels[i+2] = g;
  }
}
