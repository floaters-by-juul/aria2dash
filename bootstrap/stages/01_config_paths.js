import { CACHE_DIR } from '../index'
import { bootStage, mkDirIfNotExist } from '../utils'

const paths = [{ friendlyName: 'cache', path: CACHE_DIR }]

function makeSureNecessaryPathsExist() {
  for (const item of paths) {
    mkDirIfNotExist(item.friendlyName, item.path)
  }
}

const stage = bootStage(__filename, makeSureNecessaryPathsExist)

export default stage
