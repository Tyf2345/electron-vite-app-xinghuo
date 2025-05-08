import { BrowserWindow, ipcMain, Menu, MenuItemConstructorOptions, Notification } from 'electron'

export interface IContextMenuTemplate extends MenuItemConstructorOptions {
  value?: string
}
export const contextMenu = (): void => {
  ipcMain.handle('show-context-menu', (event, menuData: IContextMenuTemplate[]) => {
    const template: MenuItemConstructorOptions[] = menuData.map((menu) => ({
      ...menu,
      click: () => {
        new Notification({
          title: menu.label,
          body: menu.value
        }).show()
        return menu.value
      }
    }))

    Menu.buildFromTemplate(template).popup({
      window: BrowserWindow.fromWebContents(event.sender)!
    })
  })
}
