import path from 'path'
import fs from 'fs'
import winston from 'winston'
import 'winston-daily-rotate-file'
import dayjs from 'dayjs'

// 日志目录
const logDir = path.join(process.cwd(), '_logs')

// 确保日志目录存在
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}

// ANSI 颜色码映射
const levelColors: Record<string, string> = {
  error: '\x1b[31m', // 红色
  warn: '\x1b[33m', // 黄色
  info: '\x1b[97m', // 亮白
  debug: '\x1b[90m', // 灰色
  verbose: '\x1b[34m', // 蓝色
  silly: '\x1b[35m' // 品红
}

const reset = '\x1b[0m'

// 控制台日志格式（带颜色）
const consoleFormat = winston.format.printf((info) => {
  const formattedMessage =
    typeof info.message === 'object' ? JSON.stringify(info.message) : info.message

  const color = levelColors[info.level] || levelColors.info
  return `${dayjs(info.timestamp as string).format('YYYY-MM-DD HH:mm:ss')} [${color}${info.level}${reset}]: ${formattedMessage}`
})

// 文件日志格式（不带颜色）
const fileFormat = winston.format.printf((info) => {
  const formattedMessage =
    typeof info.message === 'object' ? JSON.stringify(info.message) : info.message

  return `${dayjs(info.timestamp as string).format('YYYY-MM-DD HH:mm:ss')} [${info.level}]: ${formattedMessage}`
})

// 创建 logger 实例
export const winstonLogger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(consoleFormat)
    }),
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, 'app-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      // 每天午夜创建新文件
      utc: false,
      // 文件大小限制为
      maxSize: '0.1m',
      // 保留最近14天的日志
      maxFiles: '14d',
      // 压缩旧日志
      zippedArchive: true,
      // 创建日志文件时自动创建目录
      createSymlink: true,
      // 当前日志文件的符号链接
      symlinkName: 'app-current.log',
      format: winston.format.combine(fileFormat)
    })
  ]
})
