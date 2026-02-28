import type { Config } from 'prettier'

const config: Config = {
    // 一行的字符数，如果超过会进行换行，默认为80
    printWidth: 500,
    // 一个tab代表几个空格数，默认为2
    tabWidth: 4,
    // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
    useTabs: false,
    // 行位是否使用分号，默认为 true
    semi: false,
    //Vue文件中script/style标签内缩进，符合大部分团队的代码风格
    vueIndentScriptAndStyle: true,
    // 字符串是否使用单引号，默认为false，使用双引号
    singleQuote: true,
    //对象字面量属性名引号规则，仅在必须加引号的场景下才给属性名加引号，其他场景自动省略，让代码更简洁。
    quoteProps: 'as-needed',
    // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
    bracketSpacing: true,
    // 是否使用尾逗号，有三个可选值"<none|es5|all>"
    trailingComma: 'none',
    //这个配置主要针对换行显示的对象、数组、JSX/HTML 标签，控制右括号（}/]/>）的位置,false 最后一个括号单独占一行
    bracketSameLine: false,
    //JSX/TSX 属性值使用双引号
    jsxSingleQuote: false,
    //箭头函数单个参数时总是需要括号
    arrowParens: 'always',
    //不插入任何 Prettier 专属注释，这是绝大多数项目的常规配置，也是你当前场景的最优选择。
    insertPragma: false,
    //禁用式化顶部有 /** @format */ 注释的文件
    requirePragma: false,
    //不自动换行 markdown 文本，无论一行有多长，Prettier 都会保持文本在同一行，仅保留你手动输入的换行符。
    proseWrap: 'never',
    //Prettier 不会为了格式化而删除 / 添加空格，避免因空格变化导致页面布局错位。
    htmlWhitespaceSensitivity: 'strict',
    // 指定在格式化代码时要使用的行尾样式，默认为"lf"，可选值"<lf|crlf|cr|auto>，不同操作系统上的行尾可能不同。例如，Windows 使用回车符后跟换行符 ("\r\n") 作为行尾，而基于 Unix 的系统如 macOS 和 Linux 只使用换行符 ("\n")。通过使用 "auto"，Prettier 将自动检测输入文件中使用的行尾样式，并在输出中保留它。"
    endOfLine: 'auto',
    //注册插件
    plugins: ['prettier-plugin-packagejson', 'prettier-plugin-organize-imports']
}

export default config
