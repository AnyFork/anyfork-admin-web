<template>
    <div v-if="loading" class="bg-elevated/90 absolute top-0 left-0 z-100000000 flex h-full max-h-screen w-full items-center justify-center">
        <div class="flex w-40 flex-col items-center justify-center">
            <div class="text-primary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5" />
                    <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" /></path>
                </svg>
            </div>
            <div class="text-primary text-[16px]">{{ loadingText }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { LoadingProps } from '../types'
    const { loadingText, loading } = defineProps<Partial<LoadingProps>>()
</script>
