// requires /library.json" =

function filter(json) {

    let o = JSON.parse(json.responseText);
    let array = [];

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

    let promise = new Promise(function (resolve, reject) {
        getObject(o);
        resolve(array);
    });

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

                let promiseList = new Promise(function (resolve, reject) {
                    for (let i = 0; i < array.length; i++) {
                        const name = array[i].name;
                        const path = array[i].path;
                        const ext = array[i].extension;
                        if (name.match(regex)) {
                            tracksArray.push({ "name": name, "path": path, "extension": ext });
                        }
                    }
                    resolve(tracksArray);
                });

                promiseList.then(function () {
                    document.getElementById("searchVIEW").innerHTML = "";
                    // limit search results to 100
                    let outputList = [];
                    let frame = "searchVIEW";

                    for (let i = 0; i < 100; i++) {
                        let input = tracksArray[i].name;
                        let element = tracksArray[i];
                        //create html
                        createBtn(input, element, frame);
                    }
                });
            }, false);
            //document.getElementById("data").appendChild(form).appendChild(btn);
        })()

    );

    // html generator
    function createBtn(input, element, frame) {
        let btn = document.createElement("LI");
        let t = document.createTextNode(input);
        btn.appendChild(t);
        btn.setAttribute('data', element.name);

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
        document.getElementById(frame).appendChild(btn);
    }

    //search bar switch (double tap)
    function searchList() {
        let btn = document.getElementById('searchFile');
        let toggle = false;

        btn.addEventListener('click',
            function touchStart() {
                let display = document.getElementById("searchList");
                display.classList.toggle("HIDE");
                display.classList.toggle("searchList");

                if (toggle === false) {
                    btn.style.borderColor = "yellow";
                    //setter
                    toggle = true;
                } else {
                    btn.style.borderColor = "darkorchid";
                    //setter
                    toggle = false;
                }
            }, false);
    } searchList();
}

//sketch  

    /*
        function search_toggle() {
            let toggle = false;
            let btn = document.getElementById('sendCmd');
    
            // add touch event (tappy.js)
            let clickTimer = null;
    
            btn.addEventListener('click',
                function touchStart() {
    
                    if (clickTimer === null) {
                        clickTimer = setTimeout(function () {
                            clickTimer = null;
                        }, 500);
                    } else {
                        clearTimeout(clickTimer);
                        let display = document.getElementById("searchList");
    
                        display.classList.toggle("HIDE");
                        display.classList.toggle("searchList");
    
                        if (toggle === false) {
                            btn.innerHTML = "Search";
                            btn.style.borderColor = "yellow";
                            document.getElementById('msgBox').setAttribute('data', "search");
                            //setters
                            clickTimer = null;
                            toggle = true;
                        } else {
                            btn.innerHTML = "Send";
                            btn.style.borderColor = "darkorchid";
                            document.getElementById('msgBox').setAttribute('data', "commands");
                            //setters
                            toggle = false;
                        }
                    }
                }, false);
        }
        //search_toggle(); */