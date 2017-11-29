var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});

var layer = new Konva.Layer();

var rect = new Konva.Rect({
  x: 0,
  y: 0,
  width: 400,
  height: 400,
  fill: '#fff',
  stroke: 'black',
  strokeWidth: 2
});

// add the shape to the layer
layer.add(rect);

// add the layer to the stage
stage.add(layer);


// add image
var imageObj = new Image();
imageObj.onload = function () {

  var yoda = new Konva.Image({
    x: 500,
    y: 50,
    image: imageObj,
    width: 150,
    height: 150,
    draggable: true
  });

  // add the shape to the layer
  layer.add(yoda);

  // add the layer to the stage
  stage.add(layer);
};
imageObj.src = 'images/image.png';


// some text

var textNode = new Konva.Text({
  text: 'Some text here',
  x: 500,
  y: 10,
  fontSize: 24,
  draggable: true,
  fill: '#835773'
});

layer.add(textNode);
layer.draw();

// textarea

textNode.on('dblclick', () => {
  // create textarea over canvas with absolute position

  // first we need to find its positon
  var textPosition = textNode.getAbsolutePosition();
  var stageBox = stage.getContainer().getBoundingClientRect();

  var areaPosition = {
    x: textPosition.x + stageBox.left,
    y: textPosition.y + stageBox.top
  };


// create textarea and style it
  var textarea = document.createElement('textarea');
  document.body.appendChild(textarea);

  textarea.value = textNode.text();
  textarea.style.position = 'absolute';
  textarea.style.top = areaPosition.y + 'px';
  textarea.style.left = areaPosition.x + 'px';
  textarea.style.width = textNode.width();

  textarea.focus();


  textarea.addEventListener('keydown', function (e) {
    // hide on enter
    if (e.keyCode === 13) {
      textNode.text(textarea.value);
      layer.draw();
      document.body.removeChild(textarea);
    }
  });
});