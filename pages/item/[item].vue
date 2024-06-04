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
            class="flex flex-col gap-2"
        >
            <H2>{{ hnStory.title }}</H2>

            <NuxtLink
                :href="hnStory.url"
                class="text-primary visited:text-muted-foreground"
            >
                {{ hnStory.url }}
                <ExternalLink class="inline size-4 -translate-y-0.5" />
            </NuxtLink>

            <div class="flex flex-wrap gap-x-4 gap-y-2">
                <div>
                    {{ hnStory.points }} Points
                </div>
                <div>
                    {{ hnStory.created_at }}
                </div>
            </div>

            <div class="mt-6 flex flex-col gap-4">
                <Comment
                    v-for="comment, index in hnStory.children"
                    :key="index"
                    :comment="comment"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ExternalLink, Loader2, } from 'lucide-vue-next'

import type { Item, } from '~/lib/entities/item'

const route = useRoute()
const { data: hnStory, pending, error, }: {data: Ref<Item|null>, pending: Ref<boolean>, error: Ref<Error|null>} = await useFetch(`https://hn.algolia.com/api/v1/items/${route.params.item}`)
console.log(hnStory)

useHead({
    title: 'Hacker News',
})
</script>
