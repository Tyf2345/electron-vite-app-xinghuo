import { Menu, MenuItemConstructorOptions, nativeImage, Tray, Notification, dialog } from 'electron'
import { resolve } from 'path'

export const trayMenu = (): void => {
  // 获取图片路径
  const iconPath = resolve(process.cwd(), 'resources', 'tyf.jpg')
  const iconImg = nativeImage.createFromPath(iconPath)
  const resizedIconImg = iconImg.resize({
    width: 20,
    height: 16
  })
  const tray = new Tray(resizedIconImg)
  const menuItems: MenuItemConstructorOptions[] = [
    {
      label: 'tray菜单一',
      click() {
        // 插入数据到 tray
        const newItem: MenuItemConstructorOptions = {
          label: `新菜单项 ${new Date().toLocaleTimeString()}`,
          click(menu) {
            // 使用 Electron 通知
            const notification = new Notification({
              title: '菜单标题',
              body: '点击了新菜单项' + menu.label
            })

            notification.show()

            // 添加点击事件显示弹窗
            notification.on('click', () => {
              dialog.showMessageBox({
                message: notification.body
              })
            })
          }
        }
        menuItems.splice(0, 0, newItem)
        const newMenu = Menu.buildFromTemplate(menuItems)
        tray.setContextMenu(newMenu)
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'tray菜单二'
    }
  ]
  const trayMenu = Menu.buildFromTemplate(menuItems)
  tray.setContextMenu(trayMenu)
  tray.setTitle('Electron标题')
  tray.setToolTip('Tooltip提示')
}
