import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { CustomException } from 'src/common/exceptions/custom.business';
import { ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from './dto/send-email.dto';
import { ConfigService } from '@nestjs/config';

@ApiTags('邮箱验证码')
@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 发送邮箱验证码
   * @param email 邮箱
   * @returns 发送结果
   */
  @Get('send')
  async sendEmail(@Query() sendEmailDto: SendEmailDto) {
    // 验证邮箱是否存在
    const emailCaptcha = await this.emailService.getEmailCaptcha(
      sendEmailDto.email,
    );
    if (emailCaptcha) {
      throw new CustomException(
        `邮箱验证码${this.configService.get('EMAIL_CONFIG.ttl') / 60000}分钟内有效，不可重复发送`,
      );
    }
    // 发送邮件
    await this.emailService.sendEmail(sendEmailDto.email);
    return true;
  }
}
