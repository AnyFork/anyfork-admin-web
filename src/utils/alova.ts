import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'

// 1. 创建alova实例
export const alova = createAlova({
    //alova实例id,多个实例必须唯一
    id: 'default',
    //统一请求基础路径
    baseURL: '',
    //请求超时时间，默认不超时
    timeout: 10000,
    //状态管理钩子，VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
    statesHook: VueHook,
    //请求适配器，推荐使用fetch请求适配器
    requestAdapter: adapterFetch(),
    // 在开发环境开启缓存命中日志
    cacheLogger: process.env.NODE_ENV === 'development',
    //全局的请求前置钩子
    beforeRequest: (config) => {
        console.log(config)
    },
    //全局的响应钩子
    responded: async (response) => {
        console.log(response)
        return await response.json()
    }
})
