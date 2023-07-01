const path = require('path');

module.exports = {
  entry: path.resolve(process.cwd(), 'src/index.js'),
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'main.js'
  }
}
