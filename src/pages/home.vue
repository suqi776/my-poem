<script setup>
import { Converter } from 'opencc-js'
import { computed, onMounted, ref } from 'vue'
import { poemApi } from '../api/index'

const converter = Converter({ from: 'tw', to: 'cn' }) // 繁体转简体

const poems = ref([])
const currentIndex = ref(0)

// 判断是否是标点符号
function isPunctuation(char) {
  return /[，。！？、；：“”‘’（）【】《》]/.test(char)
}

// 计算切分后的行，每遇见标点换行
const lines = computed(() => {
  if (poems.value.length === 0)
    return []

  const allText = poems.value[0].content.join('')
  const result = []
  let temp = ''

  for (const char of allText) {
    temp += char
    if (isPunctuation(char)) {
      result.push(temp)
      temp = ''
    }
  }
  if (temp)
    result.push(temp)

  return result
})

// 请求一首随机诗
async function getPoem() {
  try {
    const res = await poemApi.getPoemsRandom()
    if (res.data && res.data.title && res.data.paragraphs) {
      // 转简体
      const simpleTitle = converter(res.data.title)
      const simpleAuthor = converter(res.data.author || '未知作者')
      const simpleParagraphs = res.data.paragraphs.map(p => converter(p))

      poems.value = [
        {
          title: simpleTitle,
          author: simpleAuthor,
          content: simpleParagraphs,
        },
      ]
      currentIndex.value = 0
    }
  }
  catch (error) {
    console.error('获取诗词失败:', error)
  }
}

// 点击下一首
function nextPoem() {
  getPoem()
}

// 初始化加载
onMounted(() => {
  getPoem()
})
</script>

<template>
  <div class="mx-auto max-w-md min-h-screen flex flex-col bg-yellow-50 p-4">
    <header class="mb-4">
      <h1 class="text-primary mb-1 text-center text-3xl font-bold">
        唐诗展示
      </h1>
      <p class="text-center text-sm text-gray-600">
        简易田字格排版
      </p>
    </header>

    <main v-if="poems.length" class="flex flex-grow flex-col justify-center rounded bg-white p-4 shadow-md">
      <h2 class="mb-3 text-center text-xl font-semibold">
        {{ poems[0].title }}
      </h2>
      <p class="mb-4 text-center text-sm text-gray-700">
        — {{ poems[0].author }}
      </p>

      <div class="space-y-3">
        <div v-for="(line, idx) in lines" :key="idx" class="flex flex-wrap justify-center gap-1">
          <div
            v-for="(char, cidx) in Array.from(line)"
            :key="cidx"
            class="field-char"
          >
            {{ char }}
          </div>
        </div>
      </div>
    </main>

    <main v-else class="flex flex-grow items-center justify-center">
      <p>加载中...</p>
    </main>

    <footer class="mt-6">
      <button class="w-full border border-blue-500 rounded py-2 hover:bg-blue-100" @click="nextPoem">
        下一首诗
      </button>
    </footer>
  </div>
</template>

<style scoped>
.field-char {
  position: relative;
  font-size: 1.5rem;
  font-weight: 500;
  user-select: none;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  height: 2.5rem;
  width: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  flex-shrink: 0;
  z-index: 0;
}

/* 田字格线，绝对定位在文字后面 */
.field-char::before,
.field-char::after {
  content: "";
  position: absolute;
  background: #e0e0e0;
  z-index: -1; /* 线在文字后面 */
}
.field-char::before {
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  transform: translateX(-50%);
}
.field-char::after {
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  transform: translateY(-50%);
}
</style>
