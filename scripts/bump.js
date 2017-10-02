
const writeFile = require('write')
function setDate() {
  var data = require('../package.json');
  data.lastUpdated = new Date().toISOString();
  return writeFile.sync('./package.json', JSON.stringify(data, null, 2));
}

setDate();