//Store all the days (1 to 25)
var daysArray = [];

//Add all the days into an array
for (var day = 1; day <= 25; day++) {
    daysArray.push(day);
}

//Remove the days from the array in random order and create doors to put them on
for (var day = 1; day <= 25; day++) {
    const dayPosition = random(daysArray.length); //Get a random value from the array
    const dayToUse = daysArray[dayPosition];
    daysArray.splice(dayPosition, 1); //Remove this value from the array

    document.getElementById('doors').innerHTML += 
        '<div class=\"doorContainer\">' +
            '<div class=\"doorBackground\">' +
                '<div class=\"door\" id=\"door' + dayToUse + '\" onclick=\"toggleDoor(' + dayToUse + ')\">' +
                    '<p>' + dayToUse + '</p>' +
                '</div>' +
            '</div>' +
        '</div>';
} 

//Toggle the open/close door animation
function toggleDoor(doorNo){
    if (unlockDoor(doorNo) == true) {
        door = document.getElementById("door" + doorNo);
        door.classList.toggle("doorOpen");
    }
    else {
        console.log("Can't open it yet!");
    }
}

//Choose when to lock the door
function unlockDoor(doorNo) {
    var isOpenable = false;
    //Get today's date
    const today = new Date();

    //Uncomment to test different dates
    today.setDate(30);
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