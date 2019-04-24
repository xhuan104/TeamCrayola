"use strict";


var message; 

let app = {

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
    navigator.camera.getPicture(app.success, app.fail, opts);

    },

  success: function(imgURI){
      document.getElementById('msg').textContent = imgURI; 
      document.getElementById('photo').src = imgURI;
      document.getElementById('photo2').src = imgURI;
      document.getElementById('photo3').src = imgURI;
      document.getElementById('msg').style.visibility = "hidden";

  },
  fail: function(msg){
    document.getElementById('msg').textContent = msg; 
  }
};

document.addEventListener('deviceready', app.init);

function clearPhoto() {
    document.getElementById('photo').src = "img/logo.png";
}












