import { defineConfig } from 'vitest/config';
import config from './vitest.config.js';

export default defineConfig({
  ...config,
  test: { ...config.test, include: ['**/*.e2e-{test,spec}.?(c|m)[jt]s?(x)'] },
});
