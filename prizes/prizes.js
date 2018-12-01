const urlParams = new URLSearchParams(window.location.search);
const dayNumber = urlParams.get('day');
console.log(dayNumber);

if (!unlockDoor(dayNumber)){
    document.body.innerHTML = "You can't open this yet";
}

document.title = "Advent Calendar Day " + dayNumber;

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
    console.log(isOpenable);
    return isOpenable;
}