'use strict';

const { onConnect } = require('./hanldlers/connect')
const { onDisconnect } = require('./hanldlers/disconnect')
const { onCrud } = require('./hanldlers/crud')

module.exports = {
  onConnect,
  onDisconnect,
  onCrud
}
