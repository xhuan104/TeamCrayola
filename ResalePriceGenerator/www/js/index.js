"use strict";


var message;
var department1Name = document.getElementById("department1Name");
var department2Name = document.getElementById("department2Name");
var department3Name = document.getElementById("department3Name");
var department1Price = document.getElementById("department1Price");
var department2Price = document.getElementById("department2Price");
var department3Price = document.getElementById("department3Price");
var averageMarketPrice = document.getElementById("averageMarketPrice");
var numberOfTimesWorn = document.getElementById("numberOfTimesWorn");
var resalePrice = document.getElementById("resalePrice");

// function called app used for camera functions
let app = {

    takephoto: function () {
      // set camera options 
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

        //takes 3 functions into consideration
        // 1. if it works 2. if it fails 3. options function
        navigator.camera.getPicture(app.success, app.fail, opts);

    },

    // when the takephoto function works
    success: function (imgURI) {
        console.log('testing...)');

        // if successful the message will contain imgURI
        document.getElementById('msg').textContent = imgURI;

        // set 3 image elements in html to the photo taken
        document.getElementById('photo').src = imgURI;
        document.getElementById('photo2').src = imgURI;
        document.getElementById('photo3').src = imgURI;

        // hide message
        document.getElementById('msg').style.visibility = "hidden";

        console.log(imgURI);

        // HTTP post request
        let xhr = new XMLHttpRequest();
        let url = 'https://api.clarifai.com/v2/workflows/my-model/results';
        let key = 'ebee51a2c52e46fc9a86452193adcce3';
        let data = `
        {
          "inputs": [
            {
              "data": {
                "image": {
                  "base64": "${imgURI}"
                } 
              }
            }
          ]
        }`;

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', `Key ${key}`);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(data);

        xhr.onreadystatechange = () => {
            if (this.readyState === 4 && this.status === 200) {
                // convert response to JSON object
                let data = xhr.responseText;
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
            } else {
                console.error(xhr.responseText);
            }
        }

        // post to clarifai
        // $.ajax({
        //   type: "POST",
        //   url: "https://api.clarifai.com/v2/models/e0be3b9d6a454f0493ac3a30784001ff/outputs",
        //   headers: {
        //     'Authorization': "Key ebee51a2c52e46fc9a86452193adcce3",
        //     'Content-type': 'applicaton/json'
        //   },
        //   data: // URL is a temp placeholder to test the functionality of the post request
        //     // We'll replace this url string with the image URI stored by the camera 
        //     `
        //     {
        //       "inputs": [
        //         {
        //           "data": {
        //             "image": {
        //               "url": ${imgURI}
        //             } 
        //           }
        //         }
        //       ]
        //     }`,

        //   success: function (response) {
        //     // convert response to JSON object
        //     let data = response;
        //     console.log(data);

        //     // Converting response to string 
        //     let jsonData = JSON.stringify(data)
        //     // parsing string version of response
        //     let jsonParsed = JSON.parse(jsonData);
        //     // log name attribute of top identified "object" (with highest probability) to console
        //     console.log(jsonParsed.outputs[0].data.concepts[0].name);

        //     // assigning object name to a variable to display on app interface later
        //     let nameOfObject = jsonParsed.outputs[0].data.concepts[0].name;

        //     // converting this parsed json object to string
        //     let stringNameOfObject = JSON.stringify(nameOfObject)
        //     // assigning object name as a string to html element
        //     document.getElementById("nameOfObject").innerHTML = stringNameOfObject;
        //   },

        //   fail: (err) => {
        //     console.error(err);
        //   }
        // });
    },

    fail: function (msg) {
        document.getElementById('msg').textContent = msg;
    },

    // into imgURI
    test: function () {
        // post request to clarifai.com

    }
};

document.addEventListener('deviceready', app.init);

function clearPhoto() {
    document.getElementById('photo').src = "img/appLogo.png";
};

// checkPriceClick function is called when the user wants to check their items price
// generates all information about the item
function checkPriceClick() {

    // store a list of departments in an array
    var departments = ["Dillards:",
        "Macys:",
        "Amazon:",
        "Nordstrom:",
        "Sears:",
        "JCPenny:",
        "TJMaxx:",
        "Ross:",
        "Marshalls:",
        "Walmart:",
        "Target:"];


    // shuffle function ensures that the department will not be chosen more than once
    function shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    // set the random variable to the shuffle function, supply it with the department array
    var random = shuffle(departments);

    // set each of the departments in html to a department name
    department1Name.innerHTML = departments[0];
    department2Name.innerHTML = departments[1];

    department3Name.innerHTML = departments[2];


    // call the price function
    priceFunction();

}


// pricefunction is used to indicate which function holding formulas should be called depending on the item category
function priceFunction() {

    // calling this function for demo purposes 
    generatePriceTopsBottoms();

    /* these if statements would have been used if the api worked, it would call a specific function depending 
    on the items category
     if(stringNameOfObject == "shirt" || stringNameOfObject == "shorts" || stringNameOfObject == "pants")
     {
      generatePriceTopsBottoms();
     }
    else if (stringNameOfObject == "dress")
    {
        generatePriceDresses();

    }
    else if(stringNameOfObject == "earrings" || stringNameOfObject == "hat" || stringNameOfObject == "necklace")
    {
        generatePriceAccessories();

    }
    else if(stringNameOfObject == "shoes")
    {
        generatePriceShoes();

    }
    */

}

// this function is used when the api identifies shoes 
function generatePriceShoes() {

    // formula to determine current department prices
    // the highest price a shoe can be is 100, lowest is 65
    var price1 = Math.random() * (100 - 65) + 65;
    var price2 = Math.random() * (100 - 65) + 65;
    var price3 = Math.random() * (100 - 65) + 65;

    // set each of the department's prices the randomly generated price 
    department1Price.innerHTML = "$" + price1.toFixed(2);
    department2Price.innerHTML = "$" + price2.toFixed(2);
    department3Price.innerHTML = "$" + price3.toFixed(2);

    // formula to determine average market price
    var averagePrice = (price1 + price2 + price3) / 3;

    averageMarketPrice.innerHTML = "$" + averagePrice.toFixed(2);


    // formula to determine number of times worn
    // shoes can be worn up 100 times
    numberOfTimesWorn.innerHTML = (Math.random() * (100 - 1) + 1).toFixed(0);



    // if statements to determine formula needed for final resale price depending on the number of times worn
    // depending on the range the number of times worn falls into, the final resale price will be a percentage
    // of the avg market price 
    if (numberOfTimesWorn.innerHTML > 0 && numberOfTimesWorn.innerHTML <= 10) {
        resalePrice.innerHTML = "$" + (averagePrice * .85).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 10 && numberOfTimesWorn.innerHTML <= 30) {
        resalePrice.innerHTML = "$" + (averagePrice * .80).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 30 && numberOfTimesWorn.innerHTML <= 45) {
        resalePrice.innerHTML = "$" + (averagePrice * .7).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 45 && numberOfTimesWorn.innerHTML <= 60) {
        resalePrice.innerHTML = "$" + (averagePrice * .60).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 60 && numberOfTimesWorn.innerHTML <= 70) {
        resalePrice.innerHTML = "$" + (averagePrice * .50).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 70 && numberOfTimesWorn.innerHTML <= 80) {
        resalePrice.innerHTML = "$" + (averagePrice * .40).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 80) {
        resalePrice.innerHTML = "$" + (averagePrice * .35).toFixed(2);
    }


}

// this function is used when the api identifies shirts or bottoms
function generatePriceTopsBottoms() {

    // formula to determine department prices
    // tops and bottoms can be priced by departments between 20-45 dollars
    var price1 = Math.random() * (45 - 20) + 20;
    var price2 = Math.random() * (45 - 20) + 20;
    var price3 = Math.random() * (45 - 20) + 20;

    // set each of the department's prices the randomly generated price 
    department1Price.innerHTML = "$" + price1.toFixed(2);
    department2Price.innerHTML = "$" + price2.toFixed(2);
    department3Price.innerHTML = "$" + price3.toFixed(2);

    // formula to determine average market price
    var averagePrice = (price1 + price2 + price3) / 3;

    averageMarketPrice.innerHTML = "$" + averagePrice.toFixed(2);


    // formula to determine number of times worn; tops and bottoms can typically be worn up to 45 times before 
    // they can no longer be sold
    numberOfTimesWorn.innerHTML = (Math.random() * (45 - 1) + 1).toFixed(0);



    // if statements to determine formula needed for final resale price
    // depending on the range the number of times worn falls into, the final resale price will be a percentage
    // of the avg market price 
    if (numberOfTimesWorn.innerHTML > 0 && numberOfTimesWorn.innerHTML <= 5) {
        resalePrice.innerHTML = "$" + (averagePrice * .80).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 5 && numberOfTimesWorn.innerHTML <= 15) {
        resalePrice.innerHTML = "$" + (averagePrice * .75).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 15 && numberOfTimesWorn.innerHTML <= 20) {
        resalePrice.innerHTML = "$" + (averagePrice * .65).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 20 && numberOfTimesWorn.innerHTML <= 35) {
        resalePrice.innerHTML = "$" + (averagePrice * .50).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 35 && numberOfTimesWorn.innerHTML <= 40) {
        resalePrice.innerHTML = "$" + (averagePrice * .40).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 40) {
        resalePrice.innerHTML = "$" + (averagePrice * .35).toFixed(2);
    }

}

// this function is used when the api identifies accessories 
function generatePriceAccessories() {

    // formula to determine department prices; departments typically price items between 15 to 35 dollars
    var price1 = Math.random() * (35 - 15) + 15;
    var price2 = Math.random() * (35 - 15) + 15;
    var price3 = Math.random() * (35 - 15) + 15;


    // set each of the department's prices the randomly generated price 
    department1Price.innerHTML = "$" + price1.toFixed(2);
    department2Price.innerHTML = "$" + price2.toFixed(2);
    department3Price.innerHTML = "$" + price3.toFixed(2);

    // formula to determine average market price
    var averagePrice = (price1 + price2 + price3) / 3;

    averageMarketPrice.innerHTML = "$" + averagePrice.toFixed(2);


    // formula to determine number of times worn; accessories can be worn up to 45 times before no longer of value
    numberOfTimesWorn.innerHTML = (Math.random() * (45 - 1) + 1).toFixed(0);


    // if statements to determine formula needed for final resale price
    // depending on the range the number of times worn falls into, the final resale price will be a percentage
    // of the avg market price 
    if (numberOfTimesWorn.innerHTML > 0 && numberOfTimesWorn.innerHTML <= 10) {
        resalePrice.innerHTML = "$" + (averagePrice * .70).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 10 && numberOfTimesWorn.innerHTML <= 25) {
        resalePrice.innerHTML = "$" + (averagePrice * .60).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 25 && numberOfTimesWorn.innerHTML <= 35) {
        resalePrice.innerHTML = "$" + (averagePrice * .50).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 35 && numberOfTimesWorn.innerHTML <= 40) {
        resalePrice.innerHTML = "$" + (averagePrice * .40).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 40) {
        resalePrice.innerHTML = "$" + (averagePrice * .35).toFixed(2);
    }
}


// function is used when the api identifies dresses
function generatePriceDresses() {

    // formula to determine department prices; departments typically price dresses between 30-55 dollars
    var price1 = Math.random() * (55 - 30) + 30;
    var price2 = Math.random() * (55 - 30) + 30;
    var price3 = Math.random() * (55 - 30) + 30;

    // set each of the department's prices the randomly generated price 
    department1Price.innerHTML = "$" + price1.toFixed(2);
    department2Price.innerHTML = "$" + price2.toFixed(2);
    department3Price.innerHTML = "$" + price3.toFixed(2);

    // formula to determine average market price
    var averagePrice = (price1 + price2 + price3) / 3;

    averageMarketPrice.innerHTML = "$" + averagePrice.toFixed(2);


    // formula to determine number of times worn
    numberOfTimesWorn.innerHTML = (Math.random() * (45 - 1) + 1).toFixed(0);




    // if statements to determine formula needed for final resale price
    // depending on the range the number of times worn falls into, the final resale price will be a percentage
    // of the avg market price 
    if (numberOfTimesWorn.innerHTML > 0 && numberOfTimesWorn.innerHTML <= 5) {
        resalePrice.innerHTML = "$" + (averagePrice * .80).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 5 && numberOfTimesWorn.innerHTML <= 15) {
        resalePrice.innerHTML = "$" + (averagePrice * .75).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 15 && numberOfTimesWorn.innerHTML <= 20) {
        resalePrice.innerHTML = "$" + (averagePrice * .65).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 20 && numberOfTimesWorn.innerHTML <= 35) {
        resalePrice.innerHTML = "$" + (averagePrice * .50).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 35 && numberOfTimesWorn.innerHTML <= 40) {
        resalePrice.innerHTML = "$" + (averagePrice * .40).toFixed(2);
    }
    else if (numberOfTimesWorn.innerHTML > 40) {
        resalePrice.innerHTML = "$" + (averagePrice * .35).toFixed(2);
    }
}













