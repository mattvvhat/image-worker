/**
 * Online Statistics Wrapper
 * Compute Statistics without
 *
 */


function Statistics () {
  this.mean = 0;
  this.m2   = 0;
  this.n    = 0;
  this.var  = 0;
}

Statistics.prototype.update = function (points) {
  for (var k = 0; k < points.length; k++) {
    this.n++;
    var delta = points[k] - this.mean;
    this.mean = this.mean + delta/this.n;
    this.m2   = this.m2 + delta * (points[k] - this.mean);
  }
  this.var = this.m2/(this.n-1);
};
