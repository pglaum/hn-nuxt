<template>
    <div class="container my-24 grid max-w-3xl gap-8">
        <Alert
            v-if="error"
            variant="destructive"
        >
            {{ error }}
        </Alert>

        <div
            v-if="pending"
            class="flex items-center justify-center py-4"
        >
            <Loader2
                class="animate-spin"
            />
        </div>
        <div
            v-else
            class="flex flex-col divide-y"
        >
            <div
                v-for="article, index in frontpage"
                :key="index"
                class="py-2"
            >
                <NuxtLink
                    :href="getItemLink(article.commentsLink)"
                    class="visited:text-muted-foreground"
                >
                    <H4>{{ article.title }}</H4>
                </NuxtLink>
                <NuxtLink
                    :href="article.link"
                    class="text-ellipsis text-primary visited:text-muted-foreground"
                >
                    {{ article.link }}
                    <ExternalLink class="inline size-4 -translate-y-0.5" />
                </NuxtLink>

                <NuxtLink :href="getItemLink(article.commentsLink)">
                    <div class="flex items-center gap-2">
                        <div>
                            {{ article.points }} points
                        </div>
                        <div>
                            {{ article.comments }} comments
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ExternalLink, Loader2, } from 'lucide-vue-next'

const { data: frontpage, pending, error, } = await useFetch('/api/frontpage')
const numberPattern = /\d+/g

useHead({
    title: 'Hacker News',
})

const getItemLink = computed(() => (commentsLink: string) => {
    const numbers = commentsLink.match(numberPattern)
    if (numbers && numbers.length > 0) {
        return `/item/${numbers[0]}`
    }
    return '/'
})
</script>
