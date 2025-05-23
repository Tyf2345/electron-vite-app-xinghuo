import { sqliteDatabse } from '../../../common/database/sqlite'

interface User {
  id: number
  name: string
}

function createTable(): void {
  sqliteDatabse.exec(`
    CREATE TABLE IF NOT EXISTS users(
     id INTEGER PRIMARY KEY,
     name TEXT
    ) STRICT`)
}

//新增
export const testCreate = (name: string): boolean => {
  createTable()

  const insert = sqliteDatabse.prepare(`INSERT INTO users (id, name) VALUES (?,?)`)
  insert.run(null, name)
  return true
}

// 查询全部
export const testGetAll = (): User[] => {
  createTable()
  const users = sqliteDatabse.prepare('SELECT * FROM users')
  return users.all() as unknown as User[]
}

// 更新
export const testUpdate = (id: number, name: string): boolean => {
  createTable()

  const update = sqliteDatabse.prepare('UPDATE users SET name = ? WHERE id = ?')
  update.run(name, id)
  return true
}

// 删除
export const testDel = (ids: number[]): boolean => {
  createTable()
  const del = sqliteDatabse.prepare('DELETE FROM users WHERE id = ?')
  ids.forEach((id) => del.run(id))
  return true
}
