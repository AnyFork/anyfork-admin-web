import type { App, Directive } from 'vue'
import focus from './modules/focus'
import loading from './modules/loading/index'
const directivesList: Record<string, Directive> = {
    // focus指令
    focus,
    //loading指令
    loading
}
const directives = {
    install: function (app: App<Element>) {
        Object.keys(directivesList).forEach((key) => {
            // 注册自定义指令
            app.directive(key, directivesList[key])
        })
    }
}
export default directives
