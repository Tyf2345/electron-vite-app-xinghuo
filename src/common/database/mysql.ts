import { createPool } from 'mysql2/promise'
import { getConfig } from '../config/configuration'

// 创建数据库连接池
export const mysqlDatabase = createPool(getConfig('MySQL'))
