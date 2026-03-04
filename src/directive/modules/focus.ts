import type { Directive } from 'vue'

/**
 * 自定义focus指令
 */
const directive: Directive = {
    mounted(el: HTMLElement) {
        el.focus()
    }
}
export default directive
