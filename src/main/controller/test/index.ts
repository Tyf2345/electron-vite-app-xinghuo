import { sqliteDatabse } from '../../../common/database/sqlite'

interface User {
  id: number
  name: string
}

export class TestController {
  async print(): Promise<void> {
    console.log('--------------数据库操作开始-----------------')

    console.log('查询初始数据库数据')
    console.log(this.testGetAll())

    console.log('--------------------------------')

    console.log('新增数据')

    this.testCreate('张三')
    this.testCreate('李四')
    console.log('查询新增后的数据')
    console.log(this.testGetAll())

    console.log('--------------------------------')

    console.log('更新数据')
    this.testUpdate(1, '王五')
    console.log('查询修改后的数据')
    console.log(this.testGetAll())

    console.log('--------------------------------')

    console.log('删除数据')
    this.testDel([1])
    console.log('查询删除后的数据')
    console.log(this.testGetAll())

    console.log('--------------------------------')

    console.log('--------------数据库操作结束-----------------')
  }

  createTable(): void {
    sqliteDatabse.exec(`
      CREATE TABLE IF NOT EXISTS users(
       id INTEGER PRIMARY KEY,
       name TEXT
      ) STRICT`)
  }

  //新增
  testCreate(name: string): boolean {
    this.createTable()

    const insert = sqliteDatabse.prepare(`INSERT INTO users (id, name) VALUES (?,?)`)
    insert.run(null, name)
    return true
  }

  // 查询全部
  testGetAll(): User[] {
    this.createTable()
    const users = sqliteDatabse.prepare('SELECT * FROM users')
    return users.all() as unknown as User[]
  }

  // 更新
  testUpdate(id: number, name: string): boolean {
    this.createTable()

    const update = sqliteDatabse.prepare('UPDATE users SET name = ? WHERE id = ?')
    update.run(name, id)
    return true
  }

  // 删除
  testDel(ids: number[]): boolean {
    this.createTable()
    const del = sqliteDatabse.prepare('DELETE FROM users WHERE id = ?')
    ids.forEach((id) => del.run(id))
    return true
  }
}
