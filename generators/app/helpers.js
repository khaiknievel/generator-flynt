const _ = require('lodash')
const path = require('path')

module.exports = {
  checkValidFlyntDirectory: function (generator) {
    const dest = generator.destinationPath()
    if (!generator.fs.exists('.flynt.json')) {
      generator.log('Please make sure to run this generator in a valid Flynt project.')
      generator.env.error('.flynt.json not found!');
    }
  },
  getThemePath: function (generator) {
    // read theme name from .flynt.json
    const config = generator.fs.readJSON(generator.destinationPath('.flynt.json'))
    if (_.isEmpty(config)) {
      generator.env.error('Config not found in .flynt.json!');
    }
    if (_.isEmpty(config.themeName) || _.isEmpty(config.themePath)) {
      generator.env.error('Make sure themeName and themePath is defined in .flynt.json!');
    }
    if (path.basename(generator.contextRoot) === config.themeName) {
      return generator.destinationPath(`../${config.themeName}`)
    }

    return generator.destinationPath(`${config.themePath}/${config.themeName}/`)
  }
}
