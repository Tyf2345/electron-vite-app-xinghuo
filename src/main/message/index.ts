import { BrowserWindow, ipcMain } from 'electron'
import { readdir } from 'fs/promises'

// 消息通信IPC
export const handleMessageIPC = (
  mainWindow: BrowserWindow,
  win1: BrowserWindow,
  win2: BrowserWindow
): void => {
  //获取项目目录下文件/文件夹 - 渲染进程 -> 主进程
  ipcMain.handle('message:rendererToMain', async () => {
    // process.cwd() 可以获取当前根目录绝对地址
    return readdir(process.cwd())
  })

  // 获取项目目录下文件/文件夹 主进程 -> 渲染进程
  readdir(process.cwd()).then((files) => {
    mainWindow.webContents.send('message:mainToRenderer', files)
  })

  // 错误的示例：返回promise会报错
  // mainWindow.webContents.send('message:mainToRenderer', readdir(process.cwd()))

  // 渲染线程到渲染线程
  ipcMain.handle('message:rendererToRenderer', (_event, data) =>
    win2.webContents.send('message:getRendererWin', data)
  )

  // 创建MessagePort

  // const channel = new MessageChannelMain()
  // const { port1, port2 } = channel

  // // port1挂在到窗口二，这样就链接起来了
  // win2.webContents.postMessage('mian-files-port', null, [port1])

  // ipcMain.handle('message:renderer1ToRenderer2Port', () => {
  //   // 发送消息到窗口二
  //   port2.postMessage(readdirSync(process.cwd()))
  // })
}
