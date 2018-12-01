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
    door = document.getElementById("door" + doorNo);
    door.classList.toggle("doorOpen");
}