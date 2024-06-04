import { z, } from "zod"

export const ArticleSchema = z.object({
    title: z.string(),
    link: z.string(),
    comments: z.number(),
    commentsLink: z.string(),
    points: z.number(),
})

export type Article = z.infer<typeof ArticleSchema>
