import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { BaseAllExceptionFilter } from './common/exceptions/base.exception.filter';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './common/config/configuration';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';
@Module({
  imports: [
    // 数据库模块
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          ...getConfig('SQL_CONFIG')['mysql'],
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('配置出错');
        }
        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options)),
        );
      },
    }),
    // 配置模块
    ConfigModule.forRoot({
      // 忽略环境文件
      ignoreEnvFile: false,
      // 全局配置
      isGlobal: true,
      // 加载配置
      load: [getConfig],
    }),
  ],
  controllers: [AppController],
  providers: [
    // 全局管道
    {
      provide: APP_PIPE,
      useFactory() {
        return new ValidationPipe({
          transform: true,
        });
      },
    },
    // 全局拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },

    // 全局异常过滤器
    {
      provide: APP_FILTER,
      useClass: BaseAllExceptionFilter,
    },
    // HTTP异常过滤器
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
