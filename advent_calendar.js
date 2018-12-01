for (var day = 1; day <= 25; day++) {
    document.getElementById('doors').innerHTML += 
        '<div class=\"doorContainer\">' +
            '<div class=\"doorBackground\">' +
                '<div class=\"door\" id=\"door' + day + '\" onclick=\"toggleDoor(' + day + ')\">' +
                    '<p>' + day + '</p>' +
                '</div>' +
            '</div>' +
        '</div>';
} 

function toggleDoor(doorNo){
    if (unlockDoor(doorNo) == true) {
        door = document.getElementById("door" + doorNo);
        door.classList.toggle("doorOpen");
    }
    else {
        console.log("Can't open it yet!")
    }
}

function unlockDoor(doorNo) {
    var isOpenable = false;
    //Get today's date
    const today = new Date();

    //Uncomment to test different dates
    //today.setDate(12);
    //today.setMonth(11); //Remember here that 0 is January

    if (today.getDate() >= doorNo && today.getMonth() == 11){
        isOpenable = true;
    }

    return isOpenable;
}