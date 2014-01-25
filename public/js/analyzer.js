function analyzer (opts) {
  this.options = {};
}

analyzer.prototype.run = function (el) {
  var el = typeof el === 'string' ? document.getElementById(el) : el;

  this.srcToUint8Array(
    el.src,
    function (imgData) {
      var worker = new Worker('/public/js/color.worker.js');

      worker.onmessage = function (e) {
        var pixels = new Uint8Array(e.data);
        var canvas = document.createElement('CANVAS');
        var contex = canvas.getContext('2d');

        contex.putImageData(imgData, 0, 0);

        windowPopup(canvas.toDataURL(), el.width, el.height, 100, 100);
      };

      // USE TRANSFERRABLE OBJECTS
      worker.postMessage(imgData.data.buffer, [ imgData.data.buffer ]);
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


/**
 *
 */
function windowPopup (url, width, height, x, y) {
  var opts;
  opts  = 'width=' + width + ',height=' + height;
  opts += ',left=' + 100 + ',top=' + y;
  window.open(url, '_blank', opts);
}
