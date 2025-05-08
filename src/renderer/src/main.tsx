import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IContextMenuTemplate } from '@main/menu/contextMenu'
import App from './App'
const contextmenu: IContextMenuTemplate[] = [
  {
    label: '菜单一',
    value: '菜单一内容'
  },
  {
    type: 'separator'
  },
  {
    label: '菜单二',
    value: '菜单二内容',
    submenu: [
      {
        label: '菜单二-1'
      },
      {
        label: '菜单二-2'
      }
    ]
  },
  {
    label: '菜单三',
    value: '菜单三内容'
  }
]
window.addEventListener('contextmenu', (e) => {
  // 阻止默认事件
  e.preventDefault()
  window.api.showContextMenu(contextmenu)
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
