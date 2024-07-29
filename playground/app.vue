<script setup lang="ts">
import type { TextItem, Gallery } from '../src/runtime/types'

const writeItems: TextItem[] = [
  { sentence: 'Four' },
  { sentence: 'Potato' },
  { sentence: 'longer text because why not?' },
]

const apiCall = async (page: number): Promise<Gallery> => {
  return await $fetch('/api/call', { query: { page: page } })
}
</script>

<template>
  <div class="w-screen min-w-full h-screen min-h-full bg-gray-800 text-white">
    <div class="flex w-full justify-center align-middle py-5">
      <div class="text-center">
        <h1 class="text-4xl">
          Nuxt Ui Pack
        </h1>
      </div>
    </div>
    <div class="w-full bg-blue-400 py-10">
      <h1 class="text-4xl w-3/4 mx-auto">
        Fade in component
      </h1>
      <UPFadeIn class="w-fit mx-auto text-2xl">
        FadeIn made easy 🙌
      </UPFadeIn>
    </div>
    <div class="w-full py-10">
      <h1 class="text-4xl w-3/4 mx-auto ">
        Text type component
      </h1>
      <div class="text-2xl w-3/4 mx-auto mt-4">
        <UPTextWriter
          :items="writeItems"
          :next-delay="50"
          class="bg-inherit"
        >
          One Two Three&nbsp;
        </UPTextWriter>
      </div>
    </div>
    <div class="w-full py-10">
      <h1 class="text-4xl w-3/4 mx-auto">
        Infinity scroll component
      </h1>
      <div class="w-3/4 mx-auto h-80 mt-4">
        <UPInfinityScroll
          :ui="{ wrapper: 'q', body: { item: '12' } }"
          :api-call="apiCall"
          class="w-full h-full grid grid-cols-2 gap-4 overflow-y-scroll text-white bg-gray-600"
        >
          <template #default="{ item }">
            <div class="h-20 w-full flex justify-center align-middle bg-gray-500">
              <h2 class="text-2xl h-fit w-fit">
                {{ item.id }} {{ item.name }}
              </h2>
            </div>
          </template>
          <template #noItems>
            <div>
              <h2 class="text-2xl">No more items</h2>
            </div>
          </template>
        </UPInfinityScroll>
      </div>
    </div>
  </div>
</template>
