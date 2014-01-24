function analyzer (opts) {
  this.options = {};
}

analyzer.prototype.run = function (el) {
  var el = typeof el === 'string' ? document.getElementById(el) : el;

  this.srcToUint8Array(
    el.src,
    function (array) {
      var worker = new Worker('/public/js/color.worker.js');

      worker.onmessage = function (e) {

      };

      // USE TRANSFERRABLE OBJECTS
      worker.postMessage(array.data.buffer, [ array.data.buffer ]);
    }
  );

};

/**
 *
 *
 */
analyzer.prototype.prepImage = function () {
  var byteArray = Uint8Array();
};

/**
 *
 *
 */
analyzer.prototype.srcToUint8Array = function (src, callback) {
  var self = this;
  var img = new Image();
  img.src = src;
  img.onload = function () {
    var canvas = document.createElement('canvas');
    var contex = canvas.getContext('2d');
    canvas.width  = img.width;
    canvas.height = img.height;
    contex.drawImage(img, 0, 0, canvas.width, canvas.height);
    window.open(canvas.toDataURL(), '_blank', 'width = ' + canvas.width + ' height = ' + canvas.height);

    var array = new Uint8Array();
    var imgData = contex.getImageData(0, 0, canvas.width, canvas.height);

    if (typeof callback === 'function') {
      callback.call(self, imgData);
    }
    else {
      console.log('WARNING: No callback specified');
    }
  };
};
