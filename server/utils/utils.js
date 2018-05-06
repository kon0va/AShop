import fs from 'fs'
import crypto from 'crypto'

function md5File (path) {
  return new Promise((resolve, reject) => {
    try {
      var rs = fs.createReadStream(path)
      var hash = crypto.createHash('md5')
      rs.on('data', hash.update.bind(hash))

      rs.on('end', function () {
        resolve(hash.digest('hex'))
      })
    } catch (e) {
      reject(e)
    }
  })
}

function getIPAdress () {
  let interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    let iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

function getClientIp (req) {
  const { connection, socket } = req
  return req.headers['x-forwarded-for'] ||
  (connection && connection.remoteAddress) ||
  (socket && socket.remoteAddress) ||
  (connection && connection.socket && connection.remoteAddress) || ''
}

module.exports = {
  md5File,
  getIPAdress,
  getClientIp
}
