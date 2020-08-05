const numeral = require('numeral');

exports.numeralize = (num) => numeral(num).format('$0,0.00');
