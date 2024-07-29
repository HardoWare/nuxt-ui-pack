<script setup lang="ts">
import {onMounted, onBeforeUnmount, ref, reactive, computed} from 'vue'
import type { Reactive, Ref } from 'vue'
import type { Gallery } from '../types'

interface UiT {
  wrapper?: string
  body?: {
    wrapper?: string
    item?: string
    loading?: string
    noItems?: string
  }
}

const props = defineProps<{
  ui?: UiT
  apiCall: (index: number) => Promise<Gallery>
}>()
const galleryRef: Ref<HTMLElement | null> = ref(null)
const debounceTimer: Ref<number | undefined> = ref(undefined)
const noMoreItems: Ref<boolean> = ref(false)
const page: Ref<number> = ref(0)

const itemLoading: Ref<boolean> = ref(true)
const items: Reactive<any[]> = reactive([])

const uui = computed(() => ({
  ...props.ui,
}))

console.log(uui.value)
async function nextPage(): Promise<void> {
  itemLoading.value = true
  page.value += 1
  const { data, noMore } = await props.apiCall(page.value)
  if (!noMore)
    items.push(...data)
  else {
    noMoreItems.value = true
    page.value -= 1
  }
  await new Promise(resolve => setTimeout(resolve, 3000))
  itemLoading.value = false
}

async function reloadItems(): Promise<void> {
  items.length = 0
  page.value = 0
  noMoreItems.value = false
  await nextPage()
}

const handleScroll = async (): Promise<void> => {
  if (debounceTimer.value) {
    window.clearTimeout(debounceTimer.value)
  }
  debounceTimer.value = window.setTimeout(async () => {
    if (galleryRef.value) {
      const { offsetHeight } = galleryRef.value
      if (offsetHeight + 100 - window.innerHeight - window.scrollY <= 0) {
        await nextPage()
      }
    }
    if (noMoreItems.value)
      window.removeEventListener('scroll', handleScroll)
  }, 50)
}
onMounted(() => {
  reloadItems()
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div ref="galleryRef"
       v-bind="$attrs"
       :class="[ui?.wrapper]"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[ui.body?.item]"
    >
      <slot :item="item"
            class="111"
      >
        <div>
          {{ index }}
        </div>
      </slot>
    </div>
  </div>
  <div v-if="noMoreItems"
       :class="[ui.body?.noItems]"
  >
    <slot name="noItems">
      <div class="text-center text-gray-500">
        No items
      </div>
    </slot>
  </div>
  <button class="mx-auto block mt-4"
          @click="nextPage()"
  >
    LOAD MORE
  </button>
</template>

<style scoped>

</style>
