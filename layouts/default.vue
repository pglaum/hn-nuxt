<template>
    <div class="flex min-h-screen flex-col">
        <div class="container max-w-3xl py-4">
            <NuxtLink
                to="/"
                class="inline-flex
                    items-center
                    gap-2
                    font-mono
                    font-medium
                    uppercase
                    text-muted-foreground"
            >
                <img
                    src="/favicon.png"
                    class="size-5"
                >
                hacker news
            </NuxtLink>
        </div>
        <slot />
        <Toaster />

        <div class="container mt-auto py-4 text-center">
            &copy; {{ new Date().getFullYear() }}
            <NuxtLink
                href="https://pglaum.de"
                class="underline underline-offset-4 hover:no-underline"
                target="_blank"
            >
                Philipp Glaum
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
