// **template**  //button class change;  
function myFunction() {
    let x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// classlist toggle for menu
function dataSwitch() {
    let x = document.getElementById("dataCenter");
    let y = document.getElementById("meta");
    let z = document.getElementById("playlists");

    x.classList.toggle("HIDE");
    y.classList.toggle("HIDE");
    z.classList.toggle("HIDE");
}

// class list toggle for [searchList]
function searchSwitch() {
  let display = document.getElementById("searchList");
  display.classList.toggle("HIDE");
  display.classList.toggle("searchList");
}