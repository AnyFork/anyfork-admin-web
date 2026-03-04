<script setup lang="ts">
    const { loading, data, send: sendRequest } = useRequest(alova.Get('/api/weather/city/101030100'), { immediate: false })
    const handlerEvent = async (): Promise<void> => {
        await sendRequest()
    }
</script>
<template>
    <div class="p-2">
        <div class="pt-20px">
            <p>下面是Alova获取数据的例子</p>
            <UButton color="primary" :loading="loading" @click="handlerEvent">点我加载数据</UButton>
            <pre v-loading="loading">{{ JSON.stringify(data, null, 4) }}</pre>
        </div>
    </div>
</template>
