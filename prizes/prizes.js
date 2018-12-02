//Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
//Get the day to open a certain prize
const dayNumber = urlParams.get('day');
//Store the JSON data
var json = null;
//Get today's date
var today = new Date();

//Set the tab title
document.title = "Advent Calendar Day " + dayNumber;

loadPrize();

function loadPrize(){
    if (!unlockDoor(dayNumber)){
        document.body.innerHTML = "<br><br>Nice try, but you can't open this yet";
    }
    else {
        loadJSON(function(response) {
            // Parse JSON string into object
            json = JSON.parse(response);
            document.body.innerHTML = json[dayNumber-1].message;
        });
    }
}

function closeWindow(){
    window.close();
}

function unlockDoor(dayNo) {
    var isOpenable = false;

    //Uncomment to test different dates
    //today.setDate(26);
    //today.setMonth(11); //Remember here that 0 is January

    if (today.getDate() >= dayNo && today.getMonth() == 11){
        isOpenable = true;
    }
    return isOpenable;
}

//Use this function to unlock all dates for testing
function debugMode(){
    today.setDate(26);
    today.setMonth(11);
    loadPrize();
}

//Based on code from https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'prizes.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }