import { DatabaseEntity } from 'src/common/database/database.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends DatabaseEntity {
  /**
   * 邮箱
   */
  @Column()
  email: string;
  /**
   * 用户名
   */
  @Column({
    unique: true,
  })
  username: string;

  /**
   * 密码
   */
  @Column()
  password: string;

  /**
   * 头像
   */
  @Column({
    nullable: true,
  })
  avatar: string;
}
