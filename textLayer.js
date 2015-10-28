windowHalfX = window.innerWidth / 2;
windowHalfY = window.innerHeight / 2;
textCanvas = document.createElement( 'canvas' );
textCanvas.setAttribute("width", window.innerWidth);
textCanvas.setAttribute("height", window.innerHeight);
textCanvas.setAttribute("style","width: " + window.innerWidth+ "px; height: " + window.innerHeight+ "px; z-index: -1;");
document.body.appendChild( textCanvas );

var ctx=textCanvas.getContext("2d");

_redraw = function( ){
  ctx.font="15px munroregular";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  if (this.health && this.maxHealth) ctx.fillText( this.health + " / " + this.maxHealth, windowHalfX, windowHalfY+70 );
  _drawDroids();
}
_drawDroids = function(){
  if(textLayer.droids){
    var width = 60;
    var height = 20;
    var fontHeight = 15;
    var offsetLeft = 0;
    var marginRight = 2*windowHalfX - width/2;
    var marginLeft = width/2;
    var marginBottom = 2*windowHalfY - height/2;
    var marginTop = height/2;

    ctx.font= fontHeight + "px munroregular";
    for (var i = 0; i < textLayer.droids.length; i++) {
      if (textLayer.droids[i].active){
        var calculatedPosition = _convertPositionToScreen(textLayer.droids[i].position, textLayer.camera);
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
        ctx.fillText( textLayer.droids[i].timer + " sec", calculatedPosition.x+offsetLeft, calculatedPosition.y + fontHeight/2 );
        ctx.textAlign = "center";
      }
    };
  }
}
_convertPositionToScreen=function(position, camera){
  var pos = position.clone();
  projScreenMat = new THREE.Matrix4();
  projScreenMat.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
  projScreenMat.multiplyVector3( pos );

  return { x: ( pos.x + 1 ) * textCanvas.width / 2 ,
         y: ( - pos.y + 1) * textCanvas.height / 2  };
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