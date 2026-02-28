import type { Config } from 'stylelint'
export default {
    extends: [
        // 继承官方标准规则（基础规范）@see https://github.com/stylelint/stylelint-config-standard
        'stylelint-config-standard',
        //CSS属性排序规则 @see https://github.com/stormwarning/stylelint-config-recess-order
        'stylelint-config-recess-order',
        //vue文件样式语法解析器，能够解析html中的内联样式和<style>标签中的样式 @see https://github.com/ota-meshi/stylelint-config-html
        'stylelint-config-html/vue',
        //vue文件样式校验规则表 @see https://github.com/ota-meshi/stylelint-config-recommended-vue
        'stylelint-config-recommended-vue'
    ],
    // 自定义规则（覆盖/新增，优先级高于继承的规则） @see https://stylelint.io/user-guide/rules
    rules: {
        // 示例：允许使用 !important（默认禁止，新手可临时放开）
        'declaration-no-important': null,
        // 禁止使用未知的 CSS 属性（警告级别）
        'property-no-unknown': [true, { severity: 'warning' }]
    },
    // 忽略不需要校验的文件
    ignoreFiles: ['node_modules/**/*', 'dist/**/*']
} satisfies Config
