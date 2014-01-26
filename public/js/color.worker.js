// Simple webworker to 
//
//
//

importScripts('/public/js/statistics.js');

self.onmessage = init;

function init (ev) {
  var start = + new Date();
  var pixels = new Uint8Array(ev.data);

  // ...
  iterate(pixels);

  console.log(pixels.length);

  //
  self.postMessage(pixels.buffer, [ pixels.buffer ]);

  // Wrap it up
  self.close();

  console.log(new Date() - start);
};

function iterate (pixels) {
  var stats = new Statistics();
  for (var i=0; i < pixels.length; i+=4) {
    var g = 0.21 * pixels[i];
    g += 0.72 * pixels[i+1];
    g += 0.07 * pixels[i+2];
    pixels[i] = pixels[i+1] = pixels[i+2] = g;
    stats.update([g]);
  }
  console.log('{{{');
  console.log(stats.mean);
  console.log(Math.sqrt(stats.var));
  console.log('}}}');
}
