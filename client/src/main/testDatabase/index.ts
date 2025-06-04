import { SqliteDataSource } from '../../common/databse/sqlite'
import { Test } from '../entities/test'
import { Repository } from 'typeorm'

export class TestDatabase {
  private async getRepository(): Promise<Repository<Test>> {
    const datasource = await SqliteDataSource.initialize()
    return datasource.getRepository(Test)
  }
  async print(): Promise<void> {
    console.log(await this.save())
    console.log(await this.findAll())
  }
  async save(): Promise<Test> {
    const repository = await this.getRepository()
    return repository.save({ name: 'test' })
  }

  async findAll(): Promise<Test[]> {
    const repository = await this.getRepository()
    return repository.find()
  }
}
