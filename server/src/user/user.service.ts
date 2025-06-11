import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 创建用户
  create(user: User) {
    return this.userRepository.save(user);
  }

  // 查询用户名是否存在
  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  // 查询所有用户
  findAll() {
    return this.userRepository.find();
  }

  // 查询单个用户
  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  // 更新用户
  update(user: User) {
    return this.userRepository.update(user.id, user);
  }

  // 删除用户
  remove(ids: number[]) {
    return this.userRepository.delete(ids);
  }
}
