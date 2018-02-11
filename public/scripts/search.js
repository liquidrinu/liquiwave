// TrackSearch Fn + randomizer Fn
var array = [];

function filter(json) {

    let o = JSON.parse(json.responseText); //AJAX

    let promise = new Promise(function (resolve, reject) {
        getObject(o);
        resolve(array);
    });

    // Random trax
    promise.then(function () {
        setInterval(() => {
            let time = document.getElementById('time').innerHTML;
            let re = /\/\s00:00:00/;
            let ranArray = [];

            if (randomTrax && time.match(re)) {

                for (let i = 0; i < array.length; i++) {
                    for (let f = 0; f < opts.playFormat.length; f++) {
                        const audioExtension = opts.playFormat[f];
                        if (array[i].extension.toLowerCase() === audioExtension) {
                            let element = array[i].path;
                            ranArray.push(element);
                        }
                    }
                }
                var item = [Math.floor(Math.random() * ranArray.length)];
                socket.emit('message', ranArray[item]);
            }
        }, 10);
    });

    // Search Fn
    promise.then(
        (function () {
            let msg = document.getElementById("msg");

            // hit "enter" (return) hides mobile device keyboard
            sendCmd.addEventListener("submit", function (e) {
                e.preventDefault();
                document.getElementById("searchIn").blur();
            });

            // regex filter
            msg.addEventListener('keyup', function (e) {

                let box = document.getElementById('searchList');
                let tracksArray = [];

                let stringInput = "" + this.value;
                let regex = new RegExp(stringInput, 'gi');

                if (this.value.length < 0) {
                    box.innerHTML = "";
                }

                let promiseList = new Promise(function (resolve, reject) {
                    for (let i = 0; i < array.length; i++) {
                        //filter audio
                        for (let f = 0; f < opts.playFormat.length; f++) {
                            const audioExtension = opts.playFormat[f];
                            //create new single level array
                            if (array[i].extension.toLowerCase() === audioExtension) {
                                let name = array[i].name;
                                let path = array[i].path;
                                let ext = array[i].extension;
                                if (name.match(regex)) {
                                    tracksArray.push({ "name": name, "path": path, "extension": ext });
                                }
                            }
                        }
                    }
                    resolve(tracksArray);
                });

                promiseList.then(function () {
                    document.getElementById("searchList").innerHTML = "";
                    // limit search results to 100
                    let outputList = [];
                    let frame = "searchList";

                    for (let i = 0; i < 100; i++) {
                        let input = tracksArray[i].name;
                        let element = tracksArray[i];
                        //create html
                        createBtn(input, element, frame);
                    }
                });
            }, false);
        })()
    );

    // html generator for Search Fn
    function createBtn(input, element, frame) {

        // generic html button creation
        let div = document.createElement("DIV");
        let btn = document.createElement("LI");
        let t = document.createTextNode(input);
        btn.appendChild(t);
        div.setAttribute('data', element.type);

        var mNote = document.createTextNode("♫");
        div.appendChild(mNote);

        // add event listener
        btn.addEventListener('click', function () {
            let data = this.getAttribute('data');

            // check format
            for (let i = 0; i < opts.playFormat.length; i++) {
                const audioExtension = opts.playFormat[i];
                if (element.extension.toLowerCase() === audioExtension) {
                    if (addTrax === false) {
                        //socket.io => play file => vlc
                        socket.emit('message', element.path);
                    } else {
                        //socket.io => ADD TO VLC playList
                        socket.emit('message', 'enqueue ' + element.path);
                    }
                }
            }
        }, false);
        document.getElementById("searchList").appendChild(div);
        document.getElementById("searchList").appendChild(btn);
    }

    //search bar switch
    function searchList() {
        let btn = document.getElementById('searchFile');
        let toggle = false;

        btn.addEventListener('click',
            function touchStart() {
                let display = document.getElementById("searchList");
                display.classList.toggle("HIDE");
                // display.classList.toggle("searchList");

                if (toggle === false) {
                    btn.style.borderColor = "yellow";
                    btn.style.color = "yellow";
                    //setter
                    toggle = true;
                } else {
                    btn.style.borderColor = "";
                    btn.style.color = "";
                    //setter
                    toggle = false;
                }
            }, false);
    } searchList();
}

// create flat array with file objects
function getObject(o) {
    let result = null;
    if (o instanceof Array) {
        for (let i = 0; i < o.length; i++) {
            result = getObject(o[i]);
            if (result) {
                break;
            }
        }
    }
    else {
        for (let prop in o) {
            if (prop === "name" && o.type == "file") {
                // create new array for searching tracks
                let name = o[prop];
                let path = o.path;
                let extension = o.extension;
                array.push({ "name": name, "path": path, "extension": extension });
            }
            if (prop == 'id') {
                if (o[prop] == 1) {
                    return o;
                }
            }
            if (o[prop] instanceof Object || o[prop] instanceof Array) {
                result = getObject(o[prop]);
                if (result) {
                    break;
                }
            }
        }
    }
    return result;
}
