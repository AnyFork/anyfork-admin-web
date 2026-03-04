import { hyphenate } from '@vue/shared'
import { type Directive, type DirectiveBinding } from 'vue'
import { createLoading } from './hooks/createLoading'

const INSTANCE_KEY = Symbol('loading')

const getAttributeName = (name: string) => {
    return `loading-${hyphenate(name)}`
}
/**
 * 定义挂着对象类型
 */
export interface loading extends HTMLElement {
    [INSTANCE_KEY]: ReturnType<typeof createLoading>
}

// 获取指令传递的参数
const getProps = (el: loading, binding: DirectiveBinding<boolean>) => {
    const loadingText = el.getAttribute(getAttributeName('text'))
    const fullscreen = binding.modifiers.fullscreen
    return {
        loadingText: loadingText ?? 'loading',
        loading: binding.value,
        fullscreen
    }
}

/**
 * 自定义loading指令
 */
const directive: Directive<loading, boolean> = {
    mounted(el, binding) {
        if (binding.value) {
            const props = getProps(el, binding)
            console.log(props)
            if (!props.fullscreen) {
                el.classList.add('relative')
            }
            el[INSTANCE_KEY] = createLoading(props, props.fullscreen ? document.body : el)
        }
    },
    updated(el, binding) {
        if (binding.oldValue !== binding.value) {
            if (binding.value && !binding.oldValue) {
                const props = getProps(el, binding)
                if (!props.fullscreen) {
                    el.classList.add('relative')
                }
                el[INSTANCE_KEY] = createLoading(props, props.fullscreen ? document.body : el)
            } else if (!binding.value && binding.oldValue) {
                el[INSTANCE_KEY]?.update(getProps(el, binding))
            }
            if (binding.value) {
                el.classList.remove('overflow-y-auto')
                el.classList.add('overflow-y-hidden')
            } else {
                el.classList.remove('overflow-y-hidden')
                el.classList.add('overflow-y-auto')
            }
        }
    },
    unmounted(el) {
        el[INSTANCE_KEY]?.destroy()
    }
}
export default directive
