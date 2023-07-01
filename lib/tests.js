const { getAST, getDependencies, transform } = require('./parser');
const path = require('path');

const ast = getAST(path.resolve(process.cwd(), 'src/index.js'));
// console.log('ast: ', ast);
console.log(getDependencies(ast));
console.log(transform(ast));
