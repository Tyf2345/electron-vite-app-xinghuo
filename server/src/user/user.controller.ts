import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { LoginUserDto, RegisterUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { CustomException } from 'src/common/exceptions/custom.business';
import * as md5 from 'md5';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  /**
   * 注册用户
   * @param registerUserDto 注册用户DTO
   */
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    // 验证邮箱验证码
    const emailStatus = await this.emailService.verifyEmail(
      registerUserDto.email,
      registerUserDto.emailCode,
    );
    if (!emailStatus) {
      throw new CustomException('邮箱验证码错误');
    }
    // 验证用户名是否存在
    const user = await this.userService.findOneByUsername(
      registerUserDto.username,
    );
    if (user) {
      throw new CustomException('用户名已存在');
    }

    // 创建用户
    const _user = new User();
    _user.username = registerUserDto.username;
    // 密码加密
    _user.password = md5(registerUserDto.password);
    _user.email = registerUserDto.email;
    await this.create(_user);
    // 删除邮件缓存
    await this.emailService.removeEmailCache(registerUserDto.email);
    return true;
  }

  /**
   * 登录
   * @param loginUserDto 登录用户DTO
   */
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    // 验证用户名是否存在
    const user = await this.userService.findOneByUsername(
      loginUserDto.username,
    );
    if (!user) {
      throw new CustomException('用户不存在');
    }
    // 验证密码
    if (user.password !== md5(loginUserDto.password)) {
      throw new CustomException('密码错误');
    }
    return user;
  }

  /**
   * 创建用户
   * @param user 用户信息
   */
  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  /**
   * 查询所有用户
   */
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * 查询单个用户
   * @param id 用户id
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  /**
   * 更新用户
   * @param user 用户信息
   */
  @Patch()
  update(@Body() user: User) {
    // 密码加密
    user.password = md5(user.password);
    return this.userService.update(user);
  }

  /**
   * 删除用户
   * @param ids 用户id 数组
   */
  @Delete()
  remove(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return this.userService.remove(ids);
  }
}
