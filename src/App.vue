<script setup lang="ts">
    const colorMode = useColorMode()
</script>

<template>
    <UApp>
        <UColorModeButton />
        {{ colorMode }}
        <RouterView />
        <div class="anyfork:w-100 anyfork:h-100 anyfork:bg-primary logo"></div>
        <UAlert title="Heads up!" />
    </UApp>
</template>

<style scoped>
    .logo {
        height: 6em;
        padding: 1.5em;
        transition: filter 300ms;
        will-change: filter;
    }

    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }

    .logo.vue:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
    }
</style>
