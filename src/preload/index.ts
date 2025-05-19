import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import os from 'node:os'
export const api = {
  // 暴露 sayHi函数
  sayHi() {
    console.log('sayHi')
  },
  // 暴露OS模块
  os,
  // 按照消息：渲染进程到主进程查询文件
  findFilesByMessageRendererToMain: (): Promise<string[]> =>
    ipcRenderer.invoke('message:rendererToMain'),

  // 按照消息：主进程到渲染进程查询文件
  findFilesByMessageMainToRenderer: (cb: (files: string[]) => void) =>
    ipcRenderer.on('message:mainToRenderer', (_event, data) => cb(data)),

  // 发送消息到窗口二
  sendRendererToWindow2: (data: string) => ipcRenderer.invoke('message:rendererToRenderer', data),

  // 获取窗口一的数据
  getRendererWindow1Data: (cb: (data: string) => void) =>
    ipcRenderer.on('message:getRendererWin', (_event, data) => cb(data))
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
