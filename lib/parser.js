const fs = require('fs');
const { parseSync, traverse, transformFromAstSync } = require('@babel/core');

module.exports = {
  getAST (path) {
    const source = fs.readFileSync(path, 'utf-8');
    return parseSync(source, {
      sourceType: 'module'
    });
  },
  getDependencies (ast) {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      }
    });
    return dependencies;
  },
  transform: (ast) => {
    const { code } = transformFromAstSync(ast, null, {
      presets: ['@babel/preset-env']
    });
    return code;
  }
}
