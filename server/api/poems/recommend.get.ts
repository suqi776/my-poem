import type { Poem } from '../../../types/poem.d.ts'
import { loadPoems } from '../../utils/poem'

export default defineEventHandler(async () => {
  const poems: Poem[] = await loadPoems()
  if (!Array.isArray(poems) || poems.length === 0) {
    return {
      total: 0,
      poems: [],
      error: '没有诗词数据',
    }
  }

  const recommendPoems = [...poems]
    .sort(() => Math.random() - 0.5)
    .slice(0, 77)

  return {
    total: recommendPoems.length,
    poems: recommendPoems,
    error: null,
  }
})
