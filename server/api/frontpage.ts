import { JSDOM, } from 'jsdom'

import { Article, ArticleSchema, } from '~/lib/entities/article'

export default defineEventHandler(async (_) => {
    const frontpage = await fetch('https://news.ycombinator.com/')
    const content = await frontpage.text()
    const { window, } = new JSDOM(content)

    const articles: Article[] = []
    window.document.querySelectorAll('tr.athing').forEach((tr) => {
        const title = tr.querySelector("td.title > span.titleline > a")?.textContent ?? '<title>'
        const link = tr.querySelector("td.title > span.titleline > a")?.getAttribute('href') ?? '<href>'
        const nextLinks = tr.nextElementSibling?.querySelectorAll("a[href^='item']")
        const commentText = nextLinks ? nextLinks[nextLinks.length - 1] : null
        const comments = parseInt(commentText?.textContent ?? '') ?? 0
        const commentsLink = commentText?.getAttribute('href') ?? '<comment-link>'
        const points = parseInt(tr.nextElementSibling?.querySelector('span.subline > span.score')?.textContent ?? '')

        articles.push(ArticleSchema.parse({
            title,
            link,
            comments: Number.isNaN(comments) ? 0 : comments,
            commentsLink,
            points: Number.isNaN(points) ? 0 : points,
        }))
    })
    return articles
})
