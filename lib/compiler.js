const { getAST, getDependencies, transform } = require('./parser');
const path = require('path');
const fs = require('fs');

class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run () {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);

    this.modules.forEach((module) => {
      module.dependencies.forEach((dependecy) => {
        this.modules.push(this.buildModule(dependecy));
      });
    });

    this.emitFiles();
  }

  buildModule (filename, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAST(filename);
    } else {
      const absolutePath = path.resolve(process.cwd(), 'src', filename);
      ast = getAST(absolutePath);
    }

    return {
      filename,
      dependencies: getDependencies(ast),
      source: transform(ast)
    }
  }

  emitFiles () {
    const outputPath = path.resolve(this.output.path, this.output.filename);

    const modules = this.modules.reduce((ret, module) => {
      ret+= `'${module.filename}': function (module, exports, require) {${module.source}},`;
      return ret;
    }, '');

    const bundle = `(function (__modules) {
      const installedModules = {};
      function __easypack_require__ (filename) {
        if (installedModules[filename]) {
          return installedModules[filename].exports;
        }
        const module = installedModules[filename] = { exports: {} };
        __modules[filename](module, module.exports, __easypack_require__);
        return module.exports;
      }
      __easypack_require__('${this.entry}');
    })({${modules}})`;

    fs.writeFileSync(outputPath, bundle, 'utf-8');
  }
}

module.exports = Compiler;
