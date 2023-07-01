const Compiler = require('./compiler');
const options = require('../easypack.config');

const compiler = new Compiler(options);
compiler.run();
