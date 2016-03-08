windowHalfX = window.innerWidth / 2;
windowHalfY = window.innerHeight / 2;
textCanvas = document.createElement( 'canvas' );
textCanvas.setAttribute("width", window.innerWidth);
textCanvas.setAttribute("height", window.innerHeight);
textCanvas.setAttribute("style","width: " + window.innerWidth+ "px; height: " + window.innerHeight+ "px; z-index: -1;");
document.body.appendChild( textCanvas );

var ctx=textCanvas.getContext("2d");

_hitAlert = function(x, y, c, i) {
    r = Math.sqrt(Math.pow(windowHalfX,2)+Math.pow(windowHalfY,2))
    ctx.beginPath();
    var rad = ctx.createRadialGradient(x, y, 1, x, y, r);
    rad.addColorStop(0, 'rgba('+c+',0)');
    rad.addColorStop(1, 'rgba('+c+','+i+')');
    ctx.fillStyle = rad;
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.fill();
}
_redraw = function( ){
  ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  ctx.font="15px munroregular";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  if (this.health && this.maxHealth) ctx.fillText( Math.round(this.health) + " / " + this.maxHealth, windowHalfX, windowHalfY+70 );
  _drawDroids();
  if (this.msgStr) {
    flatLayer.msgTmr = flatLayer.msgTmr-0.1;
    ctx.fillStyle = "rgba(255, 255, 255, "+ flatLayer.msgTmr +")";
    ctx.fillText( flatLayer.msgStr, windowHalfX, windowHalfY/2 );
  }
  if (this.hitTmr>0) {
    flatLayer.hitTmr = flatLayer.hitTmr-0.1;
    _hitAlert(windowHalfX, windowHalfY, "255,0,0",flatLayer.hitTmr/12);
  }
}
_hit = function(){
  flatLayer.hitTmr = 3;
}
_message = function(string){
 flatLayer.msgStr = string;
 flatLayer.msgTmr = 6;
}
_drawDroids = function(){
  if(flatLayer.droids){
    var width = 60;
    var height = 20;
    var fontHeight = 15;
    var offsetLeft = 0;
    var marginRight = 2*windowHalfX - width/2;
    var marginLeft = width/2;
    var marginBottom = 2*windowHalfY - height/2;
    var marginTop = height/2;

    ctx.font= fontHeight + "px munroregular";
    for (var i = 0; i < flatLayer.droids.length; i++) {
      if (flatLayer.droids[i].active){
        var calculatedPosition = _convertPositionToScreen(flatLayer.droids[i].position.x,flatLayer.droids[i].position.y,flatLayer.droids[i].position.z, flatLayer.camera);
        if(calculatedPosition.y>marginBottom){
          calculatedPosition.x = windowHalfX+((2*windowHalfY-windowHalfY)*(calculatedPosition.x-windowHalfX) / (calculatedPosition.y-windowHalfY));
          calculatedPosition.y = 2*windowHalfY;
        }
        if(calculatedPosition.y<marginTop){
          calculatedPosition.x = windowHalfX+((0-windowHalfY)*(calculatedPosition.x-windowHalfX) / (calculatedPosition.y-windowHalfY));
          calculatedPosition.y = 0;
        }
        if(calculatedPosition.x<marginLeft){
          calculatedPosition.y = windowHalfY+((0-windowHalfX)*(calculatedPosition.y-windowHalfY) / (calculatedPosition.x-windowHalfX));
          calculatedPosition.x = 0;
          offsetLeft = width/2;
        }
        if(calculatedPosition.x>marginRight){
          calculatedPosition.y = windowHalfY+((2*windowHalfX-windowHalfX)*(calculatedPosition.y-windowHalfY) / (calculatedPosition.x-windowHalfX));
          calculatedPosition.x = 2*windowHalfX;
          offsetLeft = -width/2;
        }
        //draw line
        ctx.beginPath();
        ctx.moveTo(windowHalfX, windowHalfY);
        ctx.lineTo(calculatedPosition.x, calculatedPosition.y);
        var grad= ctx.createLinearGradient(windowHalfX, windowHalfY, calculatedPosition.x, calculatedPosition.y);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0.5)");
        ctx.strokeStyle = grad;
        ctx.stroke();
        //draw timer
        if(calculatedPosition.y<=marginTop) calculatedPosition.y = calculatedPosition.y + fontHeight/2;
        if(calculatedPosition.y>=marginBottom) calculatedPosition.y = calculatedPosition.y - fontHeight/2;
        ctx.rect(calculatedPosition.x-width/2+offsetLeft, calculatedPosition.y - height/2, width, height);
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fill();
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillText( flatLayer.droids[i].timer + " sec", calculatedPosition.x+offsetLeft, calculatedPosition.y + fontHeight/2 );
        ctx.textAlign = "center";
      }
    };
  }
}
function createVector(x, y, z, camera, width, height) {
        var p = new THREE.Vector3(x, y, z);
        var vector = p.project(camera);

        vector.x = (vector.x + 1) / 2 * width;
        vector.y = -(vector.y - 1) / 2 * height;

        return vector;
    }
_convertPositionToScreen=function(x, y, z, camera){
  var p = new THREE.Vector3(x, y, z);
  var vector = p.project(camera);

  vector.x = (vector.x + 1) * textCanvas.width / 2
  vector.y = -(vector.y - 1) * textCanvas.height / 2 ;

  return vector;
}
function _resize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  textCanvas.setAttribute("width", window.innerWidth);
  textCanvas.setAttribute("height", window.innerHeight);
  textCanvas.setAttribute("style","width: " + window.innerWidth+ "px; height: " + window.innerHeight+ "px; z-index: -1;");
  this.redraw();
}

var flatLayer = {
  redraw : _redraw,
  resize: _resize,
  message: _message,
  hit: _hit
}
if (typeof(module) !== 'undefined') module.exports = flatLayer;