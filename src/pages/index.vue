<template>
    <div>
        <HelloWorld msg="1" />
    </div>
</template>
<script setup lang="ts">
    const router = useRouter()
    console.log(router.getRoutes())
</script>
