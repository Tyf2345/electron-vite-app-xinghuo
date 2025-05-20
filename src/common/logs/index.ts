import { ipcMain } from 'electron'
import logger, { LogLevel } from 'electron-log'
import dayjs from 'dayjs'
import { join } from 'path'
export const createLogs = (): void => {
  //初始化
  logger.initialize()
  // 修改日志存放路径
  logger.transports.file.resolvePathFn = () => join(process.cwd(), 'logs/main.log')
  // 配置日志格式和颜色
  logger.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}] [{level}] {text}'
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
  // 配置控制台日志颜色
  logger.transports.console.format = (msg) => {
    const time = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    const level = msg.message.level
    const color = levelColors[msg.message.level] || ''
    const levelStr = `${color}[${level}]${reset}`
    return [`${time} ${levelStr} `, msg.message.data[0]]
  }

  // 渲染进程通过IPC调用日志：方便后期做统一处理
  ipcMain.handle('logger', (_event, level: LogLevel, ...message: any[]) => {
    logger[level](...message)
  })
}
