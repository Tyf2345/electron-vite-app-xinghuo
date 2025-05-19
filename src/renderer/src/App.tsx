import { useEffect } from 'react'

function App(): React.JSX.Element {
  useEffect(() => {
    window.api.findFilesByMessageMainToRenderer((files) => {
      console.log('主线程发来的数据', files)
    })
  }, [])
  return (
    <>
      <h1>欢迎来到Electron世界</h1>
      <button
        onClick={() => {
          window.api.sayHi()
        }}
      >
        sayHi
      </button>

      <button
        onClick={() => {
          console.log('cpu个数：', window.api.os.cpus().length)
        }}
      >
        获取cpu个数
      </button>
      <button
        onClick={async () => {
          const files = await window.api.findFilesByMessageRendererToMain()
          console.log('文件信息：', files)
        }}
      >
        渲染进程 -`{'>'}` 主进程 获取 根目录下文件和文件夹
      </button>
    </>
  )
}

export default App
