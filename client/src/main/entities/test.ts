import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Test {
  @PrimaryGeneratedColumn({
    comment: '主键'
  })
  id!: number

  @Column({
    comment: '名称'
  })
  name?: string
}
