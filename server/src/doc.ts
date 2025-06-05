import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
export const generateDoc = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('xinghuo-nestjs API')
    .setDescription('The xinghuo-nestjs API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs-api', app, documentFactory);
};
