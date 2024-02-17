const colors = require('colors');

module.exports = class Internal {
    Output(message, type) {
      if (type == "Info") console.log(colors.green("[✓]: "+message))
      if (type == "Warn") console.log(colors.yellow("[?]: "+message))
      if (type == "Error") console.log(colors.red("[✕]: "+message))
    }
}

