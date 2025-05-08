import { Menu, MenuItemConstructorOptions, app, shell } from 'electron'
import { isMac } from '../utils/platform'

export const applicationMenu = (): void => {
  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              {
                role: 'about',
                label: '关于'
              },
              { type: 'separator' },
              { role: 'services', label: '服务' }
            ]
          }
        ]
      : []),
    {
      label: '文件',
      submenu: [isMac ? { role: 'close', label: '关闭' } : { role: 'quit', label: '退出' }]
    },
    {
      role: 'help',
      label: '帮助',
      submenu: [
        {
          label: '了解更多',
          click: async () => {
            await shell.openExternal('https://electronjs.org')
          }
        }
      ]
    }
  ] as MenuItemConstructorOptions[]

  // 将模版数据转换成Menu结构
  const menu = Menu.buildFromTemplate(template)
  // 插入Menu结构数据到应用菜单中
  Menu.setApplicationMenu(menu)
}
