import { loadPoems } from '../../utils/poem'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id as string | undefined
  const author = query.author as string | undefined
  const tag = query.tag as string | undefined
  const poems = await loadPoems()

  if (id) {
    const poem = poems.find((p: any) => p.id === id)
    return poem ?? { error: '未找到该诗歌' }
  }

  if (author) {
    const results = poems.filter((p: any) =>
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
    const results = poems.filter((p: any) =>
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
