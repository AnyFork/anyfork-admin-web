<script setup lang="ts">
    const { data, send: sendRequest } = useRequest(alova.Get('/api/weather/city/101030100'))
    const handlerEvent = async (): Promise<void> => {
        await sendRequest()
    }
</script>
<template>
    <div class="anyfork:p-2">
        <UIcon name="i-lucide-lightbulb" class="size-5" />
        <div class="pt-20px">
            <p>下面是Alova获取数据的例子</p>
            <UButton color="primary" @click="handlerEvent">点我加载数据</UButton>
            <p>{{ JSON.stringify(data, null, 4) }}</p>
        </div>
    </div>
</template>
