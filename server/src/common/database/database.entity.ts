import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as httpContext from 'express-http-context';

// 公共实体类
export class DatabaseEntity {
  /**
   * 主键ID
   */
  @PrimaryGeneratedColumn({
    comment: '主键ID',
  })
  id: number;

  /**
   * 创建时间
   */
  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  /**
   * 更新时间
   */
  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  /**
   * 创建人
   */
  @Column({
    comment: '创建人',
    nullable: true,
  })
  createUser?: number;

  /**
   * 更新人
   */
  @Column({
    nullable: true,
    comment: '更新人',
  })
  updateUser?: number;

  @BeforeInsert()
  beforeInsert?() {
    this.createUser = httpContext.get('userId');
    this.updateUser = httpContext.get('userId');
    this.createTime = new Date();
    this.updateTime = new Date();
  }

  @BeforeUpdate()
  beforeUpdate?() {
    this.updateUser = httpContext.get('userId');
    this.updateTime = new Date();
  }
}
