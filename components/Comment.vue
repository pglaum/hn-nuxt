<template>
    <div>
        <div>
            <div class="text-sm text-muted-foreground">
                <span class="text-primary">{{ comment.author }}</span>
                •
                {{ comment.created_at }}
            </div>
            <div v-html="comment.text" />
        </div>
        <div
            v-if="comment.children && comment.children.length > 0"
            class="ml-1 flex flex-col gap-4 border-l-2 border-dotted pl-3 pt-4"
        >
            <Comment
                v-for="cmmnt, index in comment.children"
                :key="index"
                :comment="cmmnt"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Item, } from '~/lib/entities/item'

defineProps<{
    comment: Item
}>()
</script>
