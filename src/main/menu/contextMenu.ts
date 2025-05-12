import { BrowserWindow, ipcMain, Menu, MenuItemConstructorOptions, Notification } from 'electron'

// 添加应用内菜单接口，方便以后做扩展
export interface IContextMenuTemplate extends MenuItemConstructorOptions {}

export const contextMenu = (): void => {
  // ipc监听UI层发送的事件
  // ipcMain.on('show-context-menu', (event, menuData: IContextMenuTemplate[]) => {
  ipcMain.handle('show-context-menu', (event, menuData: IContextMenuTemplate[]) => {
    const template: MenuItemConstructorOptions[] = menuData.map((menu) => ({
      ...menu,
      click: () => {
        // 点击按钮调用系统弹窗
        new Notification({
          title: menu.label,
          body: menu.label
        }).show()
      }
    }))
    // 将菜单和窗口关联起来
    Menu.buildFromTemplate(template).popup({
      window: BrowserWindow.fromWebContents(event.sender)!
    })
  })
}
