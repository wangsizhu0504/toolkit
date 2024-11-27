import { defineConfig } from 'vitest/config';
import packageJson from './package.json';

export default defineConfig({
  test: {
    environment: 'jsdom',
    name: packageJson.name,
    coverage: {
      provider: 'istanbul',
    },
    watch: false,
  },
});
