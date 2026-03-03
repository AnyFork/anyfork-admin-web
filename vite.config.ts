import ui from '@nuxt/ui/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv, type ConfigEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import eslintPlugin from 'vite-plugin-eslint2'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import VueRouter from 'vue-router/vite'
// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd(), '')
    const { VITE_BASE_URL, VITE_DEV_PORT, VITE_BASIC_API_URL, VITE_BUILD_ENV, VITE_RUNTIME_ENV } = env
    return {
        base: VITE_RUNTIME_ENV === 'netlify' ? '/' : VITE_BASE_URL,
        // 设置开发服务器相关配置
        server: {
            host: true,
            port: Number(VITE_DEV_PORT),
            proxy: {
                '/api': {
                    target: VITE_BASIC_API_URL,
                    changeOrigin: true
                }
            }
        },
        // 路径别名
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@pages': path.resolve(__dirname, 'src/pages'),
                '@assets': path.resolve(__dirname, 'src/assets')
            }
        },
        // 打包配置
        build: {
            //用于指定小于此阈值的资源文件（如图片、字体等）是否应内联到打包后的JavaScript文件中。默认情况下，所有小于4KB的资源文件会被内联为base64编码，以减少HTTP请求的数量‌
            assetsInlineLimit: 4096,
            //chunk大小预警阈值
            chunkSizeWarningLimit: 2000,
            rolldownOptions: {
                output: {
                    //打包移除sourcemap
                    sourcemap: false,
                    minify: {
                        compress: {
                            // 生产环境去除 console
                            dropConsole: true,
                            // 生产环境去除 debugger
                            dropDebugger: true
                        }
                    },
                    // 指定打包后的入口文件名规则
                    entryFileNames: 'js/[name].js',
                    // 分包chunk碎片文件命名规则
                    chunkFileNames: 'js/[name].[hash].js',
                    // 定义构建后的静态资源文件名
                    assetFileNames: 'assets/[ext]/[name]-[hash][extname]'
                }
            }
        },
        plugins: [
            VueRouter({
                routesFolder: [
                    {
                        src: 'src/pages',
                        path: '/'
                    }
                ],
                //修改路由类型文件位置
                dts: 'src/types/typed-router.d.ts'
            }),
            vue(),
            ui({
                theme: {
                    prefix: 'anyfork'
                },
                ui: {
                    colors: {
                        primary: 'green',
                        neutral: 'slate'
                    }
                },
                //@nuxt-ui内部已经集成了unplugin-auto-import，无需再安装，自动导入Composition API, @see https://github.com/antfu/unplugin-auto-import
                autoImport: {
                    dts: 'src/types/auto-import.d.ts',
                    imports: ['vue', VueRouterAutoImports, '@vueuse/core'],
                    eslintrc: {
                        enabled: true,
                        //.eslintrc-auto-import.json 是 unplugin-auto-import 自动生成的ESLint 全局变量声明 JSON 文件，专门用于让 ESLint 识别自动导入的 API（如 ref/useRoute 等），避免报 no-undef 错误
                        filepath: './.eslintrc-auto-import.json',
                        globalsPropValue: true
                    }
                },
                //@nuxt-ui内部已经集成了unplugin-vue-components，无需在安装，自动导入组件, @see https://github.com/antfu/unplugin-vue-components
                components: {
                    dts: 'src/types/components.d.ts',
                    dirs: ['src/components']
                }
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
            //github action环境下build项目时，跳过eslint校验,根据环境变量决定是否需要eslintPlugin插件，该包是用于配置Vite开发/构建阶段自动运行 ESLint 校验,不符合规范，启动时不会报错，页面刷新时会报错，https://github.com/ModyQyW/vite-plugin-eslint2
            VITE_BUILD_ENV !== 'ACTIONS' ? eslintPlugin({ build: true }) : undefined
        ]
    }
})
