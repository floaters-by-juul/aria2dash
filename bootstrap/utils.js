const fs = require('fs')

/**
 * Creates a directory if it does not exist at the supplied path
 * @param {string} friendlyName
 * @param {string} path
 */
export function mkDirIfNotExist(friendlyName, path) {
  try {
    fs.statSync(path)
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e
    }

    return
  }

  console.warn(`Creating directory for ${friendlyName} at ${path}`)

  fs.mkdirSync(path)
}

/**
 *
 * @param {string} name
 * @param {Function} cb
 * @returns {Promise<any>}
 */
export function bootStage(name, cb) {
  return new Promise((resolve, reject) => {
    try {
      resolve(cb())
    } catch (e) {
      reject(e)
    }
  })
}
