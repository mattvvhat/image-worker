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
        canvas.width = imgData.width;
        canvas.height = imgData.height;
        var contex = canvas.getContext('2d');

        contex.putImageData(imgData, 0, 0);

        windowPopup(canvas.toDataURL(), imgData.width, imgData.height, 100, 100);
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
  var opt_string = '';
  opt_string += 'height=' + height;
  opt_string += ',width=' + width;
  opt_string += ',left=' + (x - 0);
  opt_string += ',top=' + (y - 0);
  opt_string += ',menubar=no';
  opt_string += ',location=no';
  opt_string += ',status=no';
  window.open(url, '_blank', opt_string);
}
