import type { Poem } from '../../types/poem.d.ts'
import { loadPoems } from '../utils/poem'

export default defineEventHandler(async () => {
  const poems: Poem[] = await loadPoems()

  const tagMap = new Map<string, number>()

  poems.forEach((poem) => {
    if (Array.isArray(poem.tags)) {
      poem.tags.forEach((tag) => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      })
    }
  })

  const tags = Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return {
    total: tags.length,
    tags,
  }
})
