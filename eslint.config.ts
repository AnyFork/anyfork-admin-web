//eslint内置js规则集
import js from '@eslint/js'
//eslint-config-prettier 的核心就是关闭所有 ESLint 中与 Prettier 重叠的格式类规则，只保留 ESLint 的代码质量校验能力，把格式化的工作完全交给 Prettier。
import prettierConfig from 'eslint-config-prettier'
//eslint-plugin-prettier 是将 Prettier 的格式化规则转化为 ESLint 规则 的插件，让 Prettier 的格式校验 / 修复能力可以通过 ESLint 统一执行，核心解决 “用一套命令完成代码质量 + 格式校验” 的问题。
import prettierPlugin from 'eslint-plugin-prettier'
//eslint适配vue的规则集
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
//typescript语法eslint解析器
import tseslint from 'typescript-eslint'
//vue模板eslint解析器
import vueParser from 'vue-eslint-parser'
//.eslintrc-auto-import.json 是 unplugin-auto-import 自动生成的ESLint 全局变量声明 JSON 文件，专门用于让 ESLint 识别自动导入的 API（如 ref/useRoute 等），避免报 no-undef 错误
import autoImportConfig from './.eslintrc-auto-import.json'

export default defineConfig([
    // 1. 基础配置：文件范围 + 全局变量
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        plugins: {
            js
        },
        extends: ['js/recommended']
    },
    // 2. TypeScript规则
    tseslint.configs.recommended,
    // 3. Vue规则（flat/essential 是Vue3的核心规则）
    pluginVue.configs['flat/essential'],
    // 4. 禁用所有与Prettier冲突的ESLint规则（关键：必须在自定义规则前）
    prettierConfig,
    // 5. 集成Prettier + 自定义规则（覆盖所有文件类型）
    {
        // 针对所有 JavaScript、TypeScript 和 Vue 文件应用以下配置
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                // 合并从unplugin-auto-import插件中自动导入全局变量配置
                ...autoImportConfig.globals
            },
            // 配置Vue文件的解析器：先解析Vue，再解析TS
            parser: vueParser,
            parserOptions: {
                // Vue中的TS代码用typescript-eslint解析
                parser: tseslint.parser,
                sourceType: 'module',
                ecmaVersion: 'latest'
            }
        },
        plugins: {
            prettier: prettierPlugin
        },
        rules: {
            // Prettier核心规则：格式问题视为ESLint错误，读取.prettierrc配置
            'prettier/prettier': [
                'error',
                {},
                {
                    usePrettierrc: true
                }
            ],

            // 关闭ESLint原生格式规则（防止与Prettier冲突）
            'no-mixed-spaces-and-tabs': 'off',
            indent: 'off',
            quotes: 'off',
            semi: 'off',

            // 可选：自定义Vue/TS规则（根据项目需求调整）
            // 关闭Vue组件名多单词强制规则
            'vue/multi-word-component-names': 'off',
            // TS未使用变量警告
            '@typescript-eslint/no-unused-vars': 'error',
            // Vue未使用组件（质量规则）
            'vue/no-unused-components': 'warn'
        }
    },
    // 6. 排除文件（全局生效），全局忽略规则（同时作用于ESLint和Prettier），可以不用单独配置.prettierignore和.eslintignore文件
    {
        ignores: ['node_modules/**', 'dist/**', 'public/**', '.vscode/**']
    }
])
