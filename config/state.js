// [State]
exports = module.exports = function (msg, data) {

    if (/\/home/.test(msg)) {
        console.log(msg);
    }

};
