<script setup lang="ts">
import type { TextItem, GalleryResponse, ExampleItems } from '../src/runtime/types'

const writeItems: TextItem[] = [
  { sentence: 'Four' },
  { sentence: 'Potato' },
  { sentence: 'longer text because why not?' },
]

const apiCall = async (page: number): Promise<GalleryResponse<ExampleItems[]>> => {
  await new Promise(resolve => setTimeout(resolve, 2000)) // delay to show the gallery response
  return await $fetch('/api/call', { query: { page: page } })
}
</script>

<template>
  <div class="w-full h-full min-w-full min-h-screen bg-gray-800 text-white overflow-hidden">
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
    <div class="w-full bg-blue-400 py-10">
      <UPFadeIn
        from="left"
        depth="10"
        repeat
        class="w-fit mx-auto text-2xl"
      >
        Fade in component with repeat prop and left direction
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
      <UPInfinityScroll
        :ui="{ body: { wrapper: 'grid grid-cols-2 gap-2' } }"
        :api-call="apiCall"
        class="w-3/4 mx-auto mt-4 text-white bg-gray-600 overflow-hidden"
      >
        <template #default="{ item }">
          <div class="h-32 flex justify-center align-middle bg-gray-500">
            <h2 class="text-2xl h-fit w-fit">
              {{ item.id }} {{ item.name }}
            </h2>
          </div>
        </template>
      </UPInfinityScroll>
    </div>
    <div class="w-full py-10">
      <h1 class="text-4xl w-3/4 mx-auto">
        Infinity scroll component with FadeIn
      </h1>
      <UPInfinityScroll
        :ui="{ body: { wrapper: 'grid grid-cols-2 gap-2' } }"
        :api-call="apiCall"
        class="w-3/4 mx-auto mt-4 text-white  overflow-hidden"
      >
        <template #default="{ item }">
          <UPFadeIn from="left">
            <div class="h-32 flex justify-center align-middle bg-gray-500">
              <h2 class="text-2xl h-fit w-fit">
                {{ item.id }} {{ item.name }}
              </h2>
            </div>
          </UPFadeIn>
        </template>
      </UPInfinityScroll>
    </div>
  </div>
</template>
