if (typeof TextDecoder === 'undefined') {
    global.TextDecoder = require('util').TextDecoder;
}

if (typeof TextEncoder === 'undefined') {
    global.TextEncoder = require('util').TextEncoder;
}
require('text-encoding').TextDecoder;