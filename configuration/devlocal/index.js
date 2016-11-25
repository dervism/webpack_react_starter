const merge = require('lodash/merge');

const devlocal = {
    HELLO_WORLD: 'Hello, world!'
};
module.exports = merge({}, require('../default'), devlocal);