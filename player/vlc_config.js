
module.exports = function () {

    // Vlc config file )decoupling)

    const args1 = [
        '--no-video',
        '--preferred-resolution', '720',
        '--extraintf', 'http', '--http-port', '5555',
        '--http-password', 'kaas'];

    const args2 = [
        // actual audio track test
        //'https://www.youtube.com/watch?v=GbfL4Q9bP7g',

        // dummy track to start
        'https://www.youtube.com/watch?v=Vbks4abvLEw',


        //cach options
        '--file-caching=5500',
        '--live-caching=5500',
        '--network-caching=8500',
        //'--http-caching=9000',  <-- deprecated??
        //'--http-reconnect', '1',
        '--loop'
    ];

    const argsExperimental = [

        // don't autostart on init()
        //'--no-playlist-autostart',
    ];

    let opts = args1.concat(args2, argsExperimental);
    return opts;
};