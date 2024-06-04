<template>
    <div>
        <div>
            <div class="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                <div class="text-primary">
                    {{ comment.author }}
                </div>
                {{ comment.created_at }}

                <button
                    v-if="!collapsedStore.isCollapsed(comment.id)"
                    class="rounded p-1 transition-colors hover:bg-muted"
                    @click="collapsedStore.collapse(comment.id)"
                >
                    <ChevronsDownUp
                        class="size-4"
                    />
                </button>
                <button
                    v-else
                    class="inline-flex
                        items-center
                        gap-1
                        rounded
                        p-1
                        transition-colors
                        hover:bg-muted"
                    @click="collapsedStore.expand(comment.id)"
                >
                    <ChevronsUpDown
                        class="size-4"
                    />
                    <span>
                        {{ childCount }} items</span>
                </button>
            </div>
            <div
                v-if="!collapsedStore.isCollapsed(comment.id)"
                style="word-break: break-word;"
                class="comment-text"
                v-html="comment.text"
            />
        </div>
        <div
            v-if="comment.children && comment.children.length > 0 && !collapsedStore.isCollapsed(comment.id)"
            class="mt-2 flex gap-2"
        >
            <div
                class="max-h-full
                    cursor-pointer
                    rounded
                    pe-0.5
                    ps-0.5
                    transition-colors
                    hover:bg-muted/60"
                @click="collapsedStore.collapse(comment.id)"
            >
                <div class="h-full w-0 border-l-2 border-dotted" />
            </div>
            <div class="flex flex-col gap-2">
                <Comment
                    v-for="cmmnt, index in comment.children"
                    :key="index"
                    :comment="cmmnt"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronsDownUp, ChevronsUpDown, } from 'lucide-vue-next'

import type { Item, } from '~/lib/entities/item'
import { useCollapsedStore, } from '~/stores/collapsed'

const props = defineProps<{
    comment: Item
    nextComment?: Item
}>()
const { comment, } = toRefs(props)

const countChildren = (item: Item) => {
    if (!item.children || item.children.length == 0) {
        return 1
    }
    let count = 1
    item.children.forEach((child: Item) => {
        count += countChildren(child)
    })
    return count
}
const childCount = computed(() => countChildren(comment.value))

const collapsedStore = useCollapsedStore()
</script>

<style>
.comment-text a {
    @apply underline underline-offset-4 decoration-muted-foreground/60 hover:decoration-black transition-colors;
}

.comment-text code {
    @apply whitespace-break-spaces;
}
</style>
