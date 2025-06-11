import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class EmailService {
  private emailService: nodemailer.Transporter;
  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    this.emailService = nodemailer.createTransport(
      this.configService.get('EMAIL_CONFIG'),
    );
  }
  /**
   * 发送邮箱验证码
   * @param to 邮箱
   * @returns 发送结果
   */
  async sendEmail(to: string) {
    const emailCaptcha = Math.floor((Math.random() + 1) * 1000) + '';
    await this.cacheManager.set(
      to,
      emailCaptcha,
      this.configService.get('EMAIL_CONFIG.ttl'),
    );
    await this.emailService.sendMail({
      from: this.configService.get('EMAIL_CONFIG.auth.user'),
      to,
      text: `<div>
        您本次的验证码是<span style="color:#1e5494; font-weight:700; font-size:24px">${emailCaptcha}</span>, 验证码有效期是${this.configService.get('EMAIL_CONFIG.ttl') / 60000}分钟 </div>`,
      subject: `星火平台邮箱检验提醒`,
    });
    return true;
  }

  /**
   * 获取邮箱验证码
   * @param email 邮箱
   * @returns 验证码
   */
  async getEmailCaptcha(email: string) {
    return await this.cacheManager.get<string>(email);
  }
  /**
   * 验证邮箱验证码
   * @param email 邮箱
   * @param code 验证码
   * @returns 验证结果
   */
  async verifyEmail(email: string, code: string) {
    const cache = await this.getEmailCaptcha(email);
    if (cache !== code) {
      return false;
    }
    return true;
  }

  /**
   * 删除邮箱验证码缓存
   * @param email 邮箱
   * @returns 删除结果
   */
  async removeEmailCache(email: string) {
    await this.cacheManager.del(email);
    return true;
  }
}
