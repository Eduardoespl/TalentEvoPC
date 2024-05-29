import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { UserConfigExport } from 'vite';
import { defineConfig as defineTestConfig } from 'vitest/config';

// Exporta la configuración con los tipos correctos
const config: UserConfigExport = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});

export default config;
