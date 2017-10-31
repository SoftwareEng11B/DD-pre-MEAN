var canvas = new fabric.Canvas('canvas');
var currentlyDragging;

var canvas_options_form = $("canvas-options");
var canvas_filename = $("canvas-filename")

var cavos = document.getElementById("canvas");
var ctx_front = cavos.getContext('2d');

var canvas_back = document.getElementById("canvas_back"),
    ctx = canvas_back.getContext("2d");
    // var background = new Image();
    // background.src = "http://i.imgur.com/yf6d9SX.jpg" + '?' + new Date().getTime();
    // background.setAttribute('crossOrigin', '');
    // background.onload = function(){
    //     ctx.drawImage(background,0,0);
    // }

    // var cavos = document.getElementById("canvas");
    // //var crazy = canvas_back.getContext('2d');
    // //crazy.drawImage(cavos, 0, 0)
    // //var ctx_front = cavos.getContext("2d");
    // cavos.onload = function(){
    // document.getElementById("files").onchange = function () {
    //     var reader = new FileReader();
    //
    //     reader.onload = function(e){
    //         // get loaded data and render thumbnail.
    //         document.getElementById("image").src = e.target.result;
    //     };
    //
    //     // read the image file as a data URL.
    //     reader.readAsDataURL(this.files[0]);
    // };

    function el(id){return document.getElementById(id);} // Get elem by ID

    var testcan  = el("canvas_back");
    var context = testcan.getContext("2d");


function readImage() {
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
           var img = new Image();
           img.addEventListener("load", function() {
             context.drawImage(img, 0, 0);
           });
           img.src = e.target.result;
        };
        FR.readAsDataURL( this.files[0] );
    }
}

el("fileUpload").addEventListener("change", readImage, false);

function handleDragStart(e) {
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
    this.classList.add('img_dragging');
    currentlyDragging = e.target;
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
    // NOTE: comment above refers to the article (see top) -natchiketa

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
}

function handleDrop(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }



    // console.log('event: ', e);
    var ext = currentlyDragging.src.substr(-3);
    if (ext === 'svg') {
      fabric.loadSVGFromURL(currentlyDragging.src, function(objects, options) {
        var svg = fabric.util.groupSVGElements(objects, options);
        svg.left = e.layerX;
        svg.top = e.layerY;
        canvas.add(svg);
      });
    } else {
       var newImage = new fabric.Image(currentlyDragging, {
          width: currentlyDragging.width,
          height: currentlyDragging.height,
          // Set the center of the new object based on the event coordinates relative
          // to the canvas container.
          left: e.layerX,
          top: e.layerY
      });
      canvas.add(newImage);
    }
    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
}

if (Modernizr.draganddrop) {
    // Browser supports HTML5 DnD.

    // Bind the event listeners for the image elements
    var images = document.querySelectorAll('#images img');
    var objects = document.querySelectorAll('#images object');
    [].forEach.call(images, function (img) {
        img.addEventListener('dragstart', handleDragStart, false);
        img.addEventListener('dragend', handleDragEnd, false);
    });
    [].forEach.call(objects, function (obj) {
        obj.addEventListener('dragstart', handleDragStart, false);
        obj.addEventListener('dragend', handleDragEnd, false);
    });
    // Bind the event listeners for the canvas
    var canvasContainer = document.getElementById('canvas-container');
      var canvasContainer = document.getElementById('canvas-container');
    canvasContainer.addEventListener('dragenter', handleDragEnter, false);
    canvasContainer.addEventListener('dragover', handleDragOver, false);
    canvasContainer.addEventListener('dragleave', handleDragLeave, false);
    canvasContainer.addEventListener('drop', handleDrop, false);
} else {
// Replace with a fallback to a library solution.
    alert("This browser doesn't support the HTML5 Drag and Drop API.");
}

  //var cavos = document.getElementById("canvas");
  //var crazy = canvas_back.getContext('2d');
  //crazy.drawImage(cavos, 0, 0)
var outcan = document.getElementById("canvas_out"),
   ctx_out = outcan.getContext('2d');


//avos.background.src =
$("#save").click(function() {
  	//canvas_filename.value = canvas_filename;

       ctx_out.drawImage(testcan,0,0);
       ctx_out.drawImage(cavos,0,0);

    if(!window.localStorage){alert("This function is not supported by your browser."); return;}
var blob = new Blob([b64toBlob(outcan.toDataURL('png').replace(/^data:image\/(png|jpg);base64,/, ""),"image/png")], {type: "image/png"});
saveAs(blob, canvas_filename.value);

  console.log("hit");

});


function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
