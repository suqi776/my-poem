import type { Poem } from '../../../types/poem.d.ts'
import { loadPoems } from '../../utils/poem'

function countFrequency<T>(list: T[]): Record<string, number> {
  return list.reduce((acc, item: any) => {
    acc[item] = (acc[item] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

function getTopN(obj: Record<string, number>, n = 6) {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, count]) => ({ name: key, count }))
}

export default defineEventHandler(async () => {
  const tangPoems = await loadPoems('tang') as Poem[]
  const songPoems = await loadPoems('song') as Poem[]

  const allPoems = [...tangPoems, ...songPoems]
  const allAuthors = new Set(allPoems.map(p => p.author))
  const allTags = allPoems.flatMap(p => p.tags || [])

  const tagCount = new Set(allTags).size

  const authorFreq = countFrequency(allPoems.map(p => p.author))
  const tagFreq = countFrequency(allTags)

  return {
    tangCount: tangPoems.length,
    songCount: songPoems.length,
    authorCount: allAuthors.size,
    tagCount,
    topAuthors: getTopN(authorFreq),
    topTags: getTopN(tagFreq),
    total: tangPoems.length + songPoems.length,
    error: null,
  }
})
