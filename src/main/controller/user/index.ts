import { QueryResult } from 'mysql2'
import { mysqlDatabase } from '../../../common/database/mysql'

export class UserController {
  async print(): Promise<void> {
    console.log('--------------数据库操作开始-----------------')

    console.log('查询初始数据库数据')
    console.log(await this.getMysqlUser())

    console.log('--------------------------------')

    console.log('新增数据')

    await this.createMysqlUser('张三')
    await this.createMysqlUser('李四')
    console.log('查询新增后的数据')
    console.log(await this.getMysqlUser())

    console.log('--------------------------------')

    console.log('更新数据')
    await this.updateMysqlUser(1, '王五')
    console.log('查询修改后的数据')
    console.log(await this.getMysqlUser())

    console.log('--------------------------------')

    console.log('删除数据')
    await this.deleteMysqlUser([1])
    console.log('查询删除后的数据')
    console.log(await this.getMysqlUser())

    console.log('--------------------------------')

    console.log('--------------数据库操作结束-----------------')
  }

  // 查询用户
  async getMysqlUser(): Promise<QueryResult> {
    const [rows] = await mysqlDatabase.query('SELECT * FROM users')
    return rows
  }

  // 新增用户
  async createMysqlUser(name: string): Promise<QueryResult> {
    const [rows] = await mysqlDatabase.query('INSERT INTO users (name) VALUES (?)', [name])
    return rows
  }

  // 更新用户
  async updateMysqlUser(id: number, name: string): Promise<QueryResult> {
    const [rows] = await mysqlDatabase.query('UPDATE users SET name = ? WHERE id = ?', [name, id])
    return rows
  }

  // 删除用户
  async deleteMysqlUser(id: number[]): Promise<QueryResult> {
    const [rows] = await mysqlDatabase.query('DELETE FROM users WHERE id IN (?)', [id[0]])
    return rows
  }
}
