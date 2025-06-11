import { OmitType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {}

/**
 * 注册用户DTO
 */
export class RegisterUserDto {
  /**
   * 用户名
   */
  @IsString({ message: '用户名不能为空' })
  username: string;

  /**
   * 密码
   */
  @IsString({ message: '密码不能为空' })
  password: string;

  /**
   * 邮箱
   */
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  /**
   * 验证码
   */
  @IsString({ message: '邮箱验证码不能为空' })
  emailCode: string;
}

/**
 * 登录用户DTO
 */
export class LoginUserDto extends OmitType(RegisterUserDto, [
  'email',
  'emailCode',
] as const) {}
