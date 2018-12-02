//Store all the days (1 to 25)
var daysArray = [];
//Store whether the doors are open
var openDoorArray = [];
//Get today's date
var today = new Date();

createDoors();

//Create all the advent calendar doors
function createDoors(){
    //Add all the days into an array
    for (var day = 1; day <= 25; day++) {
        daysArray.push(day);
    }

    //Initial door open value
    for (var day = 0; day <= 25; day++) {
        openDoorArray.push(false);
    }

    //Remove the days from the array in random order and create doors to put them on
    for (var day = 1; day <= 25; day++) {
        const dayPosition = random(daysArray.length); //Get a random value from the array
        const dayToUse = daysArray[dayPosition];
        daysArray.splice(dayPosition, 1); //Remove this value from the array

        document.getElementById('doors').innerHTML += 
            '<div class="doorContainer">' +
                '<div class="doorBackground" id="doorBackground' + dayToUse + '">' +
                    '<div class="door" id="door' + dayToUse + '" onclick="toggleDoor(' + dayToUse + ')">' +
                        '<p>' + dayToUse + '</p>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }
}

//Toggle the open/close door animation
function toggleDoor(doorNo){
    if (unlockDoor(doorNo) == true) {
        door = document.getElementById("door" + doorNo);
        background = document.getElementById("doorBackground" + doorNo);
        door.classList.toggle("doorOpen");
        if (openDoorArray[doorNo] == false){
            background.style.backgroundColor = "#333";
            door.style.backgroundColor = "#aaa";
            setTimeout( 
                function(){ 
                    const url = "prizes/prize.html?day=" + doorNo;
                    window.open(url);
                    openDoorArray[doorNo] = true;
                }, 500
            );
        }
        else{
            openDoorArray[doorNo] = false;
            background.style.backgroundColor = "transparent";
            door.style.backgroundColor = "rgba(136, 136, 136, 30%)";
        }
    }
    else {
        window.alert("You can't open it yet!");
    }
}

//Choose when to lock the door
function unlockDoor(doorNo) {
    var isOpenable = false;

    //Uncomment to test different dates
    //today.setDate(26);
    //today.setMonth(11); //Remember here that 0 is January

    if (today.getDate() >= doorNo && today.getMonth() == 11){
        isOpenable = true;
    }
    return isOpenable;
}

//Generates a random number between 0 and (limit - 1)
//This is because the input includes the 0th value
function random(limit){
    return Math.round(Math.random()*(limit - 1));
}

//Use this function to unlock all dates for testing
function debugMode(){
    today.setDate(26);
    today.setMonth(11);
}

//Ensures that the page can work offline
UpUp.start({
    "content-url": "random_names.html",
    "assets":[
        "advent_calendar.css",
        "advent_calendar.js",
        "background.jpg",
        "doors.html",
        "prizes/prize.html",
        "prizes/prizes.css",
        "prizes/prizes.js",
        "prizes/prizes.json"
    ]
});