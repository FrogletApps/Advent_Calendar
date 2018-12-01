const urlParams = new URLSearchParams(window.location.search);
const dayNumber = urlParams.get('day');
var json = null;

document.title = "Advent Calendar Day " + dayNumber;

if (!unlockDoor(dayNumber)){
    document.body.innerHTML = "Nice try, but you can't open this yet";
}
else {
    loadJSON(function(response) {
        // Parse JSON string into object
          json = JSON.parse(response);
          document.body.innerHTML = json[dayNumber].message;
       });
}

function unlockDoor(dayNo) {
    var isOpenable = false;
    //Get today's date
    const today = new Date();

    //Uncomment to test different dates
    //today.setDate(26);
    //today.setMonth(11); //Remember here that 0 is January

    if (today.getDate() >= dayNo && today.getMonth() == 11){
        isOpenable = true;
    }
    return isOpenable;
}

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