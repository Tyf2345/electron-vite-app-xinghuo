import { QueryResult } from 'mysql2'
import { mysqlDatabase } from '../../../common/database/mysql'

// 查询用户
export const getMysqlUser = async (): Promise<QueryResult> => {
  const [rows] = await mysqlDatabase.query('SELECT * FROM users')
  return rows
}

// 新增用户
export const createMysqlUser = async (name: string): Promise<QueryResult> => {
  const [rows] = await mysqlDatabase.query('INSERT INTO users (name) VALUES (?)', [name])
  return rows
}

// 更新用户
export const updateMysqlUser = async (id: number, name: string): Promise<QueryResult> => {
  const [rows] = await mysqlDatabase.query('UPDATE users SET name = ? WHERE id = ?', [name, id])
  return rows
}

// 删除用户
export const deleteMysqlUser = async (id: number[]): Promise<QueryResult> => {
  const [rows] = await mysqlDatabase.query('DELETE FROM users WHERE id IN (?)', [id[0]])
  return rows
}
