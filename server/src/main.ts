import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { getConfig } from './common/config/configuration';
import { generateDoc } from './doc';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  const { port, host } = getConfig('server');

  // 开启事务
  initializeTransactionalContext();

  // 创建应用
  const app = await NestFactory.create(AppModule);

  // 版本控制
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
    prefix: 'api-v',
  });

  // 生成文档
  generateDoc(app);

  await app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}
bootstrap();
