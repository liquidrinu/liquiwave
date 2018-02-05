// requires /library.json
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
            let form = document.createElement("FORM");
            let btn = document.createElement("INPUT");

            let t = document.createTextNode("");
            btn.appendChild(t);
            btn.id = "searchIn";

            // hit enter hides mobile device keyboard
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                document.getElementById("searchIn").blur();
            });

            // add event listener 
            btn.addEventListener('keyup', function (e) {
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

                        createBtn(input, element, frame);
                    }

                });

            }, false);

            document.getElementById("data").appendChild(form).appendChild(btn);
        })()
    );

      
    function createBtn(input, element, frame) {
        // generic html button creation
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
}
