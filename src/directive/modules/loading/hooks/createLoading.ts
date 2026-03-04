import { createVNode, render } from 'vue'
import Loading from '../component/Loading.vue'
import type { LoadingProps } from '../types/index'

/**
 * 创建、更新和销毁 v-loading 的实例
 */
export const createLoading = (props: Partial<LoadingProps>, target: HTMLElement) => {
    const data = reactive({
        ...props
    })
    const Comp = defineComponent({
        render: () => h(Loading, data)
    })
    const vm = createVNode(Comp)
    const container = document.createElement('div')
    // 将虚拟节点挂载到容器上
    render(vm, container)
    target.appendChild(vm.el as HTMLElement)
    if (props.fullscreen) {
        target.classList.add('overflow-y-hidden')
    } else {
        target.classList.remove('overflow-y-hidden')
    }
    return {
        update: (newProps: Partial<LoadingProps>) => Object.assign(data, newProps),
        destroy: () => render(null, container)
    }
}
