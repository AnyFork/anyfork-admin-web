import eslintPlugin from '@nabla/vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv, type ConfigEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'
// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [
            vue(),
            //自动导入Composition API,https://github.com/antfu/unplugin-auto-import
            AutoImport({
                dts: 'src/types/auto-import.d.ts',
                imports: ['vue']
            }),
            //自动导入组件，https://github.com/antfu/unplugin-vue-components
            Components({
                dts: 'src/types/components.d.ts',
                dirs: ['src/components']
            }),
            //在html中创建ejs标签，官网地址：https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
            createHtmlPlugin({
                // 是否压缩 html
                minify: true,
                /**
                 * 需要注入 index.html ejs 模版的数据
                 */
                inject: {
                    data: {
                        title: env.VITE_SYSTEM_TITLE,
                        description: env.VITE_SYSTEM_DESC,
                        keywords: env.VITE_SYSTEM_KEYWORDS
                    }
                }
            }),
            // 打包压缩
            viteCompression({
                // 是否在控制台输出压缩结果
                verbose: false,
                // 是否禁用
                disable: false,
                // 压缩算法
                algorithm: 'gzip',
                // 压缩后的文件名后缀
                ext: '.gz',
                // 只有大小大于该值的资源会被处理 10240B = 10KB
                threshold: 10240,
                // 压缩后是否删除原文件
                deleteOriginFile: false
            }),
            // 调试工具插件
            vueDevTools(),
            /** 打包分析插件，官网：https://github.com/btd/rollup-plugin-visualizer */
            visualizer({
                // 注意这里要设置为true，打包时会自动打开分析页面。
                open: true,
                // 分析图生成的文件名
                filename: 'dist/stats.html',
                // 收集gzip大小并将其显示
                gzipSize: true, //
                // 收集 brotli 大小并将其显示
                brotliSize: true
            }),
            // 该包是用于配置Vite开发/构建阶段自动运行 ESLint 校验,不符合规范，启动时不会报错，页面刷新时会报错，https://github.com/nabla/vite-plugin-eslint
            eslintPlugin()
        ],
        // 设置开发服务器相关配置
        server: {
            host: '0.0.0.0',
            port: 9527
        }
    }
})
