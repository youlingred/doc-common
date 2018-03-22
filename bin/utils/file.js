"use strict"
const fs = require('fs')
const save = require('file-save');
const yaml = require('js-yaml');

exports.default = module.exports = {
    save: {
        dir:path=>{
          if(!fs.existsSync(path)){
              fs.mkdirSync(path);
          }
        },
        objToJson: (obj, dest) => {
            save(dest).write(JSON.stringify(obj), 'utf8');
        },
        objToYaml: (obj, dest) => {
            save(dest).write(yaml.safeDump(obj), 'utf8');
        },
    }
}