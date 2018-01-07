const { existsSync, writeFileSync, access, mkdirSync, constants } = require('fs')
const inquirer = require('inquirer')
let illegal = function (name) {
  return !/^[a-z0-9_]+?$/.test(name) || /^\d/.test(name)
}
let reg = /(replaceName)/ig;

let name, namePath;
const steps = [
  {
    type: 'input',
    name: 'name',
    message: "请输入文件的名字",
    validate: function (value) {
      access(namePath, constants.R_OK | constants.W_OK, (err) => {
        if (err && err.errno == '-2') {
          mkdirSync(namePath)
        }
      })
      if (existsSync(`${namePath}/${value}`)) {
        return '文件已经存在';
      }
      return true;
    }
  }
];
module.exports = function (ary) {
  ary.map((item, index) => {
    namePath = item.path;
    inquirer.prompt(steps).then(({ name }) => {
       item.template = item.template.replace(reg, function (all, replaceName) {
        return name.split('.')[0]
      })
      writeFileSync(`${item.path}/${name}`, item.template)
    });;
  })
}

