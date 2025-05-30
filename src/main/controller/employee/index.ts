import { Employee } from '../../entity/employee'
import { typeOrmMysqlDataSource } from '../../../common/database/typeormMysql'
import { DeleteResult, UpdateResult } from 'typeorm'

export class EmployeeController {
  private employeeRepository = typeOrmMysqlDataSource.getRepository(Employee)

  // 初始化
  async print(): Promise<void> {
    console.log('--------------数据库操作开始-----------------')

    console.log('查询初始数据库数据')
    console.log(await this.findAll())

    console.log('--------------------------------')

    console.log('新增数据')

    await this.create({ name: '张三' })
    await this.create({ name: '李四' })
    console.log('查询新增后的数据')
    console.log(await this.findAll())

    console.log('--------------------------------')

    console.log('更新数据')
    await this.update(1, '王五')
    console.log('查询修改后的数据')
    console.log(await this.findAll())

    console.log('--------------------------------')

    console.log('删除数据')
    await this.delete(1)
    console.log('查询删除后的数据')
    console.log(await this.findAll())

    console.log('--------------------------------')

    console.log('--------------数据库操作结束-----------------')
  }

  // 查询所有员工
  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find()
  }

  // 新增员工
  async create(employee: Employee): Promise<Employee> {
    return this.employeeRepository.save(employee)
  }

  // 更新员工
  async update(id: number, name: string): Promise<UpdateResult> {
    return this.employeeRepository.update(id, { name })
  }

  // 删除员工
  async delete(id: number): Promise<DeleteResult> {
    return this.employeeRepository.delete(id)
  }
}
