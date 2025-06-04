import { ipcMain } from 'electron'
import { winstonLogger } from '../../common/logs/winstonLogger'

/**
 * 日志记录
 */
ipcMain.handle('logger', (_event, level: string, ...message: any[]) => {
  winstonLogger[level](...message)
})
