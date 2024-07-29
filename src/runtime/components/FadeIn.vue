<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { FadeIn } from '../types'

const domRef: Ref<HTMLElement | undefined> = ref()
const isVisible: Ref<boolean> = ref(false)
const observer: Ref<IntersectionObserver | undefined> = ref(undefined)
const props = withDefaults(defineProps<FadeIn>(), {
  threshold: 0.3,
  repeat: false,
  from: 'bottom',
  depth: 5,
})
const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver | undefined) => {
  entries.forEach((entry) => {
    isVisible.value = entry.isIntersecting
    if (entry.isIntersecting && !props.repeat && observer)
      observer.unobserve(entry.target)
  })
}
const from = (): string => {
  if (props.from === 'center') return ''
  const axis = (props.from === 'left' || props.from === 'right')
  const direction = (props.from === 'top' || props.from === 'left') ? '-' : ''
  const depth = (Number(props.depth) ? props.depth + (axis ? 'vw' : 'vh') : props.depth)
  return `translate${axis ? 'X' : 'Y'}(${direction + depth})`
}
const style: ComputedRef<string> = computed(() => {
  return `visibility: ${isVisible.value ? 'visible' : 'hidden'}; opacity: ${isVisible.value ? 1 : 0}; transform: ${isVisible.value ? 'none' : from()}; pointer-events: ${isVisible.value ? 'auto' : 'none'};`
})
onMounted(() => {
  observer.value = (() => {
    return new IntersectionObserver(entries => handleIntersect(entries, observer.value), {
      root: null,
      rootMargin: '0px',
      threshold: Number(props.threshold),
    })
  })()
  if (domRef.value)
    observer.value.observe(domRef.value)
})
onBeforeUnmount(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <div
    ref="domRef"
    class="fade-in"
    :style="style"
  >
    <slot />
  </div>
</template>

<style scoped>
.fade-in {
  transition: opacity 1000ms ease-out, transform 600ms ease-out, visibility 1000ms ease-out;
  will-change: opacity, transform, visibility;
}
</style>
