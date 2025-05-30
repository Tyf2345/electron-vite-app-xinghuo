import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

// 员工表, 表名默认: employee，如果需要自定义表名，可以添加 @Entity({ name: 'employee' })
@Entity()
export class Employee {
  // 主键, 自增
  @PrimaryGeneratedColumn({
    comment: '主键'
  })
  id?: number

  // 姓名
  @Column({
    comment: '姓名'
  })
  name?: string
}
