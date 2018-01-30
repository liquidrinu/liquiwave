module.exports = function (vlcPort, vlcPasswd) {

    // vlc command [args]
    const args1 = [
        '--no-video',
        '--preferred-resolution', '720',
        '--extraintf', 'http', '--http-port', vlcPort,
        '--http-password', vlcPasswd];

    const args2 = [
        // dummy track to start
        'https://www.youtube.com/watch?v=Vbks4abvLEw',
        '--loop',

        //cache options
        '--file-caching=5500',
        '--live-caching=5500',
        '--network-caching=8500'

        //'--http-caching=9000',  <-- deprecated??
        //'--http-reconnect', '1',
    ];

    const argsExperimental = [
        //'--no-playlist-autostart',  
    ];

    let opts = args1.concat(args2, argsExperimental);
    return opts;
};