declare namespace NodeJS {
  interface ProcessEnv {
    // 环境变量类型
    NODE_RUNNING: 'dev' | 'pro'
  }
}
