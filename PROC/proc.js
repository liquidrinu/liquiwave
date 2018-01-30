// http://192.168.1.14:9615/
const url = "http://192.168.1.14:9615";

// API for PM2 process manager
(function ajaxFn() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            pm2Data(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
    setTimeout(ajaxFn, 1000);
})();


function pm2Data(json) {

    let data = JSON.parse(json.responseText);

    document.getElementById("view").innerHTML = "";

    let sys = data.system_info,
        monitor = data.monit,
        proc = data.processes;

    createDiv(sys.hostname);

    createDiv(time(sys.uptime));

    monitor.cpu.forEach(element => {
        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                const r = element[key];
                if (typeof (r) !== 'object')
                    createDiv(r);
            }

        }
    });

    // Memory
    let free = data.monit.free_mem;
    let total = data.monit.total_mem;
    createDiv("Total Memory : " + (total / 1000));
    createDiv(" Free Memory : " + (free / 1000));


    // generic html element creation
    function createDiv(input) {
        var btn = document.createElement("DIV");
        var t = document.createTextNode(input);
        btn.appendChild(t);
        //btn.setAttribute('data', input);

        // EV
        btn.addEventListener('click', function () {
            var data = this.getAttribute('data');

        }, false);

        document.getElementById("view").appendChild(btn);
    }

}

function time(secs) {
    var days = Math.floor(secs / (3600 * 24));
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (hr < 10) {
        hr = "0" + hr;
    }
    if (hr > 24) {
        hr = "00";
    }
    if (days < 10) {
        days = "0" + days;
    }
    format = days + ":" + hr + ":" + min + ':' + sec;
    return format;
}

