declare namespace NodeJS {
  // 环境变量
  interface ProcessEnv {
    NODE_RUNNING: 'dev' | 'prod';
  }
}
