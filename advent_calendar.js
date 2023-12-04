//Store all the days (1 to 25)
var daysArray = [];
//Store whether the doors are open
var openDoorArray = [];
//Get today's date
var today = new Date();

createDoors();

//Create all the advent calendar doors
function createDoors() {
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
            '<div class="doorBackground" id="doorBackground' + dayToUse + '" onclick="goThroughOpenDoor(' + dayToUse + ')">' +
            '<div class="door" id="door' + dayToUse + '" onclick="toggleDoor(' + dayToUse + ')">' +
            '<p>' + dayToUse + '</p>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
}

function goThroughOpenDoor(doorNo){
    //If a door is open then go to the prize
    if (openDoorArray[doorNo]){
        const url = "prizes/prize.html?day=" + doorNo;
        window.location.href = url;
    }
}

//Toggle the open/close door animation
function toggleDoor(doorNo) {
    if (unlockDoor(doorNo) == true) {
        door = document.getElementById("door" + doorNo);
        background = document.getElementById("doorBackground" + doorNo);
        door.classList.toggle("doorOpen");
        if (openDoorArray[doorNo] == false) {
            background.style.backgroundColor = "#333";
            door.style.backgroundColor = "#aaa";
            setTimeout(
                function () {
                    openDoorArray[doorNo] = true;
                    goThroughOpenDoor(doorNo);
                }, 1200
            );
        }
        else {
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

    if (today.getDate() >= doorNo && today.getMonth() == 11) {
        isOpenable = true;
    }
    return isOpenable;
}

//Generates a random number between 0 and (limit - 1)
//This is because the input includes the 0th value
function random(limit) {
    return Math.round(Math.random() * (limit - 1));
}

//Use this function to unlock all dates for testing
function debugMode() {
    today.setDate(26);
    today.setMonth(11);
}

//Ensures that the page can work offline
UpUp.start({
    "content-url": "random_names.html",
    "assets": [
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

//Snowflake code based on:
//https://codepen.io/HektorW/pen/ZBryeV/

//Canvas to draw the snowflakes on
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
//Canvas size
let width, height;
let lastNow;
let snowflakes;
let snowflakeCounter = 0;
let maxSnowflakes;
let xForce = 0;
var windSpeed = 0.1;
var windSpeedTarget = 0;
var windTimer = 0;
var windTimerTarget = 1000;

function init() {
    snowflakes = [];
    resize();
    render(lastNow = performance.now());
}

function render(now) {
    requestAnimationFrame(render);

    const elapsed = now - lastNow;
    lastNow = now;

    ctx.clearRect(0, 0, width, height);
    //1/4 chance of generating a new snowflake if we haven't hit the limit
    if (snowflakes.length < maxSnowflakes && rand(0, 1) < 0.25) {
        snowflakes.push(new Snowflake());
    }
    //console.log("Snowflake Count: " + snowflakes.length);

    snowflakes.forEach(snowflake => snowflake.update(elapsed));

    //Only check every 1/20 ticks (ish)
    if (rand(0, 1) < 0.05) {
        //Allow a bit of room to try and prevent hunting
        if (windSpeedTarget > windSpeed + 0.01) {
            windSpeed += 0.01
        } else if (windSpeedTarget < windSpeed - 0.01) {
            windSpeed -= 0.01
        }
        //console.log("Wind speed is " + windSpeed)
    }

    //Add a horizontal force to move all the snowflakes
    if (windTimer >= windTimerTarget) {
        windSpeedTarget = rand(-0.2, 0.2);
        windTimer = 0;
        windTimerTarget = rand(700, 2000);
        //console.log("Next change: " + windTimerTarget + " windSpeedTarget: " + windSpeedTarget);
    }
    windTimer++;
}

function pause() {
    cancelAnimationFrame(render);
}
function resume() {
    lastNow = performance.now();
    requestAnimationFrame(render);
}

class Snowflake {
    constructor() {
        this.spawn();
    }

    spawn(anyY = false) {
        this.x = rand(0, width);
        this.y = anyY === true ? rand(-50, height + 50) : rand(-50, -10);
        this.xVel = 0;
        this.yVel = rand(.04, .06);
        this.size = rand(7, 15);
        this.sizeOsc = rand(.01, .5);
        this.snowflakeId = snowflakeCounter;

        snowflakeCounter++;
    }

    update(elapsed) {
        //Only check every 1/5 ticks (ish)
        if (rand(0, 1) < 0.2) {
            const xForce = rand(-0.002, 0.002);
            //Make sure xVel isn't too fast
            if (this.xVel > -0.02 && this.xVel < 0.02) {
                this.xVel += xForce;
            }
        }

        this.x += (this.xVel * elapsed) + windSpeed;
        this.y += this.yVel * elapsed;

        if (this.x + this.size < 0) {
            this.x = width;
        } else if (this.x - this.size > width) {
            this.x = 0;
        }

        //Check if snowflakes have dropped off the bottom of the page
        if (this.y - this.size > height) {
            //Search for it and remove it from the array
            let id = this.snowflakeId;
            let snowflakeIndex = snowflakes.findIndex(x => x.snowflakeId === id);
            snowflakes.splice(snowflakeIndex, 1);
        }
        this.render();
    }

    //Draw the snowflake
    render() {
        ctx.save();
        const { x, y, size } = this;
        ctx.beginPath();
        ctx.arc(x, y, size * 0.2, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();
        ctx.fillStyle = ctx.strokeStyle = '#fff';
    }
}

//Generate a random number
const rand = (min, max) => min + Math.random() * (max - min);

//Stuff to do when the canvas is resized
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    maxSnowflakes = (height * width);
    //console.log("Max snowflakes: " + maxSnowflakes);
}

window.addEventListener('resize', resize); //Check to see if the canvas has been resized
window.addEventListener('blur', pause); //Pause if the window is out of focus
window.addEventListener('focus', resume); //Resume when the window is back in focus
init();