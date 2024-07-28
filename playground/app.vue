<script setup lang="ts">
import type { WriteTextType } from '../src/runtime/types'
import type { Return } from '~/types'

const writeItems: WriteTextType[] = [
  { sentence: 'Four' },
  { sentence: 'Potato' },
  { sentence: 'longer text because why not?' },
]

const apiCall = async (page: number): Promise<Return> => {
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
        FadeIn component
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
        <UPTextTyper
          :items="writeItems"
          :next-delay="50"
          class="bg-inherit"
        >
          One Two Three&nbsp;
        </UPTextTyper>
      </div>
    </div>
    <div class="w-full py-10">
      <h1 class="text-4xl w-3/4 mx-auto">
        Infinity scroll component
      </h1>
      <div class="w-3/4 mx-auto h-80 overflow-y-scroll mt-4">
        <UPInfinityScroll
          :api-call="apiCall"
          class="text-white bg-gray-600 w-full h-full grid grid-cols-3 gap-1"
        >
          <template #default="{ item }">
            <div class="h-8">
              <h2 class="text-2xl">
                {{ item.id }} {{ item.name }}
              </h2>
            </div>
          </template>
        </UPInfinityScroll>
      </div>
    </div>
  </div>
</template>
