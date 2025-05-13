import { app, dialog, Menu, MenuItemConstructorOptions, Notification } from 'electron'

export const dockMenu = (): void => {
  // 创建模版
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'Dock通知',
      click(item) {
        new Notification({
          title: item.label,
          body: item.label
        }).show()
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'dock窗口最小化',
      role: 'minimize'
    },
    {
      label: '二级菜单',
      submenu: [
        {
          label: '弹窗',
          click() {
            dialog.showMessageBox({ type: 'error', message: '弹窗内容' })
          }
        }
      ]
    }
  ]
  //模版数据转Menu结构数据
  const dockMenu = Menu.buildFromTemplate(template)
  //挂载到app.dock上
  app.dock?.setMenu(dockMenu)
}
