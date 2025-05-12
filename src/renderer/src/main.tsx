import './assets/main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { IContextMenuTemplate } from '../../main/menu/contextMenu'
import { IContextMenuTemplate } from '@main/menu/contextMenu'
import App from './App'
const contextmenu: IContextMenuTemplate[] = [
  {
    label: '菜单一',
  },
  {
    type: 'separator'
  },
  {
    label: '菜单二',
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
  }
]
window.addEventListener('contextmenu', (e) => {
  // 阻止默认事件
  e.preventDefault()
  window.api.showContextMenu(contextmenu)
  // window.electron.ipcRenderer.send('show-context-menu',contextmenu)
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
