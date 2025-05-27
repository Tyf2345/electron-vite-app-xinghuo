import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { getConfig } from '../common/config/configuration'
// import { testCreate, testGetAll, testUpdate, testDel } from './controller'
import {
  createMysqlUser as testCreate,
  getMysqlUser as testGetAll,
  updateMysqlUser as testUpdate,
  deleteMysqlUser as testDel
} from './controller'
// import './database/sqllite'
console.log('running：' + process.env.NODE_RUNNING)
console.log('yaml数据：' + getConfig('name'))


console.log('--------------数据库操作开始-----------------')

console.log('查询初始数据库数据')
console.log(await testGetAll())

console.log('--------------------------------')

console.log('新增数据')

await testCreate('张三')
await testCreate('李四')
console.log('查询新增后的数据')
console.log(await testGetAll())

console.log('--------------------------------')

console.log('更新数据')
await testUpdate(1, '王五')
console.log('查询修改后的数据')
console.log(await testGetAll())

console.log('--------------------------------')

console.log('删除数据')
await testDel([1])
console.log('查询删除后的数据')
console.log(await testGetAll())

console.log('--------------------------------')

console.log('--------------数据库操作结束-----------------')
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
