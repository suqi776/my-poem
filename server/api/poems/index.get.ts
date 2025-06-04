import type { Poem } from '../../../types/poem.d.ts'
import { loadPoems } from '../../utils/poem'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id as string | undefined
  const author = query.author as string | undefined
  const tag = query.tag as string | undefined
  const poems: Poem[] = await loadPoems()

  if (id) {
    const poem = poems.find(p => p.id === id)
    return poem ?? { error: '未找到相关诗歌', poems: [] }
  }

  if (author) {
    const results = poems.filter(p =>
      p.author.includes(author),
    )
    return results.length > 0
      ? {
          total: results.length,
          poems: results,
        }
      : { error: '未找到相关诗歌', poems: [] }
  }

  if (tag) {
    const results = poems.filter(p =>
      Array.isArray(p.tags) && p.tags.includes(tag),
    )

    return results.length > 0
      ? {
          total: results.length,
          poems: results,
        }
      : { error: '未找到相关诗歌', poems: [] }
  }

  return {
    total: poems.length,
    poems,
  }
})
