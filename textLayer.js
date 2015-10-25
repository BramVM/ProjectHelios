windowHalfX = window.innerWidth / 2;
windowHalfY = window.innerHeight / 2;
textCanvas = document.createElement( 'canvas' );
textCanvas.setAttribute("width", window.innerWidth);
textCanvas.setAttribute("height", window.innerHeight);
textCanvas.setAttribute("style","width: " + window.innerWidth+ "px; height: " + window.innerHeight+ "px; z-index: -1;");
document.body.appendChild( textCanvas );

var ctx=textCanvas.getContext("2d");

_redraw = function( ){
  ctx.font="10px munroregular";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  if (this.health && this.maxHealth) ctx.fillText( this.health + " / " + this.maxHealth, windowHalfX, windowHalfY+70 );
  if (this.droids) {

  }
}

function _resize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  textCanvas.setAttribute("width", window.innerWidth);
  textCanvas.setAttribute("height", window.innerHeight);
  textCanvas.setAttribute("style","width: " + window.innerWidth+ "px; height: " + window.innerHeight+ "px; z-index: -1;");
  this.redraw();
}

var textLayer = {
  redraw : _redraw,
  resize: _resize
}
if (typeof(module) !== 'undefined') module.exports = textLayer;