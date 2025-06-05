import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomException } from './common/exceptions/custom.business';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app模块')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 获取hello
   */
  @Get()
  getHello(): string {
    throw new CustomException('业务异常');
    return this.appService.getHello();
  }

  @Get('test')
  getTest1(): string {
    return 'test1';
  }

  @Version('2')
  @Get('test')
  getTest2(): string {
    return 'test2';
  }

  // 获取配置
  @Version('3')
  @Get('test')
  getTest3() {
    return this.configService.get('server');
  }
}
