<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive, computed } from 'vue'
import type { Reactive, Ref } from 'vue'
import type { GalleryResponse, GalleryUi } from '../types'

const uiDef = {
  wrapper: 'w-full max-h-96',
  body: {
    wrapper: 'grid grid-cols-2 gap-2',
    item: 'w-full',
    loading: 'w-full col-span-2 text-center',
    noItems: 'w-full text-center',
  },
}

const props = defineProps<{
  ui?: GalleryUi
  apiCall: (index: number) => Promise<GalleryResponse<unknown>>
}>()

const galleryRef: Ref<HTMLElement | null> = ref(null)
const debounceTimer: Ref<number | undefined> = ref(undefined)
const noMoreItems: Ref<boolean> = ref(false)
const page: Ref<number> = ref(0)

const itemLoading: Ref<boolean> = ref(true)
const items: Reactive<any[]> = reactive([])

const ui = computed(() => ({
  ...{ ...uiDef, ...props.ui },
  ...{ body: { ...uiDef.body, ...props.ui?.body } },
}))
async function nextPage(): Promise<void> {
  itemLoading.value = true
  page.value += 1
  const { data, noMore } = await props.apiCall(page.value)
  // await new Promise(resolve => setTimeout(resolve, 5000))
  if (!noMore)
    items.push(...data)
  else {
    noMoreItems.value = true
    page.value -= 1
  }
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
  <div v-bind="$attrs">
    <div :class="[ui.wrapper]">
      <div ref="galleryRef" :class="[ui.body.wrapper]">
        <div v-for="(item, index) in items" :key="index" :class="[ui.body.item]">
          <slot name="default" :item="item">
            <div>
              item {{ index }}
            </div>
          </slot>
        </div>
        <div v-if="itemLoading" :class="[ui.body.loading]">
          <slot name="loading">
            <div>
              <h3 class="w-full text-center">Loading...</h3>
            </div>
          </slot>
        </div>
      </div>
      <div v-if="noMoreItems" :class="[ui.body.noItems]">
        <slot name="noItems">
          <div class="text-center text-gray-500 w-full">
            <h3 class="text-2xl">No more items</h3>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
