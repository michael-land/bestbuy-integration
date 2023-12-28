declare global {
  namespace NodeJS {
    interface ProcessEnv {
      IS_LOCAL: string;
    }
  }
}

export {};
