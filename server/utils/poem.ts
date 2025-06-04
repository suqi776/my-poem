import type { Poem } from '../../types/poem.d.ts'
import { songPoems } from './songPoems'
import { tangPoems } from './tangPoems'

export async function loadPoems(type?: 'tang' | 'song') {
  if (type === 'tang') {
    return tangPoems as Poem[]
  }
  if (type === 'song') {
    return songPoems as Poem[]
  }
  return (tangPoems as Poem[]).concat(songPoems as Poem[])
}
