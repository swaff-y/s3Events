const Logger = require('./Logger');

module.exports = class SplitCamelCase{
  splitCamelCase(str){
    if(typeof str !== "string") return str;
    let string = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}