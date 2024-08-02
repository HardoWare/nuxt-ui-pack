<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { Ref } from 'vue'
import type { TextItem } from '../types'

const textRef = ref()
const colorRef = ref()
const defaultTypeSpeed: number = 100
const defaultNextDelay: number = 500
const defaultAfterDelay: number = 3000
const defaultDeleteSpeed: number = 50
const defaultColor: string = 'text-inherit'
const carouselInterval: Ref<boolean> = ref(true)
const props = withDefaults(defineProps<{
  items: TextItem[]
  nextDelay?: number
  afterDelay?: number
  deleteSpeed?: number
}>(), {
  items: () => [] as TextItem[],
  nextDelay: defaultNextDelay, // 500ms
  afterDelay: defaultAfterDelay, // 3000ms
  deleteSpeed: defaultDeleteSpeed, // 50ms
})
const applyDefaults = (): TextItem[] => {
  return props.items.map(item => ({
    sentence: item.sentence,
    speed: item.speed ?? defaultTypeSpeed,
    color: item.color ?? defaultColor,
  }))
}
async function awaitTimeout(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
async function typeText(text: string, typeSpeed: number): Promise<void> {
  const letters = text.split('')
  let i = 0
  while (i < letters.length) {
    await awaitTimeout(typeSpeed)
    textRef.value.append(letters[i])
    i++
  }
}
async function deleteText(): Promise<void> {
  const letters = textRef.value.textContent.split('')
  while (letters.length > 0) {
    await awaitTimeout(props.deleteSpeed ?? defaultDeleteSpeed)
    letters.pop()
    await nextTick()
    textRef.value.textContent = letters.join('')
  }
}
const carousel = async () => {
  const items = applyDefaults()
  let i = 0
  while (carouselInterval.value) {
    const item = items[i]
    colorRef.value = item.color ?? defaultColor
    await typeText(item.sentence, Number(item.speed))
    await awaitTimeout(props.afterDelay ?? defaultAfterDelay)
    await deleteText()
    await awaitTimeout(props.nextDelay ?? defaultNextDelay)
    i++
    if (i > items.length - 1) i = 0
  }
}
onMounted(() => {
  carousel()
})
onBeforeUnmount(() => {
  carouselInterval.value = false
})
</script>

<template>
  <div class="flex flex-col">
    <slot />
    <div class="text-nowrap overflow-hidden">
      <span
        ref="textRef"
        :class="[colorRef]"
      />
      <span
        class="blink inline-block w-0.25 h-full ml-1"
        style="background-color: currentColor;"
      >&nbsp;</span>
    </div>
  </div>
</template>

<style scoped>
@keyframes blink {
  0% { opacity: 1; }
  33% { opacity: 1; }
  66% { opacity: 0; }
  100% { opacity: 0; }
}
.blink {
  animation: blink 0.7s infinite alternate;
}
</style>
