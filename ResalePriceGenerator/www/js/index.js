"use strict";

/*var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    }
};
*/

/*
let app = {
  init: function (){
    document.getElementById('cameraTakePicture').addEventListener('click', app.takephoto)
  },
  takephoto: function(){
    let opts = {
      quality: 80,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA, 
      mediaType: Camera.MediaType.PICTURE,
      encodingType: Camera.EncodingType.JPEG,
      cameraDirection: Camera.Direction.BACK,
      targetWidth: 300,
      targetHeight: 400
    };
    navigator.camera.getPicture(app.ftw, app.wtf, opts);
    },

  ftw: function(imgURI){
      document.getElementById('msg').textContent = imgURI; 
      document.getElementById('photo').src = imgURI; 
  },
  wtf: function(msg){
    document.getElementById('msg').textContent = msg; 
  }
}

document.addEventListener('deviceready',app.init);
    

app.init();
*/

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}

// document.getElementById("cameraTakePicture").addEventListener('click', openCamera);

function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}


function openCamera(selector) {

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        displayImage(imageUri);
        // You may choose to copy the picture, save it somewhere, or upload.
        func(imageUri);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function displayImage(imgUri) {

    var elem = document.getElementById('imageFile');
    elem.src = imgUri;
}
