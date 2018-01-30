// **template**  //button class change;  
function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// classlist toggle for menu
function dataSwitch() {
    var x = document.getElementById("dataCenter");
    var y = document.getElementById("meta");
    var z = document.getElementById("playlists");

    x.classList.toggle("HIDE");
    y.classList.toggle("HIDE");
    z.classList.toggle("HIDE");
}