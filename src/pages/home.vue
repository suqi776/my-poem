<script setup>
import { Converter } from 'opencc-js'
import { computed, onMounted, ref, watch } from 'vue'
import { poemApi } from '../api/index'
import { useLangStore } from '../store/lang'
import { useStyleStore } from '../store/style'

const langStore = useLangStore()
const styleStore = useStyleStore()

const converter = computed(() =>
  Converter({
    from: langStore.lang === 'cn' ? 'tw' : 'cn',
    to: langStore.lang,
  }),
)

const poems = ref([])
const originalPoem = ref(null) // 保存原始繁体数据
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

// 封装转换并赋值
function convertAndSet(poem) {
  const simpleTitle = converter.value(poem.title)
  const simpleAuthor = converter.value(poem.author || '未知作者')
  const simpleParagraphs = poem.paragraphs.map(p => converter.value(p))

  poems.value = [
    {
      title: simpleTitle,
      author: simpleAuthor,
      content: simpleParagraphs,
    },
  ]
}

// 请求一首随机诗
async function getPoem() {
  try {
    const res = await poemApi.getPoemsRandom()
    if (res.data && res.data.title && res.data.paragraphs) {
      originalPoem.value = res.data
      convertAndSet(res.data)
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
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// 监听语言变化并重新转换当前诗词
watch(
  () => langStore.lang,
  () => {
    if (originalPoem.value)
      convertAndSet(originalPoem.value)
  },
)

onMounted(() => {
  getPoem()
})
</script>

<template>
  <ShowSwitcher />
  <div class="relative mx-auto max-w-md min-h-screen flex flex-col p-4">
    <!-- 背景图虚化层 -->
    <div class="background-blur" />

    <!-- 遮罩层，半透明灰色，模拟灰度效果 -->
    <div class="background-mask" />

    <header class="relative z-10 mb-4">
      <h1 class="text-primary mb-1 text-center text-3xl font-bold">
        唐诗展示
      </h1>
      <p class="text-center text-sm text-gray-600">
        简易田字格排版
      </p>
    </header>

    <main
      v-if="poems.length"
      class="relative z-10 flex flex-grow flex-col justify-center rounded p-4 shadow-md"
    >
      <h2 class="mb-3 text-center text-xl font-semibold">
        {{ poems[0].title }}
      </h2>
      <p class="mb-4 text-center text-sm text-gray-700">
        — {{ poems[0].author }}
      </p>

      <div class="space-y-3">
        <div
          v-for="(line, idx) in lines"
          :key="idx"
          class="flex flex-wrap justify-center gap-1"
        >
          <div
            v-for="(char, cidx) in Array.from(line)"
            :key="cidx"
            class="field-char"
            :style="styleStore.hasGrid ? { border: '1px solid #e0e0e0', height: '2.5rem', width: '2.5rem', lineHeight: '2.5rem' } : {}"
          >
            {{ char }}
          </div>
        </div>
      </div>

      <button class="w-full py-10" @click="nextPoem">
        下一首诗
      </button>
    </main>

    <main v-else class="relative z-10 flex flex-grow items-center justify-center">
      <p>加载中...</p>
    </main>
  </div>
</template>

<style scoped>
.background-blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/falao.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

/* 遮罩层，覆盖在虚化层上，半透明灰色，制造灰度效果 */
.background-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(180, 180, 180, 0.5); /* 半透明灰，调节alpha可以控制灰度强弱 */
  z-index: 1;
}

/* 田字格样式保持不变 */
.field-char {
  position: relative;
  font-size: 1.5rem;
  font-weight: 500;
  user-select: none;
  box-sizing: border-box;
  /* border: 1px solid #e0e0e0; */

  /* height: 2.5rem;
  width: 2.5rem;
  line-height: 2.5rem; */
  text-align: center;
  flex-shrink: 0;
  z-index: 0;
}

.field-char::before,
.field-char::after {
  content: "";
  position: absolute;
  z-index: -1;
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
