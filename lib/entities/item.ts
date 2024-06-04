import { z, } from "zod"

export const ItemSchema = z.object({
    id: z.number(),
    author: z.string().nullable(),
    children: z.lazy(() => ItemSchema.array()),
    created_at: z.date(),
    created_at_i: z.number(),
    points: z.number(),
    story_id: z.number(),
    text: z.string().nullable(),
    title: z.string().nullable(),
    type: z.string().nullable(),
    url: z.string().nullable(),
})

export type Item = z.infer<typeof ItemSchema> & {
    children: Item[]
}
