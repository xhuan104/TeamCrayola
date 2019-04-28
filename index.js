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

    // need the imgURI for the post request
    // ...

  success: function(imgURI){
      document.getElementById('msg').textContent = imgURI; 
      document.getElementById('photo').src = imgURI;
      document.getElementById('photo2').src = imgURI;
      document.getElementById('photo3').src = imgURI;
      document.getElementById('msg').style.visibility = "hidden";

      // attempting to convert Image URI to an object that Clarifai can read and store to 
      // their own image hosting service.
      // app.inputs.create({
      //   base64: imgURI
      //   }).then(
      //     function(response) {
      //       // do something with response
      //     },
      //     function(err) {
      //       // there was an error
      //     }
      //   );
  },

  fail: function(msg){
    document.getElementById('msg').textContent = msg; 
  },

  // into imgURI
  test: function() {
    // post request to clarifai.com
    $.ajax({
      type: "POST",
      url: "https://api.clarifai.com/v2/models/e0be3b9d6a454f0493ac3a30784001ff/outputs",
      headers: {
        'Authorization': "Key ebee51a2c52e46fc9a86452193adcce3",
        'Content-type': 'applicaton/json'
      },
      data: // URL is a temp placeholder to test the functionality of the post request
      // We'll replace this url string with the image URI stored by the camera 
      `
      {
        "inputs": [
          {
            "data": {
              "image": {
                "url": "imageURI"
              } 
            }
          }
        ]
      }`,
      // **Above** URL responds fine with a URL of an image, but not yet with
      // an Image URI captured by an iphone

      
      success: function (response) {
        // convert response to JSON object
        let data = response;
        console.log(data);

        // Converting response to string 
        let jsonData = JSON.stringify(data)
        // parsing string version of response
        let jsonParsed = JSON.parse(jsonData);
        // log name attribute of top identified "object" (with highest probability) to console
        console.log(jsonParsed.outputs[0].data.concepts[0].name);

        // assigning object name to a variable to display on app interface later
        let nameOfObject = jsonParsed.outputs[0].data.concepts[0].name;
        
        // converting this parsed json object to string
        let stringNameOfObject = JSON.stringify(nameOfObject)
        // assigning object name as a string to html element
        document.getElementById("nameOfObject").innerHTML = stringNameOfObject;
      },
    });
  }
};


document.addEventListener('deviceready', app.init);












