import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { getConfig } from '../config/configuration'
import { Employee } from '../../main/entity/employee'

const dataSource = new DataSource({
  type: 'mysql',
  ...getConfig('MySQL'),
  entities: [Employee],
  synchronize: true,
  logging: false
})
await dataSource
  .initialize()
  .then(() => console.log('数据库连接成功'))
  .catch(console.error)

// 导出typeorm数据源
export const typeOrmMysqlDataSource = dataSource
