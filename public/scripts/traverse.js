//   Main code for client (traverse directory object)

// library.json AJAX
(function () {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            infiniTree(this);
            loaded4html();
        }
    };
    xhttp.open("GET", "library.json", true);
    xhttp.send();
})();

function loaded4html() {
    (function () {
        let x = document.getElementById('menu');
        x.classList.toggle("LOADING");
        x.innerHTML = "menu";
    })();
}

const opts = {
    playFormat: [
        ".opus", ".ogg", ".mkv", ".mp3",
        ".m4a", ".wav", ".wma", ".mp4",
        ".pcm", ".aac", ".flac"
    ],
    artFormat: [
        ".jpg", ".jpeg", ".bmp",
        ".gif", ".png"
    ]
};

// Hacky way to get last scroll position in Menu
function runOnce() {
    let loadScroll = Number(localStorage.getItem("loadScroll"));
    let lock = false;

    if (loadScroll) {
        if (lock === false) {
            document.getElementById('playlists').scrollTop = loadScroll;
        }
        lock = true;
    }
}

// executed when ajax has loaded
function infiniTree(json) {

    let obj = JSON.parse(json.responseText);
    let path = []; // playlists for path location
    let node = []; // playlists for object recursion;

    window.onbeforeunload = function () {
        storage();
        return null;
    };

    function storage() {
        let a = JSON.stringify(path);
        let b = JSON.stringify(node);
        let c = document.getElementById('playlists').scrollTop;
        localStorage.setItem("path_LS", a);
        localStorage.setItem("node_LS", b);
        localStorage.setItem("loadScroll", c);
    }

    let pSave = JSON.parse(localStorage.getItem("path_LS"));
    let nSave = JSON.parse(localStorage.getItem("node_LS"));

    // base case root object]
    if (pSave.length < 1) {
        assignElement(obj);
    }
    else {
        path = pSave;
        node = nSave;
        traverse(path, node);
    }

    function traverse(path, node, c_Scroll) {
        //  get last element off the arraysss
        let cPath = path.slice(-1)[0];
        let cNode = node.slice(-1)[0];

        // clear playlists
        document.getElementById("playlists").innerHTML = "";

        // lay out current directory
        if (cNode && cPath !== 'undefined') {
            for (let i = 0; i < cNode[0].children.length; i++) {
                let element = cNode[0].children[i];
                assignElement(element);
            }
            document.getElementById('playlists').scrollTop = Number(c_Scroll);
        }

        // Back button
        if (node.length < 1) {
            let btn = document.createElement("BUTTON");
            let t = document.createTextNode("~(˘▾˘~)");
            btn.appendChild(t);
            document.getElementById("block4").innerHTML = "";
            document.getElementById("block4").appendChild(btn);
            assignElement(obj);
        } else {
            document.getElementById("block4").innerHTML = "";
            back_button();
        }
    }

    // Helper functions below
    function assignElement(element) {
        if (element.type === "directory") {
            let dir = "dir  " + element.name;
            createBtn(dir, element);
        } else {
            let file = "file " + element.name;
            createBtn(file, element);
        }
    }

    // DIRECTORY && FILE BUTTON [Generators]
    function createBtn(input, element) {

        // generic html button creation
        let btn = document.createElement("LI");
        let t = document.createTextNode(input);
        btn.appendChild(t);
        btn.setAttribute('data', element.name);

        // add event listener to get data and execute traverse again
        btn.addEventListener('click', function () {
            let data = this.getAttribute('data');

            // FILES
            if (element.type == "file") {

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
            }

            // DIRECTORY
            if (element.type === "directory") {
                // Go into Directory!!
                let c_Scroll = document.getElementById('playlists').scrollTop;
                node.push([element]);
                path.push({ "data": data, "c_Scroll": c_Scroll });
                traverse(path, node);
            }
        }, false);
        document.getElementById("playlists").appendChild(btn);
    }

    /*  EXTRA FUNCTIONS and BUTTONS */

    // Back Button
    function back_button() {
        let btn = document.createElement("BUTTON");
        let t = document.createTextNode("BACK");
        btn.appendChild(t);
        btn.setAttribute('data', 'backButton');
        btn.id = "backBtn";

        // add event listener
        btn.addEventListener('click', function () {
            let data = this.getAttribute('data');
            let parentScroll = path.slice(-1)[0];
            let c_Scroll = parentScroll.c_Scroll;

            if (data === 'backButton') {
                path.pop();
                node.pop();
                traverse(path, node, c_Scroll);
            }
        }, false);
        document.getElementById("block4").appendChild(btn);
    }

    //playlist CLEAR (double touch)
    function clearPlistBtn() {
        let btn = document.createElement("BUTTON");
        let t = document.createTextNode("Clear Plist");
        btn.appendChild(t);
        btn.setAttribute('data', "clear");
        //remove element
        document.getElementById("block2").innerHTML = "";

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
                    //alert("double");
                    socket.emit('message', 'clear');
                    location.reload();
                }
            }, false);

        document.getElementById("block2").appendChild(btn);
    } clearPlistBtn();

    // ADD TraCKs
    let addTrax = false;

    function addList() {
        let btn = document.createElement("BUTTON");
        let t = document.createTextNode("");
        btn.innerHTML = "ADD <br>" + "off";
        btn.appendChild(t);
        btn.setAttribute('data', "off");
        // remove elemnt
        document.getElementById("block3").innerHTML = "";

        // add event listener to get data and execute traverse again
        btn.addEventListener('click', function () {
            let data = this.getAttribute('data');
            if (data === "off") {
                // setter
                addTrax = true;
                // style
                this.setAttribute('data', "on");
                this.innerHTML = "ADD <br>" + "on";
                this.style.color = "limegreen";
                this.style.borderColor = "limegreen";
            } else {
                // setter
                addTrax = false;
                // style
                this.setAttribute('data', "off");
                this.innerHTML = "ADD <br>" + "off";
                this.style.color = "";
                this.style.borderColor = "rgb(119, 18, 202)";
            }
        }, false);

        document.getElementById("block3").appendChild(btn);
    } addList();
} 