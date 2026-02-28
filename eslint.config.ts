import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

console.log(pluginVue.parser)
export default defineConfig([
    // 1. 基础配置：文件范围 + 全局变量
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        plugins: {
            js
        },
        extends: ['js/recommended'],
        languageOptions: {
            globals: globals.browser
        }
    },
    // 2. TypeScript规则
    tseslint.configs.recommended,
    // 3. Vue规则（flat/essential 是Vue3的核心规则）
    pluginVue.configs['flat/essential'],
    // 4. 禁用所有与Prettier冲突的ESLint规则（关键：必须在自定义规则前）
    prettierConfig,
    // 5. 集成Prettier + 自定义规则（覆盖所有文件类型）
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], // 包含Vue文件
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
        },
        languageOptions: {
            globals: globals.browser,
            // 配置Vue文件的解析器：先解析Vue，再解析TS
            parser: vueParser,
            parserOptions: {
                // Vue中的TS代码用typescript-eslint解析
                parser: tseslint.parser,
                sourceType: 'module',
                ecmaVersion: 'latest'
            }
        }
    },
    // 6. 排除文件（全局生效），全局忽略规则（同时作用于ESLint和Prettier），可以不用单独配置.prettierignore和.eslintignore文件
    {
        ignores: ['node_modules/**', 'dist/**', 'public/**', '.vscode/**']
    }
])
