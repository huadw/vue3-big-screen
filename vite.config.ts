import { UserConfig, ConfigEnv, loadEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import { resolve } from "path";
import compress from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
// 自动导入的插件安装报github无权限错误，暂时不使用
// import AutoImport from "unplugin-auto-import/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: "./",
    resolve: {
      extensions: [".js", ".vue", ".json", "scss", ".ts"],
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
        {
          find: "components",
          replacement: resolve(__dirname, "src/components"),
        },
        {
          find: "utils",
          replacement: resolve(__dirname, "src/utils"),
        },
      ],
    },
    server: {
      // 允许IP访问
      host: "0.0.0.0",
      // 应用端口 (默认:3000)
      port: Number(env.VITE_APP_PORT),
      // 运行是否自动打开浏览器
      open: true,
      proxy: {
        /**
         * 反向代理解决跨域配置
         * http://localhost:3000/dev-api/sale (F12可见请求路径) => http://localhost:3000/sale (实际请求后端 API 路径)
         *
         * env.VITE_APP_BASE_API: /dev-api
         * env.VITE_APP_API_URL: http://localhost:3000
         */
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          target: env.VITE_APP_API_URL,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
    build: {
      assetsDir: "./static",
      chunkSizeWarningLimit: 500,
      minify: "terser",
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      terserOptions: {
        compress: {
          // warnings: false,
          drop_console: true, //打包时删除 console
          drop_debugger: true, //打包时删除 debugger
          pure_funcs: ["console.log"],
        },
        output: {
          // 去掉注释内容
          comments: true,
        },
      },
      rollupOptions: {
        output: {
          // manualChunks: {
          // 	// 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
          // 	vue: ["vue", "vue-router", "vuex"],
          // 	echarts: ["echarts"],
          // },
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
      //   brotliSize: false,
    },
    plugins: [
      vue(),
      compress(),
      viteMockServe({
        ignore: /^\_/,
        mockPath: "mock",
        enable: mode === "development",
      }),
      // AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      // imports: ["vue", "@vueuse/core"],
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      // resolvers: [ElementPlusResolver()],
      // eslintrc: {
      //   enabled: false,
      //   filepath: "./.eslintrc-auto-import.json",
      //   globalsPropValue: true,
      // },
      // vueTemplate: true,
      // 配置文件生成位置(false:关闭自动生成)
      // dts: false,
      // dts: "src/typings/auto-imports.d.ts",
      // }),
      visualizer(),
    ],
  };
});
