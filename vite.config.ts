// Vitestの型を追加する
/// <reference types="vitest" />
/// <reference types="vite/client" />
 
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
　　　　　　　　// テストに関するAPIをグローバルに設定
    globals: true,
    // テスト環境の設定
    environment: "jsdom",
    // テストの設定ファイル
    setupFiles: "./src/testj/setup.ts",
　　　　　　　　// CSSファイルを処理する
    css: true,
    // テストのカバレッジを出力する設定
    coverage: {
      // @vitest/coverage-v8を設定
      provider: "v8",
      exclude: [
        ...(configDefaults.coverage.exclude as string[]),
        "src/testj",
        "src/main.tsx",
      ],
    },
  },
});
