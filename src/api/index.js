import axios from 'axios'

// 创建 axios 实例
const api = axios.create({
  baseURL: 'https://api.9999977.xyz/' || '/api',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const poemApi = {
  getPoemsRandom: () => {
    return api.get('/tang/poems/random')
  },
}

export default api
