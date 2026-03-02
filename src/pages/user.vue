<template>
    <div>
        <div>11111111111</div>
        <RouterView />
    </div>
</template>
<script setup lang="ts">
    definePage({
        meta: {
            requiresAuth: true
        }
    })
</script>
