// client script to emit messages through socket.io
const socket = io();

//prevent form input element from reloading
document.getElementById("msgBox").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("msg").blur();
  let y = document.getElementById('msg');
  let z = y.value;

  if (/\!tree/.test(z)) {
    socket.emit('message', z);
    //localStorage.clear();
  } else {
    socket.emit('message', z);
  }
  document.getElementById('msg').value = "";
});

// media control buttons for vlc
function buttonPlay() {
  socket.emit('message', 'pause');
}
function buttonVolup() {
  socket.emit('message', 'volup');
}
function buttonVoldown() {
  socket.emit('message', 'voldown');
}
function buttonNormalizeVolume() {
  socket.emit('message', 'normalize');
}

// display status data from server [AJAX]
(function ajaxFn() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      statXml(this);
    }
  };

  xhttp.open("GET", "/status.xml", true);
  xhttp.overrideMimeType('text/html');
  xhttp.send();

  setTimeout(ajaxFn, 120);
})();

/*
////////////////////////////////////////////////////////////
// object tree parsed library.json
function state(json) {

  let objTree = JSON.parse(json.responseText); //AJAX
  let pathID = "/home/media/_AUDIO_/pokoes/2014 - Liquicity - Escapism";
  let z = findNode(pathID, objTree);
  console.log(z);

  // recursive search for "path"
  function findNode(path, currentNode) {
    var i,
      currentChild,
      result;

    if (path == currentNode.path) {
      return currentNode;
    } else {

      for (i = 0; currentNode.children !== undefined && i < currentNode.children.length; i += 1) {
        currentChild = currentNode.children[i];

        // Search in the current child
        result = findNode(path, currentChild);

        // Return the result if the node has been found
        if (result !== false) {
          return result;
        }
      }

      // The node has not been found and we have no more options
      return false;
    }
  }
}

socket.on('state', function (msg) {

  //console.log(array);

  let myStr = msg.split('').reverse().join('');
  myStr = myStr.split("/")[0].split('').reverse().join('');

  let newStr = msg.split(myStr)[0];
  console.log(newStr);
  if (msg) {
    console.log('true');
  }
});
/////////////////////////////////////////////////////////////// 
*/

// XML Processing, parsing parameters and placing them in divs
let format = "";

function statXml(xml) {
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xml.responseText, "text/html");
  let rootTag = xmlDoc.getElementsByTagName('root');

  if (xmlDoc) {

    let array = xmlDoc.getElementsByTagName("info");

    // loop through all meta data
    for (let i = 0; i < array.length; i++) {

      const element = array[i].getAttribute('name');

      if (element == "title") {
        document.getElementById('title').innerHTML = array[i].innerHTML;
      }
      if (element == "artist") {
        document.getElementById('artist').innerHTML = "by: " + array[i].innerHTML;
      }
      if (element == "url") {
        document.getElementById('url').innerHTML = array[i].innerHTML;
      }
      if (element == "artwork_url") {
        // let q = "http://localhost:7007/artwork.png?random=" + new Date().getTime();
        //document.getElementById('art_img').src = "http://localhost:5555/art";
      }
    }

  }

  // State Variable [declare]
  let state = xmlDoc.getElementsByTagName('state');
  let loop = xmlDoc.getElementsByTagName('loop');

  // function to get albumart 
  (function () {
    let xmlUrl = document.getElementById('url').innerHTML,
      p1 = /https:\/\/www.youtube.com\/watch\?v=/i,
      p2 = /https:\/\/youtu.be\//i;
    //artUrl = "";

    //regex for youtube ART (under construction)
    if (p1.test(xmlUrl)) {
      newUrl = xmlUrl.replace(p1, "");
    } else {
      newUrl = xmlUrl.replace(p2, "");
    }
    artUrl = 'https://img.youtube.com/vi/' + newUrl + '/0.jpg';


    //local artwork 
    if (state[0] && rootTag !== 'undefined') {
      document.getElementById('art_img').src = "icon.png";
      if (state[0].innerHTML !== 'stopped' && time !== 0) {
        if (p1.test(xmlUrl) || p2.test(xmlUrl)) {
          document.getElementById('art_img').src = artUrl;
        } else if (!p1.test(xmlUrl)) {


          ////////////////////////////////////////////

        } else {
          document.getElementById('art_img').src = "icon.png";
        }
      }
    }
  })();

  // HACKy for vlc Loop on to stop crash ughhhh
  if (state[0] && rootTag !== 'undefined') {
    if (state[0].innerHTML === 'playing' && loop[0].innerHTML == "false") {
      socket.emit('message', 'loop');
    }
    if (state[0].innerHTML === 'paused' && loop[0].innerHTML !== "false") {
      socket.emit('message', 'loop');
    }
  }

  //current time
  let current = xmlDoc.getElementsByTagName('time');
  let finished = xmlDoc.getElementsByTagName('length');

  if (current[0] && finished[0] && rootTag !== 'undefined') {
    let array = [current[0].innerHTML, finished[0].innerHTML];
    let T = [];

    array.forEach(x => {
      T.push(time(x));
    });

    let format = T[0] + ' / ' + T[1];
    document.getElementById('time').innerHTML = format;
  }

  //current volume
  let volumeStat = xmlDoc.getElementsByTagName('volume');
  if (volumeStat[0] && rootTag !== 'undefined') {
    document.getElementById('volley').innerHTML =
      "Volume =" + "\n" + volumeStat[0].innerHTML;
  }

}

// Format function used above in 'current_time' 
function time(secs) {
  let hr = Math.floor(secs / 3600);
  let min = Math.floor((secs - (hr * 3600)) / 60);
  let sec = Math.floor(secs - (hr * 3600) - (min * 60));

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (hr < 10) {
    hr = "0" + hr;
  }
  format = hr + ":" + min + ':' + sec;
  return format;
}


