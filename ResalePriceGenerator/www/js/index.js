"use strict";


var message;

let app = {

    takephoto: function () {
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

    success: function (imgURI) {
        document.getElementById('msg').textContent = imgURI;
        document.getElementById('photo').src = imgURI;
        document.getElementById('photo2').src = imgURI;
        document.getElementById('photo3').src = imgURI;
        document.getElementById('msg').style.visibility = "hidden";

        // post to clarifai
        $.ajax({
            type: "POST",
            url: "https://api.clarifai.com/v2/models/e0be3b9d6a454f0493ac3a30784001ff/outputs",
            headers: {
                'Authorization': "Key ebee51a2c52e46fc9a86452193adcce3",
                'Content-type': 'applicaton/json'
            },
            data: `
      {
        "inputs": [
          {
            "data": {
              "image": {
                "url": "data:image/jpeg;base64,${imgURI}";
              } 
            }
          }
        ]
      }`,
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
            fail: function (response) {
                // failed
            }
        });
    },

    fail: function (msg) {
        document.getElementById('msg').textContent = msg;
    }
};

function clearPhoto() {
    document.getElementById('photo').src = "img/appLogo.png";
};

// only camera and API, no formula codes












