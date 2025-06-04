import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

export async function loadPoems(type?: 'tang' | 'song') {
  const basePath = join(process.cwd(), 'server/data')

  if (type) {
    const filePath = join(basePath, `${type}.json`)
    const data = await readFile(filePath, 'utf-8')
    return JSON.parse(data)
  }
  else {
    const [tangData, songData] = await Promise.all([
      readFile(join(basePath, 'tang.json'), 'utf-8'),
      readFile(join(basePath, 'song.json'), 'utf-8'),
    ])
    return [...JSON.parse(tangData), ...JSON.parse(songData)]
  }
}
