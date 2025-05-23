import { existsSync, mkdirSync } from 'fs'
import { DatabaseSync } from 'node:sqlite'
import { join } from 'path'
import { getConfig } from '../config/configuration'

const dir = join(getConfig('SQLite')['path'])

if (!existsSync(dir)) {
  mkdirSync(dir, {
    // 允许创建多层级文件夹
    recursive: true
  })
}
export const sqliteDatabse = new DatabaseSync(join(dir, 'test.db'))
