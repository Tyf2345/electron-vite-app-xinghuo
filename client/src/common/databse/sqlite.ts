import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { getConfig } from '../config/configuration'
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { Test } from '../../main/entities/test';

const sqliteConfig = getConfig('SQL_CONFIG')['SQLite']

// 确保 data 目录存在
const dataDir = join(process.cwd(), sqliteConfig.database.split('/')[0]);
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}
console.log(join(process.cwd(), 'src', 'main', 'entities', '*.ts'))
const dataSource = new DataSource({
  ...sqliteConfig,
  entities: [Test],
  synchronize: true, // 自动同步数据库结构
})

let initialized = false

export const SqliteDataSource = {
  ...dataSource,
  async initialize() {
    if (!initialized) {
      try {
        await dataSource.initialize()
        console.log('数据库连接成功')
        initialized = true
      } catch (error) {
        console.error('数据库连接失败', error)
        throw error
      }
    }
    return dataSource
  }
}
