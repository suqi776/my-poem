import type { Poem } from '../../types/poem.d.ts'
import { loadPoems } from '../utils/poem'

export default defineEventHandler(async () => {
  const poems: Poem[] = await loadPoems()

  const authorMap = new Map<string, number>()

  poems.forEach((poem) => {
    if (poem.author) {
      authorMap.set(poem.author, (authorMap.get(poem.author) || 0) + 1)
    }
  })

  const authors = Array.from(authorMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return {
    total: authors.length,
    authors,
  }
})
